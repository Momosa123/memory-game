"use client";
import React from "react";
import { useGameStore } from "../../store/gameStore";
import { useRouter } from "next/navigation";

export default function ResultsPage() {
  const players = useGameStore((s) => s.players);
  const moves = useGameStore((s) => s.moves);
  const router = useRouter();

  // Trouver le(s) gagnant(s)
  const maxScore = Math.max(...players.map((p) => p.score));
  const winners = players.filter((p) => p.score === maxScore);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-green-800">Résultats</h1>
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col gap-4 w-full max-w-md items-center">
        <div className="mb-4">
          <span className="font-semibold text-lg text-indigo-700">
            Nombre de coups :
          </span>
          <span className="ml-2 text-lg">{moves}</span>
        </div>
        <div className="mb-4 w-full">
          <h2 className="font-semibold mb-2 text-indigo-800">
            Scores des joueurs
          </h2>
          <ul className="flex flex-col gap-2">
            {players.map((p) => (
              <li
                key={p.id}
                className={`px-3 py-2 rounded text-lg flex items-center justify-between ${winners.some((w) => w.id === p.id) ? "bg-green-200 font-bold text-green-800" : "bg-gray-100 text-indigo-700"}`}
              >
                Joueur {p.id}
                <span>{p.score}</span>
              </li>
            ))}
          </ul>
        </div>
        {winners.length === 1 ? (
          <div className="text-xl font-bold text-green-700">
            🏆 Joueur {winners[0].id} gagne !
          </div>
        ) : (
          <div className="text-xl font-bold text-green-700">
            🏆 Égalité entre les joueurs {winners.map((w) => w.id).join(", ")} !
          </div>
        )}
        <button
          className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          onClick={() => router.push("/")}
        >
          Retour à l&apos;accueil
        </button>
      </div>
    </main>
  );
}
