# # main.py
# from datetime import datetime, timedelta
# from uuid import uuid4

# from fastapi import FastAPI, HTTPException, Depends, status
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel, EmailStr

# from app.llm import generate_response_with_history
# from app.db import chat_collection, users_collection
# from app.auth import (
#     hash_password,
#     verify_password,
#     create_access_token,
#     decode_access_token,
#     get_current_user
# )

# # ----------------
# # FastAPI App Setup
# # ----------------
# app = FastAPI()

# # ✅ Enable CORS for all origins (adjust in production for security)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # allow all origins
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # ----------------
# # Pydantic Models
# # ----------------
# class ChatRequest(BaseModel):
#     message: str
#     session_id: str | None = None

# class UserSignUp(BaseModel):
#     email: EmailStr
#     password: str

# class UserLogin(BaseModel):
#     email: EmailStr
#     password: str


# # ----------------
# # Health Check
# # ----------------
# @app.get("/health")
# def health():
#     return {"status": "ok"}


# # ----------------
# # Signup
# # ----------------
# @app.post("/signup")
# def signup(user: UserSignUp):
#     existing_user = users_collection.find_one({"email": user.email})
#     if existing_user:
#         raise HTTPException(status_code=400, detail="Email already registered")
    
#     hashed_pwd = hash_password(user.password)
#     users_collection.insert_one({"email": user.email, "password": hashed_pwd})
    
#     return {"message": "User registered successfully"}


# # ----------------
# # Login
# # ----------------
# @app.post("/login")
# def login(user: UserLogin):
#     db_user = users_collection.find_one({"email": user.email})
#     if not db_user or not verify_password(user.password, db_user["password"]):
#         raise HTTPException(status_code=400, detail="Invalid email or password")
    
#     access_token = create_access_token(
#         data={"email": user.email},
#         expires_delta=timedelta(days=7)
#     )
    
#     return {"access_token": access_token, "token_type": "bearer"}


# # ----------------
# # Chat Endpoint
# # ----------------
# @app.post("/chat")
# async def chat(req: ChatRequest, current_user: dict = Depends(get_current_user)):
#     if not current_user or ("sub" not in current_user and "email" not in current_user):
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")

#     user_email = current_user.get("sub") or current_user.get("email")
#     session_id = req.session_id or str(uuid4())

#     # Query only by session_id + user_email
#     query = {"session_id": session_id, "user_email": user_email}
#     chat = chat_collection.find_one(query)

#     # Initialize messages if new session
#     messages = chat.get("messages", []) if chat else []

#     # Append user message with timestamp
#     user_message = req.message.strip()
#     messages.append({"role": "user", "content": user_message, "ts": datetime.utcnow().isoformat()})

#     # Sanitize messages for LLM (remove metadata)
#     sanitized_messages = [{"role": m.get("role"), "content": m.get("content")} for m in messages]

#     # Generate AI response
#     response = generate_response_with_history(sanitized_messages)

#     # Append assistant response with timestamp
#     now_iso = datetime.utcnow().isoformat()
#     messages.append({"role": "assistant", "content": response, "ts": now_iso})

#     # Metadata for quick listing
#     last_message_text = response if response else (messages[-1].get("content") if messages else "")

#     # Persist conversation with metadata
#     chat_collection.update_one(
#         {"session_id": session_id, "user_email": user_email},
#         {
#             "$set": {
#                 "messages": messages,
#                 "user_email": user_email,
#                 "session_id": session_id,
#                 "last_message": last_message_text,
#                 "last_updated": now_iso
#             }
#         },
#         upsert=True,
#     )

#     return {"session_id": session_id, "response": response, "email": user_email}


# # ----------------
# # Chat History
# # ----------------
# @app.get("/chat-history/{session_id}")
# async def chat_history(session_id: str, current_user: dict = Depends(get_current_user)):
#     user_email = current_user.get("sub") or current_user.get("email")
#     chat = chat_collection.find_one({"session_id": session_id, "user_email": user_email})
#     if not chat:
#         raise HTTPException(status_code=404, detail="Chat session not found")
#     return {"messages": chat.get("messages", []), "session_id": session_id}


# # ----------------
# # Get User Chats
# # ----------------
# @app.get("/chats")
# async def get_user_chats(current_user: dict = Depends(get_current_user)):
#     email = current_user.get("sub") or current_user.get("email")
#     result = []

#     # Sort by last_updated descending
#     user_chats = chat_collection.find({"user_email": email}).sort("last_updated", -1)
#     for chat in user_chats:
#         session_id = chat.get("session_id")
#         last_message = chat.get("last_message", "")
#         last_updated = chat.get("last_updated")
#         chat_name = chat.get("chat_name") or (
#             chat.get("messages", [{}])[0].get("content", "")[:20] + "..."
#             if chat.get("messages") else "New Chat"
#         )
#         result.append({
#             "session_id": session_id,
#             "last_message": last_message,
#             "last_updated": last_updated,
#             "chat_name": chat_name
#         })
#     return {"chats": result}





















# # main.py
# from datetime import datetime, timedelta
# from uuid import uuid4

# from fastapi import FastAPI, HTTPException, Depends, status
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel, EmailStr
# import logging
# import os

# from app.llm import generate_response_with_history
# from app.db import chat_collection, users_collection
# from app.auth import (
#     hash_password,
#     verify_password,
#     create_access_token,
#     decode_access_token,
#     get_current_user
# )

# logger = logging.getLogger(__name__)

# # ----------------
# # FastAPI App Setup
# # ----------------
# app = FastAPI()

# # ✅ Enable CORS for all origins (adjust in production for security)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # tighten in production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # ----------------
# # Pydantic Models
# # ----------------
# class ChatRequest(BaseModel):
#     message: str
#     session_id: str | None = None

# class UserSignUp(BaseModel):
#     email: EmailStr
#     password: str

# class UserLogin(BaseModel):
#     email: EmailStr
#     password: str


# # ----------------
# # Helpers
# # ----------------
# def snippet(text: str | None, length: int = 80) -> str:
#     if not text:
#         return ""
#     t = text.strip()
#     if len(t) <= length:
#         return t
#     # try to avoid cutting mid-word
#     cut = t[:length].rsplit(" ", 1)[0]
#     return (cut + "…") if cut else (t[:length] + "…")


# def sanitize_messages_for_model(messages: list) -> list:
#     """
#     Return a list of dicts containing only allowed fields for the chat API.
#     Allowed: role, content, (optionally) name.
#     """
#     sanitized = []
#     for m in messages:
#         if not isinstance(m, dict):
#             continue
#         role = m.get("role")
#         content = m.get("content")
#         if not role or content is None:
#             continue
#         entry = {"role": role, "content": content}
#         if m.get("name"):
#             entry["name"] = m.get("name")
#         sanitized.append(entry)
#     return sanitized


# # ----------------
# # Health Check
# # ----------------
# @app.get("/health")
# def health():
#     return {"status": "ok"}


# # ----------------
# # Signup
# # ----------------
# @app.post("/signup")
# def signup(user: UserSignUp):
#     existing_user = users_collection.find_one({"email": user.email})
#     if existing_user:
#         raise HTTPException(status_code=400, detail="Email already registered")
    
#     hashed_pwd = hash_password(user.password)
#     users_collection.insert_one({"email": user.email, "password": hashed_pwd})
    
#     return {"message": "User registered successfully"}


# # ----------------
# # Login
# # ----------------
# @app.post("/login")
# def login(user: UserLogin):
#     db_user = users_collection.find_one({"email": user.email})
#     if not db_user or not verify_password(user.password, db_user["password"]):
#         # generic message to avoid user enumeration
#         raise HTTPException(status_code=400, detail="Invalid email or password")
    
#     access_token = create_access_token(
#         data={"email": user.email},
#         expires_delta=timedelta(days=7)
#     )
    
#     return {"access_token": access_token, "token_type": "bearer"}


# # ----------------
# # Chat Endpoint (session-isolated)
# # ----------------
# @app.post("/chat")
# async def chat(req: ChatRequest, current_user: dict = Depends(get_current_user)):
#     """
#     - If session_id provided: append to that session (session_id + user_email).
#     - If no session_id provided: create a new session id (new chat).
#     - Persist messages and metadata: last_message (user snippet) and last_updated.
#     - Sanitize messages before sending to the LLM.
#     """
#     if not current_user or ("sub" not in current_user and "email" not in current_user):
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")

#     user_email = current_user.get("sub") or current_user.get("email")
#     session_id = req.session_id or str(uuid4())

#     # Strict lookup by session_id + user_email only
#     query = {"session_id": session_id, "user_email": user_email}
#     chat = chat_collection.find_one(query)

#     # Start with existing messages or empty list for new session
#     messages = chat.get("messages", []) if chat else []

#     # Validate and append user message with timestamp (DB metadata)
#     user_message = (req.message or "").strip()
#     if not user_message:
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Empty message")

#     messages.append({"role": "user", "content": user_message, "ts": datetime.utcnow().isoformat()})

#     # Sanitize messages for the model (remove ts and other metadata)
#     messages_for_model = sanitize_messages_for_model(messages)

#     # Call LLM (wrap to catch errors)
#     try:
#         response = generate_response_with_history(messages_for_model)
#         if response is None:
#             raise RuntimeError("LLM returned no response")
#     except Exception as e:
#         logger.exception("LLM generation failed")
#         raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="AI service error")

#     # Append assistant response with timestamp (DB metadata)
#     now_iso = datetime.utcnow().isoformat()
#     messages.append({"role": "assistant", "content": response, "ts": now_iso})

#     # Use the user's question snippet as last_message for Sidebar (short preview)
#     last_message_text = snippet(user_message, length=80)

#     # Persist conversation for this session only and update metadata for listing
#     try:
#         chat_collection.update_one(
#             {"session_id": session_id, "user_email": user_email},
#             {
#                 "$set": {
#                     "messages": messages,
#                     "user_email": user_email,
#                     "session_id": session_id,
#                     "last_message": last_message_text,
#                     "last_updated": now_iso
#                 }
#             },
#             upsert=True,
#         )
#     except Exception:
#         logger.exception("Failed to persist chat to DB")
#         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database error")

#     return {"session_id": session_id, "response": response, "email": user_email}


# # ----------------
# # Chat History (session-only)
# # ----------------
# @app.get("/chat-history/{session_id}")
# async def chat_history(session_id: str, current_user: dict = Depends(get_current_user)):
#     user_email = current_user.get("sub") or current_user.get("email")
#     chat = chat_collection.find_one({"session_id": session_id, "user_email": user_email})
#     if not chat:
#         raise HTTPException(status_code=404, detail="Chat session not found")
#     # Return only messages for this session
#     return {"messages": chat.get("messages", []), "session_id": session_id}


# # ----------------
# # Get User Chats (metadata only, newest first)
# # ----------------
# @app.get("/chats")
# async def get_user_chats(current_user: dict = Depends(get_current_user)):
#     email = current_user.get("sub") or current_user.get("email")
#     result = []

#     # Sort by last_updated descending so newest sessions come first
#     user_chats = chat_collection.find({"user_email": email}).sort("last_updated", -1)
#     for chat in user_chats:
#         session_id = chat.get("session_id")
#         last_message = chat.get("last_message", "")
#         last_updated = chat.get("last_updated")
#         chat_name = chat.get("chat_name") or (
#             chat.get("messages", [{}])[0].get("content", "")[:20] + "..."
#             if chat.get("messages") else "New Chat"
#         )
#         result.append({
#             "session_id": session_id,
#             "last_message": last_message,
#             "last_updated": last_updated,
#             "chat_name": chat_name
#         })
#     return {"chats": result}









# aiAssit/app/main.py
import logging
import os
from datetime import datetime, timedelta
from uuid import uuid4

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

# Internal Imports
from app.llm import generate_response_with_history
from app.db import chat_collection, users_collection
from app.auth import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user
)
from app.rag_engine import RAGEngine

# Setup Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ---------------------------------------------------------
# Initialize FastAPI & RAG Engine
# ---------------------------------------------------------
app = FastAPI(title="AI RAG Assistant")

# Initialize the RAG engine once at startup
try:
    rag_engine = RAGEngine()
    logger.info("✅ RAG Engine loaded: 1,732 pages of NLP context ready.")
except Exception as e:
    logger.error(f"❌ Failed to load RAG Engine: {e}")
    rag_engine = None

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Tighten this to your specific domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------
# Pydantic Models
# ---------------------------------------------------------
class ChatRequest(BaseModel):
    message: str
    session_id: str | None = None

class UserSignUp(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# ---------------------------------------------------------
# Helper Functions
# ---------------------------------------------------------
def snippet(text: str | None, length: int = 80) -> str:
    if not text: return ""
    t = text.strip()
    if len(t) <= length: return t
    cut = t[:length].rsplit(" ", 1)[0]
    return (cut + "…") if cut else (t[:length] + "…")

def sanitize_messages_for_model(messages: list) -> list:
    """Removes DB timestamps and extra metadata for LLM processing."""
    sanitized = []
    for m in messages:
        if not isinstance(m, dict): continue
        role = m.get("role")
        content = m.get("content")
        if role and content:
            entry = {"role": role, "content": content}
            if m.get("name"): entry["name"] = m.get("name")
            sanitized.append(entry)
    return sanitized

# ---------------------------------------------------------
# Endpoints
# ---------------------------------------------------------

@app.get("/health")
def health():
    return {"status": "ok", "rag_initialized": rag_engine is not None}

# --- Authentication ---

@app.post("/signup")
def signup(user: UserSignUp):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pwd = hash_password(user.password)
    users_collection.insert_one({"email": user.email, "password": hashed_pwd})
    return {"message": "User registered successfully"}

@app.post("/login")
def login(user: UserLogin):
    db_user = users_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    token = create_access_token(data={"email": user.email}, expires_delta=timedelta(days=7))
    return {"access_token": token, "token_type": "bearer"}

# --- Main Chat with RAG ---

@app.post("/chat")
async def chat(req: ChatRequest, current_user: dict = Depends(get_current_user)):
    # 1. Identity Check
    user_email = current_user.get("sub") or current_user.get("email")
    if not user_email:
        raise HTTPException(status_code=401, detail="User identification failed")

    session_id = req.session_id or str(uuid4())
    user_message = (req.message or "").strip()
    if not user_message:
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    # 2. Retrieve Chat History from MongoDB
    chat_doc = chat_collection.find_one({"session_id": session_id, "user_email": user_email})
    history = chat_doc.get("messages", []) if chat_doc else []

    # 3. RAG: Retrieve context from PDFs
    # app/main.py -> inside @app.post("/chat")
    pdf_context = ""
    if rag_engine is not None:  # Added explicit check
        try:
            pdf_context = rag_engine.get_context(user_message)
        except Exception as e:
            logger.error(f"RAG Error: {e}")
    else:
        logger.warning("Proceeding without RAG context (Engine not loaded)")

    # 4. Construct AI Prompt
    rag_system_prompt = {
        "role": "system",
        "content": (
            "You are a helpful AI assistant. Use the following context to answer accurately. "
            "If the info isn't there, use your internal knowledge but clarify that.\n\n"
            f"PDF CONTEXT:\n{pdf_context}"
        )
    }

    # 5. Prepare Payload for LLM
    clean_history = sanitize_messages_for_model(history)
    current_user_msg = {"role": "user", "content": user_message}
    payload = [rag_system_prompt] + clean_history + [current_user_msg]

    # 6. Generate AI Response
    try:
        response_text = generate_response_with_history(payload)
    except Exception:
        logger.exception("Inference failed")
        raise HTTPException(status_code=502, detail="AI Service currently unavailable")

    # 7. Persist to MongoDB
    now = datetime.utcnow().isoformat()
    history.append({"role": "user", "content": user_message, "ts": now})
    history.append({"role": "assistant", "content": response_text, "ts": now})

    chat_collection.update_one(
        {"session_id": session_id, "user_email": user_email},
        {
            "$set": {
                "messages": history,
                "user_email": user_email,
                "session_id": session_id,
                "last_message": snippet(user_message),
                "last_updated": now
            }
        },
        upsert=True
    )

    return {"session_id": session_id, "response": response_text, "email": user_email}

# --- History Retrieval ---

@app.get("/chat-history/{session_id}")
async def get_history(session_id: str, current_user: dict = Depends(get_current_user)):
    user_email = current_user.get("sub") or current_user.get("email")
    chat = chat_collection.find_one({"session_id": session_id, "user_email": user_email})
    if not chat:
        raise HTTPException(status_code=404, detail="Session not found")
    return {"messages": chat.get("messages", []), "session_id": session_id}

@app.get("/chats")
async def get_all_chats(current_user: dict = Depends(get_current_user)):
    user_email = current_user.get("sub") or current_user.get("email")
    user_chats = chat_collection.find({"user_email": user_email}).sort("last_updated", -1)
    
    results = []
    for doc in user_chats:
        results.append({
            "session_id": doc.get("session_id"),
            "last_message": doc.get("last_message"),
            "last_updated": doc.get("last_updated"),
            "chat_name": doc.get("chat_name") or (doc.get("messages")[0]["content"][:25] + "..." if doc.get("messages") else "New Chat")
        })
    return {"chats": results}