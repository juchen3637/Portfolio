"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import type { GameMeta } from "../../../lib/games/registry";

interface GameCardProps {
  game: GameMeta;
  index: number;
}

export function GameCard({ game, index }: GameCardProps) {
  const isExternal = game.status === "external";
  const isComingSoon = game.status === "coming-soon";
  const href = isExternal ? game.externalUrl ?? "#" : `/games/${game.slug}`;
  const rotate = game.rotate ?? 0;

  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: rotate * 1.5 }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotate,
        transition: { duration: 0.5, ease: "easeOut", delay: index * 0.08 },
      }}
      whileHover={isComingSoon ? undefined : { rotate: rotate + 1, y: -4 }}
      viewport={{ once: true, margin: "-60px" }}
      className={`group relative block bg-p5-white text-p5-black no-underline shadow-p5-black ${
        isComingSoon ? "opacity-70" : "hover:shadow-p5-lg"
      } transition-shadow`}
      style={{ clipPath: "polygon(2% 0, 100% 3%, 98% 100%, 0 97%)" }}
    >
      <div className="bg-p5-magenta text-p5-white px-4 py-2 flex items-center justify-between font-display font-black tracking-tight">
        <span className="text-2xl">{String(index + 1).padStart(2, "0")}</span>
        {game.rarity && (
          <span className="text-xs tracking-widest text-p5-yellow">{game.rarity}</span>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-display font-black uppercase text-2xl tracking-tight leading-none">
          {game.title}
        </h3>
        <p className="mt-3 font-body text-sm leading-6 text-p5-black/85">{game.blurb}</p>

        {game.tags && game.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {game.tags.map((t) => (
              <span
                key={t}
                className="font-label text-[10px] font-semibold tracking-wider px-2 py-1 border-2 border-p5-black bg-p5-white"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <span
            className={`font-display font-black tracking-tight px-3 py-1.5 text-sm transition-colors ${
              isComingSoon
                ? "bg-p5-black/40 text-p5-white"
                : "bg-p5-magenta text-p5-white group-hover:bg-p5-yellow group-hover:text-p5-black"
            }`}
            style={{ clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)" }}
          >
            {isComingSoon ? "COMING SOON" : isExternal ? "PLAY ↗" : "PLAY →"}
          </span>
        </div>
      </div>
    </motion.div>
  );

  if (isComingSoon) return <div className="cursor-not-allowed">{inner}</div>;

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block no-underline">
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className="block no-underline">
      {inner}
    </Link>
  );
}
