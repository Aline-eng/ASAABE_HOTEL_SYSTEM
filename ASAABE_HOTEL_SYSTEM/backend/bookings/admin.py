from django.contrib import admin
from .models import Booking, BookingGuest

class BookingGuestInline(admin.TabularInline):
    model = BookingGuest
    extra = 1

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['booking_reference', 'user', 'room', 'check_in', 'check_out', 'status', 'total_price']
    list_filter = ['status', 'check_in', 'check_out', 'created_at']
    search_fields = ['booking_reference', 'user__email', 'user__first_name', 'user__last_name', 'room__title']
    ordering = ['-created_at']
    inlines = [BookingGuestInline]
    readonly_fields = ['booking_reference', 'created_at', 'updated_at']