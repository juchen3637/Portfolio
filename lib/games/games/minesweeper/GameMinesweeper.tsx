"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const ROWS = 9;
const COLS = 9;
const MINES = 10;

type CellState = {
  mine: boolean;
  count: number;
  revealed: boolean;
  flagged: boolean;
};

type Board = CellState[][];

function emptyBoard(): Board {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      mine: false,
      count: 0,
      revealed: false,
      flagged: false,
    }))
  );
}

function placeMines(board: Board, safeR: number, safeC: number): Board {
  const fresh = board.map((row) => row.map((c) => ({ ...c })));
  const safeKey = `${safeR},${safeC}`;
  const safeNeighbors = new Set<string>([safeKey]);
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      const r = safeR + dr;
      const c = safeC + dc;
      if (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
        safeNeighbors.add(`${r},${c}`);
      }
    }
  }
  // Enumerate eligible cells once, then partial Fisher-Yates to pick MINES
  // distinct positions. Naturally bounded — no chance of a degenerate loop
  // even if MINES approached the eligible-cell count.
  const eligible: [number, number][] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (!safeNeighbors.has(`${r},${c}`)) eligible.push([r, c]);
    }
  }
  const toPlace = Math.min(MINES, eligible.length);
  for (let i = 0; i < toPlace; i++) {
    const j = i + Math.floor(Math.random() * (eligible.length - i));
    [eligible[i], eligible[j]] = [eligible[j], eligible[i]];
    const [r, c] = eligible[i];
    fresh[r][c].mine = true;
  }
  // count neighbors
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (fresh[r][c].mine) continue;
      let n = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && fresh[nr][nc].mine) n++;
        }
      }
      fresh[r][c].count = n;
    }
  }
  return fresh;
}

function reveal(board: Board, r: number, c: number): Board {
  const fresh = board.map((row) => row.map((cell) => ({ ...cell })));
  const stack: [number, number][] = [[r, c]];
  while (stack.length) {
    const [cr, cc] = stack.pop()!;
    const cell = fresh[cr][cc];
    if (cell.revealed || cell.flagged) continue;
    cell.revealed = true;
    if (cell.count === 0 && !cell.mine) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = cr + dr;
          const nc = cc + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) stack.push([nr, nc]);
        }
      }
    }
  }
  return fresh;
}

function revealAllMines(board: Board): Board {
  return board.map((row) => row.map((c) => (c.mine ? { ...c, revealed: true } : c)));
}

function isWon(board: Board): boolean {
  for (const row of board) {
    for (const c of row) {
      if (!c.mine && !c.revealed) return false;
    }
  }
  return true;
}

const NUMBER_COLOR: Record<number, string> = {
  1: "text-blue-300",
  2: "text-green-300",
  3: "text-p5-magenta",
  4: "text-purple-300",
  5: "text-p5-yellow",
  6: "text-cyan-300",
  7: "text-p5-fg",
  8: "text-p5-fg-muted",
};

const LONG_PRESS_MS = 450;
const LONG_PRESS_MOVE_THRESHOLD = 10;

export default function GameMinesweeper() {
  const [board, setBoard] = useState<Board>(() => emptyBoard());
  const [seeded, setSeeded] = useState(false);
  const [over, setOver] = useState(false);
  const [won, setWon] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [flagMode, setFlagMode] = useState(false);
  const startedAt = useRef<number | null>(null);
  const longPressTimer = useRef<number | null>(null);
  const longPressFired = useRef(false);
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);

  // Timer
  useEffect(() => {
    if (!seeded || over || won) return;
    const id = setInterval(() => {
      if (startedAt.current) {
        setSeconds(Math.floor((Date.now() - startedAt.current) / 1000));
      }
    }, 250);
    return () => clearInterval(id);
  }, [seeded, over, won]);

  // Cleanup pending long-press timer on unmount.
  useEffect(() => {
    return () => {
      if (longPressTimer.current !== null) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
    };
  }, []);

  const reset = useCallback(() => {
    setBoard(emptyBoard());
    setSeeded(false);
    setOver(false);
    setWon(false);
    setSeconds(0);
    setFlagMode(false);
    startedAt.current = null;
    if (longPressTimer.current !== null) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    longPressFired.current = false;
    touchStartPos.current = null;
  }, []);

  const cancelLongPress = useCallback(() => {
    if (longPressTimer.current !== null) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    touchStartPos.current = null;
  }, []);

  const onCellTouchStart = (e: React.TouchEvent, r: number, c: number) => {
    const t = e.touches[0];
    touchStartPos.current = { x: t.clientX, y: t.clientY };
    longPressFired.current = false;
    longPressTimer.current = window.setTimeout(() => {
      longPressFired.current = true;
      handleFlag(r, c);
      longPressTimer.current = null;
    }, LONG_PRESS_MS);
  };

  const onCellTouchMove = (e: React.TouchEvent) => {
    const start = touchStartPos.current;
    if (!start) return;
    const t = e.touches[0];
    if (
      Math.abs(t.clientX - start.x) > LONG_PRESS_MOVE_THRESHOLD ||
      Math.abs(t.clientY - start.y) > LONG_PRESS_MOVE_THRESHOLD
    ) {
      cancelLongPress();
    }
  };

  const onCellTouchEnd = () => {
    cancelLongPress();
  };

  const handleReveal = (r: number, c: number) => {
    if (over || won) return;
    const cell = board[r][c];
    if (cell.flagged) return;
    let working = board;
    if (!seeded) {
      working = placeMines(working, r, c);
      setSeeded(true);
      startedAt.current = Date.now();
    }
    if (working[r][c].mine) {
      setBoard(revealAllMines(working));
      setOver(true);
      return;
    }
    const next = reveal(working, r, c);
    setBoard(next);
    if (isWon(next)) {
      setWon(true);
    }
  };

  const handleFlag = (r: number, c: number) => {
    if (over || won) return;
    setBoard((prev) => {
      const fresh = prev.map((row) => row.map((cell) => ({ ...cell })));
      const cell = fresh[r][c];
      if (cell.revealed) return prev;
      cell.flagged = !cell.flagged;
      return fresh;
    });
  };

  const handleCellClick = (r: number, c: number) => {
    if (longPressFired.current) {
      // touch-end after long-press fires a synthetic click; swallow it.
      longPressFired.current = false;
      return;
    }
    if (flagMode) {
      handleFlag(r, c);
      return;
    }
    handleReveal(r, c);
  };

  const minesLeft = useMemo(() => {
    let flagged = 0;
    for (const row of board) for (const c of row) if (c.flagged) flagged++;
    return MINES - flagged;
  }, [board]);

  return (
    <div className="flex flex-col items-center gap-4 select-none">
      <div className="flex items-center gap-3 w-full max-w-md">
        <ScorePill label="MINES" value={minesLeft} />
        <ScorePill label="TIME" value={seconds} />
        <button
          type="button"
          onClick={() => setFlagMode((m) => !m)}
          aria-pressed={flagMode}
          aria-label={flagMode ? "Switch to reveal mode" : "Switch to flag mode"}
          className={`ml-auto font-display font-black tracking-tight px-4 py-2 touch-manipulation hover:-rotate-2 transition-transform ${
            flagMode ? "bg-p5-magenta text-p5-white" : "bg-p5-white text-p5-black"
          }`}
          style={{ clipPath: "polygon(6% 0, 100% 4%, 94% 100%, 0 96%)" }}
        >
          {flagMode ? "▶ FLAG" : "REVEAL"}
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
        aria-label="Minesweeper board"
        className="relative bg-p5-black p-2 grid gap-1 w-full max-w-md aspect-square shadow-p5-yellow"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
        onContextMenu={(e) => e.preventDefault()}
      >
        {board.map((row, r) =>
          row.map((cell, c) => {
            const base =
              "flex items-center justify-center font-display font-black text-base sm:text-xl select-none";
            let inner = "";
            let cls = "";
            if (cell.revealed) {
              if (cell.mine) {
                cls = "bg-p5-magenta text-p5-white";
                inner = "✖";
              } else if (cell.count === 0) {
                cls = "bg-p5-bg/40 text-p5-fg";
              } else {
                cls = `bg-p5-bg/40 ${NUMBER_COLOR[cell.count] ?? "text-p5-fg"}`;
                inner = String(cell.count);
              }
            } else if (cell.flagged) {
              cls = "bg-p5-yellow text-p5-magenta-deep";
              inner = "▶";
            } else {
              cls = "bg-p5-white text-p5-black hover:bg-p5-fg cursor-pointer";
            }
            return (
              <button
                key={`${r}-${c}`}
                type="button"
                onClick={() => handleCellClick(r, c)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleFlag(r, c);
                }}
                onTouchStart={(e) => onCellTouchStart(e, r, c)}
                onTouchMove={onCellTouchMove}
                onTouchEnd={onCellTouchEnd}
                onTouchCancel={onCellTouchEnd}
                className={`${base} ${cls} aspect-square touch-manipulation`}
                style={{
                  clipPath: "polygon(4% 0, 100% 3%, 96% 100%, 0 97%)",
                  WebkitTouchCallout: "none",
                  WebkitUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {inner}
              </button>
            );
          })
        )}

        {(over || won) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-p5-bg/85 backdrop-blur-sm">
            <div className="font-display font-black text-3xl sm:text-5xl text-p5-yellow">
              {won ? "★ CLEARED ★" : "BOOM"}
            </div>
            <div className="mt-2 font-label text-p5-fg">
              {won ? `${seconds}s` : "You hit a mine."}
            </div>
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
        Tap to reveal. Right-click or long-press to flag — or toggle FLAG mode. First tap is always safe. 9×9 with 10 mines.
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
