from rest_framework import serializers
from .models import Tag, Collection, Link


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ['id', 'name']


class LinkSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        write_only=True,
        queryset=Tag.objects.all(),
        source='tags',
        required=False
    )
    collection = CollectionSerializer(read_only=True)
    collection_id = serializers.PrimaryKeyRelatedField(
        write_only=True,
        queryset=Collection.objects.all(),
        source='collection',
        required=False,
        allow_null=True
    )

    class Meta:
        model = Link
        fields = [
            'id',
            'url',
            'title',
            'note',
            'is_read',
            'tags',
            'tag_ids',
            'collection',
            'collection_id',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']