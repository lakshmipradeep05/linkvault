from django.contrib import admin
from .models import Tag, Collection, Link

admin.site.register(Tag)
admin.site.register(Collection)
admin.site.register(Link)