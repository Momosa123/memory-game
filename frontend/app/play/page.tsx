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
  const maxTime = useGameStore((s) => s.gameOptions.maxTime) ?? 60;
  // Timer state
  const [remaining, setRemaining] = useState(maxTime);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const prevIsGameOver = useRef(isGameOver);
  const [timeUp, setTimeUp] = useState(false);

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
          },
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

  // Gère le timer à rebours : démarre au début, stoppe à la fin
  useEffect(() => {
    if (isSolo && !isGameOver && maxTime > 0) {
      if (!timerRef.current) {
        timerRef.current = setInterval(() => {
          setRemaining((t) => t - 1);
        }, 1000);
      }
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    // Reset timer si nouvelle partie
    if (!isGameOver && prevIsGameOver.current) {
      setRemaining(maxTime);
      setTimeUp(false);
    }
    prevIsGameOver.current = isGameOver;
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isSolo, isGameOver, maxTime]);

  // Si temps écoulé, termine la partie
  useEffect(() => {
    if (isSolo && !isGameOver && remaining <= 0) {
      setTimeUp(true);
      // Déclenche la fin de partie
      setTimeout(() => {
        window.location.reload(); // ou router.push('/results') si tu veux aller direct aux résultats
      }, 2000);
    }
  }, [isSolo, isGameOver, remaining]);

  // Format mm:ss
  function formatTime(sec: number) {
    const m = Math.floor(Math.max(0, sec) / 60)
      .toString()
      .padStart(1, "0");
    const s = (Math.max(0, sec) % 60).toString().padStart(2, "0");
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
              <span className="text-slate-500 text-sm font-medium">
                Temps restant
              </span>
              <span
                className={`text-xl font-bold ${remaining <= 10 ? "text-red-600 animate-pulse" : "text-slate-800"}`}
              >
                {formatTime(remaining)}
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
      {timeUp && !isGameOver && (
        <div className="mt-8 p-4 bg-red-100 text-red-800 rounded shadow text-xl font-bold text-center">
          ⏰ Temps écoulé !
        </div>
      )}
    </div>
  );
}
