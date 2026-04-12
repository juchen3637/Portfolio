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

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

function TimelineItem({ data, index }: { data: TimelineEntry; index: number }) {
  const isWork = data.type === "work";
  const isCurrent = isWork && data.endDate === "Present";

  const dotClass = isWork
    ? "bg-gradient-to-br from-indigo-500 to-sky-400"
    : "bg-gradient-to-br from-fuchsia-500 to-rose-400";

  return (
    <motion.div
      className="relative"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08 }}
    >
      {/* Timeline dot */}
      <div
        className={`absolute -left-[1.15rem] top-6 h-4 w-4 rounded-full ${dotClass} border-2 border-white dark:border-[#0a0a0a] shadow-md z-10 ${
          isCurrent ? "animate-pulse-glow" : ""
        }`}
      />

      <div className="rounded-xl border border-black/10 dark:border-white/10 p-5 bg-white/60 dark:bg-white/[0.03] backdrop-blur ml-6 hover:-translate-y-0.5 hover:shadow-md transition-transform duration-200">
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
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
        <div>
          <h3 className="text-base font-semibold">{data.position}</h3>
          <p className="text-sm text-black/65 dark:text-white/65">{data.company}</p>
          {data.location && (
            <p className="text-xs text-black/50 dark:text-white/50">{data.location}</p>
          )}
        </div>
        <span className="text-xs text-black/50 dark:text-white/50 whitespace-nowrap shrink-0">
          {data.startDate} – {data.endDate}
        </span>
      </div>
      <ul className="space-y-2 mb-4">
        {data.achievements.map((a, i) => (
          <li key={i} className="text-sm text-black/70 dark:text-white/65 pl-4 relative leading-6">
            <span className="absolute left-0 text-indigo-500">•</span>
            {a}
          </li>
        ))}
      </ul>
      {data.technologies && data.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {data.technologies.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-300"
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
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
        <div>
          <h3 className="text-base font-semibold">{data.school}</h3>
          <p className="text-sm text-black/65 dark:text-white/65">
            {data.degree}{data.field ? ` in ${data.field}` : ""}
          </p>
          {data.location && (
            <p className="text-xs text-black/50 dark:text-white/50">{data.location}</p>
          )}
        </div>
        <span className="text-xs text-black/50 dark:text-white/50 whitespace-nowrap shrink-0">
          {data.startDate} – {data.endDate}
        </span>
      </div>
      {data.highlights && data.highlights.length > 0 && (
        <ul className="space-y-1 mt-2">
          {data.highlights.map((h, i) => (
            <li key={i} className="text-sm text-black/70 dark:text-white/65 pl-4 relative">
              <span className="absolute left-0 text-fuchsia-500">•</span>
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
    <div className="relative pl-4">
      {/* Vertical line */}
      <div className="absolute left-[7px] top-4 bottom-0 w-[2px] bg-gradient-to-b from-black/20 via-black/10 to-transparent dark:from-white/20 dark:via-white/10 dark:to-transparent" />
      <div className="space-y-6">
        {entries.map((entry, i) => (
          <TimelineItem key={i} data={entry} index={i} />
        ))}
      </div>
    </div>
  );
}
