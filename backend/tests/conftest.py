"""
Pytest configuration and fixtures.
"""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.core.database import get_db, Base
from app.core.security import create_access_token

# Use in-memory SQLite for testing
SQLALCHEMY_TEST_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="function")
def db_session():
    """Create a fresh database for each test."""
    Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def client(db_session):
    """Create a test client with database dependency override."""
    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


@pytest.fixture
def auth_token():
    """Create a test authentication token."""
    token = create_access_token(data={"sub": "test@example.com"})
    return token


@pytest.fixture
def auth_headers(auth_token):
    """Create authentication headers with token."""
    return {"Authorization": f"Bearer {auth_token}"}


@pytest.fixture
def sample_client_data():
    """Sample client data for testing."""
    return {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "phone": "+1234567890",
        "skin_type": "normal",
    }


@pytest.fixture
def sample_treatment_data():
    """Sample treatment data for testing."""
    return {
        "name": "Facial Treatment",
        "category": "facial",
        "description": "Relaxing facial treatment",
        "duration_minutes": 60,
        "base_price": "150.00",
    }


@pytest.fixture
def sample_product_data():
    """Sample product data for testing."""
    return {
        "sku": "TEST-SKU-001",
        "name": "Hydrating Serum",
        "brand": "Beauty Co",
        "category": "skincare",
        "description": "Premium hydrating serum",
        "price": "75.00",
    }
