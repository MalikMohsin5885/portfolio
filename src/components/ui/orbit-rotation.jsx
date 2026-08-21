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
import { cn } from "../../lib/utils";

const defaultIcons = [
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
  { Icon: FaReact, name: "React" },
  { Icon: SiTypescript, name: "TypeScript" },
  { Icon: FaNodeJs, name: "Node.js" },
  { Icon: FaAws, name: "AWS" },
  { Icon: FaDocker, name: "Docker" },
  { Icon: FaGithub, name: "GitHub" },
];

const defaultCenterIcon = { Icon: SiDatabricks, name: "Databricks" };

const sizeClasses = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
};

const iconSizeClasses = {
  sm: "w-5 h-5",
  md: "w-8 h-8",
  lg: "w-10 h-10",
};

export function OrbitRotation({
  icons = defaultIcons,
  orbitCount = 3,
  orbitGap = 6,
  centerIcon = defaultCenterIcon,
  className,
  size = "md",
  ...props
}) {
  const iconsPerOrbit = Math.ceil(icons.length / orbitCount);
  const CenterIcon = centerIcon.Icon;
  const maxOrbitRem = 8 + orbitGap * orbitCount;
  const boxRem = maxOrbitRem + 3.5;

  return (
    <div
      className={cn("orbit-rotation mx-auto", className)}
      style={{
        "--orbit-box": `${boxRem}rem`,
        "--orbit-max-ring": `${maxOrbitRem}rem`,
      }}
      {...props}
    >
      <div className="orbit-rotation__stage">
        <div
          className={cn(
            "relative z-10 flex items-center justify-center rounded-full border border-vast/10 bg-lumen shadow-xl backdrop-blur-sm",
            sizeClasses[size],
          )}
        >
          <CenterIcon className={cn("text-fathom", iconSizeClasses[size])} />
        </div>

        {[...Array(orbitCount)].map((_, orbitIdx) => {
          const orbitSize = `${8 + orbitGap * (orbitIdx + 1)}rem`;
          const angleStep = (2 * Math.PI) / iconsPerOrbit;
          const animationDuration = `${14 + orbitIdx * 7}s`;

          return (
            <div
              key={orbitIdx}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: orbitSize,
                height: orbitSize,
              }}
            >
              <div
                className="relative h-full w-full rounded-full border-2 border-dotted border-vast/15"
                style={{
                  animation: `orbit-spin ${animationDuration} linear infinite`,
                }}
              >
                {icons
                  .slice(orbitIdx * iconsPerOrbit, orbitIdx * iconsPerOrbit + iconsPerOrbit)
                  .map((iconConfig, iconIdx) => {
                    const angle = iconIdx * angleStep;
                    const x = 50 + 50 * Math.cos(angle);
                    const y = 50 + 50 * Math.sin(angle);
                    const Icon = iconConfig.Icon;

                    return (
                      <div
                        key={iconConfig.name ?? iconIdx}
                        className="absolute rounded-full border border-vast/10 bg-lumen-dark p-1.5 shadow-md backdrop-blur-sm"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                        title={iconConfig.name}
                      >
                        <Icon className={cn("text-vast", iconSizeClasses[size])} />
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrbitRotation;
