import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

/** Card surface colors — Wispr-style pastels on dark section */
const SURFACE = {
  dawn: "bg-dawn text-vast",
  cream: "bg-lumen-dark text-vast",
  glow: "bg-glow text-vast",
  flare: "bg-flare/90 text-vast",
  green: "bg-vast text-lumen",
};

const TAG_PILL =
  "rounded-full border px-2.5 py-0.5 text-[0.6875rem] font-semibold md:px-3 md:py-1 md:text-xs";

export default function ProjectCard({ project }) {
  const surface = SURFACE[project.bg] || SURFACE.cream;
  const isDarkSurface = project.bg === "green";

  const tagClass = isDarkSurface
    ? `${TAG_PILL} border-lumen/20 bg-lumen/10 text-lumen/90`
    : `${TAG_PILL} border-vast/10 bg-lumen/40 text-vast/80`;

  const secondaryBtnClass = isDarkSurface
    ? "inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-lumen/25 bg-lumen/10 px-4 py-2.5 text-sm font-bold text-lumen no-underline transition-transform hover:scale-[1.02] md:w-auto md:px-5 md:py-3"
    : "inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-vast/15 bg-lumen/50 px-4 py-2.5 text-sm font-bold no-underline transition-transform hover:scale-[1.02] md:w-auto md:px-5 md:py-3";

  const primaryBtnClass = isDarkSurface
    ? "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-lumen px-4 py-2.5 text-sm font-bold text-vast no-underline transition-transform hover:scale-[1.02] md:w-auto md:px-5 md:py-3"
    : "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-vast px-4 py-2.5 text-sm font-bold text-lumen no-underline transition-transform hover:scale-[1.02] md:w-auto md:px-5 md:py-3";

  return (
    <article
      className={`project-card relative flex w-full flex-col overflow-hidden rounded-[1.25rem] md:grid md:h-[28.75rem] md:grid-cols-[1.05fr_1fr] md:rounded-none ${surface}`}
    >
      <Link
        to={`/projects/${project.id}`}
        className="project-card__media relative order-1 block aspect-[16/10] w-full shrink-0 overflow-hidden no-underline md:order-2 md:aspect-auto md:m-4 md:min-h-0 md:rounded-2xl"
        aria-label={`View ${project.title} details`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full min-h-[9rem] items-center justify-center bg-vast/10">
            <span className="font-serif text-lg opacity-40">Preview</span>
          </div>
        )}
      </Link>

      <div className="project-card__body relative z-10 order-2 flex flex-col justify-between p-4 md:order-1 md:p-8">
        <div className="min-w-0">
          {project.tag && (
            <p className="mb-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.12em] opacity-50 md:mb-3 md:text-xs">
              {project.tag}
            </p>
          )}
          <h3 className="font-serif text-xl leading-tight tracking-tight md:text-3xl md:leading-[0.95]">
            {project.title}
          </h3>
          {project.description && (
            <p className="mt-2 line-clamp-2 text-[0.8125rem] leading-relaxed opacity-70 md:mt-4 md:line-clamp-none md:text-sm">
              {project.description}
            </p>
          )}
          {project.tags?.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5 md:mt-4 md:gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className={tagClass}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-2 md:mt-0 md:flex-row md:flex-wrap md:gap-3 md:pt-4">
          <Link to={`/projects/${project.id}`} className={primaryBtnClass}>
            View project
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className={secondaryBtnClass}
            >
              Live demo
            </a>
          ) : null}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className={secondaryBtnClass}
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
