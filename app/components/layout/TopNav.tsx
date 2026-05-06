"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MagneticButton } from "../ui/MagneticButton";

const navItems = [
  { href: "#about",      label: "ABOUT",     shortLabel: "ABOUT",  section: "about" },
  { href: "#featured",   label: "WORK",      shortLabel: "WORK",   section: "featured" },
  { href: "#skills",     label: "STACK",     shortLabel: "STACK",  section: "skills" },
  { href: "#experience", label: "QUEST LOG", shortLabel: "QUEST",  section: "experience" },
  { href: "#contact",    label: "SUMMON",    shortLabel: "SUMMON", section: "contact" },
];

export function TopNav() {
  const [active, setActive] = useState("home");
  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, { stiffness: 220, damping: 30, mass: 0.4 });

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const ids = navItems.map((n) => n.section);
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Top strip — solid magenta with slashing edge */}
      <div className="bg-p5-magenta">
        <div className="mx-auto max-w-[1440px] px-6 h-16 flex items-center justify-between">
          {/* Monogram — tilted polygon */}
          <Link
            href="#home"
            className="block bg-p5-black text-p5-white px-4 py-2 -rotate-3 shadow-p5-yellow font-display font-black tracking-tight text-xl hover:bg-p5-yellow hover:text-p5-black transition-colors"
            style={{ clipPath: "polygon(6% 0, 100% 4%, 94% 100%, 0 96%)" }}
          >
            JC<span className="text-p5-magenta">.</span>
          </Link>

          {/* Nav links */}
          <nav className="relative flex items-center gap-0.5 sm:gap-1">
            {navItems.map(({ href, label, shortLabel, section }) => {
              const isActive = active === section;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative px-2 sm:px-4 py-2 font-label text-[10px] sm:text-sm font-bold tracking-wider transition-colors ${
                    isActive ? "text-p5-black" : "text-p5-white hover:bg-p5-black"
                  }`}
                  style={{
                    clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)",
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden
                      className="absolute inset-0 bg-p5-yellow -z-10"
                      style={{
                        clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)",
                      }}
                      transition={{ type: "spring", stiffness: 700, damping: 28 }}
                    />
                  )}
                  <span className="relative sm:hidden">{shortLabel}</span>
                  <span className="relative hidden sm:inline">{label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Social pills + HIRE_ME — hidden on mobile to keep nav uncluttered */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="https://github.com/juchen3637"
              target="_blank"
              aria-label="GitHub"
              className="text-p5-white hover:text-p5-yellow transition-colors p-2"
            >
              <FaGithub className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/jjustinchen/"
              target="_blank"
              aria-label="LinkedIn"
              className="text-p5-white hover:text-p5-yellow transition-colors p-2"
            >
              <FaLinkedin className="h-5 w-5" />
            </Link>
            <MagneticButton strength={6}>
              <Link
                href="#contact"
                className="block bg-p5-black text-p5-yellow px-3 py-1.5 -rotate-2 font-display font-black tracking-tight text-sm shadow-p5-yellow hover:-rotate-3 transition-transform"
                style={{ clipPath: "polygon(6% 0, 100% 4%, 94% 100%, 0 96%)" }}
              >
                HIRE_ME ↗
              </Link>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Black slash strip below */}
      <div className="bg-p5-black h-1" />

      {/* Scroll progress bar */}
      <motion.div
        aria-hidden
        style={{ scaleX: progressX, transformOrigin: "0% 50%" }}
        className="absolute top-0 left-0 right-0 h-[3px] bg-p5-yellow z-[51]"
      />
    </header>
  );
}
