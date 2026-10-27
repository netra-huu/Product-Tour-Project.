
# from rest_framework import viewsets
# from .models import ProductionOrder, SmartFeature, ProductionPlan, QualityApproval
# from .serializers import (
#     ProductionOrderSerializer,
#     SmartFeatureSerializer,
#     ProductionPlanSerializer,
#     QualityApprovalSerializer,
# )


# class ProductionOrderViewSet(viewsets.ModelViewSet):
#     serializer_class = ProductionOrderSerializer
#     queryset = ProductionOrder.objects.all().order_by("id")

#     def get_queryset(self):
#         queryset = super().get_queryset()
#         search = self.request.query_params.get("search")
#         status = self.request.query_params.get("status")

#         if search:
#             queryset = queryset.filter(fg_name__icontains=search)

#         if status and status != "ALL":
#             queryset = queryset.filter(status=status)

#         return queryset


# class SmartFeatureViewSet(viewsets.ReadOnlyModelViewSet):
#     serializer_class = SmartFeatureSerializer
#     queryset = SmartFeature.objects.all().order_by("id")


# class ProductionPlanViewSet(viewsets.ModelViewSet):
#     serializer_class = ProductionPlanSerializer
#     queryset = ProductionPlan.objects.all().order_by("-created_at")

# class QualityApprovalViewSet(viewsets.ModelViewSet):
#     serializer_class = QualityApprovalSerializer
#     queryset = QualityApproval.objects.all().order_by("-created_at")




from rest_framework import viewsets

from .models import (
    ProductionOrder,
    SmartFeature,
    ProductionPlan,
    QualityApproval,
    BOMItem,
)

from .serializers import (
    ProductionOrderSerializer,
    SmartFeatureSerializer,
    ProductionPlanSerializer,
    QualityApprovalSerializer,
    BOMItemSerializer,
)


class ProductionOrderViewSet(viewsets.ModelViewSet):
    serializer_class = ProductionOrderSerializer
    queryset = ProductionOrder.objects.all().order_by("id")

    def get_queryset(self):
        queryset = super().get_queryset()

        search = self.request.query_params.get("search")
        status = self.request.query_params.get("status")

        if search:
            queryset = queryset.filter(fg_name__icontains=search)

        if status and status != "ALL":
            queryset = queryset.filter(status=status)

        return queryset


class SmartFeatureViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = SmartFeatureSerializer
    queryset = SmartFeature.objects.all().order_by("id")


class ProductionPlanViewSet(viewsets.ModelViewSet):
    serializer_class = ProductionPlanSerializer
    queryset = ProductionPlan.objects.all().order_by("-created_at")


class QualityApprovalViewSet(viewsets.ModelViewSet):
    serializer_class = QualityApprovalSerializer
    queryset = QualityApproval.objects.all().order_by("-created_at")


class BOMItemViewSet(viewsets.ModelViewSet):
    serializer_class = BOMItemSerializer
    queryset = BOMItem.objects.select_related(
        "order",
        "parent_item"
    ).all().order_by("id")

    def get_queryset(self):
        queryset = super().get_queryset()

        order_id = self.request.query_params.get("order")

        if order_id:
            queryset = queryset.filter(order_id=order_id)

        return queryset



