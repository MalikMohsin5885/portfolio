import {
  FaAws,
  FaDocker,
  FaGithub,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import {
  SiApacheairflow,
  SiApachekafka,
  SiApachespark,
  SiDatabricks,
  SiDbt,
  SiFirebase,
  SiMicrosoftazure,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiPandas,
  SiPostgresql,
  SiPowerbi,
  SiPython,
  SiSnowflake,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import SectionTag from "../ui/SectionTag";
import OrbitRotation from "../ui/orbit-rotation";
import { skills } from "../../data/skills";

const ORBIT_ICONS = [
  { Icon: SiDatabricks, name: "Databricks" },
  { Icon: SiDbt, name: "dbt" },
  { Icon: SiMicrosoftazure, name: "Microsoft Fabric" },
  { Icon: SiApachespark, name: "Apache Spark" },
  { Icon: SiApacheairflow, name: "Airflow" },
  { Icon: SiSnowflake, name: "Snowflake" },
  { Icon: SiApachekafka, name: "Kafka" },
  { Icon: SiPowerbi, name: "Power BI" },
  { Icon: SiPython, name: "Python" },
  { Icon: SiPandas, name: "Pandas" },
  { Icon: SiPostgresql, name: "PostgreSQL" },
  { Icon: SiMongodb, name: "MongoDB" },
  { Icon: FaReact, name: "React" },
  { Icon: SiTypescript, name: "TypeScript" },
  { Icon: FaNodeJs, name: "Node.js" },
  { Icon: SiNextdotjs, name: "Next.js" },
  { Icon: FaAws, name: "AWS" },
  { Icon: FaDocker, name: "Docker" },
  { Icon: SiFirebase, name: "Firebase" },
  { Icon: SiNestjs, name: "NestJS" },
  { Icon: SiTailwindcss, name: "Tailwind" },
  { Icon: FaGithub, name: "GitHub" },
  { Icon: SiVercel, name: "Vercel" },
];

const SkillsSection = () => (
  <section id="skills" className="relative py-24 md:py-32">
    <div className="padding-global">
      <div className="mx-auto max-w-content text-center">
        <SectionTag>{skills.tag}</SectionTag>
        <h2 className="heading-h2 mt-6 text-vast text-balance">
          {skills.title} <em className="italic">{skills.titleEm}</em>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-vast/70 text-balance">
          {skills.subtitle}
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-wide gap-10 lg:mt-16 lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16">
        <div className="min-w-0 space-y-5">
          {skills.categories.map((category) => (
            <div
              key={category.id}
              className="card-surface rounded-section p-5 md:p-6"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-vast/55">
                {category.label}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-vast/10 bg-lumen px-3 py-1.5 text-sm font-medium text-vast/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex min-w-0 items-center justify-center overflow-hidden">
          <div className="flex w-full max-w-full items-center justify-center rounded-section-xl border border-vast/10 bg-gradient-to-br from-lumen-dark/80 via-lumen to-lumen-dark/40 px-2 py-6 sm:max-w-[36rem] sm:px-6 sm:py-10 lg:min-h-[34rem]">
            <OrbitRotation
              icons={ORBIT_ICONS}
              centerIcon={{ Icon: SiDatabricks, name: "Databricks" }}
              orbitCount={5}
              orbitGap={12}
              size="md"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SkillsSection;
