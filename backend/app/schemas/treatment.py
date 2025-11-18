"""Pydantic schemas for Treatment operations."""
from typing import Optional
from pydantic import BaseModel
from decimal import Decimal


class TreatmentBase(BaseModel):
    """Base treatment schema."""
    name: str
    category: Optional[str] = None
    description: Optional[str] = None
    duration_minutes: int
    base_price: Decimal


class TreatmentCreate(TreatmentBase):
    """Schema for creating a treatment."""
    pass


class TreatmentUpdate(BaseModel):
    """Schema for updating a treatment."""
    name: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    duration_minutes: Optional[int] = None
    base_price: Optional[Decimal] = None
    is_active: Optional[bool] = None


class TreatmentResponse(TreatmentBase):
    """Schema for treatment response."""
    id: int
    is_active: bool

    class Config:
        from_attributes = True
