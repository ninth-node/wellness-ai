"""
API router package.
"""
from fastapi import APIRouter

from app.api.routes import auth, clients, appointments, treatments, products

# Create main API router
api_router = APIRouter()

# Include sub-routers
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(clients.router, prefix="/clients", tags=["Clients"])
api_router.include_router(appointments.router, prefix="/appointments", tags=["Appointments"])
api_router.include_router(treatments.router, prefix="/treatments", tags=["Treatments"])
api_router.include_router(products.router, prefix="/products", tags=["Products"])

__all__ = ["api_router"]
