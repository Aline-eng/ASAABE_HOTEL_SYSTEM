from django.db import models
class Room(models.Model):
    title = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    description = models.TextField()
    image = models.URLField()
    tags = models.JSONField(default=list)
    
    def __str__(self):
        return self.title