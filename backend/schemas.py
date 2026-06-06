from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional

class ExpenseCreate(BaseModel):
    amount: float
    category: str
    description: Optional[str] = None
    expense_date: date
    image_path: Optional[str] = None
    source: Optional[str] = "AI"

class ExpenseResponse(ExpenseCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

