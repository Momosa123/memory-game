import { Card, Theme } from "./types";

// Mélange un tableau de cartes (Fisher-Yates)
export function shuffleCards(cards: Card[]): Card[] {
  const array = [...cards];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Génère un plateau de jeu selon la taille et le thème
export function createGameBoard(size: number, theme: Theme): Card[] {
  const numPairs = (size * size) / 2;
  let values: (string | number)[] = [];

  if (theme === "numbers") {
    values = Array.from({ length: numPairs }, (_, i) => i + 1);
  } else {
    // Placeholder pour les icônes (à remplacer par des vrais noms d'icônes)
    values = Array.from({ length: numPairs }, (_, i) => `icon${i + 1}`);
  }

  // Crée les paires de cartes
  const cards: Card[] = values.flatMap((value) => [
    {
      id: crypto.randomUUID(),
      value,
      isFlipped: false,
      isMatched: false,
      content: String(value),
    },
    {
      id: crypto.randomUUID(),
      value,
      isFlipped: false,
      isMatched: false,
      content: String(value),
    },
  ]);

  return shuffleCards(cards);
}
