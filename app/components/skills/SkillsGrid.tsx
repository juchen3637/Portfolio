"use client";
import { motion } from "framer-motion";

interface SkillGroup {
  label: string;
  glyph: string;
  skills: string[];
  rotate: number;
}

const skillGroups: SkillGroup[] = [
  {
    label: "LANGUAGES",
    glyph: "⚔",
    skills: ["Python", "TypeScript", "JavaScript", "C++", "Java"],
    rotate: -2,
  },
  {
    label: "FRAMEWORKS",
    glyph: "⚙",
    skills: ["React", "Next.js", "FastAPI", "Node.js", "Express", "Angular", "SQLAlchemy"],
    rotate: 2,
  },
  {
    label: "CLOUD & INFRA",
    glyph: "☁",
    skills: ["AWS CDK", "EC2", "ECS", "RDS", "S3", "ElastiCache", "Docker", "PostgreSQL", "Redis", "CI/CD"],
    rotate: -2,
  },
  {
    label: "AI / LLM",
    glyph: "✦",
    skills: ["Claude API", "OpenAI", "LangChain", "LLM Pipelines", "RAG", "Prompt Engineering", "ARQ"],
    rotate: 2,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 6 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

export function SkillsGrid() {
  return (
    <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
      {skillGroups.map((group, gi) => (
        <motion.div
          key={group.label}
          initial={{ opacity: 0, y: 24, rotate: group.rotate * 2 }}
          whileInView={{ opacity: 1, y: 0, rotate: group.rotate }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: gi * 0.08 }}
          className="bg-p5-black text-p5-white shadow-p5"
          style={{
            clipPath: "polygon(2% 0, 100% 3%, 98% 100%, 0 97%)",
          }}
        >
          {/* Group banner */}
          <div className="bg-p5-magenta px-4 py-2 flex items-center gap-2 font-display font-black tracking-tight">
            <span className="text-xl">{group.glyph}</span>
            <span className="uppercase text-lg sm:text-xl">{group.label}</span>
          </div>

          {/* Skill chips */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="p-4 sm:p-5 flex flex-wrap gap-2"
          >
            {group.skills.map((skill) => (
              <motion.span
                key={skill}
                variants={chipVariants}
                whileHover={{ scale: 1.06, rotate: -2 }}
                className="bg-p5-white text-p5-black px-3 py-1 font-label font-semibold text-xs tracking-wide cursor-default select-none"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
