"""
User model for authentication and authorization.
"""
from sqlalchemy import Boolean, Column, Enum, String
from sqlalchemy.orm import relationship
import enum

from .base import Base


class UserRole(str, enum.Enum):
    """User role enumeration."""
    ADMIN = "admin"
    MANAGER = "manager"
    STAFF = "staff"
    CLIENT = "client"


class User(Base):
    """User model for authentication."""

    __tablename__ = "users"

    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), default=UserRole.CLIENT, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    is_verified = Column(Boolean, default=False, nullable=False)
    phone = Column(String(20), nullable=True)

    # Relationships
    # client = relationship("Client", back_populates="user", uselist=False)
    # staff = relationship("Staff", back_populates="user", uselist=False)

    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}', role='{self.role}')>"
