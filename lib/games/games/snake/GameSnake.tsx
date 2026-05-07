"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SIZE = 20;
const TICK_MS = 110;
type Cell = { x: number; y: number };
type Dir = "U" | "D" | "L" | "R";

const DIR_VEC: Record<Dir, Cell> = {
  U: { x: 0, y: -1 },
  D: { x: 0, y: 1 },
  L: { x: -1, y: 0 },
  R: { x: 1, y: 0 },
};

const OPPOSITE: Record<Dir, Dir> = { U: "D", D: "U", L: "R", R: "L" };

function randomCell(exclude: Cell[]): Cell {
  const excludeKeys = new Set(exclude.map((c) => `${c.x},${c.y}`));
  const empties: Cell[] = [];
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      if (!excludeKeys.has(`${x},${y}`)) empties.push({ x, y });
    }
  }
  // Snake filled the entire board: nothing to spawn. Return a sentinel; the
  // caller still tracks state correctly (food check uses equality, snake won't
  // grow). Practically unreachable on a 20×20 grid.
  if (empties.length === 0) return { x: 0, y: 0 };
  return empties[Math.floor(Math.random() * empties.length)];
}

function initialSnake(): Cell[] {
  return [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ];
}

const BEST_KEY = "game-snake-best";

export default function GameSnake() {
  const [snake, setSnake] = useState<Cell[]>(() => initialSnake());
  const [food, setFood] = useState<Cell | null>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [over, setOver] = useState(false);
  const [paused, setPaused] = useState(false);

  const snakeRef = useRef<Cell[]>(initialSnake());
  const foodRef = useRef<Cell | null>(null);
  const dirRef = useRef<Dir>("R");
  const queueRef = useRef<Dir[]>([]);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const f = randomCell(initialSnake());
    foodRef.current = f;
    setFood(f);
    const stored = Number(localStorage.getItem(BEST_KEY) ?? "0");
    if (Number.isFinite(stored)) setBest(stored);
  }, []);

  useEffect(() => {
    if (score > best) {
      setBest(score);
      try {
        localStorage.setItem(BEST_KEY, String(score));
      } catch {
        /* ignore */
      }
    }
  }, [score, best]);

  const reset = useCallback(() => {
    const s = initialSnake();
    snakeRef.current = s;
    setSnake(s);
    const f = randomCell(s);
    foodRef.current = f;
    setFood(f);
    dirRef.current = "R";
    queueRef.current = [];
    setScore(0);
    setOver(false);
    setPaused(false);
  }, []);

  useEffect(() => {
    if (over || paused) return;
    const id = setInterval(() => {
      let next = dirRef.current;
      while (queueRef.current.length) {
        const candidate = queueRef.current.shift()!;
        if (candidate !== OPPOSITE[next]) {
          next = candidate;
          break;
        }
      }
      dirRef.current = next;

      const prev = snakeRef.current;
      const f = foodRef.current;
      const head = prev[0];
      const v = DIR_VEC[next];
      const newHead = { x: head.x + v.x, y: head.y + v.y };

      if (newHead.x < 0 || newHead.x >= SIZE || newHead.y < 0 || newHead.y >= SIZE) {
        setOver(true);
        return;
      }
      if (prev.slice(0, -1).some((c) => c.x === newHead.x && c.y === newHead.y)) {
        setOver(true);
        return;
      }

      const ate = f && newHead.x === f.x && newHead.y === f.y;
      const ns = ate ? [newHead, ...prev] : [newHead, ...prev.slice(0, -1)];
      snakeRef.current = ns;
      setSnake(ns);
      if (ate) {
        setScore((s) => s + 1);
        const nf = randomCell(ns);
        foodRef.current = nf;
        setFood(nf);
      }
    }, TICK_MS);
    return () => clearInterval(id);
  }, [over, paused]);

  useEffect(() => {
    const map: Record<string, Dir> = {
      ArrowUp: "U", ArrowDown: "D", ArrowLeft: "L", ArrowRight: "R",
      w: "U", s: "D", a: "L", d: "R", W: "U", S: "D", A: "L", D: "R",
    };
    const onKey = (e: KeyboardEvent) => {
      // Don't hijack keys when an interactive element (e.g. the BACK TO ARCADE
      // link) has focus — the user is trying to navigate, not play.
      const tag = (document.activeElement?.tagName ?? "").toLowerCase();
      if (tag === "a" || tag === "input" || tag === "textarea" || tag === "select") return;
      if (e.key === " ") {
        e.preventDefault();
        if (over) reset();
        else setPaused((p) => !p);
        return;
      }
      const nd = map[e.key];
      if (nd) {
        e.preventDefault();
        queueRef.current.push(nd);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [over, reset]);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    if (Math.abs(dx) < 24 && Math.abs(dy) < 24) {
      touchStart.current = null;
      return;
    }
    if (Math.abs(dx) > Math.abs(dy)) queueRef.current.push(dx > 0 ? "R" : "L");
    else queueRef.current.push(dy > 0 ? "D" : "U");
    touchStart.current = null;
  };

  const headSet = new Set([`${snake[0].x},${snake[0].y}`]);
  const bodySet = new Set(snake.slice(1).map((c) => `${c.x},${c.y}`));

  return (
    <div className="flex flex-col items-center gap-4 select-none">
      <div className="flex items-center gap-3 w-full max-w-md">
        <ScorePill label="SCORE" value={score} />
        <ScorePill label="BEST" value={best} />
        <button
          type="button"
          onClick={() => {
            if (over) return;
            setPaused((p) => !p);
          }}
          disabled={over}
          aria-label={paused ? "Resume" : "Pause"}
          className="ml-auto bg-p5-white text-p5-black font-display font-black tracking-tight px-4 py-2 touch-manipulation disabled:opacity-40 hover:-rotate-2 transition-transform"
          style={{ clipPath: "polygon(6% 0, 100% 4%, 94% 100%, 0 96%)" }}
        >
          {paused ? "PLAY" : "PAUSE"}
        </button>
        <button
          type="button"
          onClick={reset}
          className="bg-p5-yellow text-p5-black font-display font-black tracking-tight px-4 py-2 touch-manipulation hover:-rotate-2 transition-transform"
          style={{ clipPath: "polygon(6% 0, 100% 4%, 94% 100%, 0 96%)" }}
        >
          NEW GAME
        </button>
      </div>

      <div
        role="grid"
        aria-label="Snake board"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative bg-p5-black p-2 grid gap-[2px] w-full max-w-md aspect-square shadow-p5-yellow touch-none"
        style={{ gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: SIZE * SIZE }).map((_, i) => {
          const x = i % SIZE;
          const y = Math.floor(i / SIZE);
          const key = `${x},${y}`;
          const isHead = headSet.has(key);
          const isBody = bodySet.has(key);
          const isFood = food && food.x === x && food.y === y;
          let cls = "bg-p5-bg/40";
          if (isHead) cls = "bg-p5-yellow";
          else if (isBody) cls = "bg-p5-magenta";
          else if (isFood) cls = "bg-p5-white";
          return <div key={key} className={cls} />;
        })}

        {(over || paused) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-p5-bg/85 backdrop-blur-sm">
            <div className="font-display font-black text-3xl sm:text-5xl text-p5-yellow">
              {over ? "GAME OVER" : "PAUSED"}
            </div>
            <div className="mt-2 font-label text-p5-fg">
              {over ? `Final score: ${score}` : "Tap PLAY to resume"}
            </div>
            {over ? (
              <button
                type="button"
                onClick={reset}
                className="mt-4 bg-p5-magenta text-p5-white font-display font-black tracking-tight px-4 py-2 touch-manipulation hover:bg-p5-yellow hover:text-p5-black transition-colors"
                style={{ clipPath: "polygon(6% 0, 100% 4%, 94% 100%, 0 96%)" }}
              >
                PLAY AGAIN
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setPaused(false)}
                className="mt-4 bg-p5-yellow text-p5-black font-display font-black tracking-tight px-4 py-2 touch-manipulation hover:-rotate-2 transition-transform"
                style={{ clipPath: "polygon(6% 0, 100% 4%, 94% 100%, 0 96%)" }}
              >
                RESUME
              </button>
            )}
          </div>
        )}
      </div>

      <p className="font-label text-xs sm:text-sm text-p5-fg-muted text-center max-w-md">
        Arrow keys / WASD on desktop. Swipe on mobile. Space or PAUSE button to pause.
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
