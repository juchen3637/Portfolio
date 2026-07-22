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

function Entry({ data, index, last }: { data: TimelineEntry; index: number; last: boolean }) {
  const isWork = data.type === "work";
  const isCurrent = isWork && data.endDate === "Present";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      className="relative pl-8"
    >
      {/* Rail */}
      {!last && (
        <span
          aria-hidden
          className="absolute left-[5px] top-2 h-full w-px bg-border"
        />
      )}
      {/* Dot */}
      <span
        aria-hidden
        className={`absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 ${
          isCurrent ? "border-accent bg-accent" : "border-border-strong bg-surface"
        }`}
      />

      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs text-faint">
          {data.startDate} — {data.endDate}
        </span>
        {isCurrent && (
          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent">
            Current
          </span>
        )}
      </div>

      {isWork ? <WorkContent data={data} /> : <EducationContent data={data} />}
    </motion.div>
  );
}

function WorkContent({ data }: { data: WorkExperience }) {
  return (
    <div className="mt-1 pb-8">
      <h4 className="font-display text-lg font-bold tracking-tight text-ink">
        {data.position}
      </h4>
      <p className="text-sm font-medium text-muted">
        {data.company}
        {data.location ? ` · ${data.location}` : ""}
      </p>
      <ul className="mt-3 space-y-2">
        {data.achievements.map((a, i) => (
          <li key={i} className="relative pl-4 text-sm leading-6 text-muted">
            <span className="absolute left-0 top-[9px] h-1 w-1 rounded-full bg-accent" />
            {a}
          </li>
        ))}
      </ul>
      {data.technologies && data.technologies.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {data.technologies.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border bg-bg px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function EducationContent({ data }: { data: Education }) {
  return (
    <div className="mt-1 pb-8">
      <h4 className="font-display text-lg font-bold tracking-tight text-ink">
        {data.school}
      </h4>
      <p className="text-sm font-medium text-muted">
        {data.degree}
        {data.field ? ` · ${data.field}` : ""}
      </p>
      {data.location && (
        <p className="mt-1 font-mono text-xs text-faint">{data.location}</p>
      )}
      {data.highlights && data.highlights.length > 0 && (
        <ul className="mt-3 space-y-1">
          {data.highlights.map((h, i) => (
            <li key={i} className="relative pl-4 text-sm leading-6 text-muted">
              <span className="absolute left-0 top-[9px] h-1 w-1 rounded-full bg-accent" />
              {h}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function AnimatedTimeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div>
      {entries.map((entry, i) => (
        <Entry key={i} data={entry} index={i} last={i === entries.length - 1} />
      ))}
    </div>
  );
}
