"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/gameStore";
import type { Theme } from "@/lib/types";
import { SettingsForm } from "@components/index";
import Header from "@/components/Header";

export default function HomePage() {
  const router = useRouter();
  const startGame = useGameStore((s) => s.startGame);

  // États locaux pour le formulaire
  const [size, setSize] = useState(4);
  const [theme, setTheme] = useState<Theme>("numbers");
  const [numPlayers, setNumPlayers] = useState(1);
  const [maxTime, setMaxTime] = useState(60);

  // Remet maxTime à 60 si on passe en multi
  const handleNumPlayers = (n: number) => {
    setNumPlayers(n);
    if (n !== 1) setMaxTime(60);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startGame({
      size,
      theme,
      numPlayers,
      maxTime: numPlayers === 1 ? maxTime : undefined,
    });
    router.push("/play");
  };

  return (
    <section className="flex flex-1 flex-col items-center justify-start  pb-10 md:justify-center w-full px-4">
      <Header />
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 w-full max-w-md md:max-w-lg">
        <SettingsForm
          size={size}
          setSize={setSize}
          theme={theme}
          setTheme={setTheme}
          numPlayers={numPlayers}
          setNumPlayers={handleNumPlayers}
          maxTime={maxTime}
          setMaxTime={setMaxTime}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}
