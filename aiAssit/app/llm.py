# aiAssit/app/llm.py
from groq import Groq
import os
from dotenv import load_dotenv
import logging

load_dotenv()
logger = logging.getLogger(__name__)

API_KEY = os.getenv("GROQ_API_KEY")
client = Groq(api_key=API_KEY)

def _sanitize_for_model(messages):
    sanitized = []
    for m in messages:
        if not isinstance(m, dict): continue
        role = m.get("role")
        content = m.get("content")
        if not role or content is None: continue
        entry = {"role": role, "content": content}
        if m.get("name"): entry["name"] = m.get("name")
        sanitized.append(entry)
    return sanitized

def generate_response_with_history(messages):
    try:
        # We NO LONGER add a hardcoded system_prompt here.
        # It is now being sent from main.py via the RAG engine.
        sanitized = _sanitize_for_model(messages)

        chat_completion = client.chat.completions.create(
            messages=sanitized,
            model=os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile"),
            temperature=float(os.getenv("LLM_TEMPERATURE", 0.0)),
            max_tokens=int(os.getenv("LLM_MAX_TOKENS", 1024)) # Increased for RAG answers
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        logger.exception("LLM call failed")
        return f"Error: {str(e)}"