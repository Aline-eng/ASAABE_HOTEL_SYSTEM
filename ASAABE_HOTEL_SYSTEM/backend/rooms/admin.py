from django.contrib import admin
from .models import Room

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ['title', 'price', 'capacity', 'bed_type']
    list_filter = ['capacity', 'bed_type']
    search_fields = ['title', 'description']