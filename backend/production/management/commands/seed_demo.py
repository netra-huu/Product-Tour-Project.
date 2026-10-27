from django.core.management.base import BaseCommand
from production.models import ProductionOrder, SmartFeature

class Command(BaseCommand):
    help = "Create sample production orders and smart features"

    def handle(self, *args, **options):
        if not ProductionOrder.objects.exists():
            rows = [
                ("Hoses", 1000, 1000, "COMPLETED", "PID0001", "Production Process", "Butterfly Valve", "4024.39", 10),
                ("Fasteners", 10, 10, "IN-TESTING", "PID0002", "Production Process", "Fastener Set", "1250.00", 10),
                ("Ball Bearings", 1200, 200, "WIP", "PID0003", "Production Process", "Bearing Unit", "8350.50", 100),
                ("Lubricant", 100, 0, "PENDING", "PID0004", "Production Process", "Industrial Lubricant", "0.00", 1),
                ("Gears", 5, 0, "PLANNED", "PID0005", "Production Process", "Gear Assembly", "0.00", 1),
            ]
            for row in rows:
                ProductionOrder.objects.create(
                    fg_name=row[0], target_qty=row[1], completed_qty=row[2], status=row[3],
                    process_code=row[4], process_name=row[5], product_name=row[6],
                    total_cost=row[7], cost_quantity=row[8]
                )
        feature_rows = [
            ("Smart Planning", "Plan production schedules and track progress.", "🗓️"),
            ("Multi-level BOM", "Organise components across multiple bill-of-material levels.", "🧩"),
            ("Role-wise access", "Give each role access to the tools it needs.", "👥"),
            ("Quality Approval", "Review quality checks before a product is approved.", "✅"),
        ]
        for title, description, icon in feature_rows:
            SmartFeature.objects.get_or_create(title=title, defaults={"description": description, "icon": icon})
        self.stdout.write(self.style.SUCCESS("Demo data is ready."))
