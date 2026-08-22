import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Code2, ExternalLink } from "lucide-react";
import { CircularTestimonials } from "../components/ui/circular-testimonials";
import { getProjectById, getProjectGalleryItems } from "../data/projects";

const PROJECT_COLORS = {
  name: "#1a1a1a",
  designation: "#525252",
  testimony: "#3a3a3a",
  arrowBackground: "#1a1a1a",
  arrowForeground: "#ffffeb",
  arrowHoverBackground: "#0052cc",
};

const PROJECT_FONT_SIZES = {
  name: "clamp(1.75rem, 4vw, 2.25rem)",
  designation: "0.95rem",
  quote: "1.05rem",
};

function ProjectExtras({ project, activeImageIndex, totalImages, onSelectImage }) {
  const highlights = project.highlights ?? [];
  const galleryItems = getProjectGalleryItems(project);

  return (
    <>
      {project.tags?.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-vast/10 bg-lumen-dark px-3 py-1 text-xs font-semibold text-vast/80"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {highlights.length > 0 && (
        <ul className="mt-5 space-y-2">
          {highlights.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-vast/70">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-vast/40" />
              {item}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-vast px-4 py-2.5 text-sm font-bold text-lumen no-underline transition-transform hover:scale-[1.02]"
          >
            Live demo
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        ) : null}
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-vast/15 bg-lumen/60 px-4 py-2.5 text-sm font-bold text-vast no-underline transition-transform hover:scale-[1.02]"
          >
            GitHub
            <Code2 className="h-4 w-4" aria-hidden="true" />
          </a>
        ) : null}
      </div>

      {totalImages > 1 ? (
        <div className="mt-10 border-t border-vast/10 pt-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-vast/45">
            Project gallery · {activeImageIndex + 1}/{totalImages}
          </p>
          <div className="flex flex-wrap gap-2">
            {galleryItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectImage(index)}
                className={`h-16 w-20 overflow-hidden rounded-lg border-2 transition-all ${
                  index === activeImageIndex
                    ? "border-vast scale-105 shadow-md"
                    : "border-vast/10 opacity-70 hover:opacity-100"
                }`}
                aria-label={`View image ${index + 1}`}
                aria-current={index === activeImageIndex}
              >
                <img src={item.src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = getProjectById(projectId);
  const galleryItems = useMemo(
    () => (project ? getProjectGalleryItems(project) : []),
    [project],
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [projectId]);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const staticContent = {
    name: project.title,
    designation: [project.tag, project.year, project.role].filter(Boolean).join(" · "),
    quote: project.longDescription ?? project.description,
    project,
  };

  return (
    <main className="flex min-h-[calc(100dvh-7rem)] items-center bg-lumen pb-28 pt-8 md:min-h-[calc(100dvh-8rem)] md:pb-32 md:pt-10">
      <div className="padding-global w-full">
        <div className="mx-auto w-full max-w-[82rem]">
          <Link
            to="/"
            state={{ scrollTo: "projects" }}
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-vast/70 no-underline transition-colors hover:text-vast md:mb-10"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to projects
          </Link>

          <CircularTestimonials
            testimonials={galleryItems}
            staticContent={staticContent}
            initialIndex={activeImageIndex}
            autoplay={false}
            colors={PROJECT_COLORS}
            fontSizes={PROJECT_FONT_SIZES}
            className="circular-testimonials--projects"
            prevLabel="Previous image"
            nextLabel="Next image"
            onActiveIndexChange={setActiveImageIndex}
            arrowsUnderMedia
            renderExtras={() => (
              <ProjectExtras
                project={project}
                activeImageIndex={activeImageIndex}
                totalImages={galleryItems.length}
                onSelectImage={setActiveImageIndex}
              />
            )}
          />
        </div>
      </div>
    </main>
  );
};

export default ProjectDetail;
