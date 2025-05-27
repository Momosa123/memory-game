# backend/app/models/score.py

from sqlalchemy import Column, DateTime, Integer, String, func

from app.db.session import Base


class Score(Base):
    """
    Modèle SQLAlchemy pour la table des scores.
    """

    __tablename__ = "scores"

    id = Column(Integer, primary_key=True, index=True)
    player = Column(String, index=True)
    score = Column(Integer, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
