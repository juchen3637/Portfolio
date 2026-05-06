"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const roles = [
  "LLM Integration Engineer",
  "Full Stack Developer",
  "AWS Cloud Architect",
];

const TYPE_MS = 45;
const HOLD_MS = 1600;
const ERASE_MS = 320;

type Phase = "typing" | "hold" | "erase";

export function TypewriterRole() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [text, setText] = useState(reduce ? roles[0] : "");
  const [phase, setPhase] = useState<Phase>(reduce ? "hold" : "typing");
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    if (reduce) {
      const id = setInterval(() => setActive((i) => (i + 1) % roles.length), 3000);
      return () => clearInterval(id);
    }

    const role = roles[active];

    if (phase === "typing") {
      if (text.length < role.length) {
        const id = setTimeout(() => setText(role.slice(0, text.length + 1)), TYPE_MS);
        return () => clearTimeout(id);
      }
      const id = setTimeout(() => setPhase("hold"), HOLD_MS);
      return () => clearTimeout(id);
    }

    if (phase === "hold") {
      const id = setTimeout(() => {
        setGlitch(true);
        setPhase("erase");
      }, 0);
      return () => clearTimeout(id);
    }

    // erase
    const id = setTimeout(() => {
      setGlitch(false);
      setText("");
      setActive((i) => (i + 1) % roles.length);
      setPhase("typing");
    }, ERASE_MS);
    return () => clearTimeout(id);
  }, [phase, text, active, reduce]);

  return (
    <div className="flex flex-col gap-2 items-start">
      {roles.map((role, i) => {
        const isActive = i === active;
        const display = isActive ? (reduce ? role : text) : role;
        return (
          <div
            key={role}
            className={`px-4 py-2 font-display font-black tracking-tight uppercase text-2xl sm:text-3xl md:text-4xl transition-all duration-300 ${
              isActive
                ? "bg-p5-yellow text-p5-black -rotate-1 shadow-p5-black"
                : "bg-p5-black text-p5-white shadow-p5-yellow opacity-70"
            } ${isActive && glitch ? "animate-glitch-burst" : ""}`}
            style={{
              clipPath: "polygon(2% 0, 100% 4%, 98% 100%, 0 96%)",
              minWidth: isActive ? "min(100%, 22ch)" : undefined,
            }}
          >
            <span>{display}</span>
            {isActive && !reduce && (
              <span className="animate-caret ml-0.5 inline-block w-[0.55ch] h-[1em] align-[-0.18em] bg-p5-black" />
            )}
          </div>
        );
      })}
    </div>
  );
}
