"""
Inventory management model.
"""
from sqlalchemy import Column, Date, Decimal, ForeignKey, Integer, JSON, String

from .base import Base


class Inventory(Base):
    """Inventory tracking model."""

    __tablename__ = "inventory"

    # Product Reference
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False, index=True)

    # Location
    location = Column(String(100), nullable=True)  # main_floor, storage, retail

    # Quantity
    current_quantity = Column(Integer, default=0, nullable=False)
    minimum_stock_level = Column(Integer, default=5, nullable=False)
    maximum_stock_level = Column(Integer, default=100, nullable=False)
    reorder_point = Column(Integer, default=10, nullable=False)

    # Supplier Information
    supplier_id = Column(Integer, nullable=True)  # TODO: Create Supplier model
    unit_cost = Column(Decimal(8, 2), nullable=True)

    # Tracking
    last_restock_date = Column(Date, nullable=True)
    expiration_date = Column(Date, nullable=True)
    batch_number = Column(String(50), nullable=True)

    # AI Predictions
    ai_demand_prediction = Column(JSON, nullable=True)
    seasonal_adjustment_factor = Column(Decimal(3, 2), default=1.0)

    # Relationship
    product = relationship("Product")

    def __repr__(self):
        return f"<Inventory(id={self.id}, product_id={self.product_id}, qty={self.current_quantity})>"
