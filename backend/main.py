from fastapi import FastAPI, UploadFile, File, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base, Expense

from PIL import Image
from datetime import datetime
from schemas import ExpenseCreate
from dotenv import load_dotenv
import io
import json
import os
import shutil
import requests
import os
import base64

#create engine
Base.metadata.create_all(bind=engine)

app = FastAPI()
#cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

load_dotenv()
API_KEY = os.getenv("API_KEY")




UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok= True)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()




def generate_content(prompt: str, image_path: str):
    with open(image_path, "rb") as img:
        image_data = base64.b64encode(img.read()).decode("utf-8")

    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent"

    headers = {
        "Content-Type": "application/json",
        "X-goog-api-key": API_KEY
    }

    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    },
                    {
                        "inline_data": {
                            "mime_type": "image/jpeg",
                            "data": image_data
                        }
                    }
                ]
            }
        ]
    }

    response = requests.post(url, headers=headers, json=payload)
    response.raise_for_status()

    return response.json()

#upload receipt
@app.post("/ai/scan")
async def scan_receipt(file: UploadFile = File(...), db:Session= Depends(get_db)):

    file_path = f"{UPLOAD_FOLDER}/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

   

    prompt = """
    Extract the following from this receipt
    -amount
    -category
    -date
    -description

    The category MUST be exactly one of:

    Food
    Travel
    Shopping
    Utilities
    Health
    Entertainment
    Other
    Categorize the expense based on the receipt contents.
    If no date is found, return null for date.
    Return ONLY valid JSON in this format:

    {
      "amount": 0,
      "category": "",
      "date": "YYYY-MM-DD",
      "description": ""
    }
    """
    response = generate_content(
        prompt,file_path
    )
    
    
    text = response["candidates"][0]["content"]["parts"][0]["text"]
    text = text.replace("```json", "").replace("```", "").strip()
    parsed_data = json.loads(text)

    expense = Expense(
        amount= parsed_data["amount"],
        category = parsed_data["category"],
        expense_date = (
        datetime.strptime(parsed_data["date"], "%Y-%m-%d").date()
        if parsed_data.get("date") is not None
        else datetime.today().date()
        ),
        description = parsed_data["description"],
        image_path = file_path,
        source= "AI"
    )
   

    return parsed_data

#add a confirmed expense

@app.post("/expenses")
def add_expense(expense: ExpenseCreate, db:Session = Depends(get_db)):
    new_expense = Expense(
        amount = expense.amount,
        category = expense.category,
        expense_date = expense.expense_date,
        description = expense.description,
        image_path = expense.image_path
    )

    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)
    
    return new_expense


#fetch all expenses

@app.get("/expenses")
def get_expenses(db:Session = Depends(get_db)):
    expenses = db.query(Expense).all()
    return expenses


#category wise expenses

@app.get("/expenses/summary")
def get_summary(db:Session = Depends(get_db)):

    expenses = db.query(Expense).all()

    summary = {}
    for expense in expenses:
        category = expense.category

        if category not in summary:
            summary[category]= 0
        
        summary[category] += expense.amount
    
    return summary

