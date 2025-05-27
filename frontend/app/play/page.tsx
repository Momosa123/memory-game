"use client";
import React, { useEffect, useRef, useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { useRouter } from "next/navigation";
import { GameBoard } from "@components/index";
import PlayerScoreDisplay from "@/components/PlayerScoreDisplay";

import { useCreateScore } from "@/hooks/useCreateScore";

export default function PlayPage() {
  const players = useGameStore((s) => s.players);
  const currentPlayerId = useGameStore((s) => s.currentPlayerId);
  const moves = useGameStore((s) => s.moves);
  const isGameOver = useGameStore((s) => s.isGameOver);

  const router = useRouter();
  const createScore = useCreateScore();
  const hasPostedScore = useRef(false);
  const isSolo = players.length === 1;
  // Timer state
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const prevIsGameOver = useRef(isGameOver);

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

  // Gère le timer : démarre au début, stoppe à la fin
  useEffect(() => {
    if (isSolo && !isGameOver) {
      // Démarre le timer
      if (!timerRef.current) {
        timerRef.current = setInterval(() => {
          setElapsed((t) => t + 1);
        }, 1000);
      }
    } else {
      // Stoppe le timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    // Reset timer si nouvelle partie
    if (!isGameOver && prevIsGameOver.current) {
      setElapsed(0);
    }
    prevIsGameOver.current = isGameOver;
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isSolo, isGameOver]);

  // Format mm:ss
  function formatTime(sec: number) {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(1, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <div className="flex flex-col flex-1 items-center justify-center w-full max-w-full pt-4">
        <GameBoard
          board={useGameStore((s) => s.board)}
          onCardClick={useGameStore((s) => s.selectCard)}
        />
        {/* Affichage des scores des joueurs */}
        {players.length > 1 && (
          <div className="flex gap-3 md:gap-4 mt-8">
            {players.map((player) => (
              <PlayerScoreDisplay
                key={player.id}
                playerId={player.id}
                score={player.score}
                isCurrentPlayer={player.id === currentPlayerId}
              />
            ))}
          </div>
        )}
        {/* Infos moves/time */}
        <div className="flex gap-4 mt-8">
          {isSolo && (
            <div className="bg-slate-200 rounded-xl px-8 py-3 flex flex-col items-center min-w-[120px]">
              <span className="text-slate-500 text-sm font-medium">Time</span>
              <span className="text-slate-800 text-xl font-bold">
                {formatTime(elapsed)}
              </span>
            </div>
          )}
          {isSolo && (
            <div className="bg-slate-200 rounded-xl px-8 py-3 flex flex-col items-center min-w-[120px]">
              <span className="text-slate-500 text-sm font-medium">Moves</span>
              <span className="text-slate-800 text-xl font-bold">{moves}</span>
            </div>
          )}
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
