"use client";
import React, { useEffect, useRef } from "react";
import { useGameStore } from "@/store/gameStore";
import { useRouter } from "next/navigation";
import { GameBoard } from "@components/index";

import { useCreateScore } from "@/hooks/useCreateScore";

export default function PlayPage() {
  const players = useGameStore((s) => s.players);
  const moves = useGameStore((s) => s.moves);
  const isGameOver = useGameStore((s) => s.isGameOver);

  const router = useRouter();
  const createScore = useCreateScore();
  const hasPostedScore = useRef(false);

  useEffect(() => {
    if (isGameOver && !hasPostedScore.current) {
      hasPostedScore.current = true;
      const maxScore = Math.max(...players.map((p) => p.score));
      const winner = players.find((p) => p.score === maxScore);
      if (winner) {
        createScore.mutate(
          { player: `Joueur ${winner.id}`, score: winner.score },
          {
            onSettled: () => {
              setTimeout(() => {
                router.push("/results");
              }, 1500);
            },
          }
        );
      } else {
        setTimeout(() => {
          router.push("/results");
        }, 1500);
      }
    }
    if (!isGameOver) {
      hasPostedScore.current = false;
    }
  }, [isGameOver, players, createScore, router]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* Plateau */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <GameBoard
          board={useGameStore((s) => s.board)}
          onCardClick={useGameStore((s) => s.selectCard)}
        />
        {/* Infos moves/time */}
        <div className="flex gap-4 mt-10">
          <div className="bg-slate-200 rounded-xl px-8 py-3 flex flex-col items-center min-w-[120px]">
            <span className="text-slate-500 text-sm font-medium">Time</span>
            <span className="text-slate-800 text-xl font-bold">0:00</span>
          </div>
          <div className="bg-slate-200 rounded-xl px-8 py-3 flex flex-col items-center min-w-[120px]">
            <span className="text-slate-500 text-sm font-medium">Moves</span>
            <span className="text-slate-800 text-xl font-bold">{moves}</span>
          </div>
        </div>
      </div>
      {isGameOver && (
        <div className="mt-8 p-4 bg-green-100 text-green-800 rounded shadow text-xl font-bold text-center">
          🎉 Partie terminée !
        </div>
      )}
    </div>
  );
}
