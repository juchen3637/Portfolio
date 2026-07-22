import type { Metadata, Viewport } from "next";
import { Epilogue, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { TopNav } from "./components/layout/TopNav";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Justin Chen — AI Software Engineer",
  description:
    "Justin Chen builds LLM-powered products — document pipelines, trading agents, and AI web apps. AI software engineer based in New York.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${epilogue.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased bg-bg text-ink`}
      >
        <TopNav />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
