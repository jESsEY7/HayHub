from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import transaction
from .models import Product, Quotation, QuotationItem, Invoice, Contact
from .serializers import ProductSerializer, QuotationSerializer, InvoiceSerializer, ContactSerializer
import uuid

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def retrieve(self, request, *args, **kwargs):
        try:
            return super().retrieve(request, *args, **kwargs)
        except ValueError:
            return Response(status=status.HTTP_404_NOT_FOUND)

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class QuotationViewSet(viewsets.ModelViewSet):
    queryset = Quotation.objects.all()
    serializer_class = QuotationSerializer

    def get_queryset(self):
        # Basic session-based isolation logic
        session_key = self.request.query_params.get('session_key')
        if session_key:
            return Quotation.objects.filter(session_key=session_key)
        return Quotation.objects.all()

    @action(detail=False, methods=['get', 'post'])
    def current(self, request):
        if not request.session.session_key:
            request.session.create()
        
        session_key = request.session.session_key
        
        if not session_key:
            return Response({'error': 'Failed to establish session'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # Handle cases where multiple DRAFT quotations might exist for the same session
        quotations = Quotation.objects.filter(
            session_key=session_key,
            status='DRAFT'
        ).order_by('-updated_at')
        
        if quotations.exists():
            quotation = quotations.first()
        else:
            quotation = Quotation.objects.create(
                session_key=session_key,
                status='DRAFT'
            )
            
        return Response(QuotationSerializer(quotation).data)

    @action(detail=True, methods=['post'])
    def confirm(self, request, pk=None):
        """
        Confirm quotation and generate invoice in a single atomic transaction.
        """
        quotation = self.get_object()
        
        if quotation.status != 'DRAFT':
            return Response({'error': 'Quotation already processed'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Capture phone number if provided
        customer_phone = request.data.get('customer_phone')
        if customer_phone:
            quotation.customer_phone = customer_phone
            quotation.save()

        try:
            with transaction.atomic():
                # 1. Update Quotation Status
                quotation.status = 'CONVERTED'
                quotation.save()

                # 2. Calculate Total
                # Use current item total prices (which rely on price_at_time)
                total_amount = sum(item.total_price for item in quotation.items.all())

                # 3. Generate Invoice
                invoice_number = f"INV-{uuid.uuid4().hex[:8].upper()}"
                invoice = Invoice.objects.create(
                    quotation=quotation,
                    invoice_number=invoice_number,
                    total_amount=total_amount,
                    customer_phone=quotation.customer_phone
                )

                # 4. (Future) Trigger PDF generation here
                
                return Response(InvoiceSerializer(invoice).data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=['post'])
    def add_item(self, request, pk=None):
        quotation = self.get_object()
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        # Logic to update or create item
        item, created = QuotationItem.objects.get_or_create(
            quotation=quotation,
            product=product,
            defaults={'price_at_time': product.price, 'quantity': quantity}
        )
        
        if not created:
            item.quantity = quantity
            item.save()

        return Response(QuotationSerializer(quotation).data)

class InvoiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
