from django.contrib import admin
from .models import ProductionOrder, SmartFeature

@admin.register(ProductionOrder)
class ProductionOrderAdmin(admin.ModelAdmin):
    list_display = ("id", "fg_name", "target_qty", "completed_qty", "status", "total_cost")
    list_filter = ("status",)
    search_fields = ("fg_name", "product_name", "process_code")

admin.site.register(SmartFeature)
