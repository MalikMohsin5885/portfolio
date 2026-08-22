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
  sm: "orbit-rotation__center--sm",
  md: "orbit-rotation__center--md",
  lg: "orbit-rotation__center--lg",
};

const iconSizeClasses = {
  sm: "orbit-rotation__icon--sm",
  md: "orbit-rotation__icon--md",
  lg: "orbit-rotation__icon--lg",
};

function getRingSizePercent(orbitIdx, orbitCount, orbitGap = 12) {
  const presetRings = {
    3: [38, 62, 86],
    4: [34, 52, 70, 88],
    5: [32, 46, 60, 74, 88],
  };

  if (presetRings[orbitCount]) {
    return presetRings[orbitCount][orbitIdx] ?? presetRings[orbitCount].at(-1);
  }

  const inner = 34;
  const outer = 88;
  if (orbitCount <= 1) return outer;

  const totalGap = orbitGap * (orbitCount - 1);
  const usableSpan = outer - inner - totalGap;
  return inner + orbitIdx * (usableSpan / (orbitCount - 1) + orbitGap);
}

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

  return (
    <div className={cn("orbit-rotation", className)} {...props}>
      <div className="orbit-rotation__stage">
        <div
          className={cn(
            "orbit-rotation__center relative z-10 flex items-center justify-center rounded-full border border-vast/10 bg-lumen shadow-xl backdrop-blur-sm",
            sizeClasses[size],
          )}
        >
          <CenterIcon className={cn("text-vast", iconSizeClasses[size])} />
        </div>

        {[...Array(orbitCount)].map((_, orbitIdx) => {
          const ringSize = `${getRingSizePercent(orbitIdx, orbitCount, orbitGap)}%`;
          const ringIcons = icons.slice(
            orbitIdx * iconsPerOrbit,
            orbitIdx * iconsPerOrbit + iconsPerOrbit,
          );
          const iconCount = ringIcons.length || 1;
          const angleStep = (2 * Math.PI) / iconCount;
          const angleOffset = orbitIdx * (Math.PI / iconCount);
          const animationDuration = `${16 + orbitIdx * 8}s`;

          return (
            <div
              key={orbitIdx}
              className="orbit-rotation__ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: ringSize,
                height: ringSize,
              }}
            >
              <div
                className="orbit-rotation__ring-track relative h-full w-full"
                style={{
                  animation: `orbit-spin ${animationDuration} linear infinite`,
                }}
              >
                <svg
                  className="orbit-rotation__ring-line pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 100 100"
                  aria-hidden="true"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="49.15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeDasharray="1.75 5.25"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                {ringIcons.map((iconConfig, iconIdx) => {
                    const angle = iconIdx * angleStep + angleOffset;
                    const x = 50 + 50 * Math.cos(angle);
                    const y = 50 + 50 * Math.sin(angle);
                    const Icon = iconConfig.Icon;

                    return (
                      <div
                        key={iconConfig.name ?? iconIdx}
                        className="orbit-rotation__badge absolute rounded-full border border-vast/10 bg-lumen-dark shadow-sm backdrop-blur-sm"
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
