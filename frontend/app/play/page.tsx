"use client";
import React, { useEffect, useRef } from "react";
import { useGameStore } from "@/store/gameStore";
import { useRouter } from "next/navigation";
import { PlayerScore, GameInfo, GameBoard } from "@components/index";
import { Button } from "@components/ui/button";
import { useCreateScore } from "@/hooks/useCreateScore";

export default function PlayPage() {
  const players = useGameStore((s) => s.players);
  const currentPlayerId = useGameStore((s) => s.currentPlayerId);
  const moves = useGameStore((s) => s.moves);
  const isGameOver = useGameStore((s) => s.isGameOver);
  const resetGame = useGameStore((s) => s.resetGame);
  const router = useRouter();
  const createScore = useCreateScore();
  const hasPostedScore = useRef(false);

  useEffect(() => {
    if (isGameOver && !hasPostedScore.current) {
      hasPostedScore.current = true;
      // On prend le joueur gagnant (ou le premier en cas d'égalité)
      const maxScore = Math.max(...players.map((p) => p.score));
      const winner = players.find((p) => p.score === maxScore);
      if (winner) {
        createScore.mutate(
          { player: `Joueur ${winner.id}`, score: winner.score },
          {
            onSettled: () => {
              setTimeout(() => {
                router.push("/results");
              }, 1500); // Laisse le temps d'afficher le message de fin
            },
          }
        );
      } else {
        // Fallback : pas de gagnant trouvé
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
