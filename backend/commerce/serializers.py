from rest_framework import serializers
from .models import Product, Quotation, QuotationItem, Invoice, Contact

class ProductSerializer(serializers.ModelSerializer):
    price = serializers.SerializerMethodField()
    image = serializers.ImageField(read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'type', 'image', 'in_stock']

    def get_price(self, obj):
        return int(obj.price * 100)

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'first_name', 'last_name', 'email', 'product_type', 'message']

class QuotationItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = QuotationItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price_at_time', 'total_price']

class QuotationSerializer(serializers.ModelSerializer):
    items = QuotationItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Quotation
        fields = ['id', 'status', 'notes', 'customer_phone', 'created_at', 'items', 'session_key']

class InvoiceSerializer(serializers.ModelSerializer):
    quotation = QuotationSerializer(read_only=True)
    
    class Meta:
        model = Invoice
        fields = '__all__'
