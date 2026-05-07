"use client";

import { useCallback, useEffect, useState } from "react";

type Mark = "X" | "O" | null;
type Board = Mark[];

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function winner(board: Board): { mark: Mark; line: number[] } | null {
  for (const line of LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { mark: board[a], line };
    }
  }
  return null;
}

function isFull(board: Board): boolean {
  return board.every((c) => c !== null);
}

// Minimax: O is the AI (maximizer of "O wins"), X is human.
function minimax(board: Board, isAi: boolean): { score: number; move: number } {
  const w = winner(board);
  if (w?.mark === "O") return { score: 1, move: -1 };
  if (w?.mark === "X") return { score: -1, move: -1 };
  if (isFull(board)) return { score: 0, move: -1 };

  let bestScore = isAi ? -Infinity : Infinity;
  let bestMove = -1;
  for (let i = 0; i < 9; i++) {
    if (board[i] !== null) continue;
    const next = board.slice();
    next[i] = isAi ? "O" : "X";
    const { score } = minimax(next, !isAi);
    if (isAi) {
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    } else {
      if (score < bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return { score: bestScore, move: bestMove };
}

const STATS_KEY = "game-tictactoe-stats";

type Stats = { wins: number; draws: number; losses: number };

export default function GameTicTacToe() {
  const [board, setBoard] = useState<Board>(() => Array(9).fill(null));
  const [turn, setTurn] = useState<Mark>("X");
  const [done, setDone] = useState<{ result: "win" | "draw" | "loss"; line: number[] } | null>(null);
  const [stats, setStats] = useState<Stats>({ wins: 0, draws: 0, losses: 0 });
  const [aiThinking, setAiThinking] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STATS_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (
          typeof parsed === "object" &&
          parsed &&
          typeof parsed.wins === "number" &&
          typeof parsed.draws === "number" &&
          typeof parsed.losses === "number"
        ) {
          setStats(parsed);
        }
      } catch {
        /* ignore */
      }
    }
  }, []);

  const persistStats = useCallback((s: Stats) => {
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(s));
    } catch {
      /* ignore */
    }
  }, []);

  const reset = useCallback(() => {
    setBoard(Array(9).fill(null));
    setTurn("X");
    setDone(null);
    setAiThinking(false);
  }, []);

  // After a move, check for end and otherwise let AI play.
  useEffect(() => {
    const w = winner(board);
    if (w) {
      const result = w.mark === "X" ? "win" : "loss";
      setDone({ result, line: w.line });
      setStats((prev) => {
        const next = { ...prev, [result === "win" ? "wins" : "losses"]: prev[result === "win" ? "wins" : "losses"] + 1 };
        persistStats(next);
        return next;
      });
      return;
    }
    if (isFull(board)) {
      setDone({ result: "draw", line: [] });
      setStats((prev) => {
        const next = { ...prev, draws: prev.draws + 1 };
        persistStats(next);
        return next;
      });
      return;
    }
    if (turn === "O" && !done) {
      setAiThinking(true);
      const t = setTimeout(() => {
        const { move } = minimax(board, true);
        if (move >= 0) {
          setBoard((prev) => {
            const next = prev.slice();
            next[move] = "O";
            return next;
          });
          setTurn("X");
        }
        setAiThinking(false);
      }, 380);
      return () => clearTimeout(t);
    }
  }, [board, turn, done, persistStats]);

  const handleClick = (i: number) => {
    if (done || aiThinking) return;
    if (board[i] !== null) return;
    if (turn !== "X") return;
    setBoard((prev) => {
      const next = prev.slice();
      next[i] = "X";
      return next;
    });
    setTurn("O");
  };

  const resetStats = () => {
    const fresh = { wins: 0, draws: 0, losses: 0 };
    setStats(fresh);
    persistStats(fresh);
  };

  return (
    <div className="flex flex-col items-center gap-4 select-none">
      <div className="flex items-center gap-3 w-full max-w-md">
        <ScorePill label="WINS" value={stats.wins} />
        <ScorePill label="DRAWS" value={stats.draws} />
        <ScorePill label="LOSSES" value={stats.losses} />
        <button
          type="button"
          onClick={reset}
          className="ml-auto bg-p5-yellow text-p5-black font-display font-black tracking-tight px-4 py-2 touch-manipulation hover:-rotate-2 transition-transform"
          style={{ clipPath: "polygon(6% 0, 100% 4%, 94% 100%, 0 96%)" }}
        >
          NEW GAME
        </button>
      </div>

      <div
        role="grid"
        aria-label="Tic-Tac-Toe board"
        className="relative bg-p5-black p-3 grid grid-cols-3 gap-3 w-full max-w-md aspect-square shadow-p5-yellow"
      >
        {board.map((cell, i) => {
          const inWin = done?.line.includes(i);
          let cls = "bg-p5-white text-p5-black";
          if (inWin) {
            cls = done?.result === "win" ? "bg-p5-yellow text-p5-magenta-deep" : "bg-p5-magenta text-p5-white";
          } else if (cell === "X") cls = "bg-p5-white text-p5-magenta-deep";
          else if (cell === "O") cls = "bg-p5-white text-p5-black";
          return (
            <button
              key={i}
              type="button"
              onClick={() => handleClick(i)}
              disabled={!!done || aiThinking || cell !== null || turn !== "X"}
              aria-label={cell ?? `Square ${i + 1}`}
              className={`flex items-center justify-center font-display font-black text-5xl sm:text-7xl transition-colors touch-manipulation ${cls} ${cell === null && !done ? "hover:bg-p5-fg cursor-pointer" : ""}`}
              style={{ clipPath: "polygon(4% 0, 100% 3%, 96% 100%, 0 97%)" }}
            >
              {cell}
            </button>
          );
        })}

        {done && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-p5-bg/85 backdrop-blur-sm">
            <div className="font-display font-black text-3xl sm:text-5xl text-p5-yellow">
              {done.result === "win" ? "★ YOU WIN ★" : done.result === "draw" ? "DRAW" : "AI WINS"}
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

      <div className="flex items-center gap-3">
        <span className="font-label text-xs tracking-widest text-p5-fg-muted">
          {aiThinking ? "AI THINKING…" : turn === "X" ? "YOUR TURN" : "AI TURN"}
        </span>
        <button
          type="button"
          onClick={resetStats}
          className="font-label text-xs tracking-widest text-p5-fg-muted hover:text-p5-yellow underline"
        >
          reset stats
        </button>
      </div>

      <p className="font-label text-xs sm:text-sm text-p5-fg-muted text-center max-w-md">
        You&apos;re X. The AI plays a perfect minimax — best you can do is draw.
      </p>
    </div>
  );
}

function ScorePill({ label, value }: { label: string; value: number }) {
  return (
    <div
      className="bg-p5-magenta text-p5-white px-3 py-1.5 min-w-[70px]"
      style={{ clipPath: "polygon(4% 0, 100% 3%, 96% 100%, 0 97%)" }}
    >
      <div className="font-label text-[10px] tracking-widest opacity-90">{label}</div>
      <div className="font-display font-black text-lg leading-none">{value}</div>
    </div>
  );
}
