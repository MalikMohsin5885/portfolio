import { useState } from "react";
import Button from "../ui/Button";
import { PLACEHOLDER } from "../../data/placeholder";

const CTA = () => {
  const { cta } = PLACEHOLDER;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://backend-lilac-chi.vercel.app/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) {
        setForm({ name: "", email: "", message: "" });
        alert(data.message);
      }
    } catch {
      setStatus("error");
      alert("There was an error sending the message.");
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="padding-global">
        <div className="section-green relative overflow-hidden rounded-section-xl px-6 py-20 md:px-16 md:py-28">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-glow/20 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative mx-auto grid max-w-wide gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="heading-h2 text-lumen">{cta.title}</h2>
              <p className="mt-6 text-lg text-lumen/70">{cta.subtitle}</p>
              <div className="mt-8 hidden lg:block">
                <Button href="#home" variant="secondary" className="!border-lumen/30 !text-lumen">
                  Back to top
                </Button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full rounded-xl border border-lumen/20 bg-vast/30 px-4 py-3 text-lumen placeholder:text-lumen/40 outline-none focus:border-glow"
              />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@email.com"
                className="w-full rounded-xl border border-lumen/20 bg-vast/30 px-4 py-3 text-lumen placeholder:text-lumen/40 outline-none focus:border-glow"
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Your message"
                className="w-full rounded-xl border border-lumen/20 bg-vast/30 px-4 py-3 text-lumen placeholder:text-lumen/40 outline-none focus:border-glow"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-xl bg-glow px-6 py-4 font-bold text-vast transition-transform hover:scale-[1.02] disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : cta.button}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
