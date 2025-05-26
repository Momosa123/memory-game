"use client";
import React, { useEffect } from "react";
import { useGameStore } from "../../store/gameStore";
import { useRouter } from "next/navigation";
import { PlayerScore, GameInfo, GameBoard } from "@/components";
import { Button } from "../../components/ui/button";

export default function PlayPage() {
  const players = useGameStore((s) => s.players);
  const currentPlayerId = useGameStore((s) => s.currentPlayerId);
  const moves = useGameStore((s) => s.moves);
  const isGameOver = useGameStore((s) => s.isGameOver);
  const resetGame = useGameStore((s) => s.resetGame);
  const router = useRouter();

  useEffect(() => {
    if (isGameOver) {
      const timeout = setTimeout(() => {
        router.push("/results");
      }, 1500); // Laisse le temps d'afficher le message de fin
      return () => clearTimeout(timeout);
    }
  }, [isGameOver, router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 p-4">
      <h1 className="text-3xl font-bold mb-4 text-indigo-800">
        Plateau de jeu
      </h1>
      <GameInfo
        currentPlayerId={currentPlayerId}
        moves={moves}
        totalPlayers={players.length}
      />
      <div className="mb-4 flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex gap-4">
          {players.map((p) => (
            <PlayerScore
              key={p.id}
              id={p.id}
              score={p.score}
              isCurrent={currentPlayerId === p.id}
            />
          ))}
        </div>
      </div>
      <GameBoard
        board={useGameStore((s) => s.board)}
        onCardClick={useGameStore((s) => s.selectCard)}
      />
      <div className="mt-8 flex gap-4">
        <Button variant="outline" onClick={() => router.push("/")}>
          Retour à l&apos;accueil
        </Button>
        <Button onClick={resetGame}>Recommencer</Button>
      </div>
      {isGameOver && (
        <div className="mt-8 p-4 bg-green-100 text-green-800 rounded shadow text-xl font-bold">
          🎉 Partie terminée !
        </div>
      )}
    </main>
  );
}
