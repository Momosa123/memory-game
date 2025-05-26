import React from "react";
import type { Theme } from "../lib/types";
import { Button } from "./ui/button";

interface SettingsFormProps {
  size: number;
  setSize: (size: number) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  numPlayers: number;
  setNumPlayers: (n: number) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({
  size,
  setSize,
  theme,
  setTheme,
  numPlayers,
  setNumPlayers,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-lg shadow-lg p-8 flex flex-col gap-6 w-full max-w-md"
    >
      <div>
        <label className="block font-medium mb-1">Taille du plateau</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        >
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
  );
};

export default SettingsForm;
