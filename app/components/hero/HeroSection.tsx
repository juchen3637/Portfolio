"use client";
import { motion } from "framer-motion";
import { TypewriterRole } from "./TypewriterRole";
import { OrbitingTechStack } from "./OrbitingTechStack";

export function HeroSection() {
  return (
    <div
      id="home"
      className="relative min-h-screen grid place-items-center overflow-hidden"
    >
      {/* Animated grid background */}
      <GridBackground />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center px-6 gap-8"
      >
        {/* Orbiting tech stack with photo */}
        <OrbitingTechStack photoSrc="/headshot.jpg" />

        {/* Text block */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Justin Chen
          </h1>

          <div className="flex items-center gap-2 text-lg sm:text-xl">
            <TypewriterRole />
          </div>

          <p className="text-sm sm:text-base text-black/60 dark:text-white/60 max-w-md">
            LLM pipelines · cloud infrastructure · full-stack web
          </p>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-4">
          <a
            href="#featured"
            className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-lg border border-black/20 dark:border-white/20 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 text-sm font-medium transition-colors"
          >
            Contact
          </a>
        </div>
      </motion.div>
    </div>
  );
}

function GridBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgb(99 102 241 / 0.35) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Center radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgb(99_102_241/0.12),transparent)]" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent" />
    </div>
  );
}
