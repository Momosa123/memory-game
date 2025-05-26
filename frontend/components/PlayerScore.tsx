import React from "react";
import { cn } from "../lib/utils";

interface PlayerScoreProps {
  id: number;
  score: number;
  isCurrent?: boolean;
}

const PlayerScore: React.FC<PlayerScoreProps> = ({ id, score, isCurrent }) => {
  return (
    <span
      className={cn(
        "px-3 py-1 rounded font-semibold text-lg border transition-colors",
        isCurrent
          ? "bg-indigo-600 text-white border-indigo-600 shadow"
          : "bg-white text-indigo-700 border",
      )}
      aria-current={isCurrent ? "true" : undefined}
    >
      Joueur {id} : {score}
    </span>
  );
};

export default PlayerScore;
