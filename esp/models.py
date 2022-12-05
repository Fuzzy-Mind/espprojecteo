from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.utils import timezone


class Example(models.Model):
    temperature = models.CharField(max_length=100, blank=True)
    focus = models.CharField(max_length=1, blank=True)
    start = models.CharField(max_length=1, blank=True)
    exam = models.CharField(max_length=1, blank=True)
    level = models.CharField(max_length=1, blank=True)
    battery = models.CharField(max_length=100, blank=True)
    isConnected = models.CharField(max_length=1, blank=True)
    slug = models.SlugField(unique=True, max_length=150, editable=False, blank=True)


    def get_slug(self):
        slug = 1
        unique = slug

        return unique

    def __str__(self):
        return self.temperature

    def save(self, *args, **kwargs):
        if not self.id:
            self.created = timezone.now()

        self.slug = self.get_slug()
        return super(Example, self).save(*args,**kwargs)