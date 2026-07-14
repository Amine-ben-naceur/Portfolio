"use client";

import { useEffect, useRef } from "react";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/**
 * Fires `onUnlock` when the visitor types the classic Konami code
 * (↑↑↓↓←→←→BA) anywhere on the page. Ignores input focused in a text
 * field so it never interferes with typing.
 */
export function useKonamiCode(onUnlock: () => void) {
  const progress = useRef(0);
  const callback = useRef(onUnlock);

  useEffect(() => {
    callback.current = onUnlock;
  }, [onUnlock]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) {
        return;
      }

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = SEQUENCE[progress.current];

      if (key === expected) {
        progress.current += 1;
        if (progress.current === SEQUENCE.length) {
          progress.current = 0;
          callback.current();
        }
      } else {
        // Allow overlapping restarts (e.g. a second ArrowUp after a miss).
        progress.current = key === SEQUENCE[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}
