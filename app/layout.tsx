import type { Metadata } from "next";
import { Epilogue, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { TopNav } from "./components/layout/TopNav";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Justin Chen — LLM Integration Engineer",
  description:
    "Portfolio of Justin Chen: LLM integration, full-stack development, and AWS cloud architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${epilogue.variable} ${inter.variable} ${spaceGrotesk.variable} antialiased bg-p5-bg text-p5-fg`}
      >
        <TopNav />
        <div className="pt-20">{children}</div>
      </body>
    </html>
  );
}
