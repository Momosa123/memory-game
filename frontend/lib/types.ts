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
