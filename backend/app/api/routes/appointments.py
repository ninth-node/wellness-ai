"""
Appointment management API endpoints.
"""
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.appointment import Appointment
from app.schemas.appointment import AppointmentCreate, AppointmentResponse, AppointmentUpdate

router = APIRouter()


@router.post("/", response_model=AppointmentResponse, status_code=status.HTTP_201_CREATED)
async def create_appointment(appointment_data: AppointmentCreate, db: Session = Depends(get_db)):
    """Create a new appointment."""
    appointment = Appointment(**appointment_data.model_dump())
    db.add(appointment)
    db.commit()
    db.refresh(appointment)
    return appointment


@router.get("/", response_model=List[AppointmentResponse])
async def list_appointments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """List all appointments."""
    appointments = db.query(Appointment).offset(skip).limit(limit).all()
    return appointments


@router.get("/{appointment_id}", response_model=AppointmentResponse)
async def get_appointment(appointment_id: int, db: Session = Depends(get_db)):
    """Get a specific appointment."""
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found"
        )
    return appointment


@router.put("/{appointment_id}", response_model=AppointmentResponse)
async def update_appointment(
    appointment_id: int,
    appointment_data: AppointmentUpdate,
    db: Session = Depends(get_db)
):
    """Update an appointment."""
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found"
        )

    for field, value in appointment_data.model_dump(exclude_unset=True).items():
        setattr(appointment, field, value)

    db.commit()
    db.refresh(appointment)
    return appointment
