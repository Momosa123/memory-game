import React from "react";
import Card from "./Card";
import type { Card as CardType } from "@/lib/types";

interface GameBoardProps {
  board: CardType[];
  onCardClick: (cardId: string) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, onCardClick }) => {
  const size = Math.sqrt(board.length);

  return (
    <div
      className="grid gap-3 justify-center"
      style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
    >
      {board.map((card) => (
        <Card
          key={card.id}
          content={card.content}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          onClick={() => onCardClick(card.id)}
        />
      ))}
    </div>
  );
};

export default GameBoard;
