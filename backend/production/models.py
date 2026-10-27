# from django.db import models

# class ProductionOrder(models.Model):
#     STATUS_CHOICES = [
#         ("COMPLETED", "Completed"),
#         ("IN-TESTING", "In-testing"),
#         ("WIP", "Work in progress"),
#         ("PENDING", "Pending"),
#         ("PLANNED", "Planned"),
#     ]
#     fg_name = models.CharField(max_length=120)
#     target_qty = models.PositiveIntegerField(default=0)
#     completed_qty = models.PositiveIntegerField(default=0)
#     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="PLANNED")
#     process_code = models.CharField(max_length=30, default="PID0001")
#     process_name = models.CharField(max_length=150, default="Production Process")
#     product_name = models.CharField(max_length=150, default="Product")
#     total_cost = models.DecimalField(max_digits=12, decimal_places=2, default=0)
#     cost_quantity = models.PositiveIntegerField(default=1)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.fg_name} ({self.status})"

# class SmartFeature(models.Model):
#     title = models.CharField(max_length=100, unique=True)
#     description = models.TextField()
#     icon = models.CharField(max_length=10, default="✨")

#     def __str__(self):
#         return self.title


from django.db import models


class ProductionOrder(models.Model):

    STATUS_CHOICES = [
        ("COMPLETED", "Completed"),
        ("IN-TESTING", "In-testing"),
        ("WIP", "Work in progress"),
        ("PENDING", "Pending"),
        ("PLANNED", "Planned"),
    ]

    # Production details
    fg_name = models.CharField(max_length=120)

    target_qty = models.PositiveIntegerField(default=0)

    completed_qty = models.PositiveIntegerField(default=0)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PLANNED"
    )

    # Process details
    process_code = models.CharField(
        max_length=30,
        default="PID0001"
    )

    process_name = models.CharField(
        max_length=150,
        default="Production Process"
    )

    product_name = models.CharField(
        max_length=150,
        default="Product"
    )

    # Finished Good Costing Module

    material_cost = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    labour_cost = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    machine_cost = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    other_cost = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    # Total cost and production quantity used for costing
    total_cost = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    cost_quantity = models.PositiveIntegerField(default=1)

    # Creation date
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.fg_name} ({self.status})"


class SmartFeature(models.Model):

    title = models.CharField(max_length=100, unique=True)

    description = models.TextField()

    icon = models.CharField(max_length=10, default="✨")

    def __str__(self):
        return self.title

class ProductionPlan(models.Model):
    order = models.ForeignKey(
        ProductionOrder,
        on_delete=models.CASCADE,
        related_name="production_plans"
    )
    planned_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.order.fg_name} - {self.planned_date}"
class QualityApproval(models.Model):
    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("APPROVED", "Approved"),
        ("REJECTED", "Rejected"),
    ]

    order = models.ForeignKey(
        ProductionOrder,
        on_delete=models.CASCADE,
        related_name="quality_approvals"
    )

    inspection_notes = models.TextField(blank=True)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PENDING"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.order.fg_name} - {self.status}"

class BOMItem(models.Model):
    # The production order for which this BOM is created
    order = models.ForeignKey(
        ProductionOrder,
        on_delete=models.CASCADE,
        related_name="bom_items"
    )

    # Component name, such as Valve Body or Metal
    component_name = models.CharField(max_length=150)

    # Quantity of this component required
    quantity = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=1
    )

    # Unit of measurement, such as kg, pcs, or litres
    unit = models.CharField(max_length=30, default="pcs")

    # Parent component allows multiple BOM levels
    parent_item = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="subcomponents"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.component_name} - {self.order.fg_name}"



