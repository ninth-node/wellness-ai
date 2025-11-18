"""
Beauty product model for e-commerce.
"""
from sqlalchemy import Column, Decimal, JSON, String, Boolean, ARRAY

from .base import Base


class Product(Base):
    """Beauty product model."""

    __tablename__ = "products"

    # Basic Information
    sku = Column(String(100), unique=True, nullable=False, index=True)
    name = Column(String(255), nullable=False, index=True)
    brand = Column(String(100), nullable=True)
    category = Column(String(100), nullable=True)  # skincare, makeup, hair_care
    subcategory = Column(String(100), nullable=True)  # cleanser, moisturizer, etc.
    description = Column(String, nullable=True)

    # Product Details
    ingredients = Column(JSON, nullable=True)
    skin_type_suitability = Column(ARRAY(String), nullable=True)
    age_group_suitability = Column(ARRAY(String), nullable=True)

    # Pricing
    price = Column(Decimal(8, 2), nullable=False)
    cost = Column(Decimal(8, 2), nullable=True)

    # Product Flags
    professional_only = Column(Boolean, default=False)
    requires_consultation = Column(Boolean, default=False)
    seasonal_product = Column(Boolean, default=False)
    expiration_tracking = Column(Boolean, default=True)

    # AI Metrics
    ai_recommendation_score = Column(Decimal(3, 2), nullable=True)

    # Usage
    usage_instructions = Column(String, nullable=True)
    contraindications = Column(JSON, nullable=True)

    # Media
    product_images = Column(JSON, nullable=True)

    # Status
    is_active = Column(Boolean, default=True, nullable=False)

    def __repr__(self):
        return f"<Product(id={self.id}, sku='{self.sku}', name='{self.name}')>"
