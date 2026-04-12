"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { HeroSection } from "./components/hero/HeroSection";
import { GlowingProjectCard } from "./components/projects/GlowingProjectCard";
import { SkillsGrid } from "./components/skills/SkillsGrid";
import {
  AnimatedTimeline,
  type WorkExperience,
  type Education,
} from "./components/experience/AnimatedTimeline";

// ── Resume data ─────────────────────────────────────────────────────────────

const workExperience: WorkExperience[] = [
  {
    type: "work",
    company: "The Evaluation Company",
    position: "Software Engineer",
    location: "New York, NY",
    startDate: "Apr 2025",
    endDate: "Present",
    achievements: [
      "Built LLM-powered document-processing pipelines integrated with Salesforce and AWS EC2, automating transcript evaluation and data extraction for 200+ daily cases and reducing vendor costs by $93K/month.",
      "Deployed AWS CDK infrastructure for a multi-access portal; implemented CI/CD, RDS, S3, ElastiCache, and ECS/App Runner with full networking and security configuration.",
      "Built FastAPI backend with SQLAlchemy ORM and async task processing via ARQ and Redis for multi-LLM document classification and PDF generation workflows.",
    ],
    technologies: ["Python", "FastAPI", "AWS CDK", "Claude API", "Salesforce API", "Redis", "PostgreSQL"],
  },
  {
    type: "work",
    company: "Colgate-Palmolive",
    position: "Software Engineering Intern",
    location: "Piscataway, NJ",
    startDate: "Jun 2024",
    endDate: "Mar 2025",
    achievements: [
      "Developed shopping cart and mini-cart components in AngularJS and TypeScript, resolving 25+ Jira tickets and improving UX across desktop and mobile.",
    ],
    technologies: ["AngularJS", "TypeScript", "JavaScript"],
  },
];

const education: Education[] = [
  {
    type: "education",
    school: "Stevens Institute of Technology",
    degree: "Master of Engineering",
    field: "Computer Engineering",
    location: "Hoboken, NJ",
    startDate: "Sept 2024",
    endDate: "May 2025",
  },
  {
    type: "education",
    school: "Stevens Institute of Technology",
    degree: "Bachelor of Engineering",
    field: "Computer Engineering",
    location: "Hoboken, NJ",
    startDate: "Sept 2021",
    endDate: "May 2024",
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="flex flex-col gap-24">
      <HeroSection />
      <AboutSection />
      <FeaturedProjects />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

// ── Shared section wrapper ────────────────────────────────────────────────────

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="px-6 sm:px-10 md:px-16 lg:px-24">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="text-2xl sm:text-3xl font-semibold mb-8 tracking-tight"
      >
        {title}
      </motion.h2>
      {children}
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <Section id="about" title="About me">
      <motion.div
        className="grid md:grid-cols-[200px_1fr] gap-8 items-start"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="relative h-[200px] w-[200px] rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-sm">
          <Image
            src="/headshot.jpg"
            alt="Headshot of Justin Chen"
            fill
            className="object-cover"
          />
        </div>
        <p className="text-black/75 dark:text-white/75 leading-7">
          I'm Justin, a software engineer specializing in LLM integration and full-stack development.
          I build intelligent document-processing pipelines, design scalable AWS cloud architectures,
          and create AI-powered web applications — from multi-tenant SaaS platforms with real-time
          data sync to automated evaluation systems using Claude and other LLM providers. I enjoy
          solving complex problems at the intersection of language models and production engineering.
        </p>
      </motion.div>
    </Section>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────

function FeaturedProjects() {
  return (
    <Section id="featured" title="Featured projects">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GlowingProjectCard
          title="Cura"
          description="AI-powered resume tailoring platform that generates job-specific resumes from a master profile using Claude API. Features intelligent content curation, keyword optimization, inline AI suggestions, and PDF parsing via Claude Vision — built on a multi-tenant SaaS architecture with Row-Level Security and real-time data sync."
          tech={["Next.js", "TypeScript", "Claude API", "Supabase", "PostgreSQL", "TanStack Query", "Zustand", "Tailwind CSS"]}
          link="https://cura-resume.vercel.app"
          image="/cura-preview.png"
        />
        <GlowingProjectCard
          title="Alpaca Trading Agent"
          description="End-to-end algorithmic trading system in Python with the Alpaca REST/WebSocket API for real-time order management; deployed on AWS EC2 as a persistent systemd service with a Dash monitoring dashboard. Includes an agentic CI/CD pipeline using Claude Code in rootless Podman containers with autonomous PR creation via Telegram — zero manual SSH access required."
          tech={["Python", "Alpaca API", "AWS EC2", "Dash", "Claude Code", "Podman", "Telegram Bot API", "systemd"]}
          link="https://github.com/juchen3637/AlpacaTradingAgent"
          image="/alpaca-trading-preview.png"
        />
        <GlowingProjectCard
          title="Prediction Market Bot"
          description="Automated prediction market trading system scanning Kalshi and Polymarket, using a multi-LLM ensemble (Anthropic, OpenAI, Gemini) and XGBoost with Kelly criterion position sizing. Deployed microservices pipeline on AWS EC2 with Prometheus/Grafana observability; includes Brier score tracking and 80/20 backtesting on 500+ resolved markets for continuous XGBoost retraining."
          tech={["Python", "XGBoost", "Claude API", "OpenAI API", "Gemini API", "Prometheus", "Grafana", "AWS EC2"]}
          link="https://github.com/juchen3637/predict-market-bot"
          image="/predict-market-preview.png"
        />
      </div>
    </Section>
  );
}

// ── Skills ────────────────────────────────────────────────────────────────────

function SkillsSection() {
  return (
    <Section id="skills" title="Software skills">
      <SkillsGrid />
    </Section>
  );
}

// ── Experience ────────────────────────────────────────────────────────────────

function ExperienceSection() {
  return (
    <Section id="experience" title="Experience & Education">
      <div className="mb-12">
        <h3 className="text-base font-semibold mb-6 text-black/60 dark:text-white/60 uppercase tracking-wider text-xs">
          Work Experience
        </h3>
        <AnimatedTimeline entries={workExperience} />
      </div>
      <div>
        <h3 className="text-base font-semibold mb-6 text-black/60 dark:text-white/60 uppercase tracking-wider text-xs">
          Education
        </h3>
        <AnimatedTimeline entries={education} />
      </div>
    </Section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────

type FormStatus = "idle" | "submitting" | "success" | "error";

function ContactSection() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://submit-form.com/Pb0EHY5H", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="contact" title="Contact">
      <div className="grid sm:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="flex flex-col gap-2 text-sm text-black/70 dark:text-white/70"
        >
          <p>
            Email:{" "}
            <a
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
              href="mailto:juchen3637@gmail.com"
            >
              juchen3637@gmail.com
            </a>
          </p>
          <p>Location: New York, NY</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm mb-1.5 font-medium">Name</label>
            <input
              name="name"
              required
              placeholder="Your name"
              className="w-full rounded-lg border border-black/15 dark:border-white/15 bg-black/3 dark:bg-white/4 px-3 py-2.5 text-sm placeholder:text-black/35 dark:placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition"
            />
          </div>
          <div>
            <label className="block text-sm mb-1.5 font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border border-black/15 dark:border-white/15 bg-black/3 dark:bg-white/4 px-3 py-2.5 text-sm placeholder:text-black/35 dark:placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition"
            />
          </div>
          <div>
            <label className="block text-sm mb-1.5 font-medium">Message</label>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="How can I help?"
              className="w-full rounded-lg border border-black/15 dark:border-white/15 bg-black/3 dark:bg-white/4 px-3 py-2.5 text-sm placeholder:text-black/35 dark:placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition resize-none"
            />
          </div>

          {status === "success" && (
            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
              Message sent — I'll be in touch soon!
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-rose-600 dark:text-rose-400 font-medium">
              Something went wrong. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting" || status === "success"}
            className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm transition-colors cursor-pointer"
          >
            {status === "submitting" ? "Sending…" : "Send"}
          </button>
        </motion.form>
      </div>
    </Section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="px-6 sm:px-10 md:px-16 lg:px-24 py-10 text-xs text-black/30 dark:text-white/30 text-center">
      © {new Date().getFullYear()} Justin Chen
    </footer>
  );
}
