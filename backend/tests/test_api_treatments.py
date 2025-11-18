"""
Tests for treatment API endpoints.
"""
import pytest
from fastapi import status


def test_create_treatment(client, sample_treatment_data):
    """Test creating a new treatment."""
    response = client.post("/api/v1/treatments/", json=sample_treatment_data)

    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["name"] == sample_treatment_data["name"]
    assert data["duration_minutes"] == sample_treatment_data["duration_minutes"]
    assert "id" in data


def test_list_treatments(client, sample_treatment_data):
    """Test listing treatments."""
    # Create some treatments
    client.post("/api/v1/treatments/", json=sample_treatment_data)

    treatment_data_2 = sample_treatment_data.copy()
    treatment_data_2["name"] = "Massage Therapy"
    treatment_data_2["category"] = "massage"
    client.post("/api/v1/treatments/", json=treatment_data_2)

    # List treatments
    response = client.get("/api/v1/treatments/")

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert len(data) == 2


def test_list_treatments_filter_by_category(client, sample_treatment_data):
    """Test listing treatments filtered by category."""
    # Create treatments with different categories
    client.post("/api/v1/treatments/", json=sample_treatment_data)

    treatment_data_2 = sample_treatment_data.copy()
    treatment_data_2["name"] = "Massage Therapy"
    treatment_data_2["category"] = "massage"
    client.post("/api/v1/treatments/", json=treatment_data_2)

    # Filter by category
    response = client.get("/api/v1/treatments/?category=facial")

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert len(data) == 1
    assert data[0]["category"] == "facial"


def test_get_treatment(client, sample_treatment_data):
    """Test getting a specific treatment."""
    # Create a treatment
    create_response = client.post("/api/v1/treatments/", json=sample_treatment_data)
    treatment_id = create_response.json()["id"]

    # Get the treatment
    response = client.get(f"/api/v1/treatments/{treatment_id}")

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["id"] == treatment_id
    assert data["name"] == sample_treatment_data["name"]


def test_update_treatment(client, sample_treatment_data):
    """Test updating a treatment."""
    # Create a treatment
    create_response = client.post("/api/v1/treatments/", json=sample_treatment_data)
    treatment_id = create_response.json()["id"]

    # Update the treatment
    update_data = {"name": "Updated Facial", "base_price": "175.00"}
    response = client.put(f"/api/v1/treatments/{treatment_id}", json=update_data)

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["name"] == "Updated Facial"
    assert float(data["base_price"]) == 175.00


def test_delete_treatment(client, sample_treatment_data):
    """Test deleting a treatment (soft delete)."""
    # Create a treatment
    create_response = client.post("/api/v1/treatments/", json=sample_treatment_data)
    treatment_id = create_response.json()["id"]

    # Delete the treatment
    response = client.delete(f"/api/v1/treatments/{treatment_id}")

    assert response.status_code == status.HTTP_204_NO_CONTENT

    # Verify the treatment is soft deleted
    get_response = client.get(f"/api/v1/treatments/{treatment_id}")
    assert get_response.json()["is_active"] is False
