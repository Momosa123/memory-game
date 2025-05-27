import React from "react";
import { cn } from "@/lib/utils";

interface PlayerScoreDisplayProps {
  playerId: number;
  playerName?: string;
  score: number;
  isCurrentPlayer: boolean;
}

const PlayerScoreDisplay: React.FC<PlayerScoreDisplayProps> = ({
  playerId,
  playerName,
  score,
  isCurrentPlayer,
}) => {
  const label = playerName || `P${playerId}`;

  return (
    <div
      className={cn(
        "rounded-lg px-4 py-2 flex flex-col items-center justify-center min-w-[70px] md:min-w-[80px] relative",
        isCurrentPlayer
          ? "bg-yellow-500 text-white"
          : "bg-slate-200 text-slate-700"
      )}
    >
      {isCurrentPlayer && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-yellow-500"></div>
      )}
      <span className="text-xs font-medium uppercase">{label}</span>
      <span className="text-2xl font-bold">{score}</span>
    </div>
  );
};

export default PlayerScoreDisplay;
