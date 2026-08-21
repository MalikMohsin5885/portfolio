import { PLACEHOLDER } from "../../data/placeholder";

const TrustStrip = () => {
  const { trust } = PLACEHOLDER;

  return (
    <section className="py-20 md:py-28">
      <div className="padding-global">
        <div className="mx-auto max-w-content text-center">
          <h2 className="heading-h2 text-vast">
            {trust.title} <em className="italic">{trust.titleEm}</em>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg text-vast/70 text-balance">
            {trust.description}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {trust.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-vast/15 bg-lumen-dark px-5 py-2 text-sm font-semibold text-vast/70"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
