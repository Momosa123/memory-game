import React from "react";
import type { Card as CardType } from "@/lib/types";

interface GameBoardProps {
  board: CardType[];
  onCardClick: (cardId: string) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, onCardClick }) => {
  const size = Math.sqrt(board.length);

  return (
    <div
      className="grid gap-5 justify-center"
      style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
    >
      {board.map((card) => {
        // Détermine la couleur de la carte selon son état
        let cardClass =
          "aspect-square w-20 md:w-24 lg:w-28 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold cursor-pointer select-none transition-colors duration-150";
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
