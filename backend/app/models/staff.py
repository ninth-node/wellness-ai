"""
Staff model for salon/spa employees.
"""
from sqlalchemy import Column, Date, Decimal, ForeignKey, Integer, JSON, String, Boolean
from sqlalchemy.orm import relationship

from .base import Base


class Staff(Base):
    """Staff model for employees."""

    __tablename__ = "staff"

    # Basic Information
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, unique=True)
    employee_id = Column(String(50), unique=True, nullable=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    phone = Column(String(20), nullable=True)

    # Employment Details
    role = Column(String(50), nullable=False)  # esthetician, massage_therapist, etc.
    hire_date = Column(Date, nullable=True)
    hourly_rate = Column(Decimal(6, 2), nullable=True)
    commission_rate = Column(Decimal(4, 2), nullable=True)  # Percentage

    # Professional Information
    certifications = Column(JSON, nullable=True)  # Array of certifications
    skills = Column(JSON, nullable=True)  # Array of skills/specializations
    languages = Column(JSON, nullable=True)  # Array of languages spoken
    specialization_areas = Column(JSON, nullable=True)  # Array of specializations

    # Availability
    availability_pattern = Column(JSON, nullable=True)  # Weekly schedule

    # Performance Metrics
    performance_metrics = Column(JSON, nullable=True)
    client_ratings_avg = Column(Decimal(3, 2), nullable=True)

    # Status
    is_active = Column(Boolean, default=True, nullable=False)

    # Relationships
    user = relationship("User", foreign_keys=[user_id])
    appointments = relationship("Appointment", back_populates="staff")

    def __repr__(self):
        return f"<Staff(id={self.id}, name='{self.first_name} {self.last_name}', role='{self.role}')>"
