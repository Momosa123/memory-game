"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useGameStore } from "@/store/gameStore";

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const resetGame = useGameStore((s) => s.resetGame);
  const [menuOpen, setMenuOpen] = useState(false);

  const showPlayPageActions = pathname === "/play";

  return (
    <header className="w-full flex items-center justify-between px-4 md:px-8 pt-8 pb-4 bg-slate-100 fixed top-0 left-0 z-50">
      <h1 className="text-2xl font-bold text-slate-800">memory</h1>
      <div style={{ minWidth: 220, height: 40 }}>
        {showPlayPageActions ? (
          <>
            {/* Desktop: boutons visibles */}
            <div className="hidden md:flex gap-4">
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
            {/* Mobile: bouton menu */}
            <div className="flex md:hidden w-full">
              <div className="ml-auto">
                <Button
                  className="rounded-full bg-yellow-500 text-white font-semibold px-6 py-2 shadow-none text-base"
                  onClick={() => setMenuOpen(true)}
                >
                  Menu
                </Button>
              </div>
              {/* Modale simple */}
              {menuOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                  <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4 min-w-[220px]">
                    <Button
                      className="bg-yellow-500 text-white font-semibold"
                      onClick={() => {
                        resetGame();
                        setMenuOpen(false);
                      }}
                    >
                      Restart
                    </Button>
                    <Button
                      className="bg-slate-200 text-slate-700 font-semibold"
                      onClick={() => {
                        router.push("/");
                        setMenuOpen(false);
                      }}
                    >
                      New Game
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setMenuOpen(false)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div aria-hidden="true" />
        )}
      </div>
    </header>
  );
};

export default Header;
