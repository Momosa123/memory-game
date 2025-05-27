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


def get_top_scores(db: Session, limit: int = 10) -> List[Score]:
    """
    Récupère les meilleurs scores (top N, par défaut 10).
    """
    return (
        db.query(Score)
        .order_by(Score.score.desc(), Score.created_at.asc())
        .limit(limit)
        .all()
    )


def get_score_stats(db: Session) -> dict:
    """
    Calcule des statistiques globales sur les scores :
    - nombre de parties
    - meilleur score
    - score moyen
    - score minimum
    - score maximum
    """
    from sqlalchemy import func

    stats = db.query(
        func.count(Score.id),
        func.max(Score.score),
        func.min(Score.score),
        func.avg(Score.score),
    ).one()
    return {
        "count": stats[0],
        "max": stats[1],
        "min": stats[2],
        "avg": float(stats[3]) if stats[3] is not None else None,
    }
