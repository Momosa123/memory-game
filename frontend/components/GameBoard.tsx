import React from "react";
import type { Card as CardType } from "@/lib/types";

/**
 * Affiche le plateau de jeu mémoire de façon responsive.
 * Les cartes s'adaptent à la taille du board et à l'écran.
 */
interface GameBoardProps {
  board: CardType[];
  onCardClick: (cardId: string) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, onCardClick }) => {
  const size = Math.sqrt(board.length);

  // Détermine la taille des cartes selon la taille du board
  const cardBaseClass =
    "aspect-square rounded-full flex items-center justify-center font-bold cursor-pointer select-none transition-colors duration-150 min-w-0";
  let cardSizeClass = "";
  let textSizeClass = "";
  if (size === 4) {
    cardSizeClass = "w-16 md:w-20 lg:w-24";
    textSizeClass = "text-xl md:text-2xl lg:text-3xl";
  } else if (size === 6) {
    cardSizeClass = "w-10 md:w-14 lg:w-16";
    textSizeClass = "text-base md:text-lg lg:text-xl";
  } else {
    cardSizeClass = "w-14 md:w-16 lg:w-20";
    textSizeClass = "text-lg md:text-xl lg:text-2xl";
  }

  return (
    <div
      className={`grid justify-center max-w-[95vw] mx-auto py-2 ${
        size === 4 ? "gap-2 md:gap-4" : "gap-1 md:gap-3"
      }`}
      style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
    >
      {board.map((card) => {
        // Détermine la couleur de la carte selon son état
        let cardClass = `${cardBaseClass} ${cardSizeClass} ${textSizeClass}`;
        if (card.isMatched) {
          cardClass += " bg-yellow-500 text-white cursor-default";
        } else if (card.isFlipped) {
          cardClass += " bg-slate-200 text-slate-700";
        } else {
          cardClass += " bg-slate-700 text-slate-100 hover:bg-slate-600";
        }
        return (
          <div
            key={card.id}
            className={cardClass}
            onClick={() =>
              !card.isMatched && !card.isFlipped && onCardClick(card.id)
            }
            role="button"
            tabIndex={0}
            aria-label={
              card.isFlipped || card.isMatched
                ? String(card.content)
                : "Hidden card"
            }
            onKeyDown={(e) => {
              if (
                (e.key === "Enter" || e.key === " ") &&
                !card.isMatched &&
                !card.isFlipped
              ) {
                onCardClick(card.id);
              }
            }}
          >
            {card.isFlipped || card.isMatched ? card.content : ""}
          </div>
        );
      })}
    </div>
  );
};

export default GameBoard;
