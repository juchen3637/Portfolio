"use client";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  link: string;
  image?: string;
}

export function GlowingProjectCard({
  title,
  description,
  tech,
  link,
  image,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  function handleMouseLeave() {
    mouseX.set(-999);
    mouseY.set(-999);
  }

  return (
    <motion.a
      ref={cardRef}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative block rounded-xl overflow-hidden no-underline"
      style={{ textDecoration: "none" }}
    >
      {/* Glow layer that follows mouse */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${springX}px ${springY}px, rgb(99 102 241 / 0.25), transparent 60%)`,
        }}
      />

      {/* Card content */}
      <div className="relative rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.03] backdrop-blur overflow-hidden h-full">
        {image && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={image}
              alt={`${title} preview`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}
        <div className="p-5">
          <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-black/65 dark:text-white/65 leading-6">
            {description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tech.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-1 rounded-full bg-black/5 dark:bg-white/8 border border-black/8 dark:border-white/8"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.a>
  );
}
