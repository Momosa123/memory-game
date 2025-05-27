from datetime import datetime

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
        orm_mode = True


class ScoreInDB(ScoreRead):
    """
    Schéma interne pour un score stocké en base (identique à ScoreRead ici).
    """

    pass
