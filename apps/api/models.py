from typing import Optional, List
from sqlmodel import Field, SQLModel
from datetime import datetime

class AdminUser(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    hashed_password: str

class Profile(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    full_name: str
    bio: str
    current_mood: str = "focused"  # focused, happy, coding, etc.
    avatar_url: str = "/avatar-main.jpg"
    is_available_for_hire: bool = True
    resume_url: Optional[str] = None
    social_linkedin: Optional[str] = None
    social_github: Optional[str] = None
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class Project(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    slug: str = Field(index=True, unique=True)
    description: str
    tags: str  # Comma separated tags
    content_markdown: str
    image_url: Optional[str] = None
    demo_url: Optional[str] = None
    repo_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class GameMatch(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    game_type: str  # connect4, sketch_guess
    winner: str  # human, ai, draw
    provider: str  # openai, gemini, grok
    total_moves: int
    created_at: datetime = Field(default_factory=datetime.utcnow)
