from django.db import models

class Room(models.Model):
    title = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    description = models.TextField(blank=True)
    image_url = models.URLField(blank=True)
    capacity = models.PositiveIntegerField(default=2)
    bed_type = models.CharField(max_length=50, default='Queen')
    
    def __str__(self):
        return self.title
    
    @property
    def tags(self):
        return ['Wi-Fi', 'Air Conditioning', 'TV']