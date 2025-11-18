"""Pydantic schemas for Product operations."""
from typing import Optional
from pydantic import BaseModel
from decimal import Decimal


class ProductBase(BaseModel):
    """Base product schema."""
    sku: str
    name: str
    brand: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    price: Decimal


class ProductCreate(ProductBase):
    """Schema for creating a product."""
    pass


class ProductUpdate(BaseModel):
    """Schema for updating a product."""
    name: Optional[str] = None
    brand: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    price: Optional[Decimal] = None
    is_active: Optional[bool] = None


class ProductResponse(ProductBase):
    """Schema for product response."""
    id: int
    is_active: bool

    class Config:
        from_attributes = True
