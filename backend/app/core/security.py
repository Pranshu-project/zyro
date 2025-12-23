import bcrypt
from typing import Optional
from datetime import datetime,timedelta
from jose import jwt, JWTError
from app.core.conf import JWT_SECRET_KEY,JWT_ACCESS_TOKEN_EXPIRE_MINUTES,JWT_ALGORITHM,JWT_REFRESH_TOKEN_EXPIRE_MINUTES
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.schemas.auth import User as UserSchema
from typing import Optional

async def hash_password(password:str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'),bcrypt.gensalt(rounds=10)).decode('utf-8')

async def verify_password(password:str,hashed_password:str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'),hashed_password.encode('utf-8'))

    
async def create_access_token(data:dict,expires_minute:Optional[int] = None) -> str:

    if not JWT_SECRET_KEY:
        raise ValueError("JWT_SECRET_KEY is not set")
    
    to_encode = data.copy()
    expires_minutes = expires_minute if expires_minute else JWT_ACCESS_TOKEN_EXPIRE_MINUTES
    expire = datetime.utcnow() + timedelta(minutes=expires_minutes)

    to_encode.update({
        "exp":expire
    })
    token= jwt.encode(to_encode,JWT_SECRET_KEY,algorithm=JWT_ALGORITHM)
    return token

    
async def create_refresh_token(data:dict,expires_minute:Optional[int] = None) -> str:

    if not JWT_SECRET_KEY:
        raise ValueError("JWT_SECRET_KEY is not set")
    
    to_encode = data.copy()
    expires_minutes = expires_minute if expires_minute else JWT_REFRESH_TOKEN_EXPIRE_MINUTES
    expire = datetime.utcnow() + timedelta(minutes=expires_minutes)

    to_encode.update({
        "exp":expire
    })
    token= jwt.encode(to_encode,JWT_SECRET_KEY,algorithm=JWT_ALGORITHM)
    return token

async def get_current_user(token: str = Depends(HTTPBearer())) -> UserSchema:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        user_id: str = payload.get("user_id")
        if user_id is None:
            raise credentials_exception
        # In a real application, you would fetch user from database here
        # For now, we return a basic user object
        user = UserSchema(id=user_id, name=payload.get("name", "Unknown"), email=payload.get("email", "unknown@example.com"))
        return user
    except JWTError:
        raise credentials_exception
