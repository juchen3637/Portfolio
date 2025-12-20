"use client";
import Image from "next/image";
import { motion } from "framer-motion";

// Resume data types
interface WorkExperience {
  type: 'work';
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string;
  achievements: string[];
  technologies?: string[];
}

interface Education {
  type: 'education';
  school: string;
  degree: string;
  field?: string;
  location?: string;
  startDate: string;
  endDate: string;
  highlights?: string[];
}

type TimelineEntry = WorkExperience | Education;

// Resume data
const workExperience: WorkExperience[] = [
  {
    type: 'work',
    company: 'The Evaluation Company',
    position: 'Associate Software Engineer',
    location: 'New York, NY',
    startDate: 'Apr 2025',
    endDate: 'Present',
    achievements: [
      'Developed LLM-powered document-processing pipelines integrated with Salesforce APIs and AWS EC2-based automation services, enabling automated transcript evaluation, translation, and data extraction for 200+ daily cases and reducing external vendor costs by $13K/month.',
      'Designed and deployed AWS CDK infrastructure for a multi-access portal serving internal staff, applicants, and university partners; implemented CI/CD automation, networking, security, and core services (RDS, S3, ElastiCache, ECS/App Runner).',
      'Implemented FastAPI backend API using repository pattern with SQLAlchemy ORM, integrating multiple LLM providers for document classification and automated evaluation workflows. Implemented asynchronous task processing with ARQ and Redis for long-running document analysis and PDF generation operations.',
    ],
    technologies: ['Python', 'FastAPI', 'AWS CDK', 'Salesforce API', 'Redis', 'PostgreSQL'],
  },
  {
    type: 'work',
    company: 'Colgate-Palmolive',
    position: 'Software Engineering Intern',
    location: 'Piscataway, NJ',
    startDate: 'Jun 2024',
    endDate: 'Mar 2025',
    achievements: [
      'Resolved 25+ complex frontend and backend Jira tickets, optimizing system responsiveness and user experience for desktop and mobile interfaces.',
      'Spearheaded the development of shopping cart and mini-cart components using AngularJS and TypeScript, streamlining the purchasing workflow.',
      'Amplified customer engagement and sales through UX/UI enhancements and seamless navigation improvements.',
    ],
    technologies: ['AngularJS', 'TypeScript', 'JavaScript'],
  },
];

const education: Education[] = [
  {
    type: 'education',
    school: 'Stevens Institute of Technology',
    degree: 'Master of Engineering',
    field: 'Computer Engineering',
    location: 'Hoboken, NJ',
    startDate: 'Sept 2024',
    endDate: 'May 2025',
  },
  {
    type: 'education',
    school: 'Stevens Institute of Technology',
    degree: 'Bachelor of Engineering',
    field: 'Computer Engineering',
    location: 'Hoboken, NJ',
    startDate: 'Sept 2021',
    endDate: 'May 2024',
  },
];

export default function Home() {
  return (
    <main className="flex flex-col gap-24" id="home">
      <LandingHero />
      <AboutSection />
      <FeaturedProjects />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="px-6 sm:px-10 md:px-16 lg:px-24">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function LandingHero() {
  return (
    <div className="relative min-h-screen grid place-items-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center px-6"
      >
        <p className="uppercase tracking-[0.3em] text-sm text-black/60 dark:text-white/60">Software Developer</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mt-2">Justin Chen</h1>
        <p className="mt-4 text-base sm:text-lg text-black/70 dark:text-white/70 max-w-2xl mx-auto">
          I build accessible, fast, and scalable software solutions.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <a href="#featured" className="btn btn-dark">View Projects</a>
          <a href="#contact" className="btn btn-outline-secondary">Contact</a>
        </div>
      </motion.div>
      <BackgroundCircles />
    </div>
  );
}

function BackgroundCircles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-500/20 to-sky-400/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-rose-400/20 blur-3xl" />
    </div>
  );
}

function AboutSection() {
  return (
    <Section id="about" title="About me">
      <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
        <div className="relative h-[200px] w-[200px] rounded-xl overflow-hidden border border-black/10 dark:border-white/10">
          <Image src="/headshot.jpg" alt="Headshot of Justin Chen" fill className="object-cover" />
        </div>
        <p className="text-black/80 dark:text-white/80 leading-7">
          I'm Justin, a software engineer specializing in full-stack development and cloud infrastructure. I build LLM-powered automation pipelines, design scalable AWS architectures, and create AI-integrated web applications. From deploying multi-tenant SaaS platforms with real-time data sync to building intelligent document processing systems, I enjoy solving complex problems with clean, maintainable code.
        </p>
      </div>
    </Section>
  );
}

function FeaturedProjects() {
  return (
    <Section id="featured" title="Featured projects">
      <div className="grid md:grid-cols-2 gap-6">
        <ProjectCard
          title="Cura"
          description="AI-powered resume tailoring platform that generates job-specific resumes from a master profile. Features intelligent content curation, keyword optimization, inline AI suggestions, and PDF parsing via Claude Vision—built on a multi-tenant SaaS architecture with Row-Level Security and real-time data sync."
          tech={["Next.js", "TypeScript", "Claude API", "Supabase", "PostgreSQL", "TanStack Query", "Zustand", "Tailwind CSS"]}
          link="https://cura-resume.vercel.app"
          image="/cura-preview.png"
        />
        <ProjectCard
          title="Visualize Emissions"
          description="Emissions tracking dashboard visualizing Scope 3 carbon footprints from university commuters. Features interactive data visualizations to help stakeholders assess and reduce environmental impact."
          tech={["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "MongoDB", "MapBox API", "Google Directions API"]}
          link="https://visualize-emissions.vercel.app/"
          image="/visualize-emissions-preview.png"
        />
      </div>
    </Section>
  );
}

function ProjectCard({ title, description, tech, link, image }: { title: string; description: string; tech: string[]; link: string; image?: string }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="group block rounded-xl border border-black/10 dark:border-white/10 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition bg-white/50 dark:bg-black/20 backdrop-blur no-underline">
      {image && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image src={image} alt={`${title} preview`} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      )}
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-black/70 dark:text-white/70">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tech.map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded bg-black/5 dark:bg-white/10">
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

function SkillsSection() {
  const skills = [
    // Languages
    "Python",
    "JavaScript",
    "TypeScript",
    "C++",
    "Java",
    // Frameworks & Libraries
    "React.js",
    "Node.js",
    "Express.js",
    "Angular",
    "Next.js",
    // Developer Tools
    "PostgreSQL",
    "Git",
    "AWS",
    "Docker",
    "CI/CD",
  ];
  return (
    <Section id="skills" title="Software skills">
      <div className="flex flex-wrap gap-3">
        {skills.map((s) => (
          <span key={s} className="px-3 py-1 rounded-full border border-black/10 dark:border-white/10 text-sm">
            {s}
          </span>
        ))}
      </div>
    </Section>
  );
}

function ExperienceSection() {
  return (
    <Section id="experience" title="Experience & Education">
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-6">Work Experience</h3>
        <Timeline entries={workExperience} />
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-6">Education</h3>
        <Timeline entries={education} />
      </div>
    </Section>
  );
}

function ContactSection() {
  return (
    <Section id="contact" title="Contact">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <p>Email: <a className="underline" href="mailto:juchen3637@gmail.com">juchen3637@gmail.com</a></p>
          <p>Location: New York, NY</p>
        </div>
        <form action="https://submit-form.com/Pb0EHY5H" method="POST" className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input name="name" className="form-input w-full text-black" placeholder="Your name" required />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" name="email" className="form-input w-full text-black" placeholder="you@example.com" required />
          </div>
          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea name="message" className="form-textarea w-full text-black" rows={4} placeholder="How can I help?" required />
          </div>
          <button type="submit" className="btn btn-dark">Send</button>
        </form>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="px-6 sm:px-10 md:px-16 lg:px-24 py-10">
    </footer>
  );
}

function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="relative pl-8">
      <div className="absolute left-[7px] top-4 bottom-0 w-[2px] bg-gradient-to-b from-black/20 via-black/10 to-transparent dark:from-white/20 dark:via-white/10 dark:to-transparent" />
      <div className="space-y-8">
        {entries.map((entry, index) => (
          <TimelineItem key={index} data={entry} />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ data }: { data: TimelineEntry }) {
  const isWork = data.type === 'work';
  const dotColor = isWork
    ? 'bg-gradient-to-br from-indigo-500 to-sky-400'
    : 'bg-gradient-to-br from-fuchsia-500 to-rose-400';

  return (
    <div className="relative">
      <div className={`absolute left-0 top-6 h-4 w-4 rounded-full ${dotColor} border-2 border-white dark:border-black shadow-md z-10`} />
      <div className="rounded-xl border border-black/10 dark:border-white/10 p-5 sm:p-5 bg-white/50 dark:bg-black/20 backdrop-blur ml-8 hover:-translate-y-1 hover:shadow-lg transition">
        {isWork ? (
          <>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <div>
                <h3 className="text-lg font-semibold">{data.position}</h3>
                <p className="text-black/70 dark:text-white/70">{data.company}</p>
                {data.location && (
                  <p className="text-sm text-black/60 dark:text-white/60">{data.location}</p>
                )}
              </div>
              <div className="text-sm text-black/60 dark:text-white/60 whitespace-nowrap">
                {data.startDate} – {data.endDate}
              </div>
            </div>
            <ul className="space-y-2 mb-4">
              {data.achievements.map((achievement, i) => (
                <li key={i} className="text-sm text-black/70 dark:text-white/70 pl-4 relative">
                  <span className="absolute left-0">•</span>
                  {achievement}
                </li>
              ))}
            </ul>
            {data.technologies && data.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.technologies.map((tech) => (
                  <span key={tech} className="text-xs px-2 py-1 rounded bg-black/5 dark:bg-white/10">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <div>
                <h3 className="text-lg font-semibold">{data.school}</h3>
                <p className="text-black/70 dark:text-white/70">
                  {data.degree}{data.field ? ` in ${data.field}` : ''}
                </p>
                {data.location && (
                  <p className="text-sm text-black/60 dark:text-white/60">{data.location}</p>
                )}
              </div>
              <div className="text-sm text-black/60 dark:text-white/60 whitespace-nowrap">
                {data.startDate} – {data.endDate}
              </div>
            </div>
            {data.highlights && data.highlights.length > 0 && (
              <ul className="space-y-1">
                {data.highlights.map((highlight, i) => (
                  <li key={i} className="text-sm text-black/70 dark:text-white/70 pl-4 relative">
                    <span className="absolute left-0">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
