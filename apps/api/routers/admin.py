from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlmodel import Session, select
from typing import List
from database import get_session
from models import AdminUser, Profile, Project
from auth import verify_password, create_access_token
from datetime import timedelta
from auth import ACCESS_TOKEN_EXPIRE_MINUTES
from jose import JWTError, jwt
from auth import SECRET_KEY, ALGORITHM
import shutil
import os
import uuid

router = APIRouter(prefix="/admin", tags=["admin"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="admin/token")

async def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = session.exec(select(AdminUser).where(AdminUser.username == username)).first()
    if user is None:
        raise credentials_exception
    return user

@router.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    user = session.exec(select(AdminUser).where(AdminUser.username == form_data.username)).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/profile", response_model=Profile)
def get_profile(session: Session = Depends(get_session)):
    profile = session.exec(select(Profile)).first()
    if not profile:
        # Return a default profile if none exists
        return Profile(full_name="Adarsh Vijay", bio="AI Engineer", current_mood="focused")
    return profile

@router.post("/profile", response_model=Profile)
def update_profile(profile: Profile, user: AdminUser = Depends(get_current_user), session: Session = Depends(get_session)):
    existing_profile = session.exec(select(Profile)).first()
    if existing_profile:
        existing_profile.full_name = profile.full_name
        existing_profile.bio = profile.bio
        existing_profile.current_mood = profile.current_mood
        existing_profile.avatar_url = profile.avatar_url
        existing_profile.is_available_for_hire = profile.is_available_for_hire
        existing_profile.social_linkedin = profile.social_linkedin
        existing_profile.social_github = profile.social_github
        session.add(existing_profile)
        session.commit()
        session.refresh(existing_profile)
        return existing_profile
    else:
        session.add(profile)
        session.commit()
        session.refresh(profile)
        return profile

@router.post("/upload")
async def upload_file(file: UploadFile = File(...), user: AdminUser = Depends(get_current_user)):
    # Save to apps/web/public/uploads
    # Determine path relative to this file
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) # apps/api/../.. -> root/apps/api -> wait.
    # __file__ is apps/api/routers/admin.py
    # dirname -> apps/api/routers
    # dirname -> apps/api
    # dirname -> apps
    # dirname -> root
    # Wait, apps/api/routers/admin.py
    # 1. routers
    # 2. api
    # 3. apps
    # 4. root
    
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../"))
    upload_dir = os.path.join(root_dir, "web", "public", "uploads")
    
    os.makedirs(upload_dir, exist_ok=True)
    
    # Generate unique filename
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(upload_dir, unique_filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    return {"url": f"/uploads/{unique_filename}"}

@router.get("/projects", response_model=List[Project])
def get_projects(session: Session = Depends(get_session)):
    projects = session.exec(select(Project)).all()
    return projects

@router.post("/projects", response_model=Project)
def create_project(project: Project, user: AdminUser = Depends(get_current_user), session: Session = Depends(get_session)):
    session.add(project)
    session.commit()
    session.refresh(project)
    return project

@router.put("/projects/{project_id}", response_model=Project)
def update_project(project_id: int, project: Project, user: AdminUser = Depends(get_current_user), session: Session = Depends(get_session)):
    db_project = session.get(Project, project_id)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    project_data = project.dict(exclude_unset=True)
    for key, value in project_data.items():
        setattr(db_project, key, value)
    session.add(db_project)
    session.commit()
    session.refresh(db_project)
    return db_project

@router.delete("/projects/{project_id}")
def delete_project(project_id: int, user: AdminUser = Depends(get_current_user), session: Session = Depends(get_session)):
    db_project = session.get(Project, project_id)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    session.delete(db_project)
    session.commit()
    return {"ok": True}
