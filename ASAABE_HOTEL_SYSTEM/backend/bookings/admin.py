from django.contrib import admin
from .models import Booking, BookingGuest

class BookingGuestInline(admin.TabularInline):
    model = BookingGuest
    extra = 0

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('booking_reference', 'user', 'room', 'check_in', 'check_out', 'status', 'total_price', 'created_at')
    list_filter = ('status', 'created_at', 'check_in', 'check_out')
    search_fields = ('booking_reference', 'user__email', 'user__first_name', 'user__last_name', 'room__title')
    readonly_fields = ('booking_reference', 'created_at', 'updated_at', 'nights')
    inlines = [BookingGuestInline]
    
    fieldsets = (
        ('Booking Information', {
            'fields': ('booking_reference', 'user', 'room', 'status')
        }),
        ('Dates & Guests', {
            'fields': ('check_in', 'check_out', 'guests', 'nights')
        }),
        ('Payment', {
            'fields': ('total_price',)
        }),
        ('Additional Information', {
            'fields': ('special_requests',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )

@admin.register(BookingGuest)
class BookingGuestAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'booking')
    search_fields = ('first_name', 'last_name', 'email', 'booking__booking_reference')