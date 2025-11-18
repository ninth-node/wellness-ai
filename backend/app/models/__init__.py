"""
Database models package.
"""
from .base import Base
from .user import User
from .client import Client
from .staff import Staff
from .treatment import Treatment
from .appointment import Appointment
from .product import Product
from .inventory import Inventory

__all__ = [
    "Base",
    "User",
    "Client",
    "Staff",
    "Treatment",
    "Appointment",
    "Product",
    "Inventory",
]
