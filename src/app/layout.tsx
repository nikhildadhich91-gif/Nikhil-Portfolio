import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { AmbientBackground } from "@/components/ambient-bg";
import { SiteCursor } from "@/components/cursor";

const displayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Nikhil Dadhich | AI Builder & Full-Stack SaaS Developer",
  description: "Portfolio of Nikhil Dadhich, a 21-year-old AI Builder and Full-Stack SaaS Developer based in Jaipur, India. Ship real software, not just mockups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else if (savedTheme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    // Default to dark mode if no preference
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen text-text-primary bg-bg-base transition-colors duration-300">
        <SiteCursor />
        <AmbientBackground />
        <Navbar />
        <main className="min-h-screen relative pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
