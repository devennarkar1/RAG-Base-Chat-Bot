# migration.py (run offline)
from app.db import chat_collection
from uuid import uuid4
from datetime import datetime, timedelta

for doc in chat_collection.find({"session_id": {"$exists": False}}):
    msgs = doc.get("messages", [])
    if not msgs:
        continue
    # Simple: create one session per legacy doc
    new_session_id = str(uuid4())
    chat_collection.insert_one({
        "session_id": new_session_id,
        "user_email": doc.get("user_email") or doc.get("email"),
        "messages": msgs
    })
    # Optionally remove legacy doc
    chat_collection.delete_one({"_id": doc["_id"]})
