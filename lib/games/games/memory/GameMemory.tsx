"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SYMBOLS = ["★", "☆", "♦", "♣", "♥", "♠", "✦", "✪"];

type Card = {
  id: number;
  symbol: string;
  matched: boolean;
};

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function dealCards(): Card[] {
  const pairs = SYMBOLS.flatMap((s) => [s, s]);
  return shuffle(pairs).map((symbol, id) => ({ id, symbol, matched: false }));
}

const BEST_KEY = "game-memory-best-moves";

export default function GameMemory() {
  const [cards, setCards] = useState<Card[]>(() =>
    Array.from({ length: SYMBOLS.length * 2 }, (_, id) => ({
      id,
      symbol: "",
      matched: false,
    }))
  );
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [bestMoves, setBestMoves] = useState<number | null>(null);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const flipTimers = useRef<number[]>([]);

  const clearFlipTimers = useCallback(() => {
    for (const id of flipTimers.current) clearTimeout(id);
    flipTimers.current = [];
  }, []);

  useEffect(() => clearFlipTimers, [clearFlipTimers]);

  useEffect(() => {
    setCards(dealCards());
    const stored = localStorage.getItem(BEST_KEY);
    if (stored) {
      const n = Number(stored);
      if (Number.isFinite(n) && n > 0) setBestMoves(n);
    }
  }, []);

  useEffect(() => {
    if (!started || done) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [started, done]);

  const reset = useCallback(() => {
    clearFlipTimers();
    setCards(dealCards());
    setFlipped([]);
    setMoves(0);
    setSeconds(0);
    setStarted(false);
    setDone(false);
  }, [clearFlipTimers]);

  const handleFlip = (id: number) => {
    if (done) return;
    if (flipped.length >= 2) return;
    if (flipped.includes(id)) return;
    if (cards[id].matched) return;

    if (!started) setStarted(true);
    const nextFlipped = [...flipped, id];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = nextFlipped;
      const matched = cards[a].symbol === cards[b].symbol;
      const t = window.setTimeout(() => {
        flipTimers.current = flipTimers.current.filter((x) => x !== t);
        if (matched) {
          setCards((prev) =>
            prev.map((c) => (c.id === a || c.id === b ? { ...c, matched: true } : c))
          );
        }
        setFlipped([]);
      }, matched ? 320 : 700);
      flipTimers.current.push(t);
    }
  };

  useEffect(() => {
    if (!started) return;
    if (cards.length === 0) return;
    if (cards.every((c) => c.matched)) {
      setDone(true);
      setBestMoves((prev) => {
        const better = prev === null || moves < prev;
        if (better) {
          try {
            localStorage.setItem(BEST_KEY, String(moves));
          } catch {
            /* ignore */
          }
          return moves;
        }
        return prev;
      });
    }
  }, [cards, moves, started]);

  return (
    <div className="flex flex-col items-center gap-4 select-none">
      <div className="flex items-center gap-3 w-full max-w-md">
        <ScorePill label="MOVES" value={moves} />
        <ScorePill label="TIME" value={seconds} />
        <ScorePill label="BEST" value={bestMoves ?? "—"} />
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
        aria-label="Memory board"
        className="relative bg-p5-black p-3 grid grid-cols-4 gap-3 w-full max-w-md aspect-square shadow-p5-yellow"
      >
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id) || card.matched;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => handleFlip(card.id)}
              disabled={isFlipped || done}
              aria-label={isFlipped ? `${card.symbol} card` : "Hidden card"}
              className={`flex items-center justify-center font-display font-black text-3xl sm:text-5xl transition-colors touch-manipulation ${
                isFlipped
                  ? card.matched
                    ? "bg-p5-yellow text-p5-magenta-deep"
                    : "bg-p5-white text-p5-black"
                  : "bg-p5-magenta text-p5-magenta hover:bg-p5-magenta-deep"
              }`}
              style={{ clipPath: "polygon(4% 0, 100% 3%, 96% 100%, 0 97%)" }}
            >
              {isFlipped ? card.symbol : "?"}
            </button>
          );
        })}

        {done && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-p5-bg/85 backdrop-blur-sm">
            <div className="font-display font-black text-3xl sm:text-5xl text-p5-yellow">
              ★ COMPLETE ★
            </div>
            <div className="mt-2 font-label text-p5-fg">
              {moves} moves · {seconds}s
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
        Flip two cards. Match the symbols. Clear the board in as few moves as possible.
      </p>
    </div>
  );
}

function ScorePill({ label, value }: { label: string; value: number | string }) {
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
