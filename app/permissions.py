from rest_framework.permissions import BasePermission, SAFE_METHODS
import base64

class FlightPermission(BasePermission):

    def has_permission(self, request, view):

        # login compulsory
        if not request.user.is_authenticated:
            return False

        # GET request → sab login user dekh sakte
        if request.method in SAFE_METHODS:
            return True

        # POST, PUT, DELETE → sirf company
        return request.user.role =='company' or request.user.is_superuser



