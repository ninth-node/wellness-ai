"""Treatment API endpoints - placeholder."""
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def list_treatments():
    """List treatments."""
    return {"message": "Treatments endpoint - TODO: Implement"}
