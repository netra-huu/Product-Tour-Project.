
# from rest_framework.routers import DefaultRouter

# from .views import (
#     ProductionOrderViewSet,
#     SmartFeatureViewSet,
#     ProductionPlanViewSet,
#     QualityApprovalViewSet,
# )

# router = DefaultRouter()

# router.register("orders", ProductionOrderViewSet, basename="order")
# router.register("features", SmartFeatureViewSet, basename="feature")
# router.register("plans", ProductionPlanViewSet, basename="production-plan")
# router.register(
#     "quality-approvals",
#     QualityApprovalViewSet,
#     basename="quality-approval"
# )

# urlpatterns = router.urls



from rest_framework.routers import DefaultRouter

from .views import (
    ProductionOrderViewSet,
    SmartFeatureViewSet,
    ProductionPlanViewSet,
    QualityApprovalViewSet,
    BOMItemViewSet,
)

router = DefaultRouter()

router.register("orders", ProductionOrderViewSet, basename="order")
router.register("features", SmartFeatureViewSet, basename="feature")
router.register("plans", ProductionPlanViewSet, basename="production-plan")

router.register(
    "quality-approvals",
    QualityApprovalViewSet,
    basename="quality-approval"
)

router.register(
    "bom-items",
    BOMItemViewSet,
    basename="bom-item"
)

urlpatterns = router.urls



