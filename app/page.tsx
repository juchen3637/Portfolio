"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

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
    company: 'Tech Company',
    position: 'Senior Software Engineer',
    location: 'San Francisco, CA',
    startDate: 'Jan 2023',
    endDate: 'Present',
    achievements: [
      'Led development of scalable web application serving 100K+ users',
      'Reduced page load time by 40% through optimization strategies',
      'Mentored team of 3 junior developers',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'AWS'],
  },
  {
    type: 'work',
    company: 'Startup Inc',
    position: 'Full Stack Developer',
    location: 'New York, NY',
    startDate: 'Jun 2021',
    endDate: 'Dec 2022',
    achievements: [
      'Built responsive web applications using modern frameworks',
      'Implemented RESTful APIs and database schemas',
      'Collaborated with designers to create intuitive user interfaces',
    ],
    technologies: ['Next.js', 'PostgreSQL', 'Tailwind CSS'],
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
    <div className="relative min-h-[80vh] grid place-items-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center px-6"
      >
        <p className="uppercase tracking-[0.3em] text-sm text-black/60 dark:text-white/60">Software Developer</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mt-2">Justin Chen</h1>
        <p className="mt-4 text-base sm:text-lg text-black/70 dark:text-white/70 max-w-2xl mx-auto">
          I build delightful, fast, and accessible web experiences.
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
          I’m Justin, a software developer focused on modern web apps with TypeScript, React, and Node.js. I enjoy crafting clean UI, smooth interactions, and robust systems.
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
          description="Privacy-first, AI-powered resume builder using Next.js 14 and Claude Sonnet 4.5 API. Features client-side processing, ATS compliance linting, DOCX/PDF export, and 3 professional templates with live preview."
          tech={["TypeScript", "React", "Next.js", "Tailwind CSS", "Zustand", "Git", "Supabase"]}
          link="https://cura-resume.vercel.app"
          image="/cura-preview.png"
        />
        <ProjectCard
          title="Project Two"
          description="Data visualization dashboard with interactive charts."
          tech={["React", "D3", "Node.js"]}
          link="#"
        />
      </div>
    </Section>
  );
}

function ProjectCard({ title, description, tech, link, image }: { title: string; description: string; tech: string[]; link: string; image?: string }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="group block rounded-xl border border-black/10 dark:border-white/10 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition bg-white/50 dark:bg-black/20 backdrop-blur">
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
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Tailwind CSS",
    "Bootstrap",
    "Framer Motion",
    "PostgreSQL",
    "AWS",
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
    <Section id="experience" title="Education & Experience">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-black/70 dark:text-white/70">
          View my complete work history and download a PDF copy of my resume.
        </p>
        <a
          href="/resume.pdf"
          download
          className="btn btn-dark flex items-center gap-2 whitespace-nowrap"
        >
          <ArrowDownTrayIcon className="h-5 w-5" />
          Download Resume PDF
        </a>
      </div>

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
        <form className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input className="form-input w-full" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" className="form-input w-full" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea className="form-textarea w-full" rows={4} placeholder="How can I help?" />
          </div>
          <button type="button" className="btn btn-dark">Send</button>
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
      <div className={`rounded-xl border border-black/10 dark:border-white/10 p-5 sm:p-5 bg-white/50 dark:bg-black/20 backdrop-blur ml-8 ${isWork ? 'hover:-translate-y-1 hover:shadow-lg' : ''} transition`}>
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
