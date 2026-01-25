from sqlmodel import SQLModel, create_engine, Session, select
from models import AdminUser
# Import passlib utils lazily or from auth to avoid circular dependency if auth imports database
# But auth doesn't import database. So we can import get_password_hash.

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def init_db():
    create_db_and_tables()
    # Seed Admin User
    from auth import get_password_hash
    with Session(engine) as session:
        user = session.exec(select(AdminUser).where(AdminUser.username == "admin")).first()
        if not user:
            # Default creds: admin / admin123
            hashed_pwd = get_password_hash("admin123")
            admin = AdminUser(username="admin", hashed_password=hashed_pwd)
            session.add(admin)
            session.commit()
            print("Admin user created: admin / admin123")

def get_session():
    with Session(engine) as session:
        yield session
