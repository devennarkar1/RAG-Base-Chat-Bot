#aiAssit/app/db.py
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))

db = client["ai_assistant"]

# Chats collection (already exists)
chat_collection = db["chats"]

# New users collection
users_collection = db["users"]