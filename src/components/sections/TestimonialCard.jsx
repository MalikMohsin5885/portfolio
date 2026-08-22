const BG = {
  purple: "bg-dawn",
  lumen: "bg-lumen-dark",
  green: "bg-vast",
  yellow: "bg-glow",
  dark: "bg-vast/90",
  flare: "bg-flare/20",
};

function CardBg({ variant = "lumen" }) {
  return (
    <div
      className={`absolute inset-0 -z-0 ${BG[variant] || BG.lumen}`}
      aria-hidden="true"
    />
  );
}

export function TestimonialLandscapeFeatured({ item }) {
  return (
    <div className="testi-card testi-card-landscape relative grid h-[28.75rem] w-[46.25rem] max-w-[92vw] grid-cols-[1.1fr_1fr] gap-4 overflow-hidden rounded-section p-4 text-vast">
      <CardBg variant={item.bg || "purple"} />
      <div className="relative z-10 flex h-full flex-col justify-between p-2">
        <div>
          {item.logo && (
            <p className="mb-4 font-sans text-sm font-bold uppercase tracking-wide opacity-60">
              {item.logo}
            </p>
          )}
          <blockquote className="font-serif text-2xl leading-[0.95] tracking-tight text-balance">
            "{item.quote}"
          </blockquote>
        </div>
        {item.link && (
          <span className="inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline">
            {item.link} →
          </span>
        )}
      </div>
      <div className="relative z-10 overflow-hidden rounded-xl">
        <div
          className="h-full min-h-[220px] w-full bg-gradient-to-br from-vast/20 to-lumen-dark/60"
          style={
            item.image
              ? {
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
          }
        />
        {item.stats && (
          <div className="absolute bottom-3 left-3 right-3 grid grid-cols-2 gap-2">
            {item.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-lumen/90 p-3 backdrop-blur-sm"
              >
                <p className="font-serif text-2xl leading-none text-vast">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-vast/60">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function TestimonialSquare({ item }) {
  return (
    <div className="testi-card testi-card-square relative flex h-[28.75rem] w-[26rem] max-w-[85vw] flex-col overflow-hidden rounded-section p-4 text-vast">
      <CardBg variant={item.bg || "lumen"} />
      <div className="relative z-10 flex h-full flex-col justify-between p-2">
        <blockquote className="font-serif text-2xl leading-[0.95] tracking-tight text-balance">
          "{item.quote}"
        </blockquote>
        <div className="flex items-center gap-3">
          {item.logo && (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vast/10 text-xs font-bold">
              {item.logo.slice(0, 2)}
            </div>
          )}
          <div>
            <p className="font-semibold">{item.author}</p>
            {item.role && <p className="text-sm text-vast/50">{item.role}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialSquarePhoto({ item }) {
  return (
    <div className="testi-card testi-card-square relative h-[28.75rem] w-[26rem] max-w-[85vw] overflow-hidden rounded-section text-vast">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${item.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-vast/70 via-vast/20 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-4">
        <div className="rounded-xl bg-lumen p-4 shadow-lg">
          <blockquote className="relative z-10 font-serif text-xl leading-[0.95] tracking-tight">
            "{item.quote}"
          </blockquote>
          <div className="relative z-10 mt-4">
            <p className="font-semibold">{item.author}</p>
            <p className="text-sm text-vast/50">{item.role}</p>
          </div>
          <div className="absolute inset-0 rounded-xl bg-glow/30" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

export function TestimonialLandscapePerson({ item }) {
  return (
    <div className="testi-card testi-card-landscape relative grid h-[28.75rem] w-[46.25rem] max-w-[92vw] grid-cols-[1.1fr_1fr] gap-4 overflow-hidden rounded-section p-4 text-vast">
      <CardBg variant={item.bg || "green"} />
      <div className="relative z-10 flex h-full flex-col justify-between p-2">
        <blockquote className="font-serif text-2xl leading-[0.95] tracking-tight text-balance">
          "{item.quote}"
        </blockquote>
        <div>
          <p className="font-semibold">{item.author}</p>
          <p className="text-sm text-vast/50">{item.role}</p>
        </div>
      </div>
      <div className="relative z-10 overflow-hidden rounded-xl">
        <div
          className="h-full min-h-[220px] w-full bg-gradient-to-br from-lumen-dark/80 to-vast/20"
          style={
            item.image
              ? {
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top center",
                }
              : undefined
          }
        />
      </div>
    </div>
  );
}

const CARD_MAP = {
  featured: TestimonialLandscapeFeatured,
  square: TestimonialSquare,
  photo: TestimonialSquarePhoto,
  person: TestimonialLandscapePerson,
};

export function TestimonialCard({ item }) {
  const Component = CARD_MAP[item.type] || TestimonialSquare;
  return <Component item={item} />;
}
