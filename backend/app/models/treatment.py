"""
Treatment/Service model for wellness services.
"""
from sqlalchemy import Column, Decimal, Integer, JSON, String, Boolean

from .base import Base


class Treatment(Base):
    """Treatment/Service model."""

    __tablename__ = "treatments"

    # Basic Information
    name = Column(String(255), nullable=False, index=True)
    category = Column(String(100), nullable=True)  # facial, massage, hair, nails, body
    description = Column(String, nullable=True)

    # Timing
    duration_minutes = Column(Integer, nullable=False)

    # Pricing
    base_price = Column(Decimal(8, 2), nullable=False)

    # Requirements
    skill_requirements = Column(JSON, nullable=True)  # Required skills/certifications
    equipment_needed = Column(JSON, nullable=True)  # Required equipment

    # Safety
    contraindications = Column(JSON, nullable=True)  # When not to perform

    # Protocol
    treatment_protocol = Column(JSON, nullable=True)  # Step-by-step protocol

    # Availability
    seasonal_availability = Column(JSON, nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)

    # Relationships
    appointments = relationship("Appointment", back_populates="treatment")

    def __repr__(self):
        return f"<Treatment(id={self.id}, name='{self.name}', category='{self.category}')>"
