# Generated by Django 3.2 on 2021-04-25 13:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Example',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('temperature', models.CharField(blank=True, max_length=100)),
                ('focus', models.CharField(blank=True, max_length=1)),
                ('start', models.CharField(blank=True, max_length=1)),
                ('exam', models.CharField(blank=True, max_length=1)),
                ('level', models.CharField(blank=True, max_length=1)),
                ('slug', models.SlugField(blank=True, editable=False, max_length=150, unique=True)),
            ],
        ),
    ]
