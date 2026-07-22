"use client";
import { motion } from "framer-motion";

interface SkillGroup {
  label: string;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "C++", "Java"],
  },
  {
    label: "Frameworks",
    skills: ["React", "Next.js", "FastAPI", "Node.js", "Express", "Angular", "SQLAlchemy"],
  },
  {
    label: "Cloud & Infra",
    skills: ["AWS CDK", "EC2", "ECS", "RDS", "S3", "ElastiCache", "Docker", "PostgreSQL", "Redis", "CI/CD"],
  },
  {
    label: "AI / LLM",
    skills: ["Claude API", "OpenAI", "LangChain", "LLM Pipelines", "RAG", "Prompt Engineering", "ARQ"],
  },
];

export function SkillsGrid() {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
      {skillGroups.map((group, gi) => (
        <motion.div
          key={group.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: gi * 0.06 }}
          className="bg-surface p-6"
        >
          <h3 className="eyebrow mb-4">{group.label}</h3>
          <div className="flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-border bg-bg px-2.5 py-1 font-mono text-xs text-muted"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
