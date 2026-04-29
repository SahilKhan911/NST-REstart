import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NST Pune — B.Tech CSE (AI & ML) at Newton School of Technology",
  description:
    "Build, Innovate, Achieve, Succeed. Newton School of Technology at Ajeenkya DY Patil University — project-led B.Tech CSE with AI/ML focus, paid internships from year 2, and global industry exposure.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
