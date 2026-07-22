"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.08 },
  }),
};

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24"
    >
      <div className="grid items-center gap-12 md:grid-cols-[1.5fr_1fr]">
        {/* Left — intro */}
        <div>
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="eyebrow"
          >
            Justin Chen · New York, NY
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-4 font-display font-extrabold tracking-tight text-ink text-5xl sm:text-6xl md:text-7xl leading-[0.95]"
          >
            AI Software
            <br />
            Engineer
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-xl text-lg sm:text-xl leading-8 text-muted"
          >
            I build LLM-powered products — document pipelines, trading agents, and
            AI web apps — from prototype to production on AWS.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#featured"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-hover transition-colors"
            >
              View work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-border-strong px-6 py-3 text-sm font-semibold text-ink hover:border-ink transition-colors"
            >
              Get in touch
            </a>
          </motion.div>

          <motion.p
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 font-mono text-xs tracking-wide text-faint"
          >
            Python · TypeScript · Claude API · FastAPI · AWS CDK · Next.js
          </motion.p>
        </div>

        {/* Right — portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative mx-auto w-56 sm:w-72 md:w-full md:max-w-xs"
        >
          <div className="relative aspect-square overflow-hidden rounded-full ring-1 ring-border-strong">
            <Image
              src="/headshot.jpg"
              alt="Justin Chen"
              fill
              className="object-cover"
              priority
              sizes="(min-width: 768px) 320px, 288px"
            />
          </div>
          <span className="absolute right-2 top-2 inline-flex items-center gap-1.5 rounded-full bg-ok-soft px-3 py-1 text-xs font-medium text-ok ring-1 ring-ok/20">
            <span className="h-1.5 w-1.5 rounded-full bg-ok" />
            Open to work
          </span>
        </motion.div>
      </div>
    </section>
  );
}
