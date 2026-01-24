from django.contrib import admin
from .models import Product, Quotation, QuotationItem, Invoice, Contact

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'price', 'sku', 'in_stock', 'stock_quantity')
    list_filter = ('type', 'in_stock')
    search_fields = ('name', 'sku', 'description')

class QuotationItemInline(admin.TabularInline):
    model = QuotationItem
    extra = 0
    readonly_fields = ('total_price',)

@admin.register(Quotation)
class QuotationAdmin(admin.ModelAdmin):
    list_display = ('id', 'status', 'total_amount', 'created_at', 'session_key')
    list_filter = ('status', 'created_at')
    search_fields = ('id', 'session_key', 'notes')
    inlines = [QuotationItemInline]
    readonly_fields = ('id', 'created_at', 'updated_at')

@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ('invoice_number', 'quotation', 'customer_phone', 'total_amount', 'is_paid', 'generated_at')
    list_filter = ('is_paid', 'generated_at')
    search_fields = ('invoice_number', 'quotation__id', 'customer_phone')

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'product_type', 'created_at')
    list_filter = ('product_type', 'created_at')
    search_fields = ('first_name', 'last_name', 'email', 'message')
