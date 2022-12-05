from rest_framework.generics import (ListAPIView,
                                     RetrieveAPIView,
                                     DestroyAPIView,
                                     RetrieveUpdateAPIView,
                                     CreateAPIView,)
from esp.models import Example

from .serializers import ExampleUpdateCreateSerializer, ExampleSerializer
#mixins
from rest_framework.mixins import DestroyModelMixin

class ExampleListAPIView(ListAPIView): #CreateModelMixin
    queryset = Example.objects.all()
    serializer_class = ExampleSerializer


class ExampleUpdateAPIView(RetrieveUpdateAPIView, DestroyModelMixin):
    queryset = Example.objects.all()
    serializer_class = ExampleUpdateCreateSerializer
    lookup_field = 'slug'

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def perform_update(self, serializer):
        serializer.save()

