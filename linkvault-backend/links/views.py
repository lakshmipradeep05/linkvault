from rest_framework import viewsets, permissions
from .models import Tag, Collection, Link
from .serializers import TagSerializer, CollectionSerializer, LinkSerializer


class TagViewSet(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Tag.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CollectionViewSet(viewsets.ModelViewSet):
    serializer_class = CollectionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Collection.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class LinkViewSet(viewsets.ModelViewSet):
    serializer_class = LinkSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Link.objects.filter(user=self.request.user)

        # Filter by tag
        tag_id = self.request.query_params.get('tag')
        if tag_id:
            queryset = queryset.filter(tags__id=tag_id)

        # Filter by collection
        collection_id = self.request.query_params.get('collection')
        if collection_id:
            queryset = queryset.filter(collection__id=collection_id)

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)