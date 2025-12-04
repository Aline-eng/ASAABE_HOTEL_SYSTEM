from django.contrib import admin
from .models import Payment

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['id', 'booking', 'amount', 'method', 'status', 'payment_date']
    list_filter = ['method', 'status', 'payment_date']
    search_fields = ['booking__booking_reference', 'transaction_id', 'stripe_payment_intent_id']
    ordering = ['-payment_date']
    readonly_fields = ['payment_date']