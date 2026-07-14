"use client";

import { useI18n } from "@/lib/i18n";

/**
 * A complete, semantic, text-only rendering of the portfolio.
 *
 * The visible experience is a WebGL/canvas journey — most of its content
 * (projects, bio, skill detail) never reaches the DOM, so it's invisible to
 * screen readers and to the many AI/search crawlers that don't execute
 * JavaScript. This component mirrors that same content as clean, structured
 * HTML that is always server-rendered into the page (in the default
 * language on first load, then follows the language toggle like the rest
 * of the UI).
 *
 * It's visually hidden with `sr-only` (not `display:none`), so assistive tech
 * and crawlers read it while sighted users get the 3D scene. This is a
 * legitimate text alternative to canvas content, not hidden keyword stuffing —
 * it's the exact same information the animated sections present on scroll.
 */
export default function SeoContent() {
  const { content, lang } = useI18n();
  const { profile, experience, skills, projects } = content;
  const isFr = lang === "fr";

  return (
    <section className="sr-only" aria-label={`${isFr ? "À propos de" : "About"} ${profile.name}`}>
      <header>
        <h2>
          {profile.name} — {profile.role}
        </h2>
        <p>{profile.status}</p>
        <p>{profile.bio}</p>
      </header>

      <section aria-label={isFr ? "À propos" : "About"}>
        <h2>{isFr ? "À propos" : "About"}</h2>
        <p>{profile.about.lead}</p>
        <p>{profile.about.p2}</p>
        <p>{profile.about.p3}</p>
        <p>{isFr ? "Basé à" : "Based in"} {profile.location}.</p>
      </section>

      <section aria-label={isFr ? "Expérience professionnelle" : "Work experience"}>
        <h2>{isFr ? "Expérience" : "Experience"}</h2>
        {experience.map((job) => (
          <article key={job.id}>
            <h3>
              {job.title} — {job.company}
            </h3>
            <p>
              {job.range} · {job.location}
            </p>
            <p>{job.blurb}</p>
            <ul>
              {job.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section aria-label={isFr ? "Projets" : "Projects"}>
        <h2>{isFr ? "Projets" : "Projects"}</h2>
        {projects.map((project) => (
          <article key={project.id}>
            <h3>
              {project.link ? (
                <a href={project.link} rel="noopener">
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h3>
            <p>
              {project.meta} — {project.tagline}
            </p>
            <p>{project.description}</p>
            <p>
              {isFr ? "Technologies" : "Technologies"} : {project.tags.join(", ")}.
            </p>
          </article>
        ))}
      </section>

      <section aria-label={isFr ? "Compétences" : "Skills"}>
        <h2>{isFr ? "Compétences" : "Skills"}</h2>
        <ul>
          {skills.map((skill) => (
            <li key={skill.num}>
              <strong>{skill.name} :</strong> {skill.items}
            </li>
          ))}
        </ul>
      </section>

      <section aria-label={isFr ? "Formation et certifications" : "Education and certifications"}>
        <h2>{isFr ? "Formation & Certifications" : "Education & Credentials"}</h2>
        <ul>
          {profile.about.credentials.map((credential, i) => (
            <li key={i}>{credential}</li>
          ))}
        </ul>
      </section>

      <section aria-label="Contact">
        <h2>Contact</h2>
        <p>
          Email :{" "}
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
        <p>{isFr ? "Localisation" : "Location"} : {profile.location}</p>
        <p>
          {isFr ? "Téléphone" : "Phone"} :{" "}
          <a href={`tel:${profile.phone.replace(/\s+/g, "")}`}>
            {profile.phone}
          </a>
        </p>
        <ul>
          <li>
            <a href={profile.socials.github} rel="noopener">
              GitHub
            </a>
          </li>
          <li>
            <a href={profile.resume}>{isFr ? "CV (PDF)" : "Résumé (PDF)"}</a>
          </li>
        </ul>
      </section>
    </section>
  );
}
