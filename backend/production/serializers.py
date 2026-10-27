# from rest_framework import serializers
# from .models import (
#     ProductionOrder,
#     SmartFeature,
#     ProductionPlan,
#     QualityApproval,
# )

# class ProductionOrderSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ProductionOrder
#         fields = "__all__"

# class SmartFeatureSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SmartFeature
#         fields = "__all__"


# class ProductionPlanSerializer(serializers.ModelSerializer):
#     order_name = serializers.CharField(
#         source="order.fg_name",
#         read_only=True
#     )

#     class Meta:
#         model = ProductionPlan
#         fields = "__all__"

# class QualityApprovalSerializer(serializers.ModelSerializer):
#     order_name = serializers.CharField(
#         source="order.fg_name",
#         read_only=True
#     )

#     class Meta:
#         model = QualityApproval
#         fields = "__all__"




from rest_framework import serializers

from .models import (
    ProductionOrder,
    SmartFeature,
    ProductionPlan,
    QualityApproval,
    BOMItem,
)


class ProductionOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductionOrder
        fields = "__all__"


class SmartFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = SmartFeature
        fields = "__all__"


class ProductionPlanSerializer(serializers.ModelSerializer):
    order_name = serializers.CharField(
        source="order.fg_name",
        read_only=True
    )

    class Meta:
        model = ProductionPlan
        fields = "__all__"


class QualityApprovalSerializer(serializers.ModelSerializer):
    order_name = serializers.CharField(
        source="order.fg_name",
        read_only=True
    )

    class Meta:
        model = QualityApproval
        fields = "__all__"


class BOMItemSerializer(serializers.ModelSerializer):
    order_name = serializers.CharField(
        source="order.fg_name",
        read_only=True
    )

    component_level = serializers.SerializerMethodField()

    class Meta:
        model = BOMItem
        fields = "__all__"

    def get_component_level(self, obj):
        level = 1
        parent = obj.parent_item

        while parent is not None:
            level += 1
            parent = parent.parent_item

        return level



