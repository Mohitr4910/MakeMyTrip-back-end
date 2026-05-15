from rest_framework.routers import DefaultRouter
from .views import UserViewSet, FlightViewSet , CompanyViewSet

router = DefaultRouter()

router.register('users', UserViewSet)
router.register('company', CompanyViewSet)
router.register('flights', FlightViewSet)

urlpatterns = router.urls

