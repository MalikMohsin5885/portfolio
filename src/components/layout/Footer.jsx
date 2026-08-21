import { PLACEHOLDER } from "../../data/placeholder";

const Footer = () => {
  const { footer } = PLACEHOLDER;

  return (
    <footer id="footer" className="border-t border-vast/10 bg-lumen-dark pt-16 pb-8">
      <div className="padding-global">
        <div className="mx-auto grid max-w-wide gap-12 md:grid-cols-4">
          <div>
            <p className="font-serif text-2xl text-vast">Mohsin Rasheed</p>
            <p className="mt-3 text-sm text-vast/60">
              Wispr Flow–inspired portfolio template. Map sections to your content.
            </p>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-vast/50">
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-vast/70 no-underline hover:text-vast"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 flex max-w-wide flex-col items-center justify-between gap-4 border-t border-vast/10 pt-8 text-sm text-vast/50 md:flex-row">
          <p>© {new Date().getFullYear()} Mohsin Rasheed</p>
          <div className="flex gap-6">
            <a href="https://github.com/MalikMohsin5885" target="_blank" rel="noreferrer" className="hover:text-vast">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/mohsin-rasheed-b81b9a233/" target="_blank" rel="noreferrer" className="hover:text-vast">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
