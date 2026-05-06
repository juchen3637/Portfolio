"use client";
import { useEffect, useState } from "react";

const roles = [
  "LLM Integration Engineer",
  "Full Stack Developer",
  "AWS Cloud Architect",
];

export function TypewriterRole() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % roles.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col gap-2 items-start">
      {roles.map((role, i) => {
        const isActive = i === active;
        return (
          <div
            key={role}
            className={`px-4 py-2 font-display font-black tracking-tight uppercase text-2xl sm:text-3xl md:text-4xl transition-all duration-300 ${
              isActive
                ? "bg-p5-yellow text-p5-black -rotate-1 shadow-p5-black"
                : "bg-p5-black text-p5-white shadow-p5-yellow"
            }`}
            style={{
              clipPath: "polygon(2% 0, 100% 4%, 98% 100%, 0 96%)",
            }}
          >
            {role}
          </div>
        );
      })}
    </div>
  );
}
