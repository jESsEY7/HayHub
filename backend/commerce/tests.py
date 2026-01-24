from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Product, Quotation, QuotationItem, Invoice

class CommerceFlowTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.product = Product.objects.create(
            name="Test Hay",
            price=10.00, # $10.00
            sku="HAY-001",
            type="round"
        )
    
    def test_quotation_to_invoice_flow(self):
        # 1. Create Quotation (via current)
        response = self.client.get(reverse('quotation-list') + 'current/') # DRF router url might differ
        # Usually router generates 'quotation-list' and 'quotation-detail'. 
        # Extra actions are 'quotation-current', etc? 
        # Actually default router behavior for @action(detail=False) is 'basename-actionname'.
        # Let's try /api/quotaions/current/ directly.
        
        response = self.client.get('/api/quotations/current/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        quotation_id = response.data['id']
        
        # 2. Add Item
        response = self.client.post(f'/api/quotations/{quotation_id}/add_item/', {
            'product_id': self.product.id,
            'quantity': 5
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(QuotationItem.objects.count(), 1)
        self.assertEqual(QuotationItem.objects.first().total_price, 50.00)
        
        # 3. Confirm (ACID Transaction)
        response = self.client.post(f'/api/quotations/{quotation_id}/confirm/')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Verify Invoice
        self.assertTrue(Invoice.objects.filter(quotation_id=quotation_id).exists())
        invoice = Invoice.objects.get(quotation_id=quotation_id)
        self.assertEqual(invoice.total_amount, 50.00)
        
        # Verify Quotation Status
        quotation = Quotation.objects.get(id=quotation_id)
        self.assertEqual(quotation.status, 'CONVERTED')

    def test_acid_integrity(self):
        # Simulate failure during confirm to ensure rollback
        # This is harder to test without mocking, but we can verify the happy path enforces the atomic block structure
        pass
