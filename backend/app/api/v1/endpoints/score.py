from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.crud.score import (
    create_score,
    delete_score,
    get_score,
    get_score_stats,
    get_scores,
    get_top_scores,
)
from app.db.session import get_db
from app.schemas.score import ScoreCreate, ScoreRead, ScoreStats

router = APIRouter()


@router.post("/", response_model=ScoreRead, status_code=status.HTTP_201_CREATED)
def create_score_endpoint(score_in: ScoreCreate, db: Session = Depends(get_db)):
    """
    Endpoint pour créer un nouveau score.
    """
    return create_score(db, score_in)


@router.get("/top10", response_model=List[ScoreRead])
def get_top_scores_endpoint(db: Session = Depends(get_db)):
    """
    Endpoint pour récupérer le top 10 des scores.
    """
    return get_top_scores(db, limit=10)


@router.get("/stats", response_model=ScoreStats)
def get_score_stats_endpoint(db: Session = Depends(get_db)):
    """
    Endpoint pour récupérer des statistiques globales sur les scores.
    """
    return get_score_stats(db)


@router.get("/", response_model=List[ScoreRead])
def list_scores_endpoint(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """
    Endpoint pour lister les scores avec pagination.
    """
    return get_scores(db, skip=skip, limit=limit)


@router.get("/{score_id}", response_model=ScoreRead)
def get_score_endpoint(score_id: int, db: Session = Depends(get_db)):
    """
    Endpoint pour récupérer un score par son identifiant.
    """
    score = get_score(db, score_id)
    if not score:
        raise HTTPException(status_code=404, detail="Score not found")
    return score


@router.delete("/{score_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_score_endpoint(score_id: int, db: Session = Depends(get_db)):
    """
    Endpoint pour supprimer un score par son identifiant.
    """
    score = get_score(db, score_id)
    if not score:
        raise HTTPException(status_code=404, detail="Score not found")
    delete_score(db, score_id)
