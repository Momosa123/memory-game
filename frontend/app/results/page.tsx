"use client";
import React from "react";
import { useGameStore } from "@/store/gameStore";
import { useRouter, useSearchParams } from "next/navigation";
import { ResultsDisplay } from "@components/index";
import { useTopScores } from "@/hooks/useTopScores";
import { useScoreStats } from "@/hooks/useScoreStats";
import type { ScoreRead } from "@/lib/types";

export default function ResultsPage() {
  const players = useGameStore((s) => s.players);
  const moves = useGameStore((s) => s.moves);
  const router = useRouter();
  const searchParams = useSearchParams();
  const timeout = searchParams.get("timeout") === "1";

  const { data: topScores, isLoading: loadingTop } = useTopScores();
  const { data: stats, isLoading: loadingStats } = useScoreStats();

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-100 pt-24">
      <h1 className="text-3xl font-bold mb-10 text-slate-800 text-center">
        Results
      </h1>
      {timeout && (
        <div className="mb-6 p-4 bg-red-100 text-red-800 rounded shadow text-lg font-bold text-center">
          ⏰ Times up! You lost the game.
        </div>
      )}
      <div className="flex flex-col md:flex-row items-start justify-center gap-8 w-full max-w-5xl px-4">
        {!timeout && (
          <ResultsDisplay
            players={players}
            moves={moves}
            onBackToHome={() => router.push("/")}
          />
        )}

        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-slate-600">
            Top 10 Scores
          </h2>
          {loadingTop ? (
            <div>Loading top 10...</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {topScores?.map((score: ScoreRead) => (
                <li
                  key={score.id}
                  className="py-2 flex justify-between text-slate-600"
                >
                  <span>{score.player}</span>
                  <span>{score.score}</span>
                </li>
              ))}
            </ul>
          )}
          <h2 className="text-xl font-semibold mt-6 mb-2 text-slate-600">
            Global Statistics
          </h2>
          {loadingStats ? (
            <div>Loading stats...</div>
          ) : stats ? (
            <ul className="text-slate-700">
              <li>Number of games: {stats.count}</li>
              <li>Highest score: {stats.max}</li>
              <li>Lowest score: {stats.min}</li>
              <li>Average score: {stats.avg?.toFixed(2)}</li>
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}
