"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  HomeIcon,
  UserIcon,
  StarIcon,
  WrenchScrewdriverIcon,
  BriefcaseIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { href: "#home",       label: "Home",       icon: HomeIcon },
  { href: "#about",      label: "About",      icon: UserIcon },
  { href: "#featured",   label: "Projects",   icon: StarIcon },
  { href: "#skills",     label: "Skills",     icon: WrenchScrewdriverIcon },
  { href: "#experience", label: "Experience", icon: BriefcaseIcon },
  { href: "#contact",    label: "Contact",    icon: EnvelopeIcon },
];

const sectionIds = navItems.map((n) => n.href.replace("#", ""));

export function SidebarNav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
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
    <div className="fixed left-0 top-0 h-screen w-[72px] sm:w-[84px] flex flex-col items-center justify-between py-6 border-r border-black/10 dark:border-white/10 z-50 bg-[var(--background)]/80 backdrop-blur-sm">
      <nav className="flex flex-col items-center gap-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const id = href.replace("#", "");
          const isActive = active === id;
          return (
            <Link
              key={href}
              href={href}
              className={`group relative flex items-center justify-center h-10 w-10 rounded-md transition-colors ${
                isActive
                  ? "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400"
                  : "text-black/50 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/8 hover:text-black dark:hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-indigo-500" />
              )}
              {/* Tooltip */}
              <span className="pointer-events-none absolute left-12 whitespace-nowrap rounded-md bg-black dark:bg-white dark:text-black text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col items-center gap-4 pb-2">
        <SocialLink
          href="https://www.linkedin.com/in/jjustinchen/"
          label="LinkedIn"
        >
          <FaLinkedin className="h-5 w-5" />
        </SocialLink>
        <SocialLink href="https://github.com/juchen3637" label="GitHub">
          <FaGithub className="h-5 w-5" />
        </SocialLink>
      </div>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      className="group relative flex items-center justify-center h-9 w-9 rounded-md text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/8 transition-colors"
    >
      {children}
      <span className="pointer-events-none absolute left-11 whitespace-nowrap rounded-md bg-black dark:bg-white dark:text-black text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
        {label}
      </span>
    </Link>
  );
}
