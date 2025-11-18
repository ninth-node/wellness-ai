"""
Tests for database models.
"""
import pytest
from decimal import Decimal
from app.models.client import Client, SkinType
from app.models.treatment import Treatment
from app.models.product import Product


def test_client_creation(db_session):
    """Test creating a client model."""
    client = Client(
        first_name="John",
        last_name="Doe",
        email="john@example.com",
        phone="+1234567890",
        skin_type=SkinType.NORMAL,
    )

    db_session.add(client)
    db_session.commit()
    db_session.refresh(client)

    assert client.id is not None
    assert client.first_name == "John"
    assert client.skin_type == SkinType.NORMAL
    assert client.is_active is True


def test_treatment_creation(db_session):
    """Test creating a treatment model."""
    treatment = Treatment(
        name="Facial Treatment",
        category="facial",
        description="Relaxing facial",
        duration_minutes=60,
        base_price=Decimal("150.00"),
    )

    db_session.add(treatment)
    db_session.commit()
    db_session.refresh(treatment)

    assert treatment.id is not None
    assert treatment.name == "Facial Treatment"
    assert treatment.duration_minutes == 60
    assert treatment.base_price == Decimal("150.00")
    assert treatment.is_active is True


def test_product_creation(db_session):
    """Test creating a product model."""
    product = Product(
        sku="TEST-SKU-001",
        name="Hydrating Serum",
        brand="Beauty Co",
        category="skincare",
        price=Decimal("75.00"),
    )

    db_session.add(product)
    db_session.commit()
    db_session.refresh(product)

    assert product.id is not None
    assert product.sku == "TEST-SKU-001"
    assert product.name == "Hydrating Serum"
    assert product.price == Decimal("75.00")
    assert product.is_active is True


def test_client_unique_email(db_session):
    """Test that client email must be unique."""
    client1 = Client(
        first_name="John",
        last_name="Doe",
        email="john@example.com",
    )

    client2 = Client(
        first_name="Jane",
        last_name="Doe",
        email="john@example.com",  # Same email
    )

    db_session.add(client1)
    db_session.commit()

    db_session.add(client2)

    with pytest.raises(Exception):  # IntegrityError
        db_session.commit()


def test_product_unique_sku(db_session):
    """Test that product SKU must be unique."""
    product1 = Product(
        sku="TEST-SKU-001",
        name="Product 1",
        price=Decimal("50.00"),
    )

    product2 = Product(
        sku="TEST-SKU-001",  # Same SKU
        name="Product 2",
        price=Decimal("60.00"),
    )

    db_session.add(product1)
    db_session.commit()

    db_session.add(product2)

    with pytest.raises(Exception):  # IntegrityError
        db_session.commit()
