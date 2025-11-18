"""
Appointment model for scheduling.
"""
from sqlalchemy import Column, DateTime, Decimal, Enum, ForeignKey, Integer, JSON, String
from sqlalchemy.orm import relationship
import enum

from .base import Base


class AppointmentStatus(str, enum.Enum):
    """Appointment status enumeration."""
    SCHEDULED = "scheduled"
    CONFIRMED = "confirmed"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    NO_SHOW = "no_show"


class Appointment(Base):
    """Appointment scheduling model."""

    __tablename__ = "appointments"

    # Relationships
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=False, index=True)
    treatment_id = Column(Integer, ForeignKey("treatments.id"), nullable=False)
    staff_id = Column(Integer, ForeignKey("staff.id"), nullable=True, index=True)

    # Scheduling
    appointment_datetime = Column(DateTime, nullable=False, index=True)
    estimated_duration = Column(Integer, nullable=True)  # AI-predicted
    actual_duration = Column(Integer, nullable=True)  # Actual time taken

    # Status
    status = Column(
        Enum(AppointmentStatus),
        default=AppointmentStatus.SCHEDULED,
        nullable=False,
        index=True
    )

    # AI Predictions
    no_show_probability = Column(Decimal(3, 2), nullable=True)  # 0.00 to 1.00

    # Booking Information
    booking_source = Column(String(50), nullable=True)  # online, phone, walk_in
    special_requests = Column(String, nullable=True)

    # AI Recommendations
    ai_recommendations = Column(JSON, nullable=True)  # Upsell suggestions

    # Notes
    pre_treatment_notes = Column(String, nullable=True)
    post_treatment_notes = Column(String, nullable=True)

    # Feedback
    client_satisfaction_rating = Column(Integer, nullable=True)  # 1-5 scale

    # SQLAlchemy relationships
    client = relationship("Client", back_populates="appointments")
    treatment = relationship("Treatment", back_populates="appointments")
    staff = relationship("Staff", back_populates="appointments")

    def __repr__(self):
        return f"<Appointment(id={self.id}, client_id={self.client_id}, status='{self.status}')>"
