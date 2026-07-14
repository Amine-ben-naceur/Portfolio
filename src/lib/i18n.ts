"use client";

import type { SectionId } from "@/lib/journey";
import { CONTENT, type Language } from "@/lib/data";
import { useUIStore } from "@/lib/store";

/**
 * All UI chrome copy that isn't part of the CV-driven content in data.ts —
 * nav labels, HUD kickers, headlines, contact micro-copy, etc. Kept in one
 * place, structurally identical between languages, so nothing can drift
 * into a half-translated state.
 */
export type UIStrings = {
  nav: {
    about: string;
    work: string;
    projects: string;
    contact: string;
    resume: string;
    backToTop: string;
  };
  sections: Record<SectionId, string>;
  hero: { scrollTo: string; explore: string };
  hudRail: { goTo: (label: string) => string };
  loader: { initializing: string; loadingAria: string };
  about: { kicker: string; headline: string; headlineHighlight: string; floatingLabel: string };
  work: { kicker: string; floatingLabel: string };
  skills: { kicker: string; headline: string; subhead: string };
  projects: {
    kicker: string;
    headline: string;
    hint: string;
    archiveLink: string;
    targetLocked: (title: string) => string;
    floatingLabel: string;
    featuredBadge: string;
  };
  contact: {
    kicker: string;
    headline: string;
    headlineHighlight: string;
    copy: string;
    mailHint: string;
    socialsLabel: string;
    phoneAria: string;
    githubAria: string;
    floatingLabel: string;
  };
  modal: {
    missionBrief: string;
    featured: string;
    close: string;
    visitProject: string;
    missionFile: (id: string) => string;
  };
  easterEgg: {
    unlockedLabel: string;
    title: string;
    titleHighlight: string;
    description: string;
    footer: string;
    close: string;
  };
};

const UI_FR: UIStrings = {
  nav: {
    about: "À propos",
    work: "Expérience",
    projects: "Projets",
    contact: "Contact",
    resume: "CV ↗",
    backToTop: "Retour en haut",
  },
  sections: {
    hero: "Accueil",
    launch: "Décollage",
    about: "À propos",
    experience: "Expérience",
    skills: "Compétences",
    projects: "Projets",
    contact: "Contact",
  },
  hero: { scrollTo: "Défiler", explore: "Découvrir" },
  hudRail: { goTo: (label) => `Aller à ${label}` },
  loader: {
    initializing: "Initialisation de la séquence de lancement",
    loadingAria: "Chargement",
  },
  about: {
    kicker: "01 // À propos",
    headline: "Full-stack, moins de",
    headlineHighlight: "frictions",
    floatingLabel: "À PROPOS",
  },
  work: { kicker: "02 // Là où j'ai travaillé", floatingLabel: "JOURNAL DE BORD" },
  skills: {
    kicker: "// Vérification des systèmes",
    headline: "Modules de compétences en ligne",
    subhead: "TRAVERSEZ LE COULOIR D'ÉTALONNAGE",
  },
  projects: {
    kicker: "03 // Quelques réalisations",
    headline: "Projets en orbite",
    hint: "▸ CLIQUEZ UNE CARTE POUR INSPECTER",
    archiveLink: "Explorer les archives ↗",
    targetLocked: (title) => `CIBLE VERROUILLÉE // ${title}`,
    floatingLabel: "PROJETS",
    featuredBadge: "★ PHARE",
  },
  contact: {
    kicker: "04 // Et maintenant ?",
    headline: "Construisons quelque chose",
    headlineHighlight: "ensemble.",
    copy: "Je suis actuellement ouvert à de nouvelles opportunités — temps plein, mission, ou simplement pour discuter. Que vous ayez une idée de projet, une question, ou juste envie de dire bonjour, mon inbox est le meilleur moyen de me joindre.",
    mailHint: "Ouvre votre messagerie — réponse sous 24h",
    socialsLabel: "GitHub · Téléphone",
    phoneAria: "Téléphone",
    githubAria: "GitHub",
    floatingLabel: "CONTACT",
  },
  modal: {
    missionBrief: "▸ FICHE DE MISSION",
    featured: "★ PROJET PHARE",
    close: "Fermer",
    visitProject: "Voir le projet",
    missionFile: (id) => `FICHIER MISSION // ${id.toUpperCase()}`,
  },
  easterEgg: {
    unlockedLabel: "// Journal secret débloqué",
    title: "Journal personnel",
    titleHighlight: "— Hors service",
    description:
      "Séquence Konami reconnue. Même en plein voyage, certains systèmes tournent encore, juste pour le plaisir.",
    footer: "ENREGISTRÉ AUTOMATIQUEMENT — AUCUNE AUTORISATION REQUISE",
    close: "Fermer",
  },
};

const UI_EN: UIStrings = {
  nav: {
    about: "About",
    work: "Work",
    projects: "Projects",
    contact: "Contact",
    resume: "Resume ↗",
    backToTop: "Back to top",
  },
  sections: {
    hero: "Home",
    launch: "Launch",
    about: "About",
    experience: "Work",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
  },
  hero: { scrollTo: "Scroll To", explore: "Explore" },
  hudRail: { goTo: (label) => `Go to ${label}` },
  loader: {
    initializing: "Initializing Launch Sequence",
    loadingAria: "Loading",
  },
  about: {
    kicker: "01 // About",
    headline: "Full stack, fewer",
    headlineHighlight: "bottlenecks",
    floatingLabel: "ABOUT ME",
  },
  work: { kicker: "02 // Where I've worked", floatingLabel: "WORK LOG" },
  skills: {
    kicker: "// Systems check",
    headline: "Skill modules online",
    subhead: "FLY THROUGH THE CALIBRATION CORRIDOR",
  },
  projects: {
    kicker: "03 // Some things I've built",
    headline: "Projects in orbit",
    hint: "▸ CLICK A CARD TO INSPECT",
    archiveLink: "Explore the archive ↗",
    targetLocked: (title) => `TARGET LOCKED // ${title}`,
    floatingLabel: "PROJECTS",
    featuredBadge: "★ FEATURED",
  },
  contact: {
    kicker: "04 // What's next",
    headline: "Let's make something",
    headlineHighlight: "together.",
    copy: "I'm currently open to new opportunities — full-time, contract, or just a good chat. Whether you have a project idea, a question, or you just want to say hi, my inbox is the best way to reach me.",
    mailHint: "Opens your mail app — I reply within 24h",
    socialsLabel: "GitHub · Phone",
    phoneAria: "Phone",
    githubAria: "GitHub",
    floatingLabel: "CONTACT",
  },
  modal: {
    missionBrief: "▸ MISSION BRIEF",
    featured: "★ FEATURED PROJECT",
    close: "Close",
    visitProject: "Visit project",
    missionFile: (id) => `MISSION FILE // ${id.toUpperCase()}`,
  },
  easterEgg: {
    unlockedLabel: "// Secret log unlocked",
    title: "Personal Log",
    titleHighlight: "— Off Duty",
    description:
      "Konami sequence recognized. Even on a voyage like this one, a few systems stay running for fun.",
    footer: "LOGGED AUTOMATICALLY — NO CLEARANCE REQUIRED",
    close: "Close",
  },
};

export const UI: Record<Language, UIStrings> = { fr: UI_FR, en: UI_EN };

/**
 * The single hook client components use to go bilingual: current
 * language, the matching content tree, the matching UI copy, and a
 * setter/toggle. Anything server-rendered (metadata, OG images, sitemap)
 * keeps using the static French exports from `@/lib/data` instead, since
 * it can't react to a client-side toggle.
 */
export function useI18n() {
  const lang = useUIStore((s) => s.language);
  const setLanguage = useUIStore((s) => s.setLanguage);
  return {
    lang,
    content: CONTENT[lang],
    ui: UI[lang],
    setLanguage,
    toggle: () => setLanguage(lang === "fr" ? "en" : "fr"),
  };
}
