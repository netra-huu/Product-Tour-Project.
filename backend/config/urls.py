from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse


def home(request):
    return JsonResponse({
        "message": "Product Tour Backend is Running Successfully!",
        "project": "Product Tour",
        "backend": "Django",
        "frontend": "React.js",
        "api": "/api/"
    })


urlpatterns = [
    path("", home, name="home"),
    path("admin/", admin.site.urls),
    path("api/", include("production.urls")),
]
