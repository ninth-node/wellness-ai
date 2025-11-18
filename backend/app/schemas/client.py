"""Pydantic schemas for Client operations."""
from datetime import date
from typing import Optional
from pydantic import BaseModel, EmailStr

from app.models.client import SkinType


class ClientBase(BaseModel):
    """Base client schema."""
    first_name: str
    last_name: str
    email: EmailStr
    phone: Optional[str] = None
    date_of_birth: Optional[date] = None
    skin_type: Optional[SkinType] = None


class ClientCreate(ClientBase):
    """Schema for creating a client."""
    pass


class ClientUpdate(BaseModel):
    """Schema for updating a client."""
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    skin_type: Optional[SkinType] = None


class ClientResponse(ClientBase):
    """Schema for client response."""
    id: int

    class Config:
        from_attributes = True
