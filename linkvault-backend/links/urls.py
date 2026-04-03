from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TagViewSet, CollectionViewSet, LinkViewSet

router = DefaultRouter()
router.register('tags', TagViewSet, basename='tag')
router.register('collections', CollectionViewSet, basename='collection')
router.register('links', LinkViewSet, basename='link')

urlpatterns = [
    path('', include(router.urls)),
]