import { useRef } from "react";
import SectionTag from "../ui/SectionTag";
import ProjectCard from "./ProjectCard";
import { useProjectWaveSlider } from "../../hooks/useProjectWaveSlider";
import { projects } from "../../data/projects";

const Projects = () => {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);

  useProjectWaveSlider(wrapRef, trackRef, cardsRef, projects.length);

  return (
    <section id="projects" className="relative mt-8 md:mt-16">
      <div className="projects-dark-shell w-full bg-vast text-lumen">
        <div className="padding-global pb-10 pt-12 md:pb-14 md:pt-16">
          <div className="mx-auto max-w-wide text-center">
            <SectionTag className="!text-lumen/45">Selected work</SectionTag>
            <h2 className="heading-h2 mt-5 text-lumen text-balance md:mt-6">
              Projects I've <em className="italic">built & shipped.</em>
            </h2>
          </div>
        </div>

        <div ref={wrapRef} className="project-wave-wrap relative pt-2 md:pt-4">
          <div
            ref={trackRef}
            className="project-wave-track sticky top-[5.75rem] flex w-full items-center justify-center md:top-[6.5rem]"
          >
            {projects.map((project, i) => (
              <div
                key={project.id}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="project-wave-card"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        <div className="projects-dark-shell-bottom" aria-hidden="true" />
      </div>
    </section>
  );
};

export default Projects;
