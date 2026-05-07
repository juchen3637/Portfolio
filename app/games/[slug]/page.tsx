import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GAMES, getGame } from "../../../lib/games/registry";
import GameLoader from "./GameLoader";

export function generateStaticParams() {
  return GAMES.filter((g) => g.status === "live").map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return { title: "Game not found — Justin Chen", robots: { index: false, follow: false } };
  return {
    title: `${game.title} — Games — Justin Chen`,
    description: game.blurb,
    robots: { index: false, follow: false },
  };
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game || game.status !== "live") notFound();

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-10">
      <div className="mb-6">
        <Link
          href="/games"
          className="inline-block bg-p5-black text-p5-white px-3 py-1.5 font-label tracking-widest text-xs hover:bg-p5-magenta transition-colors"
          style={{ clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)" }}
        >
          ← BACK TO ARCADE
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="font-display font-black uppercase text-4xl sm:text-6xl tracking-tight leading-none">
          {game.title}
        </h1>
        <p className="mt-3 max-w-2xl font-body text-p5-fg-muted">{game.blurb}</p>
      </header>

      <GameLoader slug={slug} />
    </div>
  );
}
