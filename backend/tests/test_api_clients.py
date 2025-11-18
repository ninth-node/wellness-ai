"""
Tests for client API endpoints.
"""
import pytest
from fastapi import status


def test_create_client(client, sample_client_data):
    """Test creating a new client."""
    response = client.post("/api/v1/clients/", json=sample_client_data)

    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["first_name"] == sample_client_data["first_name"]
    assert data["last_name"] == sample_client_data["last_name"]
    assert data["email"] == sample_client_data["email"]
    assert "id" in data


def test_create_client_duplicate_email(client, sample_client_data):
    """Test creating a client with duplicate email."""
    # Create first client
    client.post("/api/v1/clients/", json=sample_client_data)

    # Try to create another client with same email
    response = client.post("/api/v1/clients/", json=sample_client_data)

    assert response.status_code == status.HTTP_400_BAD_REQUEST


def test_list_clients(client, sample_client_data):
    """Test listing clients."""
    # Create some clients
    client.post("/api/v1/clients/", json=sample_client_data)

    client_data_2 = sample_client_data.copy()
    client_data_2["email"] = "jane.doe@example.com"
    client.post("/api/v1/clients/", json=client_data_2)

    # List clients
    response = client.get("/api/v1/clients/")

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert len(data) == 2


def test_get_client(client, sample_client_data):
    """Test getting a specific client."""
    # Create a client
    create_response = client.post("/api/v1/clients/", json=sample_client_data)
    client_id = create_response.json()["id"]

    # Get the client
    response = client.get(f"/api/v1/clients/{client_id}")

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["id"] == client_id
    assert data["email"] == sample_client_data["email"]


def test_get_client_not_found(client):
    """Test getting a non-existent client."""
    response = client.get("/api/v1/clients/99999")

    assert response.status_code == status.HTTP_404_NOT_FOUND


def test_update_client(client, sample_client_data):
    """Test updating a client."""
    # Create a client
    create_response = client.post("/api/v1/clients/", json=sample_client_data)
    client_id = create_response.json()["id"]

    # Update the client
    update_data = {"first_name": "Jane", "skin_type": "oily"}
    response = client.put(f"/api/v1/clients/{client_id}", json=update_data)

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["first_name"] == "Jane"
    assert data["skin_type"] == "oily"
    assert data["last_name"] == sample_client_data["last_name"]  # Unchanged


def test_delete_client(client, sample_client_data):
    """Test deleting a client (soft delete)."""
    # Create a client
    create_response = client.post("/api/v1/clients/", json=sample_client_data)
    client_id = create_response.json()["id"]

    # Delete the client
    response = client.delete(f"/api/v1/clients/{client_id}")

    assert response.status_code == status.HTTP_204_NO_CONTENT

    # Verify the client is soft deleted (is_active = False)
    get_response = client.get(f"/api/v1/clients/{client_id}")
    assert get_response.json()["is_active"] is False


def test_list_clients_with_pagination(client, sample_client_data):
    """Test listing clients with pagination."""
    # Create 5 clients
    for i in range(5):
        client_data = sample_client_data.copy()
        client_data["email"] = f"client{i}@example.com"
        client.post("/api/v1/clients/", json=client_data)

    # Get first 2 clients
    response = client.get("/api/v1/clients/?skip=0&limit=2")

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert len(data) == 2

    # Get next 2 clients
    response = client.get("/api/v1/clients/?skip=2&limit=2")

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert len(data) == 2
