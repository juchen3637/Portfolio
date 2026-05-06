"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
  index: number;            // 1-based, used for "01", "02", "03"
  title: string;
  subtitle: string;         // e.g. "AI Resume Persona · NULL: Rewrites"
  description: string;
  tech: string[];
  link: string;
  cta?: string;             // e.g. "VIEW LIVE →"
  rarity?: string;          // e.g. "★★★★ EPIC"
  image?: string;
  rotate?: number;          // -3, +2, -4
}

function RarityStars({ rarity }: { rarity: string }) {
  const chars = [...rarity];
  return (
    <span className="text-xs tracking-widest text-p5-yellow">
      {chars.map((c, i) =>
        c === "★" ? (
          <span
            key={i}
            className="inline-block animate-twinkle"
            style={{ animationDelay: `${i * 0.18}s` }}
          >
            {c}
          </span>
        ) : (
          <span key={i}>{c}</span>
        )
      )}
    </span>
  );
}

export function GlowingProjectCard({
  index,
  title,
  subtitle,
  description,
  tech,
  link,
  cta = "VIEW →",
  rarity = "★★★★ EPIC",
  image,
  rotate = 0,
}: ProjectCardProps) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: { opacity: 0, y: 24, rotate: rotate * 1.5 },
        visible: { opacity: 1, y: 0, rotate, transition: { duration: 0.5, ease: "easeOut", delay: index * 0.08 } },
        hover: { rotate: rotate + 1, y: -4 },
      }}
      className="group relative block bg-p5-white text-p5-black no-underline shadow-p5-black hover:shadow-p5-lg transition-shadow"
      style={{
        clipPath: "polygon(2% 0, 100% 3%, 98% 100%, 0 97%)",
      }}
    >
      {/* Magenta banner with index + rarity */}
      <div className="bg-p5-magenta text-p5-white px-4 py-2 flex items-center justify-between font-display font-black tracking-tight">
        <span className="text-2xl">{String(index).padStart(2, "0")}</span>
        <RarityStars rarity={rarity} />
      </div>

      {/* ALL-OUT ATTACK overlay — slams in on hover */}
      <motion.div
        aria-hidden
        variants={{
          visible: { scale: 0, rotate: -10, opacity: 0 },
          hover: { scale: 1, rotate: 4, opacity: 1 },
        }}
        transition={{ type: "spring", stiffness: 600, damping: 16 }}
        className="absolute top-2 right-2 z-10 bg-p5-yellow text-p5-black px-3 py-1 shadow-p5-black font-display font-black uppercase tracking-tight text-xs pointer-events-none"
        style={{ clipPath: "polygon(6% 0, 100% 4%, 94% 100%, 0 96%)" }}
      >
        ★ ALL-OUT ATTACK ★
      </motion.div>

      {/* Optional preview image */}
      {image && (
        <div className="relative w-full h-40 overflow-hidden">
          <Image
            src={image}
            alt={`${title} preview`}
            fill
            className="object-cover grayscale-[40%] contrast-125 group-hover:grayscale-0 transition-all duration-300"
          />
          <div className="absolute inset-0 mix-blend-multiply bg-p5-magenta/15" />
        </div>
      )}

      <div className="p-5">
        {/* Title */}
        <h3 className="font-display font-black uppercase text-2xl tracking-tight leading-none">
          {title}
        </h3>

        {/* Subtitle (italic display) */}
        <div className="bg-p5-yellow text-p5-black inline-block px-2 py-0.5 mt-2 font-display italic font-bold text-xs">
          {subtitle}
        </div>

        {/* Description */}
        <p className="mt-3 font-body text-sm leading-6 text-p5-black/85">
          {description}
        </p>

        {/* Tech tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <span
              key={t}
              className="font-label text-[10px] font-semibold tracking-wider px-2 py-1 border-2 border-p5-black bg-p5-white"
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-4 flex justify-end">
          <span
            className="bg-p5-magenta text-p5-white font-display font-black tracking-tight px-3 py-1.5 text-sm group-hover:bg-p5-yellow group-hover:text-p5-black transition-colors"
            style={{ clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)" }}
          >
            {cta}
          </span>
        </div>
      </div>
    </motion.a>
  );
}
