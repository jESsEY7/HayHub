from django.db import models
from django.conf import settings
import uuid

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    sku = models.CharField(max_length=100, unique=True)
    stock_quantity = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    type = models.CharField(max_length=50, default='round') 
    in_stock = models.BooleanField(default=True)
    alt_text = models.CharField(
        max_length=255,
        default="Product image",
        help_text="Required for WCAG-compliant non-text content"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Contact(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    product_type = models.CharField(max_length=50, blank=True, null=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Quotation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    STATUS_CHOICES = (
        ('DRAFT', 'Draft'),
        ('CONFIRMED', 'Confirmed'),
        ('CONVERTED', 'Converted to Invoice'),
        ('CANCELLED', 'Cancelled'),
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    session_key = models.CharField(max_length=40, blank=True, null=True) 
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='DRAFT')
    is_converted = models.BooleanField(default=False)
    total_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )
    notes = models.TextField(blank=True, help_text="Notes from the customer")
    customer_phone = models.CharField(max_length=20, blank=True, null=True, help_text="Customer phone number for contact")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Quotation {self.id}"

class QuotationItem(models.Model):
    quotation = models.ForeignKey(Quotation, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField(default=1)
    price_at_time = models.DecimalField(max_digits=10, decimal_places=2, help_text="Price at the time of quotation")

    @property
    def total_price(self):
        if self.price_at_time is None:
            return 0
        return self.quantity * self.price_at_time

    class Meta:
        unique_together = ("quotation", "product")

    def __str__(self):
        return f"{self.quantity}x {self.product.name} in Quotation {self.quotation.id}"

class Invoice(models.Model):
    quotation = models.OneToOneField(Quotation, on_delete=models.PROTECT, related_name='invoice')
    invoice_number = models.CharField(max_length=50, unique=True)
    pdf_file = models.FileField(upload_to="invoices/", blank=True, null=True)
    customer_phone = models.CharField(max_length=20, blank=True, null=True, help_text="Customer contact number snapshot")
    
    generated_at = models.DateTimeField(auto_now_add=True) # Renamed from created_at to match spec
    created_at = models.DateTimeField(auto_now_add=True) # Keeping for backward compat just in case or standard django fields
    
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_paid = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Invoice {self.invoice_number}"
