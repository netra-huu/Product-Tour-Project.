<<<<<<< HEAD
# Product Tour – Production Management Demo

A beginner-friendly full-stack demo based on pages 6–8 of `Product Tour v3.pdf`.

## What is included from your assigned pages?
- **Page 6 – Production Status:** search/filter production orders and view target quantity, completed quantity and status.
- **Page 7 – Finished Good Costing:** open an order and view its total production cost and quantity.
- **Page 8 – Smart Features:** Smart Planning, Multi-level BOM, Role-wise Access and Quality Approval feature cards.

This is a working college-project prototype, not a connection to the real TranZact product.

## Technology
- Backend: Django + Django REST Framework + SQLite
- Frontend: React + Vite + plain CSS
- API: `http://127.0.0.1:8000/api/`

## Requirements
Install Python 3.10+ and Node.js 18+.

## Run the backend (Terminal 1)
Open the project folder, then:
```bash
cd backend
python -m venv venv
```
Windows:
```bash
venv\Scripts\activate
```
macOS/Linux:
```bash
source venv/bin/activate
```
Then:
```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_demo
python manage.py runserver
```
Backend runs at `http://127.0.0.1:8000/`.

## Run the frontend (Terminal 2)
Open another terminal:
```bash
cd frontend
npm install
npm run dev
```
Open the local URL printed by Vite, normally `http://localhost:5173`.

Keep both terminals running.

## API endpoints
- `GET /api/orders/` – list production orders
- `POST /api/orders/` – create an order
- `GET /api/orders/<id>/` – view one order
- `PATCH /api/orders/<id>/` – update an order
- `DELETE /api/orders/<id>/` – delete an order
- `GET /api/features/` – list smart features

## Notes for the 7-member group
This ZIP gives you a working foundation for the assigned pages. Before submitting, agree with your sir/group on each member's module and combine everyone’s work. Add real authentication/permissions, tests and validation if your instructor requires them. Do not describe the prototype as the official TranZact system.
=======
# Product-Tour-Project.
Product-tour
>>>>>>> 57bb43ffe5a5fba0475f53b38b1fdf0d68e5921d
