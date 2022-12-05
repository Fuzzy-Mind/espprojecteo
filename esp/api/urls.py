from django.views.decorators.cache import cache_page
from django.urls import path, include
from .views import (ExampleListAPIView,
                    ExampleUpdateAPIView,
                    DestroyAPIView,
                    )

app_name = "esp"
urlpatterns = [
    path('list', cache_page(0.5*1)(ExampleListAPIView.as_view()), name='list'),
    path('update/<slug>', ExampleUpdateAPIView.as_view(), name='update'), 
]