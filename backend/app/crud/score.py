from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.score import Score
from app.schemas.score import ScoreCreate


def create_score(db: Session, score_in: ScoreCreate) -> Score:
    """
    Crée un nouveau score dans la base de données.
    """
    db_score = Score(player=score_in.player, score=score_in.score)
    db.add(db_score)
    db.commit()
    db.refresh(db_score)
    return db_score


def get_score(db: Session, score_id: int) -> Optional[Score]:
    """
    Récupère un score par son identifiant.
    """
    return db.query(Score).filter(Score.id == score_id).first()


def get_scores(db: Session, skip: int = 0, limit: int = 100) -> List[Score]:
    """
    Récupère une liste de scores, avec pagination.
    """
    return (
        db.query(Score)
        .order_by(Score.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def delete_score(db: Session, score_id: int) -> None:
    """
    Supprime un score par son identifiant.
    """
    db_score = db.query(Score).filter(Score.id == score_id).first()
    if db_score:
        db.delete(db_score)
        db.commit()
