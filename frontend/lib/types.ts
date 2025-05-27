// Types pour le jeu de mémoire

export type Theme = "numbers" | "icons";

export interface Card {
  id: string;
  value: string | number;
  isFlipped: boolean;
  isMatched: boolean;
  content: string; // nombre ou nom d'icône
}

export interface Player {
  id: number;
  name?: string;
  score: number;
}

export interface GameOptions {
  size: number; // 4, 6, etc.
  theme: Theme;
  numPlayers: number;
  maxTime?: number; // temps max en secondes (optionnel, solo)
}

export interface GameState {
  board: Card[];
  gameOptions: GameOptions;
  players: Player[];
  currentPlayerId: number;
  moves: number;
  selectedCards: Card[];
  isGameOver: boolean;
}

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
