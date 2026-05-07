"use client";
import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const loading = () => (
  <div className="font-label tracking-widest text-p5-fg-muted py-12 text-center">
    LOADING…
  </div>
);

const GAMES_MAP: Record<string, ComponentType> = {
  "2048": dynamic(() => import("../../../lib/games/games/2048/Game2048"), {
    ssr: false,
    loading,
  }),
  snake: dynamic(() => import("../../../lib/games/games/snake/GameSnake"), {
    ssr: false,
    loading,
  }),
  minesweeper: dynamic(
    () => import("../../../lib/games/games/minesweeper/GameMinesweeper"),
    { ssr: false, loading }
  ),
  memory: dynamic(() => import("../../../lib/games/games/memory/GameMemory"), {
    ssr: false,
    loading,
  }),
  tictactoe: dynamic(
    () => import("../../../lib/games/games/tictactoe/GameTicTacToe"),
    { ssr: false, loading }
  ),
  wordle: dynamic(() => import("../../../lib/games/games/wordle/GameWordle"), {
    ssr: false,
    loading,
  }),
};

export default function GameLoader({ slug }: { slug: string }) {
  const Game = GAMES_MAP[slug];
  if (!Game) return null;
  return <Game />;
}
