import { create } from "zustand";
import type { GameOptions, GameState, Player, Card } from "../lib/types";
import { createGameBoard } from "../lib/gameLogic";

interface GameStore extends GameState {
  startGame: (options: GameOptions) => void;
  selectCard: (cardId: string) => void;
  resetGame: () => void;
  setGameOptions: (options: GameOptions) => void;
}

const defaultOptions: GameOptions = {
  size: 4,
  theme: "numbers",
  numPlayers: 1,
};

const defaultPlayers = (numPlayers: number): Player[] =>
  Array.from({ length: numPlayers }, (_, i) => ({ id: i + 1, score: 0 }));

export const useGameStore = create<GameStore>((set, get) => ({
  board: [],
  gameOptions: defaultOptions,
  players: defaultPlayers(defaultOptions.numPlayers),
  currentPlayerId: 1,
  moves: 0,
  selectedCards: [],
  isGameOver: false,

  startGame: (options: GameOptions) => {
    set({
      gameOptions: options,
      board: createGameBoard(options.size, options.theme),
      players: defaultPlayers(options.numPlayers),
      currentPlayerId: 1,
      moves: 0,
      selectedCards: [],
      isGameOver: false,
    });
  },

  selectCard: (cardId: string) => {
    const { board, selectedCards, isGameOver } = get();
    if (isGameOver) return;
    const card = board.find((c: Card) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    // Retourne la carte
    const newBoard = board.map((c: Card) =>
      c.id === cardId ? { ...c, isFlipped: true } : c,
    );
    const newSelected = [...selectedCards, { ...card, isFlipped: true }];

    set({ board: newBoard, selectedCards: newSelected });

    // Si deux cartes sélectionnées, vérifier la paire
    if (newSelected.length === 2) {
      setTimeout(() => {
        const [first, second] = newSelected;
        if (first.value === second.value) {
          // Marquer comme matched
          set((state) => ({
            board: state.board.map((c) =>
              c.value === first.value ? { ...c, isMatched: true } : c,
            ),
            selectedCards: [],
            // Incrémenter le score du joueur courant
            players: state.players.map((p, idx) =>
              idx === state.currentPlayerId - 1
                ? { ...p, score: p.score + 1 }
                : p,
            ),
          }));
        } else {
          // Retourner les cartes
          set((state) => ({
            board: state.board.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, isFlipped: false }
                : c,
            ),
            selectedCards: [],
            // Changer de joueur si multijoueur
            currentPlayerId:
              state.players.length > 1
                ? (state.currentPlayerId % state.players.length) + 1
                : state.currentPlayerId,
          }));
        }
        // Incrémenter le nombre de coups
        set((state) => ({
          moves: state.moves + 1,
        }));
        // Vérifier la fin de partie
        set((state) => ({
          isGameOver: state.board.every((c) => c.isMatched),
        }));
      }, 800);
    }
  },

  resetGame: () => {
    const { gameOptions } = get();
    set({
      board: createGameBoard(gameOptions.size, gameOptions.theme),
      players: defaultPlayers(gameOptions.numPlayers),
      currentPlayerId: 1,
      moves: 0,
      selectedCards: [],
      isGameOver: false,
    });
  },

  setGameOptions: (options: GameOptions) => {
    set({ gameOptions: options });
  },
}));
