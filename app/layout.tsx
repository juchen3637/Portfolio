import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";
import {
  HomeIcon,
  UserIcon,
  StarIcon,
  WrenchScrewdriverIcon,
  BriefcaseIcon,
  EnvelopeIcon
} from "@heroicons/react/24/outline";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Justin Chen — Software Developer",
  description: "Modern web portfolio of Justin Chen: projects, skills, experience, and contact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>        
        <div className="fixed left-0 top-0 h-screen w-[72px] sm:w-[84px] flex flex-col items-center justify-between py-6 border-r border-black/10 dark:border-white/10">
          <nav className="flex flex-col items-center gap-6">
            <NavIcon href="#home" label="Home"><HomeIcon className="h-5 w-5" /></NavIcon>
            <NavIcon href="#about" label="About"><UserIcon className="h-5 w-5" /></NavIcon>
            <NavIcon href="#featured" label="Featured"><StarIcon className="h-5 w-5" /></NavIcon>
            <NavIcon href="#skills" label="Skills"><WrenchScrewdriverIcon className="h-5 w-5" /></NavIcon>
            <NavIcon href="#experience" label="Experience"><BriefcaseIcon className="h-5 w-5" /></NavIcon>
            <NavIcon href="#contact" label="Contact"><EnvelopeIcon className="h-5 w-5" /></NavIcon>
          </nav>
          <div className="flex flex-col items-center gap-4 pb-2">
            <Link className="group relative" href="https://www.linkedin.com/in/jjustinchen/" target="_blank">
              <FaLinkedin className="h-6 w-6 opacity-80 group-hover:opacity-100 transition" />
              <span className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 rounded bg-black text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition">LinkedIn</span>
            </Link>
            <Link className="group relative" href="https://github.com/juchen3637" target="_blank">
              <FaGithub className="h-6 w-6 opacity-80 group-hover:opacity-100 transition" />
              <span className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 rounded bg-black text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition">GitHub</span>
            </Link>
            <Link className="group relative" href="/resume.pdf" target="_blank">
              <FaFileAlt className="h-6 w-6 opacity-80 group-hover:opacity-100 transition" />
              <span className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 rounded bg-black text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition">Resume</span>
            </Link>
          </div>
        </div>
        <div className="pl-[72px] sm:pl-[84px] min-h-screen">{children}</div>
      </body>
    </html>
  );
}

function NavIcon({ href, children, label }: { href: string; children: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="group relative flex items-center justify-center h-10 w-10 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition">
      {children}
      <span className="pointer-events-none absolute left-12 whitespace-nowrap rounded bg-black text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition">
        {label}
      </span>
    </Link>
  );
}
