"use client";

import { useEffect, useState } from "react";

export default function Navbar({ whatsappUrl }: { whatsappUrl: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-black/5 shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-24 flex items-center justify-between">
        <a href="#top" className="flex items-center group">
          <img
            src="https://ik.imagekit.io/cotszrkgk/restart-removebg-preview.png"
            alt="Restart"
            className="h-[5.625rem] w-auto"
          />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-black/75">
          <a href="#curriculum" className="hover:text-nst transition">Curriculum</a>
          <a href="#achievements" className="hover:text-nst transition">Achievements</a>
          <a href="#faq" className="hover:text-nst transition">FAQ</a>
          <a href="#chat" className="hover:text-nst transition">Ask students</a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-nst hover:bg-nst-blueDeep text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Join Restart
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg border border-black/10"
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-black/5 bg-white">
          <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-3 text-sm font-medium">
            <a href="#curriculum" onClick={() => setOpen(false)}>Curriculum</a>
            <a href="#achievements" onClick={() => setOpen(false)}>Achievements</a>
            <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
            <a href="#chat" onClick={() => setOpen(false)}>Ask students</a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-nst text-white px-4 py-2 rounded-lg w-fit"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Join Restart
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.52 3.48A11.93 11.93 0 0 0 12.05 0C5.5 0 .2 5.3.2 11.85c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.86 11.86 0 0 0 5.65 1.44h.01c6.55 0 11.85-5.3 11.85-11.85a11.78 11.78 0 0 0-3.39-8.43Zm-8.47 18.2h-.01a9.83 9.83 0 0 1-5.01-1.37l-.36-.21-3.8 1 1.02-3.7-.24-.38a9.85 9.85 0 0 1-1.5-5.17c0-5.45 4.43-9.88 9.9-9.88 2.64 0 5.13 1.03 7 2.9a9.83 9.83 0 0 1 2.9 7c0 5.45-4.43 9.81-9.9 9.81Zm5.42-7.34c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.19-.24-.58-.49-.5-.66-.51l-.56-.01c-.2 0-.51.07-.78.37-.27.3-1.03 1-1.03 2.45s1.06 2.84 1.21 3.04c.15.2 2.09 3.18 5.06 4.46.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.08-.13-.27-.2-.57-.35Z"/>
    </svg>
  );
}
