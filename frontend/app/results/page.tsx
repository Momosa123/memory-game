"use client";
import React from "react";
import { useGameStore } from "@/store/gameStore";
import { useRouter } from "next/navigation";
import { ResultsDisplay } from "@components/index";
import { useTopScores } from "@/hooks/useTopScores";
import { useScoreStats } from "@/hooks/useScoreStats";
import type { ScoreRead } from "@/lib/api/scores";

export default function ResultsPage() {
  const players = useGameStore((s) => s.players);
  const moves = useGameStore((s) => s.moves);
  const router = useRouter();

  const { data: topScores, isLoading: loadingTop } = useTopScores();
  const { data: stats, isLoading: loadingStats } = useScoreStats();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-green-800">Résultats</h1>
      <ResultsDisplay
        players={players}
        moves={moves}
        onBackToHome={() => router.push("/")}
      />
      <div className="mt-8 w-full max-w-md bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-indigo-800">
          Top 10 des scores
        </h2>
        {loadingTop ? (
          <div>Chargement du top 10...</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {topScores?.map((score: ScoreRead) => (
              <li
                key={score.id}
                className="py-2 flex justify-between text-indigo-700"
              >
                <span>{score.player}</span>
                <span>{score.score}</span>
              </li>
            ))}
          </ul>
        )}
        <h2 className="text-xl font-semibold mt-6 mb-2 text-indigo-800">
          Statistiques globales
        </h2>
        {loadingStats ? (
          <div>Chargement des stats...</div>
        ) : stats ? (
          <ul className="text-indigo-700">
            <li>Nombre de parties : {stats.count}</li>
            <li>Score max : {stats.max}</li>
            <li>Score min : {stats.min}</li>
            <li>Score moyen : {stats.avg?.toFixed(2)}</li>
          </ul>
        ) : null}
      </div>
    </main>
  );
}
