"use client";

import { useCallback, useEffect, useState } from "react";
import { WORDS, WORD_SET } from "./words";

const ROWS = 6;
const COLS = 5;
type Cell = "" | "green" | "yellow" | "gray";

const KEYBOARD_ROWS: string[][] = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
];

const STATE_PRIORITY: Record<Cell, number> = {
  "": 0,
  gray: 1,
  yellow: 2,
  green: 3,
};

function pickWord(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function evaluate(guess: string, target: string): Cell[] {
  const result: Cell[] = Array(COLS).fill("");
  const remaining = target.split("");
  for (let i = 0; i < COLS; i++) {
    if (guess[i] === target[i]) {
      result[i] = "green";
      remaining[i] = "_";
    }
  }
  for (let i = 0; i < COLS; i++) {
    if (result[i] === "green") continue;
    const idx = remaining.indexOf(guess[i]);
    if (idx >= 0) {
      result[i] = "yellow";
      remaining[idx] = "_";
    } else {
      result[i] = "gray";
    }
  }
  return result;
}

function cellClass(state: Cell, current: boolean): string {
  if (state === "green") return "bg-p5-yellow text-p5-magenta-deep border-p5-yellow";
  if (state === "yellow") return "bg-p5-magenta text-p5-white border-p5-magenta";
  if (state === "gray") return "bg-p5-black/60 text-p5-fg-muted border-p5-black/60";
  return current
    ? "bg-p5-bg/40 text-p5-fg border-p5-fg-muted"
    : "bg-p5-bg/20 text-p5-fg border-p5-fg-muted/40";
}

function keyClass(state: Cell): string {
  if (state === "green") return "bg-p5-yellow text-p5-magenta-deep";
  if (state === "yellow") return "bg-p5-magenta text-p5-white";
  if (state === "gray") return "bg-p5-black/70 text-p5-fg-muted";
  return "bg-p5-white text-p5-black hover:bg-p5-fg";
}

export default function GameWordle() {
  const [target, setTarget] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [results, setResults] = useState<Cell[][]>([]);
  const [current, setCurrent] = useState("");
  const [done, setDone] = useState<"win" | "lose" | null>(null);
  const [error, setError] = useState("");
  const [letterStates, setLetterStates] = useState<Record<string, Cell>>({});

  useEffect(() => {
    setTarget(pickWord());
  }, []);

  const reset = useCallback(() => {
    setTarget(pickWord());
    setGuesses([]);
    setResults([]);
    setCurrent("");
    setDone(null);
    setError("");
    setLetterStates({});
  }, []);

  const flashError = useCallback((msg: string) => {
    setError(msg);
    setTimeout(() => setError(""), 1200);
  }, []);

  const submitGuess = useCallback(() => {
    if (done) return;
    if (current.length !== COLS) {
      flashError("5 letters");
      return;
    }
    if (!WORD_SET.has(current)) {
      flashError("not in word list");
      return;
    }
    const evalResult = evaluate(current, target);
    const newGuesses = [...guesses, current];
    const newResults = [...results, evalResult];
    setGuesses(newGuesses);
    setResults(newResults);

    setLetterStates((prev) => {
      const next = { ...prev };
      for (let i = 0; i < COLS; i++) {
        const ch = current[i];
        const state = evalResult[i];
        if (STATE_PRIORITY[state] > STATE_PRIORITY[next[ch] ?? ""]) {
          next[ch] = state;
        }
      }
      return next;
    });

    setCurrent("");
    if (current === target) setDone("win");
    else if (newGuesses.length >= ROWS) setDone("lose");
  }, [current, target, guesses, results, done, flashError]);

  const press = useCallback(
    (key: string) => {
      if (done) return;
      if (key === "ENTER") {
        submitGuess();
      } else if (key === "BACK") {
        setCurrent((c) => c.slice(0, -1));
      } else if (/^[A-Z]$/.test(key)) {
        setCurrent((c) => (c.length < COLS ? c + key : c));
      }
    },
    [done, submitGuess]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Don't hijack keys when an interactive element (e.g. the BACK TO ARCADE
      // link) has focus — the user is trying to navigate, not play.
      const tag = (document.activeElement?.tagName ?? "").toLowerCase();
      if (tag === "a" || tag === "input" || tag === "textarea" || tag === "select") return;
      if (e.key === "Enter") {
        e.preventDefault();
        press("ENTER");
      } else if (e.key === "Backspace") {
        e.preventDefault();
        press("BACK");
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        press(e.key.toUpperCase());
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [press]);

  return (
    <div className="flex flex-col items-center gap-4 select-none">
      <div className="flex items-center gap-3 w-full max-w-md">
        <div className="font-label text-xs tracking-widest text-p5-fg-muted">
          GUESS THE WORD · 6 TRIES
        </div>
        <button
          type="button"
          onClick={reset}
          className="ml-auto bg-p5-yellow text-p5-black font-display font-black tracking-tight px-4 py-2 touch-manipulation hover:-rotate-2 transition-transform"
          style={{ clipPath: "polygon(6% 0, 100% 4%, 94% 100%, 0 96%)" }}
        >
          NEW GAME
        </button>
      </div>

      <div className="relative w-full max-w-sm">
        <div className="grid grid-rows-6 gap-1.5">
          {Array.from({ length: ROWS }).map((_, r) => {
            const isPast = r < guesses.length;
            const isCurrent = r === guesses.length && !done;
            const text = isPast ? guesses[r] : isCurrent ? current.padEnd(COLS) : "     ";
            const states = isPast ? results[r] : (Array(COLS).fill("") as Cell[]);
            return (
              <div key={r} className="grid grid-cols-5 gap-1.5">
                {Array.from({ length: COLS }).map((_, c) => (
                  <div
                    key={c}
                    className={`flex items-center justify-center font-display font-black text-2xl sm:text-3xl uppercase aspect-square border-2 ${cellClass(states[c], isCurrent)}`}
                  >
                    {text[c]?.trim() ?? ""}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {error && (
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-full bg-p5-magenta text-p5-white px-3 py-1 font-label text-xs tracking-widest"
            style={{ clipPath: "polygon(4% 0, 100% 0, 96% 100%, 0 100%)" }}
          >
            {error}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 w-full max-w-md">
        {KEYBOARD_ROWS.map((row, i) => (
          <div key={i} className="flex justify-center gap-1 sm:gap-1.5">
            {row.map((k) => {
              const state = letterStates[k] ?? "";
              const wide = k === "ENTER" || k === "BACK";
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => press(k)}
                  aria-label={k === "BACK" ? "Backspace" : k}
                  className={`font-label font-bold text-xs sm:text-sm tracking-wider min-h-[48px] flex items-center justify-center transition-colors touch-manipulation ${keyClass(state)} ${
                    wide ? "px-3 sm:px-4 min-w-[56px]" : "flex-1 basis-0 min-w-0"
                  }`}
                  style={{
                    clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)",
                    WebkitTouchCallout: "none",
                    WebkitUserSelect: "none",
                    userSelect: "none",
                  }}
                >
                  {k === "BACK" ? "⌫" : k}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {done && (
        <div className="flex flex-col items-center gap-2">
          <div className="font-display font-black text-3xl text-p5-yellow">
            {done === "win" ? "★ SOLVED ★" : "OUT OF TRIES"}
          </div>
          <div className="font-label text-p5-fg">
            {done === "win" ? `Solved in ${guesses.length}/${ROWS}` : `Word was ${target}`}
          </div>
          <button
            type="button"
            onClick={reset}
            className="bg-p5-magenta text-p5-white font-display font-black tracking-tight px-4 py-2 touch-manipulation hover:bg-p5-yellow hover:text-p5-black transition-colors"
            style={{ clipPath: "polygon(6% 0, 100% 4%, 94% 100%, 0 96%)" }}
          >
            PLAY AGAIN
          </button>
        </div>
      )}
    </div>
  );
}
