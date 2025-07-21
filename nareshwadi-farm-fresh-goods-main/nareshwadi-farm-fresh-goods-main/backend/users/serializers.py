from rest_framework import serializers
from .models import User, SellerProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_seller', 'address', 'phone']

class SellerProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = SellerProfile
        fields = ['id', 'user', 'farm_name', 'description', 'region', 'certification']
