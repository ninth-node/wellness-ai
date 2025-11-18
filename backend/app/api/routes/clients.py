"""
Client management API endpoints.
"""
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.client import Client
from app.schemas.client import ClientCreate, ClientResponse, ClientUpdate

router = APIRouter()


@router.post("/", response_model=ClientResponse, status_code=status.HTTP_201_CREATED)
async def create_client(client_data: ClientCreate, db: Session = Depends(get_db)):
    """Create a new client."""
    # Check if email already exists
    existing = db.query(Client).filter(Client.email == client_data.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Client with this email already exists"
        )

    # Create client
    client = Client(**client_data.model_dump())
    db.add(client)
    db.commit()
    db.refresh(client)

    return client


@router.get("/", response_model=List[ClientResponse])
async def list_clients(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """List all clients."""
    clients = db.query(Client).offset(skip).limit(limit).all()
    return clients


@router.get("/{client_id}", response_model=ClientResponse)
async def get_client(client_id: int, db: Session = Depends(get_db)):
    """Get a specific client by ID."""
    client = db.query(Client).filter(Client.id == client_id).first()
    if not client:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Client not found"
        )
    return client


@router.put("/{client_id}", response_model=ClientResponse)
async def update_client(
    client_id: int,
    client_data: ClientUpdate,
    db: Session = Depends(get_db)
):
    """Update a client."""
    client = db.query(Client).filter(Client.id == client_id).first()
    if not client:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Client not found"
        )

    # Update fields
    for field, value in client_data.model_dump(exclude_unset=True).items():
        setattr(client, field, value)

    db.commit()
    db.refresh(client)
    return client


@router.delete("/{client_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_client(client_id: int, db: Session = Depends(get_db)):
    """Delete a client."""
    client = db.query(Client).filter(Client.id == client_id).first()
    if not client:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Client not found"
        )

    db.delete(client)
    db.commit()
    return None
