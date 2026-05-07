import type { Metadata } from "next";
import { GAMES } from "../../lib/games/registry";
import { GameCard } from "../components/games/GameCard";

export const metadata: Metadata = {
  title: "Games — Justin Chen",
  description: "A small arcade of browser games built by Justin Chen.",
  robots: { index: false, follow: false },
};

export default function GamesPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12">
      <header className="mb-12">
        <div
          className="inline-block bg-p5-yellow text-p5-black px-3 py-1 font-display font-black tracking-tight text-sm -rotate-2"
          style={{ clipPath: "polygon(4% 0, 100% 0, 96% 100%, 0 100%)" }}
        >
          ARCADE MODE
        </div>
        <h1 className="mt-4 font-display font-black uppercase text-5xl sm:text-7xl tracking-tight leading-none">
          Games
        </h1>
        <p className="mt-4 max-w-2xl font-body text-p5-fg-muted leading-7">
          A small arcade of browser games I&apos;ve built. Click a card to play.
        </p>
      </header>

      {GAMES.length === 0 ? (
        <div className="text-center py-20 font-label tracking-widest text-p5-fg-muted">
          No games yet. Stay tuned.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {GAMES.map((g, i) => (
            <GameCard key={g.slug} game={g} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
