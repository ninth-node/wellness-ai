"""
Client model for wellness platform customers.
"""
from sqlalchemy import Column, Date, Enum, ForeignKey, Integer, JSON, String
from sqlalchemy.orm import relationship
import enum

from .base import Base


class SkinType(str, enum.Enum):
    """Skin type enumeration."""
    OILY = "oily"
    DRY = "dry"
    COMBINATION = "combination"
    SENSITIVE = "sensitive"
    NORMAL = "normal"


class Client(Base):
    """Client model with beauty profile information."""

    __tablename__ = "clients"

    # Basic Information
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, unique=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    phone = Column(String(20), nullable=True)
    date_of_birth = Column(Date, nullable=True)

    # Address
    address = Column(JSON, nullable=True)  # {street, city, state, zip, country}

    # Emergency Contact
    emergency_contact = Column(JSON, nullable=True)  # {name, phone, relationship}

    # Beauty Profile
    skin_type = Column(Enum(SkinType), nullable=True)
    skin_tone = Column(String(50), nullable=True)  # fair, light, medium, tan, deep
    skin_undertone = Column(String(50), nullable=True)  # cool, warm, neutral
    hair_type = Column(String(50), nullable=True)  # straight, wavy, curly, coily
    hair_color = Column(String(50), nullable=True)

    # Health Information
    allergies_sensitivities = Column(JSON, nullable=True)  # Array of allergies
    beauty_preferences = Column(JSON, nullable=True)
    communication_preferences = Column(JSON, nullable=True)

    # Relationships
    user = relationship("User", foreign_keys=[user_id])
    appointments = relationship("Appointment", back_populates="client")

    def __repr__(self):
        return f"<Client(id={self.id}, name='{self.first_name} {self.last_name}')>"
