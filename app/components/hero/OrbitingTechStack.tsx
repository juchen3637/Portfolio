"use client";
import Image from "next/image";

/**
 * Persona-5-style portrait frame: tilted polygon mask with halftone burst rings
 * radiating from behind, plus white "All-Out Attack" motion lines.
 */
export function OrbitingTechStack({ photoSrc }: { photoSrc: string }) {
  return (
    <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
      {/* Black polygon backing — slightly larger than the portrait, tilted */}
      <div
        aria-hidden
        className="absolute inset-0 bg-p5-black -rotate-3 shadow-p5-yellow"
        style={{
          clipPath: "polygon(6% 2%, 96% 0, 100% 94%, 4% 100%)",
        }}
      />

      {/* Halftone burst rings behind portrait */}
      <div
        aria-hidden
        className="absolute inset-3 halftone-white opacity-25"
        style={{
          clipPath: "circle(48% at 50% 50%)",
        }}
      />

      {/* Portrait clipped into a tilted polygon */}
      <div
        className="relative w-[82%] h-[82%] rotate-2 overflow-hidden"
        style={{
          clipPath: "polygon(4% 0, 100% 6%, 96% 100%, 0 94%)",
        }}
      >
        <Image
          src={photoSrc}
          alt="Justin Chen"
          fill
          className="object-cover saturate-[1.2] contrast-[1.15]"
          priority
          sizes="(min-width: 640px) 384px, 288px"
        />
      </div>

      {/* White motion lines — All-Out Attack splay */}
      <svg
        aria-hidden
        className="absolute -inset-6 pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * 360;
          const x1 = 50 + Math.cos((angle * Math.PI) / 180) * 50;
          const y1 = 50 + Math.sin((angle * Math.PI) / 180) * 50;
          const x2 = 50 + Math.cos((angle * Math.PI) / 180) * 60;
          const y2 = 50 + Math.sin((angle * Math.PI) / 180) * 60;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="white"
              strokeWidth="0.5"
              opacity="0.7"
            />
          );
        })}
      </svg>

      {/* Floating tag — Code & Caffeine sticker, P5 style */}
      <div
        className="absolute -bottom-3 -left-3 bg-p5-yellow text-p5-black font-display font-black text-xs px-3 py-1 -rotate-12 shadow-p5-black"
        style={{ clipPath: "polygon(4% 0, 100% 6%, 96% 100%, 0 94%)" }}
      >
        CODE & CAFFEINE
      </div>
    </div>
  );
}
