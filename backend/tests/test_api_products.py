"""
Tests for product API endpoints.
"""
import pytest
from fastapi import status


def test_create_product(client, sample_product_data):
    """Test creating a new product."""
    response = client.post("/api/v1/products/", json=sample_product_data)

    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["sku"] == sample_product_data["sku"]
    assert data["name"] == sample_product_data["name"]
    assert "id" in data


def test_create_product_duplicate_sku(client, sample_product_data):
    """Test creating a product with duplicate SKU."""
    # Create first product
    client.post("/api/v1/products/", json=sample_product_data)

    # Try to create another product with same SKU
    response = client.post("/api/v1/products/", json=sample_product_data)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "SKU already exists" in response.json()["detail"]


def test_list_products(client, sample_product_data):
    """Test listing products."""
    # Create some products
    client.post("/api/v1/products/", json=sample_product_data)

    product_data_2 = sample_product_data.copy()
    product_data_2["sku"] = "TEST-SKU-002"
    product_data_2["name"] = "Moisturizing Cream"
    client.post("/api/v1/products/", json=product_data_2)

    # List products
    response = client.get("/api/v1/products/")

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert len(data) == 2


def test_list_products_filter_by_category(client, sample_product_data):
    """Test listing products filtered by category."""
    # Create products with different categories
    client.post("/api/v1/products/", json=sample_product_data)

    product_data_2 = sample_product_data.copy()
    product_data_2["sku"] = "TEST-SKU-002"
    product_data_2["category"] = "makeup"
    client.post("/api/v1/products/", json=product_data_2)

    # Filter by category
    response = client.get("/api/v1/products/?category=skincare")

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert len(data) == 1
    assert data[0]["category"] == "skincare"


def test_get_product(client, sample_product_data):
    """Test getting a specific product."""
    # Create a product
    create_response = client.post("/api/v1/products/", json=sample_product_data)
    product_id = create_response.json()["id"]

    # Get the product
    response = client.get(f"/api/v1/products/{product_id}")

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["id"] == product_id
    assert data["sku"] == sample_product_data["sku"]


def test_update_product(client, sample_product_data):
    """Test updating a product."""
    # Create a product
    create_response = client.post("/api/v1/products/", json=sample_product_data)
    product_id = create_response.json()["id"]

    # Update the product
    update_data = {"name": "Updated Serum", "price": "85.00"}
    response = client.put(f"/api/v1/products/{product_id}", json=update_data)

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["name"] == "Updated Serum"
    assert float(data["price"]) == 85.00


def test_delete_product(client, sample_product_data):
    """Test deleting a product (soft delete)."""
    # Create a product
    create_response = client.post("/api/v1/products/", json=sample_product_data)
    product_id = create_response.json()["id"]

    # Delete the product
    response = client.delete(f"/api/v1/products/{product_id}")

    assert response.status_code == status.HTTP_204_NO_CONTENT

    # Verify the product is soft deleted
    get_response = client.get(f"/api/v1/products/{product_id}")
    assert get_response.json()["is_active"] is False
