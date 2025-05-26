"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/gameStore";
import type { Theme } from "@/lib/types";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const router = useRouter();
  const startGame = useGameStore((s) => s.startGame);

  // États locaux pour le formulaire
  const [size, setSize] = useState(4);
  const [theme, setTheme] = useState<Theme>("numbers");
  const [numPlayers, setNumPlayers] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startGame({ size, theme, numPlayers });
    router.push("/play");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <h1 className="text-4xl font-bold mb-8 text-indigo-800">
        Jeu de Mémoire
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8 flex flex-col gap-6 w-full max-w-md"
      >
        <div>
          <label className="block font-medium mb-1">Taille du plateau</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          >
            <option value={2}>2 x 2</option>
            <option value={4}>4 x 4</option>
            <option value={6}>6 x 6</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Thème</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={theme}
            onChange={(e) => setTheme(e.target.value as Theme)}
          >
            <option value="numbers">Nombres</option>
            <option value="icons">Icônes</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Nombre de joueurs</label>
          <input
            type="number"
            min={1}
            max={4}
            className="w-full border rounded px-3 py-2"
            value={numPlayers}
            onChange={(e) => setNumPlayers(Number(e.target.value))}
          />
        </div>
        <Button type="submit" className="mt-2">
          Démarrer la partie
        </Button>
      </form>
    </main>
  );
}
