"use client";
import React from "react";
import { useGameStore } from "@/store/gameStore";
import { useRouter } from "next/navigation";
import { ResultsDisplay } from "@components/index";

export default function ResultsPage() {
  const players = useGameStore((s) => s.players);
  const moves = useGameStore((s) => s.moves);
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-green-800">Résultats</h1>
      <ResultsDisplay
        players={players}
        moves={moves}
        onBackToHome={() => router.push("/")}
      />
    </main>
  );
}
