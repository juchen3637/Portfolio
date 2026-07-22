"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
  index: number;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  link: string;
  cta?: string;
  image?: string;
}

export function GlowingProjectCard({
  index,
  title,
  tagline,
  description,
  tech,
  link,
  cta = "View project",
  image,
}: ProjectCardProps) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface no-underline transition-all duration-200 hover:-translate-y-1 hover:border-border-strong hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)]"
    >
      {image && (
        <div className="relative h-44 w-full overflow-hidden border-b border-border bg-bg">
          <Image
            src={image}
            alt={`${title} preview`}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(min-width: 768px) 384px, 100vw"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-xs text-faint">
            {String(index).padStart(2, "0")}
          </span>
          <h3 className="font-display text-xl font-bold tracking-tight text-ink">
            {title}
          </h3>
        </div>

        <p className="mt-1 text-sm font-medium text-accent">{tagline}</p>

        <p className="mt-3 text-sm leading-6 text-muted">{description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border bg-bg px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-ink transition-colors group-hover:text-accent">
          {cta}
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </div>
      </div>
    </motion.a>
  );
}
