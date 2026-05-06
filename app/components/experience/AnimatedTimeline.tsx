"use client";
import { motion } from "framer-motion";

export interface WorkExperience {
  type: "work";
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string;
  achievements: string[];
  technologies?: string[];
}

export interface Education {
  type: "education";
  school: string;
  degree: string;
  field?: string;
  location?: string;
  startDate: string;
  endDate: string;
  highlights?: string[];
}

export type TimelineEntry = WorkExperience | Education;

function QuestCard({ data, index }: { data: TimelineEntry; index: number }) {
  const isWork = data.type === "work";
  const isCurrent = isWork && data.endDate === "Present";
  const rotate = index % 2 === 0 ? -1.5 : 1.5;
  const initialRotate = rotate + (index % 2 === 0 ? -4 : 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, rotate: initialRotate, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, rotate, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        ease: [0.2, 0.8, 0.2, 1],
        delay: index * 0.08,
      }}
      className={`relative bg-p5-black text-p5-white shadow-p5 ${
        isCurrent ? "animate-pulse-glow" : ""
      }`}
    >
      {/* Banner */}
      <div className="bg-p5-magenta px-4 py-2 flex items-center justify-between">
        <span className="font-display font-black tracking-tight uppercase text-xs sm:text-sm text-p5-white">
          {isCurrent ? "★ PRESENT QUEST ★" : isWork ? "COMPLETED" : "ENROLLED"}
        </span>
        <span className="font-label text-xs text-p5-yellow tracking-widest">
          {data.startDate} — {data.endDate}
        </span>
      </div>

      <div className="p-5">
        {isWork ? (
          <WorkContent data={data as WorkExperience} />
        ) : (
          <EducationContent data={data as Education} />
        )}
      </div>
    </motion.div>
  );
}

function WorkContent({ data }: { data: WorkExperience }) {
  return (
    <>
      <h3 className="font-display font-black tracking-tight uppercase text-xl sm:text-2xl text-p5-white">
        {data.position}
      </h3>
      <div className="bg-p5-yellow text-p5-black inline-block px-2 py-0.5 mt-2 font-display italic font-bold text-xs">
        {data.company}
        {data.location ? ` · ${data.location}` : ""}
      </div>
      <ul className="mt-4 space-y-2">
        {data.achievements.map((a, i) => (
          <li
            key={i}
            className="font-body text-sm leading-6 text-p5-fg pl-4 relative"
          >
            <span className="absolute left-0 text-p5-magenta font-bold">▸</span>
            {a}
          </li>
        ))}
      </ul>
      {data.technologies && data.technologies.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {data.technologies.map((t) => (
            <span
              key={t}
              className="bg-p5-white text-p5-black font-label text-[10px] font-semibold tracking-wider px-2 py-0.5"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </>
  );
}

function EducationContent({ data }: { data: Education }) {
  return (
    <>
      <h3 className="font-display font-black tracking-tight uppercase text-xl text-p5-white">
        {data.school}
      </h3>
      <div className="bg-p5-yellow text-p5-black inline-block px-2 py-0.5 mt-2 font-display italic font-bold text-xs">
        {data.degree}
        {data.field ? ` · ${data.field}` : ""}
      </div>
      {data.location && (
        <p className="font-label text-xs text-p5-fg-muted mt-2 tracking-wider">
          {data.location}
        </p>
      )}
      {data.highlights && data.highlights.length > 0 && (
        <ul className="mt-3 space-y-1">
          {data.highlights.map((h, i) => (
            <li key={i} className="font-body text-sm text-p5-fg pl-4 relative">
              <span className="absolute left-0 text-p5-magenta">▸</span>
              {h}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export function AnimatedTimeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="space-y-6">
      {entries.map((entry, i) => (
        <QuestCard key={i} data={entry} index={i} />
      ))}
    </div>
  );
}
