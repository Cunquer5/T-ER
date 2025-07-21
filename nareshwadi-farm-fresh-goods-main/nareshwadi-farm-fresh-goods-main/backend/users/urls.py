from rest_framework.routers import DefaultRouter
from .views import UserViewSet, SellerProfileViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'sellers', SellerProfileViewSet)

urlpatterns = router.urls
