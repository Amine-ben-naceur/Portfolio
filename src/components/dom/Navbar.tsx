"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import type { SectionId } from "@/lib/journey";
import { useI18n } from "@/lib/i18n";
import { scrollToSection, useCurrentSection, useScrollRaf } from "@/lib/scroll";

export default function Navbar() {
  const barRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const scrolledRef = useRef(false);
  const { content, ui, lang, setLanguage } = useI18n();

  const LINKS: { id: SectionId; num: string; label: string }[] = [
    { id: "about", num: "01", label: ui.nav.about },
    { id: "experience", num: "02", label: ui.nav.work },
    { id: "projects", num: "03", label: ui.nav.projects },
    { id: "contact", num: "04", label: ui.nav.contact },
  ];

  // hero/launch/skills aren't nav links — no link is active during those.
  const active: SectionId = useCurrentSection();

  useScrollRaf((p) => {
    const scrolled = p > 0.02;
    if (scrolled === scrolledRef.current) return;
    scrolledRef.current = scrolled;
    const bar = barRef.current;
    const line = lineRef.current;
    if (!bar || !line) return;
    bar.classList.toggle("glass", scrolled);
    line.style.opacity = scrolled ? "1" : "0";
  });

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-40"
    >
      <div
        ref={barRef}
        className="relative flex h-20 w-full items-center justify-between px-8 transition-[background,box-shadow] duration-500 lg:px-14"
      >
        {/* Logo */}
        <button
          type="button"
          data-cursor
          onClick={() => scrollToSection("hero")}
          className="pointer-events-auto"
          aria-label={ui.nav.backToTop}
        >
          <span className="font-display text-2xl font-bold leading-none text-star">
            ab<span className="text-cyan">.</span>
          </span>
        </button>

        {/* Center links */}
        <nav className="pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
          {LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <button
                key={link.id}
                type="button"
                data-cursor
                onClick={() => scrollToSection(link.id)}
                className={`relative py-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 ${
                  isActive ? "text-cyan" : "text-star/60 hover:text-star"
                }`}
              >
                <span className="mr-1.5 text-[9px] text-cyan">{link.num}.</span>
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-x-0 -bottom-px h-px bg-cyan shadow-[0_0_10px_rgba(76,201,240,0.9)]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Language toggle + Résumé */}
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="flex items-center gap-0.5 rounded-full border border-white/20 p-1 font-mono text-[10px] uppercase tracking-[0.14em]">
            {(["fr", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                data-cursor
                onClick={() => setLanguage(l)}
                aria-pressed={lang === l}
                className={`rounded-full px-2.5 py-1 transition-colors ${
                  lang === l
                    ? "bg-cyan/15 text-cyan-bright shadow-[0_0_10px_rgba(76,201,240,0.25)]"
                    : "text-star/60 hover:text-star"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <a
            href={content.profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="rounded-full border border-cyan/60 px-6 py-2 font-mono text-xs uppercase tracking-hud text-cyan-bright transition-all duration-300 hover:bg-cyan/15 hover:shadow-[0_0_24px_rgba(76,201,240,0.4)]"
          >
            {ui.nav.resume}
          </a>
        </div>

        {/* Bottom hairline — appears once scrolled */}
        <div
          ref={lineRef}
          className="hud-line absolute inset-x-0 bottom-0 opacity-0 transition-opacity duration-500"
        />
      </div>
    </motion.header>
  );
}
