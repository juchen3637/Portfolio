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
    skills: ["Claude API", "OpenAI API", "LangChain", "LLM Pipelines", "RAG", "Prompt Engineering", "ARQ"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

const groupVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

export function SkillsGrid() {
  return (
    <div className="flex flex-col gap-8">
      {skillGroups.map((group, gi) => (
        <motion.div
          key={group.label}
          variants={groupVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: gi * 0.1 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3">
            {group.label}
          </p>
          <motion.div
            className="flex flex-wrap gap-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {group.skills.map((skill) => (
              <motion.span
                key={skill}
                variants={badgeVariants}
                whileHover={{ scale: 1.06 }}
                className="px-3 py-1.5 rounded-full text-sm border border-black/10 dark:border-white/12 bg-black/3 dark:bg-white/4 hover:border-indigo-400/50 dark:hover:border-indigo-400/40 hover:shadow-[0_0_8px_0_rgb(99_102_241/0.3)] transition-shadow cursor-default select-none"
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
