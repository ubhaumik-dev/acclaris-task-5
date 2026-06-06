from sqlalchemy import Column, Integer, String, DECIMAL, Text, Date, TIMESTAMP
from sqlalchemy.sql import func
from database import Base

class Expense(Base):

    __tablename__ = 'Expenses'

    id = Column(Integer, primary_key = True, index= True)
    amount = Column(DECIMAL(10,2), nullable= False)
    category= Column(String(50), nullable= False)
    description = Column(Text)
    expense_date = Column(Date, nullable= True)
    image_path = Column(String(255))
    source = Column(String(10), default ='AI')
    created_at = Column(TIMESTAMP, server_default = func.now())