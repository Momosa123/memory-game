# backend/app/main.py (temporaire, à exécuter une fois)
from fastapi import FastAPI

from app.api.v1.endpoints.score import router as score_router

""" from app.db.session import Base, engine
from app.models.score import Score  # noqa: F401 """

# Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(score_router, prefix="/api/v1/scores", tags=["scores"])
