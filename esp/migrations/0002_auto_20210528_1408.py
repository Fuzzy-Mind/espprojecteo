# Generated by Django 3.2 on 2021-05-28 11:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('esp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='example',
            name='battery',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='example',
            name='isConnected',
            field=models.CharField(blank=True, max_length=1),
        ),
    ]
