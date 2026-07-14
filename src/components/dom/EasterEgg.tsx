"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { useKonamiCode } from "@/lib/useKonamiCode";

const AUTO_DISMISS_MS = 9000;

/**
 * A hidden "personal log" panel — the Konami code (↑↑↓↓←→←→BA) reveals a
 * brief off-duty status readout. Purely cosmetic, no state persisted, and
 * styled to match the mission-log HUD panels exactly (same corner
 * brackets, glass, mono/display type) so it reads as part of the ship's
 * systems rather than a bolted-on gimmick.
 *
 * Also drops a quiet console hint for anyone poking at devtools — the
 * intended audience for this one is other developers.
 */
export default function EasterEgg() {
  const [open, setOpen] = useState(false);
  const { content, ui } = useI18n();
  const { profile } = content;

  const unlock = useCallback(() => setOpen(true), []);
  useKonamiCode(unlock);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const timer = window.setTimeout(() => setOpen(false), AUTO_DISMISS_MS);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
    };
  }, [open]);

  useEffect(() => {
    console.log(
      "%c👀 poking around the console?",
      "font-size:13px;font-weight:600;color:#4cc9f0"
    );
    console.log(
      "%ctry the Konami code.",
      "font-size:12px;color:#9adcff;letter-spacing:0.05em"
    );
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-auto fixed inset-0 z-[52] flex items-center justify-center p-4"
          role="dialog"
          aria-label={`${ui.easterEgg.title} ${ui.easterEgg.titleHighlight}`}
        >
          {/* invisible click-away catcher — no darkening, the journey stays visible */}
          <div
            className="absolute inset-0"
            onClick={() => setOpen(false)}
            aria-hidden
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 26, mass: 0.9 }}
            className="hud-corners glass relative w-[92vw] max-w-sm rounded-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={ui.easterEgg.close}
              data-cursor="hover"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/20 text-xs text-white/70 transition-colors hover:border-cyan hover:text-cyan"
            >
              ✕
            </button>

            <p className="font-mono text-[10px] uppercase tracking-hud text-hud">
              {ui.easterEgg.unlockedLabel}
            </p>
            <h3 className="mt-2 font-display text-xl font-bold text-star">
              {ui.easterEgg.title}{" "}
              <span className="text-cyan">{ui.easterEgg.titleHighlight}</span>
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-white/70">
              {ui.easterEgg.description}
            </p>

            <div className="hud-line mt-4" />

            <ul className="mt-4 space-y-2">
              {profile.hobbies.map((hobby) => (
                <li
                  key={hobby}
                  className="flex items-center gap-3 text-sm text-white/85"
                >
                  <span className="text-cyan">▹</span>
                  <span>{hobby}</span>
                </li>
              ))}
            </ul>

            <p className="mt-5 font-mono text-[10px] tracking-[0.14em] text-white/30">
              {ui.easterEgg.footer}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
