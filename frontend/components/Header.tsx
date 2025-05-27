"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useGameStore } from "@/store/gameStore";

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const resetGame = useGameStore((s) => s.resetGame);

  const showPlayPageActions = pathname === "/play";

  return (
    <header className="w-full flex items-center justify-between px-8 pt-8 pb-4 bg-slate-100 fixed top-0 left-0 z-50">
      <h1 className="text-2xl font-bold text-slate-800">memory</h1>
      <div style={{ minWidth: 220, height: 40 }}>
        {showPlayPageActions ? (
          <div className="flex gap-4">
            <Button
              className="rounded-full cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 shadow-none text-base"
              onClick={resetGame}
            >
              Restart
            </Button>
            <Button
              className="rounded-full cursor-pointer bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold px-6 py-2 shadow-none text-base"
              onClick={() => router.push("/")}
            >
              New Game
            </Button>
          </div>
        ) : (
          <div aria-hidden="true" />
        )}
      </div>
    </header>
  );
};

export default Header;
