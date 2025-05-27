from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ScoreBase(BaseModel):
    """
    Schéma de base pour un score (attributs communs).
    """

    player: str
    score: int


class ScoreCreate(ScoreBase):
    """
    Schéma pour la création d'un score (hérite de ScoreBase).
    """

    pass


class ScoreRead(ScoreBase):
    """
    Schéma pour la lecture d'un score (inclut l'id et la date de création).
    """

    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class ScoreInDB(ScoreRead):
    """
    Schéma interne pour un score stocké en base (identique à ScoreRead ici).
    """

    pass


class ScoreStats(BaseModel):
    """
    Schéma pour les statistiques globales sur les scores.
    """

    count: int
    max: Optional[int] = None
    min: Optional[int] = None
    avg: Optional[float] = None
