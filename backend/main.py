# backend/app/main.py (temporaire, à exécuter une fois)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.endpoints.score import router as score_router

""" from app.db.session import Base, engine
from app.models.score import Score  # noqa: F401 """

# Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configuration CORS pour autoriser le frontend Next.js en dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # à adapter si besoin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(score_router, prefix="/api/v1/scores", tags=["scores"])
