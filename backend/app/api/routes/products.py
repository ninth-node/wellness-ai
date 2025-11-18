"""Products API endpoints - placeholder."""
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def list_products():
    """List products."""
    return {"message": "Products endpoint - TODO: Implement"}
