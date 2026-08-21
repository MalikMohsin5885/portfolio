/** Card surface colors — Wispr-style pastels on dark section */
const SURFACE = {
  dawn: "bg-dawn text-vast",
  cream: "bg-lumen-dark text-vast",
  glow: "bg-glow text-vast",
  flare: "bg-flare/90 text-vast",
  green: "bg-fathom text-lumen",
};

export default function ProjectCard({ project }) {
  const surface = SURFACE[project.bg] || SURFACE.cream;

  return (
    <article
      className={`project-card relative grid h-[26rem] w-full grid-cols-1 overflow-hidden rounded-[1.75rem] md:h-[28.75rem] md:grid-cols-[1.05fr_1fr] ${surface}`}
    >
      <div className="relative z-10 flex flex-col justify-between p-6 md:p-8">
        <div>
          {project.tag && (
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] opacity-50">
              {project.tag}
            </p>
          )}
          <h3 className="font-serif text-2xl leading-[0.95] tracking-tight md:text-3xl">
            {project.title}
          </h3>
          {project.description && (
            <p className="mt-3 text-sm leading-relaxed opacity-70 md:mt-4">{project.description}</p>
          )}
          {project.tags?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2 md:mt-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-vast/10 bg-lumen/40 px-3 py-1 text-xs font-semibold opacity-80"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3 pt-4">
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-vast px-5 py-3 text-sm font-bold text-lumen no-underline transition-transform hover:scale-[1.03]"
            >
              Live demo <span aria-hidden="true">→</span>
            </a>
          ) : (
            <span className="inline-flex rounded-lg border border-vast/20 px-5 py-3 text-sm font-semibold opacity-45">
              Demo coming soon
            </span>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-vast/15 bg-lumen/50 px-5 py-3 text-sm font-bold no-underline transition-transform hover:scale-[1.03]"
            >
              GitHub
            </a>
          )}
        </div>
      </div>

      <div className="relative z-10 m-3 min-h-[10rem] overflow-hidden rounded-2xl md:m-4 md:min-h-0">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="h-full w-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full min-h-[10rem] items-center justify-center bg-vast/10">
            <span className="font-serif text-lg opacity-40">Preview</span>
          </div>
        )}
      </div>
    </article>
  );
}
