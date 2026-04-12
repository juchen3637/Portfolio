"use client";
import Image from "next/image";

interface OrbitItem {
  label: string;
  icon: string; // emoji fallback — replaced with SVG icons below
  color: string;
}

const innerRing: OrbitItem[] = [
  { label: "Python",  icon: "🐍", color: "#3B82F6" },
  { label: "Next.js", icon: "▲",  color: "#000000" },
  { label: "AWS",     icon: "☁",  color: "#F97316" },
];

const outerRing: OrbitItem[] = [
  { label: "Claude",     icon: "✦", color: "#6366F1" },
  { label: "FastAPI",    icon: "⚡", color: "#06B6D4" },
  { label: "PostgreSQL", icon: "🐘", color: "#3B82F6" },
  { label: "Docker",     icon: "🐳", color: "#06B6D4" },
];

function OrbitDot({
  item,
  radius,
  duration,
  startDeg,
  reverse,
}: {
  item: OrbitItem;
  radius: number;
  duration: number;
  startDeg: number;
  reverse?: boolean;
}) {
  return (
    <div
      className={reverse ? "animate-orbit-reverse" : "animate-orbit"}
      style={
        {
          "--orbit-radius": `${radius}px`,
          "--orbit-duration": `${duration}s`,
          position: "absolute",
          top: "50%",
          left: "50%",
          marginTop: "-20px",
          marginLeft: "-20px",
          transform: `rotate(${startDeg}deg) translateX(${radius}px) rotate(-${startDeg}deg)`,
        } as React.CSSProperties
      }
    >
      <div
        title={item.label}
        className="h-10 w-10 rounded-full flex items-center justify-center text-base shadow-md border border-black/10 dark:border-white/15 bg-white dark:bg-zinc-900 select-none"
      >
        {item.icon}
      </div>
    </div>
  );
}

export function OrbitingTechStack({
  photoSrc,
}: {
  photoSrc: string;
}) {
  return (
    <div className="relative flex items-center justify-center w-72 h-72 sm:w-80 sm:h-80">
      {/* Orbit ring circles */}
      <div className="absolute inset-0 rounded-full border border-black/8 dark:border-white/8" />
      <div className="absolute rounded-full border border-black/8 dark:border-white/8"
        style={{ inset: "-52px" }} />

      {/* Inner ring items */}
      {innerRing.map((item, i) => (
        <OrbitDot
          key={item.label}
          item={item}
          radius={100}
          duration={14}
          startDeg={(360 / innerRing.length) * i}
        />
      ))}

      {/* Outer ring items */}
      {outerRing.map((item, i) => (
        <OrbitDot
          key={item.label}
          item={item}
          radius={152}
          duration={22}
          startDeg={(360 / outerRing.length) * i}
          reverse
        />
      ))}

      {/* Center photo */}
      <div className="relative z-10 h-28 w-28 sm:h-32 sm:w-32 rounded-full overflow-hidden border-2 border-indigo-400/40 shadow-lg shadow-indigo-500/20">
        <Image
          src={photoSrc}
          alt="Justin Chen"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
