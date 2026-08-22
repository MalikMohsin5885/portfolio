import { useRef } from "react";
import SectionTag from "../ui/SectionTag";
import ProjectCard from "./ProjectCard";
import { useProjectWaveSlider } from "../../hooks/useProjectWaveSlider";
import { projects, projectsShowcaseBg } from "../../data/projects";
import "./projects-fluid.css";

const Projects = () => {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);

  useProjectWaveSlider(wrapRef, trackRef, cardsRef, projects.length);

  return (
    <section id="projects" className="projects-fluid relative mt-8 md:mt-16">
      <div className="padding-global pb-10 pt-4 md:pb-14 md:pt-6">
        <div ref={wrapRef} className="projects-fluid-wrap mx-auto max-w-full">
          <div className="projects-fluid-frame">
            <div className="projects-fluid-media" aria-hidden="true">
              <img src={projectsShowcaseBg} alt="" loading="lazy" />
              <div className="projects-fluid-gradient-noise" />
              <div className="projects-fluid-scrim" />
            </div>

            <div className="projects-fluid-intro">
              <SectionTag>Selected work</SectionTag>
              <h2 className="heading-h2 mt-5 text-balance md:mt-6">
                Projects I've <em className="italic">built & shipped.</em>
              </h2>
            </div>

            <div className="project-wave-wrap relative">
              <div
                ref={trackRef}
                className="project-wave-track flex w-full items-center justify-center"
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
