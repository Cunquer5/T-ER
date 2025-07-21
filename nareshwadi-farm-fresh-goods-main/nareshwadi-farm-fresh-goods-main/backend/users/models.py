from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid

class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    is_seller = models.BooleanField(default=False)
    address = models.TextField(blank=True)
    phone = models.CharField(max_length=20, blank=True)

class SellerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='seller_profile')
    farm_name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    region = models.CharField(max_length=255)
    certification = models.CharField(max_length=255, blank=True)