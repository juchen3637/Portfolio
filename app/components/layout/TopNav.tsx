"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

type NavItem = { href: string; label: string; section: string };

const navItems: NavItem[] = [
  { href: "/#about", label: "About", section: "about" },
  { href: "/#featured", label: "Work", section: "featured" },
  { href: "/#experience", label: "Experience", section: "experience" },
  { href: "/#contact", label: "Contact", section: "contact" },
];

export function TopNav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, { stiffness: 220, damping: 30, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navItems.forEach(({ section }) => {
      const el = document.getElementById(section);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(section);
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/#home"
          className="font-display font-extrabold tracking-tight text-lg text-ink hover:text-accent transition-colors"
        >
          Justin Chen
        </Link>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(({ href, label, section }) => {
            const isActive = active === section;
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    aria-hidden
                    className="absolute inset-x-3 -bottom-px h-0.5 bg-accent"
                    transition={{ type: "spring", stiffness: 500, damping: 32 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right — socials + resume */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="https://github.com/juchen3637"
            target="_blank"
            aria-label="GitHub"
            className="text-muted hover:text-ink transition-colors p-2"
          >
            <FaGithub className="h-[18px] w-[18px]" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/jjustinchen/"
            target="_blank"
            aria-label="LinkedIn"
            className="text-muted hover:text-ink transition-colors p-2"
          >
            <FaLinkedin className="h-[18px] w-[18px]" />
          </Link>
          <Link
            href="/resume.pdf"
            target="_blank"
            className="ml-1 rounded-full border border-border-strong px-4 py-1.5 text-sm font-medium text-ink hover:border-ink hover:bg-ink hover:text-white transition-colors"
          >
            Resume
          </Link>
        </div>
      </div>

      {/* Scroll progress */}
      <motion.div
        aria-hidden
        style={{ scaleX: progressX, transformOrigin: "0% 50%" }}
        className="absolute bottom-0 left-0 right-0 h-px bg-accent"
      />
    </header>
  );
}
