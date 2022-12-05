from rest_framework import serializers
from esp.models import Example

class ExampleSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Example
        fields = '__all__'
   


class ExampleUpdateCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Example
        fields = [
            'temperature',
            'focus',
            'start',
            'exam',
            'level',
            'battery',
            'isConnected'
        ]