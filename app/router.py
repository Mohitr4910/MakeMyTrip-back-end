from rest_framework.routers import DefaultRouter
from .views import BookingViewSet, UserViewSet, FlightViewSet , CompanyViewSet

router = DefaultRouter()

router.register('users', UserViewSet)
router.register('company', CompanyViewSet)
router.register('flights', FlightViewSet)
router.register('bookings', BookingViewSet, basename='bookings')

urlpatterns = router.urls

