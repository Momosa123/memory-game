import React from "react";
import type { Theme } from "../lib/types";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface SettingsFormProps {
  size: number;
  setSize: (size: number) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  numPlayers: number;
  setNumPlayers: (n: number) => void;
  maxTime: number;
  setMaxTime: (n: number) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const gridSizes = [2, 4, 6];
const themes: Theme[] = ["numbers", "icons"];
const playerCounts = [1, 2, 3, 4];

const themeLabels: Record<Theme, string> = {
  numbers: "Numbers",
  icons: "Icons",
};

const SettingsForm: React.FC<SettingsFormProps> = ({
  size,
  setSize,
  theme,
  setTheme,
  numPlayers,
  setNumPlayers,
  maxTime,
  setMaxTime,
  onSubmit,
}) => {
  const buttonBaseClass =
    "w-full py-3 md:py-3.5 rounded-full font-semibold text-base md:text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500";
  const activeButtonClass = "bg-slate-700 text-white hover:bg-slate-800";
  const inactiveButtonClass = "bg-slate-200 text-slate-700 hover:bg-slate-300";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 md:gap-8">
      {/* Sélecteur de thème */}
      <div>
        <label className="block text-base md:text-lg font-medium mb-2 md:mb-3 text-slate-600">
          Select Theme
        </label>
        <div className="grid grid-cols-2 gap-4 md:gap-5">
          {themes.map((t) => (
            <Button
              key={t}
              type="button"
              aria-pressed={theme === t}
              onClick={() => setTheme(t)}
              className={cn(
                buttonBaseClass,
                theme === t ? activeButtonClass : inactiveButtonClass
              )}
            >
              {themeLabels[t]}
            </Button>
          ))}
        </div>
      </div>
      {/* Sélecteur du nombre de joueurs */}
      <div>
        <label className="block text-base md:text-lg font-medium mb-2 md:mb-3 text-slate-600">
          Number of Players
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5">
          {playerCounts.map((n) => (
            <Button
              key={n}
              type="button"
              aria-pressed={numPlayers === n}
              onClick={() => setNumPlayers(n)}
              className={cn(
                buttonBaseClass,
                numPlayers === n ? activeButtonClass : inactiveButtonClass
              )}
            >
              {n}
            </Button>
          ))}
        </div>
      </div>
      {/* Sélecteur de taille de grille */}
      <div>
        <label className="block text-base md:text-lg font-medium mb-2 md:mb-3 text-slate-600">
          Grid Size
        </label>
        <div className="grid grid-cols-2 gap-4 md:gap-5">
          {gridSizes.map((s) => (
            <Button
              key={s}
              type="button"
              aria-pressed={size === s}
              onClick={() => setSize(s)}
              className={cn(
                buttonBaseClass,
                size === s ? activeButtonClass : inactiveButtonClass
              )}
            >
              {s}x{s}
            </Button>
          ))}
        </div>
      </div>
      {/* Champ temps max en solo */}
      {numPlayers === 1 && (
        <div>
          <label
            className="block text-base md:text-lg font-medium mb-2 md:mb-3 text-slate-600"
            htmlFor="maxTime"
          >
            Temps max (secondes)
          </label>
          <input
            id="maxTime"
            type="number"
            min={10}
            max={999}
            value={maxTime}
            onChange={(e) => setMaxTime(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>
      )}
      <Button
        type="submit"
        className="mt-4 md:mt-6 w-full py-3.5 md:py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-lg md:text-xl rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
      >
        Start Game
      </Button>
    </form>
  );
};

export default SettingsForm;
