"""
Treatment/Service API endpoints - Complete implementation.
"""
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.treatment import Treatment
from app.schemas.treatment import TreatmentCreate, TreatmentResponse, TreatmentUpdate

router = APIRouter()


@router.post("/", response_model=TreatmentResponse, status_code=status.HTTP_201_CREATED)
async def create_treatment(treatment_data: TreatmentCreate, db: Session = Depends(get_db)):
    """Create a new treatment/service."""
    treatment = Treatment(**treatment_data.model_dump())
    db.add(treatment)
    db.commit()
    db.refresh(treatment)
    return treatment


@router.get("/", response_model=List[TreatmentResponse])
async def list_treatments(
    skip: int = 0,
    limit: int = 100,
    category: str = None,
    is_active: bool = None,
    db: Session = Depends(get_db)
):
    """List all treatments with optional filtering."""
    query = db.query(Treatment)

    if category:
        query = query.filter(Treatment.category == category)
    if is_active is not None:
        query = query.filter(Treatment.is_active == is_active)

    treatments = query.offset(skip).limit(limit).all()
    return treatments


@router.get("/{treatment_id}", response_model=TreatmentResponse)
async def get_treatment(treatment_id: int, db: Session = Depends(get_db)):
    """Get a specific treatment by ID."""
    treatment = db.query(Treatment).filter(Treatment.id == treatment_id).first()
    if not treatment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Treatment not found"
        )
    return treatment


@router.put("/{treatment_id}", response_model=TreatmentResponse)
async def update_treatment(
    treatment_id: int,
    treatment_data: TreatmentUpdate,
    db: Session = Depends(get_db)
):
    """Update a treatment."""
    treatment = db.query(Treatment).filter(Treatment.id == treatment_id).first()
    if not treatment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Treatment not found"
        )

    for field, value in treatment_data.model_dump(exclude_unset=True).items():
        setattr(treatment, field, value)

    db.commit()
    db.refresh(treatment)
    return treatment


@router.delete("/{treatment_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_treatment(treatment_id: int, db: Session = Depends(get_db)):
    """Delete a treatment (soft delete by setting is_active=False)."""
    treatment = db.query(Treatment).filter(Treatment.id == treatment_id).first()
    if not treatment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Treatment not found"
        )

    # Soft delete
    treatment.is_active = False
    db.commit()
    return None
