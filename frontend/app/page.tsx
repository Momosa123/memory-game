"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/gameStore";
import type { Theme } from "@/lib/types";
import SettingsForm from "../components/SettingsForm";

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
      <SettingsForm
        size={size}
        setSize={setSize}
        theme={theme}
        setTheme={setTheme}
        numPlayers={numPlayers}
        setNumPlayers={setNumPlayers}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
