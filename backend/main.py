# backend/app/main.py (temporaire, à exécuter une fois)
from app.db.session import Base, engine
from app.models.score import Score  # noqa: F401

Base.metadata.create_all(bind=engine)
