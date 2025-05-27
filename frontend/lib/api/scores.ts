/**
 * Type représentant un score (conforme à ScoreRead côté backend).
 */
export type ScoreRead = {
  id: number;
  player: string;
  score: number;
  created_at: string; // ISO string
};

/**
 * Type représentant les statistiques globales (conforme à ScoreStats côté backend).
 */
export type ScoreStats = {
  count: number;
  max: number | null;
  min: number | null;
  avg: number | null;
};

/**
 * Récupère le top 10 des scores depuis l'API backend.
 */
export async function fetchTopScores(): Promise<ScoreRead[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/scores/top10`
  );
  if (!res.ok) throw new Error("Erreur lors de la récupération du top 10");
  return res.json();
}

/**
 * Récupère les statistiques globales sur les scores.
 */
export async function fetchScoreStats(): Promise<ScoreStats> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/scores/stats`
  );
  if (!res.ok) throw new Error("Erreur lors de la récupération des stats");
  return res.json();
}

/**
 * Envoie un nouveau score au backend.
 */
export async function createScore(data: {
  player: string;
  score: number;
}): Promise<ScoreRead> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/scores/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erreur lors de l'envoi du score");
  return res.json();
}
