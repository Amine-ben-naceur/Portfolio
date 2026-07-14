"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_LANGUAGE, type Language } from "@/lib/data";

type UIState = {
  /** Fonts + first canvas frame ready; loader fades out when true. */
  ready: boolean;
  setReady: (v: boolean) => void;
  /** Project id whose detail modal is open, or null. */
  selectedProject: string | null;
  setSelectedProject: (id: string | null) => void;
  /** Id of the 3D project card currently hovered (drives cursor + hint). */
  hoveredProject: string | null;
  setHoveredProject: (id: string | null) => void;
  /** Active site language. Persisted across visits. */
  language: Language;
  setLanguage: (l: Language) => void;
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      ready: false,
      setReady: (v) => set({ ready: v }),
      selectedProject: null,
      setSelectedProject: (id) => set({ selectedProject: id }),
      hoveredProject: null,
      setHoveredProject: (id) => set({ hoveredProject: id }),
      language: DEFAULT_LANGUAGE,
      setLanguage: (l) => set({ language: l }),
    }),
    {
      name: "portfolio-language",
      // Only the language preference is worth persisting across visits.
      partialize: (state) => ({ language: state.language }),
      // Server and first client render must match (both render
      // DEFAULT_LANGUAGE) — rehydrate from localStorage manually after
      // mount (see RehydrateLanguage in page.tsx) to avoid a hydration
      // mismatch warning or a flash of the wrong language.
      skipHydration: true,
    }
  )
);

// Handle for console debugging / tests
if (typeof window !== "undefined") {
  (window as unknown as { __ui: typeof useUIStore }).__ui = useUIStore;
}
