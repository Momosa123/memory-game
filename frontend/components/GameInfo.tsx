import React from "react";

interface GameInfoProps {
  currentPlayerId: number;
  moves: number;
  totalPlayers: number;
}

const GameInfo: React.FC<GameInfoProps> = ({
  currentPlayerId,
  moves,
  totalPlayers,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-center mb-4">
      <span className="text-indigo-800 font-semibold">
        Joueur courant : <span className="font-bold">{currentPlayerId}</span> /{" "}
        {totalPlayers}
      </span>
      <span className="text-indigo-700">Coups : {moves}</span>
    </div>
  );
};

export default GameInfo;
