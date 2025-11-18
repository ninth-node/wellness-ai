"""Pydantic schemas for Appointment operations."""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel

from app.models.appointment import AppointmentStatus


class AppointmentBase(BaseModel):
    """Base appointment schema."""
    client_id: int
    treatment_id: int
    staff_id: Optional[int] = None
    appointment_datetime: datetime
    special_requests: Optional[str] = None


class AppointmentCreate(AppointmentBase):
    """Schema for creating an appointment."""
    pass


class AppointmentUpdate(BaseModel):
    """Schema for updating an appointment."""
    appointment_datetime: Optional[datetime] = None
    status: Optional[AppointmentStatus] = None
    staff_id: Optional[int] = None


class AppointmentResponse(AppointmentBase):
    """Schema for appointment response."""
    id: int
    status: AppointmentStatus
    estimated_duration: Optional[int] = None

    class Config:
        from_attributes = True
