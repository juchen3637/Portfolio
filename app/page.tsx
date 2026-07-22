"use client";
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
    company: "Jefferies Group LLC",
    position: "Software Engineer",
    location: "Jersey City, NJ",
    startDate: "May 2025",
    endDate: "Present",
    achievements: [
      "Consolidating and automating finance and HR data pipelines from Oracle PeopleSoft to Snowflake using Claude Code and Snowflake Openflow.",
    ],
    technologies: ["Claude Code", "Snowflake", "Snowflake Openflow", "Oracle PeopleSoft", "SQL"],
  },
  {
    type: "work",
    company: "The Evaluation Company",
    position: "Software Engineer",
    location: "New York, NY",
    startDate: "Apr 2025",
    endDate: "May 2026",
    achievements: [
      "Built LLM-powered document-processing pipelines integrated with Salesforce and AWS EC2, automating transcript evaluation and data extraction for 200+ daily cases and reducing vendor costs by $93K/month.",
      "Deployed AWS CDK infrastructure for a multi-access portal; implemented CI/CD, RDS, S3, ElastiCache, and ECS/App Runner with full networking and security configuration.",
      "Built a FastAPI backend with SQLAlchemy ORM and async task processing via ARQ and Redis for multi-LLM document classification and PDF generation workflows.",
    ],
    technologies: ["Python", "FastAPI", "AWS CDK", "Claude API", "Redis", "PostgreSQL"],
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
    <main>
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

// ── Section wrapper ───────────────────────────────────────────────────────────

function Section({
  id,
  eyebrow,
  headline,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  headline: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-2xl"
        >
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {headline}
          </h2>
          {intro && <p className="mt-4 text-lg leading-8 text-muted">{intro}</p>}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <Section id="about" eyebrow="01 / About" headline="Engineer at the intersection of LLMs and production systems">
      <div className="grid gap-10 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-2"
        >
          <p className="text-lg leading-8 text-muted">
            I&apos;m Justin — a software engineer who specializes in turning large
            language models into reliable, shippable products. I build intelligent
            document-processing pipelines, design scalable AWS cloud architectures,
            and create AI-powered web apps: multi-tenant SaaS platforms with
            real-time data, and automated evaluation systems built on Claude and
            other LLM providers.
          </p>
          <p className="mt-4 text-lg leading-8 text-muted">
            I like the hard part — the seam where language models meet real
            production engineering. Beyond full-time work, I also take on select
            freelance and consulting projects for teams and local businesses
            looking to ship AI features.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="flex flex-col gap-px overflow-hidden rounded-xl border border-border bg-border"
        >
          <StatTile label="Based in" value="New York, NY" />
          <StatTile label="Focus" value="LLM × Full-stack" />
          <StatTile label="Currently" value="Jefferies Group LLC" />
        </motion.div>
      </div>
    </Section>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface p-5">
      <div className="eyebrow">{label}</div>
      <div className="mt-1 font-display text-lg font-bold tracking-tight text-ink">
        {value}
      </div>
    </div>
  );
}

// ── Featured Projects ──────────────────────────────────────────────────────

function FeaturedProjects() {
  return (
    <Section
      id="featured"
      eyebrow="02 / Work"
      headline="Selected work"
      intro="A few projects that show how I take LLM-powered systems from idea to production."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <GlowingProjectCard
          index={1}
          title="Cura"
          tagline="AI résumé tailoring"
          description="AI-powered résumé platform that generates job-specific résumés from a master profile using the Claude API — with intelligent content curation, keyword optimization, inline AI suggestions, and PDF parsing via Claude Vision."
          tech={["Next.js", "TypeScript", "Claude API", "Supabase", "PostgreSQL", "TanStack Query"]}
          link="https://cura-resume.vercel.app"
          cta="View live"
          image="/cura-preview.png"
        />
        <GlowingProjectCard
          index={2}
          title="Alpaca Trading Agent"
          tagline="Algorithmic trading system"
          description="End-to-end algorithmic trading system in Python on the Alpaca REST/WebSocket API, deployed to AWS EC2 as a persistent systemd service with a Dash monitoring dashboard and an agentic CI/CD pipeline running Claude Code in rootless Podman containers."
          tech={["Python", "Alpaca API", "AWS EC2", "Dash", "Claude Code", "Podman"]}
          link="https://github.com/juchen3637/AlpacaTradingAgent"
          cta="View on GitHub"
          image="/predict-market-preview.png"
        />
        <GlowingProjectCard
          index={3}
          title="Predict-Market-Bot"
          tagline="Multi-LLM prediction markets"
          description="Automated prediction-market trading system scanning Kalshi and Polymarket, using a multi-LLM ensemble (Anthropic, OpenAI, Gemini) and XGBoost with Kelly-criterion position sizing. Deployed as microservices on AWS EC2 with Prometheus/Grafana observability."
          tech={["Python", "XGBoost", "Claude", "OpenAI", "Gemini", "Prometheus", "Grafana"]}
          link="https://github.com/juchen3637/predict-market-bot"
          cta="View on GitHub"
          image="/alpaca-trading-preview.png"
        />
      </div>
    </Section>
  );
}

// ── Skills ───────────────────────────────────────────────────────────────────

function SkillsSection() {
  return (
    <Section id="skills" eyebrow="03 / Stack" headline="Tools I build with">
      <SkillsGrid />
    </Section>
  );
}

// ── Experience ───────────────────────────────────────────────────────────────

function ExperienceSection() {
  return (
    <Section id="experience" eyebrow="04 / Experience" headline="Where I've worked & studied">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h3 className="eyebrow mb-8">Experience</h3>
          <AnimatedTimeline entries={workExperience} />
        </div>
        <div>
          <h3 className="eyebrow mb-8">Education</h3>
          <AnimatedTimeline entries={education} />
        </div>
      </div>
    </Section>
  );
}

// ── Contact ─────────────────────────────────────────────────────────────────

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
    <Section
      id="contact"
      eyebrow="05 / Contact"
      headline="Let's build something"
      intro="Open to full-time roles and available for select freelance and consulting projects. The fastest way to reach me is email."
    >
      <div className="grid gap-8 md:grid-cols-2">
        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6 rounded-xl border border-border bg-surface p-6 sm:p-8"
        >
          <div>
            <div className="eyebrow">Email</div>
            <a
              href="mailto:juchen3637@gmail.com"
              className="mt-1 block font-display text-lg font-bold tracking-tight text-accent hover:underline"
            >
              juchen3637@gmail.com
            </a>
          </div>
          <div>
            <div className="eyebrow">Location</div>
            <div className="mt-1 font-display text-lg font-bold tracking-tight text-ink">
              New York, NY
            </div>
          </div>
          <div>
            <div className="eyebrow">Status</div>
            <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-ok-soft px-3 py-1 text-sm font-medium text-ok ring-1 ring-ok/20">
              <span className="h-1.5 w-1.5 rounded-full bg-ok" />
              Open to work
            </span>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          onSubmit={handleSubmit}
          className="rounded-xl border border-border bg-surface p-6 sm:p-8"
        >
          {status === "success" ? (
            <div className="flex h-full min-h-[16rem] flex-col items-center justify-center text-center">
              <div className="font-display text-xl font-bold tracking-tight text-ink">
                Message received.
              </div>
              <p className="mt-2 text-sm text-muted">Thanks — I&apos;ll be in touch soon.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <FormField label="Name" name="name" placeholder="Your name" required />
              <FormField label="Email" name="email" type="email" placeholder="you@company.com" required />
              <FormField label="Message" name="message" textarea placeholder="What are you working on?" required />

              {status === "error" && (
                <p className="text-sm font-medium text-red-600">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Send message"}
              </button>
            </div>
          )}
        </motion.form>
      </div>
    </Section>
  );
}

function FormField({
  label,
  name,
  type = "text",
  placeholder,
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const baseClass =
    "w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors";
  return (
    <label className="block">
      <span className="eyebrow mb-1.5 block">{label}</span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={4}
          placeholder={placeholder}
          className={`${baseClass} resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className={baseClass}
        />
      )}
    </label>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="font-display text-lg font-extrabold tracking-tight text-ink">
          Justin Chen
        </div>
        <div className="font-mono text-xs text-faint">
          © {new Date().getFullYear()} · Built with Next.js
        </div>
      </div>
    </footer>
  );
}
