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

function AboutSection() {
  return (
    <Section
      id="about"
      eyebrow="01 / ABOUT"
      headline="WHO IS THIS GUY?"
      bgVariant="black"
    >
      <div className="grid md:grid-cols-3 gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="md:col-span-2 bg-p5-white text-p5-black p-6 sm:p-8 -rotate-1 shadow-p5"
          style={{ clipPath: "polygon(2% 0, 100% 3%, 98% 100%, 0 97%)" }}
        >
          <p className="font-body text-base sm:text-lg leading-7">
            I&apos;m Justin, a software engineer specializing in{" "}
            <strong className="bg-p5-yellow text-p5-black px-1">LLM integration</strong>{" "}
            and full-stack development. I build intelligent document-processing
            pipelines, design scalable AWS cloud architectures, and create AI-powered
            web applications — from multi-tenant SaaS platforms with real-time data
            sync to automated evaluation systems using Claude and other LLM providers.
            I enjoy solving complex problems at the intersection of language models
            and production engineering.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-4"
        >
          <StatTile label="BASED IN" value="NEW YORK" rotate={2} />
          <StatTile label="FOCUS" value="LLM × FULL-STACK" rotate={-2} />
          <StatTile label="STATUS" value="OPEN TO HIRE ★" highlight rotate={2} />
        </motion.div>
      </div>
    </Section>
  );
}

function StatTile({
  label,
  value,
  highlight,
  rotate = 0,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  rotate?: number;
}) {
  return (
    <div
      className={`p-4 shadow-p5-yellow ${
        highlight ? "bg-p5-yellow text-p5-black" : "bg-p5-magenta text-p5-white"
      }`}
      style={{
        transform: `rotate(${rotate}deg)`,
        clipPath: "polygon(3% 0, 100% 4%, 97% 100%, 0 96%)",
      }}
    >
      <div className="font-label text-xs tracking-widest opacity-80 mb-1">
        {label}
      </div>
      <div className="font-display font-black tracking-tight uppercase text-xl">
        {value}
      </div>
    </div>
  );
}

// ── Section wrapper ─────────────────────────────────────────────────────────

function Section({
  id,
  eyebrow,
  headline,
  bgVariant = "magenta",
  children,
}: {
  id: string;
  eyebrow: string;
  headline: string;
  bgVariant?: "magenta" | "black";
  children: React.ReactNode;
}) {
  const isMagenta = bgVariant === "magenta";
  return (
    <section
      id={id}
      className={`relative overflow-hidden py-20 sm:py-28 ${
        isMagenta ? "bg-p5-magenta" : "bg-p5-bg"
      }`}
    >
      {/* Halftone backdrop */}
      <div
        aria-hidden
        className={`absolute inset-0 pointer-events-none opacity-10 ${
          isMagenta ? "halftone-white" : "halftone-red"
        } animate-halftone-drift`}
      />

      {/* Tilted black slash decoration */}
      {isMagenta && (
        <div
          aria-hidden
          className="absolute top-1/3 -right-20 w-96 h-32 bg-p5-black -rotate-6 opacity-90 pointer-events-none"
          style={{ clipPath: "polygon(0 20%, 100% 0, 100% 100%, 0 80%)" }}
        />
      )}

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10">
        <SectionHeader eyebrow={eyebrow} headline={headline} bgVariant={bgVariant} />
        {children}
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  headline,
  bgVariant,
}: {
  eyebrow: string;
  headline: string;
  bgVariant: "magenta" | "black";
}) {
  return (
    <div className="mb-12 sm:mb-16">
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4 }}
        className={`inline-block ${
          bgVariant === "magenta" ? "bg-p5-black text-p5-white" : "bg-p5-magenta text-p5-white"
        } font-label font-bold text-xs tracking-widest px-3 py-1.5 -rotate-2 mb-4 shadow-p5-yellow`}
        style={{ clipPath: "polygon(4% 0, 100% 0, 96% 100%, 0 100%)" }}
      >
        {eyebrow}
      </motion.div>

      {/* Slashing headline */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`font-display font-black uppercase tracking-tighter text-5xl sm:text-7xl md:text-8xl leading-none italic ${
          bgVariant === "magenta" ? "text-p5-white" : "text-p5-white"
        }`}
      >
        {headline}
      </motion.h2>
    </div>
  );
}

// ── Featured Projects ──────────────────────────────────────────────────────

function FeaturedProjects() {
  return (
    <Section
      id="featured"
      eyebrow="02 / WORK"
      headline="PROJECTS / EQUIPPED"
      bgVariant="black"
    >
      <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
        <GlowingProjectCard
          index={1}
          title="Cura"
          subtitle="AI Resume Persona · NULL: Rewrites"
          description="AI-powered resume tailoring platform that generates job-specific resumes from a master profile using Claude API. Features intelligent content curation, keyword optimization, inline AI suggestions, and PDF parsing via Claude Vision."
          tech={["Next.js", "TypeScript", "Claude API", "Supabase", "PostgreSQL", "TanStack Query", "Zustand", "Tailwind"]}
          link="https://cura-resume.vercel.app"
          cta="VIEW LIVE →"
          rarity="★★★★ EPIC"
          image="/cura-preview.png"
          rotate={-2}
        />
        <GlowingProjectCard
          index={2}
          title="Alpaca Trading Agent"
          subtitle="Algo-Trading Persona · STR: Shipping"
          description="End-to-end algorithmic trading system in Python with the Alpaca REST/WebSocket API; deployed on AWS EC2 as a persistent systemd service with a Dash monitoring dashboard. Includes an agentic CI/CD pipeline using Claude Code in rootless Podman containers."
          tech={["Python", "Alpaca API", "AWS EC2", "Dash", "Claude Code", "Podman", "Telegram", "systemd"]}
          link="https://github.com/juchen3637/AlpacaTradingAgent"
          cta="GITHUB →"
          rarity="★★★ RARE"
          image="/alpaca-trading-preview.png"
          rotate={1}
        />
        <GlowingProjectCard
          index={3}
          title="Predict-Market-Bot"
          subtitle="Ensemble Persona · WEAK: Sleep"
          description="Automated prediction market trading system scanning Kalshi and Polymarket, using a multi-LLM ensemble (Anthropic, OpenAI, Gemini) and XGBoost with Kelly criterion position sizing. Deployed microservices on AWS EC2 with Prometheus/Grafana observability."
          tech={["Python", "XGBoost", "Claude", "OpenAI", "Gemini", "Prometheus", "Grafana", "AWS EC2"]}
          link="https://github.com/juchen3637/predict-market-bot"
          cta="GITHUB →"
          rarity="★★★★ EPIC"
          image="/predict-market-preview.png"
          rotate={-1}
        />
      </div>
    </Section>
  );
}

// ── Skills ───────────────────────────────────────────────────────────────────

function SkillsSection() {
  return (
    <Section
      id="skills"
      eyebrow="03 / STACK"
      headline="WEAPONS & ARTS"
      bgVariant="magenta"
    >
      <SkillsGrid />
    </Section>
  );
}

// ── Experience ───────────────────────────────────────────────────────────────

function ExperienceSection() {
  return (
    <Section
      id="experience"
      eyebrow="04 / DEEDS"
      headline="QUEST LOG"
      bgVariant="black"
    >
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h3 className="font-label font-bold text-xs tracking-widest text-p5-yellow mb-6">
            ▸ WORK EXPERIENCE
          </h3>
          <AnimatedTimeline entries={workExperience} />
        </div>
        <div>
          <h3 className="font-label font-bold text-xs tracking-widest text-p5-yellow mb-6">
            ▸ EDUCATION
          </h3>
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
      eyebrow="05 / SUMMON"
      headline="TAKE MY HEART → HIRE ME"
      bgVariant="magenta"
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact info card */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: -3 }}
          whileInView={{ opacity: 1, y: 0, rotate: -2 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="bg-p5-black text-p5-white p-6 sm:p-8 shadow-p5-yellow"
          style={{ clipPath: "polygon(2% 0, 100% 3%, 98% 100%, 0 97%)" }}
        >
          <div className="bg-p5-magenta inline-block px-3 py-1 -rotate-1 font-display font-black uppercase tracking-tight text-lg mb-6">
            CONTACT INFO
          </div>
          <div className="space-y-4 font-label">
            <div>
              <div className="text-xs text-p5-fg-muted tracking-widest mb-1">EMAIL</div>
              <a
                href="mailto:juchen3637@gmail.com"
                className="text-p5-yellow hover:underline font-display font-bold text-lg"
              >
                juchen3637@gmail.com
              </a>
            </div>
            <div>
              <div className="text-xs text-p5-fg-muted tracking-widest mb-1">LOCATION</div>
              <div className="font-display font-bold text-lg">New York, NY</div>
            </div>
            <div>
              <div className="text-xs text-p5-fg-muted tracking-widest mb-1">STATUS</div>
              <div className="bg-p5-yellow text-p5-black inline-block px-2 py-0.5 font-display font-black text-sm">
                ★ OPEN TO HIRE ★
              </div>
            </div>
          </div>
          <p className="mt-6 font-display italic text-sm text-p5-fg-muted">
            // fastest reply via email
          </p>
        </motion.div>

        {/* Contact form */}
        <motion.form
          initial={{ opacity: 0, y: 20, rotate: 3 }}
          whileInView={{ opacity: 1, y: 0, rotate: 2 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-p5-white text-p5-black shadow-p5-black"
          style={{ clipPath: "polygon(2% 0, 100% 3%, 98% 100%, 0 97%)" }}
        >
          <div className="bg-p5-magenta px-4 py-2 font-display font-black uppercase tracking-tight text-lg text-p5-white">
            SEND MESSAGE
          </div>
          <div className="p-6 sm:p-8 space-y-4">
            <FormField label="NAME" name="name" placeholder="Your designation" required />
            <FormField label="EMAIL" name="email" type="email" placeholder="transmission@node" required />
            <FormField label="MESSAGE" name="message" textarea placeholder="Decode thoughts here..." required />

            {status === "success" && (
              <p className="font-display italic font-bold text-p5-magenta-deep">
                ★ All-Out Attack incoming. Talk soon!
              </p>
            )}
            {status === "error" && (
              <p className="font-display italic font-bold text-red-700">
                Critical miss. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting" || status === "success"}
              className="bg-p5-black text-p5-white font-display font-black tracking-tight uppercase text-base px-6 py-3 shadow-p5 hover:bg-p5-yellow hover:text-p5-black disabled:opacity-60 disabled:cursor-not-allowed transition-colors -rotate-1"
              style={{ clipPath: "polygon(4% 0, 100% 4%, 96% 100%, 0 96%)" }}
            >
              {status === "submitting" ? "Sending…" : "Send →"}
            </button>
          </div>
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
    "w-full bg-p5-white text-p5-black border-[3px] border-p5-black px-3 py-2.5 font-body text-sm placeholder:text-p5-black/35 focus:outline-none focus:border-p5-magenta focus:ring-2 focus:ring-p5-magenta transition-colors";
  return (
    <label className="block">
      <span className="block font-label font-bold text-xs tracking-widest mb-1.5">
        {label}
      </span>
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
    <footer className="relative bg-p5-black text-p5-white py-10 px-6 sm:px-10 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 halftone-red opacity-10 pointer-events-none"
      />
      <div className="relative mx-auto max-w-[1440px] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-display font-black uppercase text-2xl tracking-tighter">
          JUSTIN<span className="text-p5-magenta">.</span>CHEN
        </div>
        <div className="font-label text-xs tracking-widest text-p5-fg-muted">
          © {new Date().getFullYear()} · NO MORE GAMES
        </div>
      </div>
    </footer>
  );
}
