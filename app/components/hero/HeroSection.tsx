"use client";
import { motion } from "framer-motion";
import { TypewriterRole } from "./TypewriterRole";
import { OrbitingTechStack } from "./OrbitingTechStack";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-5rem)] overflow-hidden flex items-center bg-p5-magenta"
    >
      {/* Halftone overlay */}
      <div
        aria-hidden
        className="absolute inset-0 halftone-white opacity-15 animate-halftone-drift pointer-events-none"
      />

      {/* Big black slashing polygon shapes in background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute -left-10 top-10 w-[60%] h-[40%] bg-p5-black -rotate-6"
          style={{ clipPath: "polygon(0 0, 100% 8%, 95% 100%, 5% 95%)" }}
        />
        <div
          className="absolute -right-20 -bottom-10 w-[55%] h-[55%] bg-p5-black rotate-3"
          style={{ clipPath: "polygon(8% 0, 100% 4%, 92% 100%, 0 96%)" }}
        />
      </div>

      {/* Slashing white diagonal stripe */}
      <div
        aria-hidden
        className="absolute -bottom-2 left-0 right-0 h-24 bg-p5-white -rotate-2 origin-bottom-left flex items-center overflow-hidden"
        style={{ clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0 100%)" }}
      >
        <div className="font-display italic font-black text-p5-black text-3xl sm:text-5xl whitespace-nowrap tracking-tight px-6 -mt-2">
          → SHIP IT → TAKE YOUR HEART → SHIP IT → TAKE YOUR HEART → SHIP IT
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto max-w-[1440px] w-full px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT — name + roles + CTA */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6"
        >
          {/* Eyebrow tag */}
          <div
            className="self-start bg-p5-black text-p5-white font-label font-bold text-xs tracking-widest px-3 py-1.5 -rotate-2 shadow-p5"
            style={{ clipPath: "polygon(4% 0, 100% 0, 96% 100%, 0 100%)" }}
          >
            00 / HOME
          </div>

          {/* Name */}
          <div
            className="self-start bg-p5-black px-4 py-2 -rotate-1 shadow-p5"
            style={{ clipPath: "polygon(2% 0, 100% 4%, 98% 100%, 0 96%)" }}
          >
            <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl text-p5-white tracking-tighter leading-none">
              JUSTIN CHEN
            </h1>
          </div>

          {/* Arcana subtitle */}
          <div className="font-label text-sm text-p5-white tracking-widest">
            ARCANA · <span className="text-p5-yellow">VM</span> · THE ENGINEER · LV.24
          </div>

          {/* Rotating roles list */}
          <TypewriterRole />

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mt-4">
            <a
              href="#featured"
              className="bg-p5-black text-p5-white font-display font-black tracking-tight uppercase text-base px-6 py-3 -rotate-1 shadow-p5-yellow hover:bg-p5-yellow hover:text-p5-black hover:-rotate-2 transition-all"
              style={{ clipPath: "polygon(4% 0, 100% 4%, 96% 100%, 0 96%)" }}
            >
              View Projects →
            </a>
            <a
              href="#contact"
              className="bg-p5-white text-p5-black font-display font-black tracking-tight uppercase text-base px-6 py-3 rotate-1 shadow-p5-black hover:bg-p5-yellow hover:rotate-2 transition-all"
              style={{ clipPath: "polygon(4% 0, 100% 4%, 96% 100%, 0 96%)" }}
            >
              Contact
            </a>
          </div>

          {/* Hand-drawn arrow note */}
          <div className="flex items-center gap-2 mt-2 text-p5-white font-display italic text-sm">
            <span className="opacity-70">→ start here</span>
          </div>
        </motion.div>

        {/* RIGHT — portrait */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          className="flex items-center justify-center"
        >
          <OrbitingTechStack photoSrc="/headshot.jpg" />
        </motion.div>
      </div>
    </section>
  );
}
