import React from "react";

interface CardProps {
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({
  content,
  isFlipped,
  isMatched,
  onClick,
}) => {
  return (
    <button
      className={`w-16 h-20 sm:w-20 sm:h-28 flex items-center justify-center border rounded shadow text-2xl font-bold transition-all duration-300
        ${isMatched ? "bg-green-200 text-green-700" : isFlipped ? "bg-indigo-100 text-indigo-700" : "bg-white text-transparent hover:bg-indigo-50"}
        ${isMatched ? "cursor-default" : "cursor-pointer"}`}
      onClick={onClick}
      disabled={isFlipped || isMatched}
      aria-label={isFlipped || isMatched ? String(content) : "Carte cachée"}
    >
      {isFlipped || isMatched ? content : "?"}
    </button>
  );
};

export default Card;
