"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SIZE = 4;
type Board = number[][];
type Dir = "left" | "right" | "up" | "down";

function emptyBoard(): Board {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

function clone(b: Board): Board {
  return b.map((r) => [...r]);
}

function spawn(b: Board): Board {
  const empties: [number, number][] = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (b[r][c] === 0) empties.push([r, c]);
    }
  }
  if (empties.length === 0) return b;
  const [r, c] = empties[Math.floor(Math.random() * empties.length)];
  const next = clone(b);
  next[r][c] = Math.random() < 0.9 ? 2 : 4;
  return next;
}

function compressLeft(row: number[]): { row: number[]; gain: number } {
  const filtered = row.filter((v) => v !== 0);
  const merged: number[] = [];
  let gain = 0;
  for (let i = 0; i < filtered.length; i++) {
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      const v = filtered[i] * 2;
      merged.push(v);
      gain += v;
      i++;
    } else {
      merged.push(filtered[i]);
    }
  }
  while (merged.length < SIZE) merged.push(0);
  return { row: merged, gain };
}

function transpose(b: Board): Board {
  return b[0].map((_, c) => b.map((r) => r[c]));
}

function reverseRows(b: Board): Board {
  return b.map((r) => [...r].reverse());
}

function move(b: Board, dir: Dir): { board: Board; gain: number; changed: boolean } {
  let working = b;
  if (dir === "right") working = reverseRows(working);
  else if (dir === "up") working = transpose(working);
  else if (dir === "down") working = transpose(reverseRows(working));

  let gain = 0;
  const moved = working.map((row) => {
    const { row: nr, gain: g } = compressLeft(row);
    gain += g;
    return nr;
  });

  let result = moved;
  if (dir === "right") result = reverseRows(result);
  else if (dir === "up") result = transpose(result);
  else if (dir === "down") result = reverseRows(transpose(result));

  const changed = !sameBoard(b, result);
  return { board: result, gain, changed };
}

function sameBoard(a: Board, b: Board): boolean {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (a[r][c] !== b[r][c]) return false;
    }
  }
  return true;
}

function isGameOver(b: Board): boolean {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (b[r][c] === 0) return false;
      if (c + 1 < SIZE && b[r][c] === b[r][c + 1]) return false;
      if (r + 1 < SIZE && b[r][c] === b[r + 1][c]) return false;
    }
  }
  return true;
}

function hasWon(b: Board): boolean {
  for (const row of b) {
    for (const v of row) {
      if (v >= 2048) return true;
    }
  }
  return false;
}

function newGame(): Board {
  return spawn(spawn(emptyBoard()));
}

const TILE_STYLES: Record<number, string> = {
  0: "bg-p5-bg/30",
  2: "bg-p5-white text-p5-black",
  4: "bg-p5-fg text-p5-black",
  8: "bg-p5-yellow text-p5-black",
  16: "bg-p5-yellow text-p5-black",
  32: "bg-p5-magenta text-p5-white",
  64: "bg-p5-magenta text-p5-white",
  128: "bg-p5-magenta-deep text-p5-yellow",
  256: "bg-p5-magenta-deep text-p5-yellow",
  512: "bg-p5-black text-p5-magenta",
  1024: "bg-p5-black text-p5-yellow",
  2048: "bg-p5-yellow text-p5-magenta-deep",
};

const BEST_KEY = "game-2048-best";

export default function Game2048() {
  // Start empty to avoid hydration mismatch (Math.random in spawn).
  // Real board is generated client-side in the mount effect.
  const [board, setBoard] = useState<Board>(() => emptyBoard());
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [over, setOver] = useState(false);
  const [won, setWon] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setBoard(newGame());
    const stored = Number(localStorage.getItem(BEST_KEY) ?? "0");
    if (Number.isFinite(stored)) setBest(stored);
  }, []);

  useEffect(() => {
    if (score > best) {
      setBest(score);
      try {
        localStorage.setItem(BEST_KEY, String(score));
      } catch {
        // localStorage might be unavailable (private mode); ignore.
      }
    }
  }, [score, best]);

  const handleMove = useCallback(
    (dir: Dir) => {
      if (over) return;
      setBoard((prev) => {
        const { board: moved, gain, changed } = move(prev, dir);
        if (!changed) return prev;
        const next = spawn(moved);
        if (gain > 0) setScore((s) => s + gain);
        if (hasWon(next)) setWon(true);
        if (isGameOver(next)) setOver(true);
        return next;
      });
    },
    [over]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Don't hijack keys when an interactive element (e.g. the BACK TO ARCADE
      // link) has focus — the user is trying to navigate, not play.
      const tag = (document.activeElement?.tagName ?? "").toLowerCase();
      if (tag === "a" || tag === "input" || tag === "textarea" || tag === "select") return;
      const map: Record<string, Dir> = {
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "up",
        ArrowDown: "down",
        a: "left",
        d: "right",
        w: "up",
        s: "down",
        A: "left",
        D: "right",
        W: "up",
        S: "down",
      };
      const dir = map[e.key];
      if (!dir) return;
      e.preventDefault();
      handleMove(dir);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleMove]);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    const min = 24;
    if (Math.abs(dx) < min && Math.abs(dy) < min) {
      touchStart.current = null;
      return;
    }
    if (Math.abs(dx) > Math.abs(dy)) handleMove(dx > 0 ? "right" : "left");
    else handleMove(dy > 0 ? "down" : "up");
    touchStart.current = null;
  };

  const reset = () => {
    setBoard(newGame());
    setScore(0);
    setOver(false);
    setWon(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 select-none">
      <div className="flex items-center gap-3 w-full max-w-md">
        <ScorePill label="SCORE" value={score} />
        <ScorePill label="BEST" value={best} />
        <button
          type="button"
          onClick={reset}
          className="ml-auto bg-p5-yellow text-p5-black font-display font-black tracking-tight px-4 py-2 touch-manipulation hover:-rotate-2 transition-transform"
          style={{ clipPath: "polygon(6% 0, 100% 4%, 94% 100%, 0 96%)" }}
        >
          NEW GAME
        </button>
      </div>

      {won && !over && (
        <div
          className="bg-p5-yellow text-p5-black px-3 py-1 font-display font-black uppercase text-sm -rotate-1"
          style={{ clipPath: "polygon(4% 0, 100% 0, 96% 100%, 0 100%)" }}
        >
          ★ 2048 reached — All-Out Attack ★
        </div>
      )}

      <div
        role="grid"
        aria-label="2048 board"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative bg-p5-black p-2 sm:p-3 grid grid-cols-4 gap-2 sm:gap-3 w-full max-w-md aspect-square shadow-p5-yellow touch-none"
      >
        {board.flatMap((row, r) =>
          row.map((v, c) => (
            <div
              key={`${r}-${c}`}
              className={`flex items-center justify-center font-display font-black text-xl sm:text-3xl ${
                TILE_STYLES[v] ?? "bg-p5-yellow text-p5-magenta-deep"
              }`}
              style={{ clipPath: "polygon(4% 0, 100% 3%, 96% 100%, 0 97%)" }}
            >
              {v !== 0 && v}
            </div>
          ))
        )}

        {over && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-p5-bg/85 backdrop-blur-sm">
            <div className="font-display font-black text-3xl sm:text-5xl text-p5-yellow">
              GAME OVER
            </div>
            <div className="mt-2 font-label text-p5-fg">No moves left.</div>
            <button
              type="button"
              onClick={reset}
              className="mt-4 bg-p5-magenta text-p5-white font-display font-black tracking-tight px-4 py-2 touch-manipulation hover:bg-p5-yellow hover:text-p5-black transition-colors"
              style={{ clipPath: "polygon(6% 0, 100% 4%, 94% 100%, 0 96%)" }}
            >
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>

      <p className="font-label text-xs sm:text-sm text-p5-fg-muted text-center max-w-md">
        Arrow keys / WASD on desktop. Swipe on mobile. Match same-numbered tiles to merge.
      </p>
    </div>
  );
}

function ScorePill({ label, value }: { label: string; value: number }) {
  return (
    <div
      className="bg-p5-magenta text-p5-white px-3 py-1.5 min-w-[80px]"
      style={{ clipPath: "polygon(4% 0, 100% 3%, 96% 100%, 0 97%)" }}
    >
      <div className="font-label text-[10px] tracking-widest opacity-90">{label}</div>
      <div className="font-display font-black text-xl leading-none">{value}</div>
    </div>
  );
}
