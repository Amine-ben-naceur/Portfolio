/** Canonical origin. TODO: replace with the real deployed domain. */
export const SITE_URL = "https://www.mohamedaminebennaceur.com";

export const ARCHIVE_URL = "https://github.com/Amine-ben-naceur";

export type Language = "fr" | "en";

export type Profile = {
  name: string;
  firstName: string;
  role: string;
  status: string;
  taglines: string[];
  bio: string;
  about: {
    lead: string;
    p2: string;
    p3: string;
    credentials: string[];
  };
  email: string;
  phone: string;
  location: string;
  resume: string;
  siteUrl: string;
  socials: {
    github: string;
  };
  hobbies: string[];
};

export type Job = {
  id: string;
  company: string;
  title: string;
  range: string;
  location: string;
  blurb: string;
  points: string[];
  /** Short label for the tab pill — company alone isn't always unique. */
  tabLabel: string;
};

export type Skill = {
  /** HUD module number, "01".."06" */
  num: string;
  name: string;
  items: string;
};

export type Project = {
  id: string;
  title: string;
  meta: string;
  tagline: string;
  description: string;
  tags: string[];
  /** Gradient endpoints used to generate the orbiting card artwork. */
  colorA: string;
  colorB: string;
  /** External link (GitHub / store). Null = no public link. */
  link: string | null;
  linkLabel?: string;
  featured?: boolean;
};

/* ------------------------------------------------------------------ */
/* French (canonical — matches the CV, used for SEO/metadata)          */
/* ------------------------------------------------------------------ */

export const PROFILE_FR: Profile = {
  name: "Mohamed Amine Ben Naceur",
  firstName: "Amine",
  role: "Développeur Logiciel Full Stack",
  status: "Développeur Full-Stack · en poste chez 2As Project",
  taglines: [
    "connecte le web, le mobile et la voix.",
    "construit des systèmes temps réel qui tiennent la charge.",
    "transforme des idées VoIP en produits.",
    "conçoit, code, déploie — du frontend à l'infra.",
    "qui ne risque rien n'a rien.",
  ],
  bio: "Développeur Full-Stack spécialisé dans le développement d'applications web et mobiles modernes, les technologies VoIP (WebRTC, SIP, Asterisk), l'intégration de l'intelligence artificielle et les services cloud avec Firebase. Expérimenté dans la conception de plateformes CRM, d'applications mobiles multiplateformes, de solutions orientées confidentialité et de systèmes de communication temps réel évolutifs.",
  about: {
    lead: "Je conçois et je développe des produits de bout en bout — du frontend au backend, en passant par le mobile et la téléphonie IP. Mon terrain de jeu : les systèmes temps réel où la voix, les données et l'IA se rencontrent.",
    p2: "Chez 2As Project, je développe des applications web avec React, Node.js et PostgreSQL, une application mobile avec React Native et Firebase, et j'intègre des fonctionnalités VoIP avec WebRTC, SIP.js et Asterisk.",
    p3: "Ma philosophie : « Qui ne risque rien ne gagne rien ». Je construis des systèmes simples, rapides et évolutifs — pensés pour un usage réel, pas seulement pour une belle implémentation.",
    credentials: [
      "Licence en ingénierie des réseaux et systèmes informatiques — ISSAT Mateur (2022–2025)",
      "Baccalauréat en Science Informatique — Lycée Jeune Fille Bizerte (2022)",
      "Certifié Cisco : Ethical Hacking · Networking",
      "Langues : Arabe (natif) · Français (courant) · Anglais (bilingue) · Allemand (débutant)",
    ],
  },
  email: "bennaceuramine063@gmail.com",
  phone: "+216 56 183 326",
  location: "Bizerte, Tunisie",
  resume: "/Resume_MohamedAmineBenNaceur.pdf",
  siteUrl: `${SITE_URL}/`,
  socials: {
    github: "https://github.com/Amine-ben-naceur",
  },
  hobbies: ["Gaming", "Football", "Montage vidéo & design graphique"],
};

export const EXPERIENCE_FR: Job[] = [
  {
    id: "2as-fulltime",
    company: "2As Project",
    title: "Développeur Full Stack",
    range: "Nov. 2025 — Présent",
    location: "Tunisie",
    blurb:
      "Développement d'applications web et mobiles, avec intégration de fonctionnalités VoIP temps réel (WebRTC, SIP, Asterisk).",
    points: [
      "Développement d'applications web avec React, Node.js et PostgreSQL",
      "Développement d'une application mobile avec React Native, Expo et Firebase",
      "Intégration de fonctionnalités VoIP utilisant WebRTC, SIP.js et Asterisk",
      "Correction d'anomalies, optimisation des performances et évolution continue de la plateforme",
    ],
    tabLabel: "2As Project",
  },
  {
    id: "2as-pfe",
    company: "2As Project",
    title: "Développeur Frontend & VoIP — Stagiaire PFE",
    range: "Fév. 2025 — Avr. 2025",
    location: "Tunisie · Stage de fin d'études",
    blurb:
      "Conception d'une plateforme CRM et d'un composeur SIP/VoIP web, avec les premiers modules d'analyse des appels par IA.",
    points: [
      "Développement d'une plateforme CRM",
      "Conception d'un composeur SIP/VoIP web",
      "Intégration des appels entrants et sortants",
      "Développement des premiers modules d'analyse des appels par intelligence artificielle",
    ],
    tabLabel: "2As (PFE)",
  },
  {
    id: "tunisie-telecom",
    company: "Tunisie Telecom",
    title: "Stagiaire Réseaux & Télécommunications",
    range: "Juin 2024",
    location: "Tunisie · Stage ouvrier",
    blurb:
      "Installation, maintenance et diagnostic des infrastructures réseau xDSL et Fibre Optique.",
    points: [
      "Participation à l'installation et à la maintenance des infrastructures xDSL et Fibre Optique",
      "Diagnostic des problèmes de connectivité réseau",
      "Réalisation de tests de performance réseau",
    ],
    tabLabel: "Tunisie Telecom",
  },
];

export const SKILLS_FR: Skill[] = [
  { num: "01", name: "Langages", items: "JavaScript · TypeScript · Python · PHP" },
  { num: "02", name: "Frontend", items: "React · Vue.js · React Native · Expo" },
  { num: "03", name: "Backend", items: "Node.js · Express.js · REST API" },
  { num: "04", name: "VoIP & Temps réel", items: "WebRTC · SIP · Asterisk · ICE/STUN/TURN" },
  { num: "05", name: "Cloud & Données", items: "Firebase · Firestore · SQL" },
  { num: "06", name: "DevOps & Outils", items: "Docker · Git · Linux · Nginx" },
];

export const PROJECTS_FR: Project[] = [
  {
    id: "dolphyo",
    title: "Dolphyo",
    meta: "2025 · Plateforme SaaS",
    tagline: "La supervision d'appels, réinventée",
    description:
      "Plateforme CRM moderne, disponible sur le web et mobile, intégrant la VoIP temps réel, la supervision des appels, un tableau de bord analytique, la gestion des contacts, une authentification sécurisée et des notifications en temps réel.",
    tags: ["React", "VoIP", "CRM", "Firebase"],
    colorA: "#0ea5e9",
    colorB: "#4cc9f0",
    link: null,
    featured: true,
  },
  {
    id: "pedo",
    title: "Pedo",
    meta: "2025 · Open source",
    tagline: "Un navigateur qui respecte votre vie privée",
    description:
      "Navigateur open source orienté confidentialité : intégration de Tor, blocage des publicités, recherche personnalisée et protection renforcée de la vie privée.",
    tags: ["Confidentialité", "Tor", "Navigateur", "Open Source"],
    colorA: "#7c3aed",
    colorB: "#22d3ee",
    link: null,
  },
  {
    id: "laveyronnaise",
    title: "L'Aveyronnaise d'Assurances",
    meta: "2025 · Site client",
    tagline: "Un assistant IA qui convertit les visiteurs",
    description:
      "Site web corporate intégrant un assistant IA qui accompagne les utilisateurs et génère automatiquement des prospects.",
    tags: ["Site Web", "Assistant IA", "Génération de leads"],
    colorA: "#22c55e",
    colorB: "#facc15",
    link: null,
  },
];

/* ------------------------------------------------------------------ */
/* English                                                             */
/* ------------------------------------------------------------------ */

export const PROFILE_EN: Profile = {
  name: "Mohamed Amine Ben Naceur",
  firstName: "Amine",
  role: "Full-Stack Software Developer",
  status: "Full-Stack Developer · currently @ 2As Project",
  taglines: [
    "connects the web, mobile, and voice.",
    "builds real-time systems that hold up under load.",
    "turns VoIP ideas into products.",
    "designs, codes, ships — frontend to infra.",
    "believes nothing ventured, nothing gained.",
  ],
  bio: "Full-Stack developer specializing in modern web and mobile applications, VoIP technologies (WebRTC, SIP, Asterisk), AI integration, and cloud services with Firebase. Experienced in designing CRM platforms, cross-platform mobile apps, privacy-focused solutions, and scalable real-time communication systems.",
  about: {
    lead: "I design and build end-to-end products — frontend to backend, through mobile and IP telephony. My playground: real-time systems where voice, data, and AI meet.",
    p2: "At 2As Project, I build web apps with React, Node.js and PostgreSQL, a mobile app with React Native and Firebase, and I integrate VoIP features with WebRTC, SIP.js and Asterisk.",
    p3: "My philosophy: nothing ventured, nothing gained. I build systems that are simple, fast, and scalable — built for real use, not just a nice implementation.",
    credentials: [
      "B.Eng. in Network & IT Systems Engineering — ISSAT Mateur (2022–2025)",
      "Baccalauréat in Computer Science — Lycée Jeune Fille Bizerte (2022)",
      "Cisco Certified: Ethical Hacking · Networking",
      "Languages: Arabic (native) · French (fluent) · English (bilingual) · German (beginner)",
    ],
  },
  email: "bennaceuramine063@gmail.com",
  phone: "+216 56 183 326",
  location: "Bizerte, Tunisia",
  resume: "/Resume_MohamedAmineBenNaceur.pdf",
  siteUrl: `${SITE_URL}/`,
  socials: {
    github: "https://github.com/Amine-ben-naceur",
  },
  hobbies: ["Gaming", "Football", "Video & graphic editing"],
};

export const EXPERIENCE_EN: Job[] = [
  {
    id: "2as-fulltime",
    company: "2As Project",
    title: "Full-Stack Developer",
    range: "Nov 2025 — Present",
    location: "Tunisia",
    blurb:
      "Building web and mobile applications, with real-time VoIP features (WebRTC, SIP, Asterisk).",
    points: [
      "Building web applications with React, Node.js and PostgreSQL",
      "Building a mobile app with React Native, Expo and Firebase",
      "Integrating VoIP features using WebRTC, SIP.js and Asterisk",
      "Fixing bugs, optimizing performance, and evolving the platform",
    ],
    tabLabel: "2As Project",
  },
  {
    id: "2as-pfe",
    company: "2As Project",
    title: "Frontend & VoIP Developer — Final-Year Intern",
    range: "Feb 2025 — Apr 2025",
    location: "Tunisia · Final-year internship",
    blurb:
      "Designed a CRM platform and a SIP/VoIP web dialer, plus early AI-driven call-analysis modules.",
    points: [
      "Building a CRM platform",
      "Designing a SIP/VoIP web dialer",
      "Handling inbound and outbound calls",
      "Building the first AI-driven call-analysis modules",
    ],
    tabLabel: "2As (Internship)",
  },
  {
    id: "tunisie-telecom",
    company: "Tunisie Telecom",
    title: "Network & Telecom Intern",
    range: "Jun 2024",
    location: "Tunisia · Blue-collar internship",
    blurb:
      "Installed, maintained, and diagnosed xDSL and Fiber network infrastructure.",
    points: [
      "Helped install and maintain xDSL and Fiber infrastructure",
      "Diagnosed network connectivity issues",
      "Ran network performance tests",
    ],
    tabLabel: "Tunisie Telecom",
  },
];

export const SKILLS_EN: Skill[] = [
  { num: "01", name: "Languages", items: "JavaScript · TypeScript · Python · PHP" },
  { num: "02", name: "Frontend", items: "React · Vue.js · React Native · Expo" },
  { num: "03", name: "Backend", items: "Node.js · Express.js · REST API" },
  { num: "04", name: "VoIP & Real-Time", items: "WebRTC · SIP · Asterisk · ICE/STUN/TURN" },
  { num: "05", name: "Cloud & Data", items: "Firebase · Firestore · SQL" },
  { num: "06", name: "DevOps & Tools", items: "Docker · Git · Linux · Nginx" },
];

export const PROJECTS_EN: Project[] = [
  {
    id: "dolphyo",
    title: "Dolphyo",
    meta: "2025 · SaaS platform",
    tagline: "Call supervision, reinvented",
    description:
      "A modern CRM platform, available on web and mobile, with real-time VoIP, call supervision, an analytics dashboard, contact management, secure authentication, and real-time notifications.",
    tags: ["React", "VoIP", "CRM", "Firebase"],
    colorA: "#0ea5e9",
    colorB: "#4cc9f0",
    link: null,
    featured: true,
  },
  {
    id: "pedo",
    title: "Pedo",
    meta: "2025 · Open source",
    tagline: "A browser that respects your privacy",
    description:
      "An open-source, privacy-first browser: Tor integration, ad blocking, private search, and hardened privacy protection.",
    tags: ["Privacy", "Tor", "Browser", "Open Source"],
    colorA: "#7c3aed",
    colorB: "#22d3ee",
    link: null,
  },
  {
    id: "laveyronnaise",
    title: "L'Aveyronnaise d'Assurances",
    meta: "2025 · Client site",
    tagline: "An AI assistant that converts visitors",
    description:
      "A modern corporate website with an AI assistant that guides users and automatically generates leads.",
    tags: ["Website", "AI Assistant", "Lead Generation"],
    colorA: "#22c55e",
    colorB: "#facc15",
    link: null,
  },
];

/* ------------------------------------------------------------------ */
/* Lookup + defaults                                                   */
/* ------------------------------------------------------------------ */

export type Content = {
  profile: Profile;
  experience: Job[];
  skills: Skill[];
  projects: Project[];
};

export const CONTENT: Record<Language, Content> = {
  fr: {
    profile: PROFILE_FR,
    experience: EXPERIENCE_FR,
    skills: SKILLS_FR,
    projects: PROJECTS_FR,
  },
  en: {
    profile: PROFILE_EN,
    experience: EXPERIENCE_EN,
    skills: SKILLS_EN,
    projects: PROJECTS_EN,
  },
};

export const DEFAULT_LANGUAGE: Language = "fr";

/**
 * Flat, static (French) exports — for server-only files that can't react
 * to the client-side language toggle: layout.tsx metadata, manifest.ts,
 * robots.ts, sitemap.ts, og.tsx. Client components should use
 * `useI18n()` from `@/lib/i18n` instead, so their content actually
 * switches with the toggle.
 */
export const PROFILE = CONTENT[DEFAULT_LANGUAGE].profile;
export const EXPERIENCE = CONTENT[DEFAULT_LANGUAGE].experience;
export const SKILLS = CONTENT[DEFAULT_LANGUAGE].skills;
export const PROJECTS = CONTENT[DEFAULT_LANGUAGE].projects;
