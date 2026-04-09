#aiAssit/app/auth.py
from datetime import datetime, timedelta
from jose import jwt, JWTError
import bcrypt
import os
from dotenv import load_dotenv
from fastapi import HTTPException, Header, Depends
# from .auth import decode_access_token  # make sure this function exists in auth.py



load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")  # set in .env
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

# Password hashing
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode(), hashed.encode())

# JWT token
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
    
# app/auth.py


def get_current_user(authorization: str = Header(...)):
    """
    Extracts user info from the Authorization header.
    Header format: Bearer <token>
    """
    try:
        token = authorization.split(" ")[1]  # get token part
        payload = decode_access_token(token)
        if payload is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return payload  # this contains user's email
    except IndexError:
        raise HTTPException(status_code=401, detail="Invalid token format")