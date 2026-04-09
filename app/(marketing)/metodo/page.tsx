"use client";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/app/providers/LangProvider";

function EyebrowLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.3em] font-body font-semibold" style={{ color: "#54132B" }}>
      {children}
    </p>
  );
}

function GeoBg({ className = "" }: { className?: string }) {
  return (
    <svg className={`absolute pointer-events-none select-none ${className}`} viewBox="0 0 600 600" fill="none" aria-hidden="true">
      <circle cx="300" cy="300" r="280" stroke="#928178" strokeWidth="0.8" opacity="0.12" />
      <circle cx="300" cy="300" r="180" stroke="#928178" strokeWidth="0.8" opacity="0.1" />
      <circle cx="300" cy="300" r="80" stroke="#928178" strokeWidth="0.8" opacity="0.1" />
      <line x1="20" y1="300" x2="580" y2="300" stroke="#928178" strokeWidth="0.5" opacity="0.08" />
      <line x1="300" y1="20" x2="300" y2="580" stroke="#928178" strokeWidth="0.5" opacity="0.08" />
    </svg>
  );
}

const pillarsES = [
  { step: "01", title: "Conciencia",    desc: "Desarrollar una autoconciencia radical y anclaje a través de la evaluación somática. Observar las heridas y patrones desde la presencia y sin juicio." },
  { step: "02", title: "Regulación",    desc: "Dominar el sistema nervioso para navegar el estrés con resiliencia fisiológica. Calmar el cuerpo para recuperar la seguridad interna." },
  { step: "03", title: "Integración",   desc: "Traducir las percepciones en hábitos diarios y arquitectura conductual. Unificar las partes fragmentadas de tu historia personal." },
  { step: "04", title: "Propósito",     desc: "Vivir con intencionalidad, claridad de visión e impacto. Desde tu verdad más profunda hacia tu expresión más auténtica." },
];

const pillarsEN = [
  { step: "01", title: "Consciousness", desc: "Develop radical self-awareness and grounding through somatic assessment. Observe wounds and patterns from presence, without judgment." },
  { step: "02", title: "Regulation",    desc: "Master the nervous system to navigate stress with physiological resilience. Calm the body to recover inner safety." },
  { step: "03", title: "Integration",   desc: "Translate insights into daily habits and behavioral architecture. Unify the fragmented parts of your personal story." },
  { step: "04", title: "Purpose",       desc: "Live with intentionality, clarity of vision, and impact. From your deepest truth toward your most authentic expression." },
];

const programsES = [
  {
    id: "volver-a-ti",
    label: "Iniciación",
    title: "VOLVER A TI",
    duration: "4 semanas",
    format: "Digital + grupal",
    desc: "Experiencia de reconexión emocional diseñada para despertar conciencia y abrir el camino hacia la transformación interior. El primer paso para reconectar con tu cuerpo y tus emociones.",
    includes: [
      "4 sesiones grupales semanales",
      "Journaling guiado",
      "Meditaciones de apertura",
      "Comunidad privada",
    ],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0mcZnfB7s6xpjhm9uF2aTv-gwmJbCvOMEkLHnNB6YBsXmRmPZtGFyFwQZKVvDTEmvVrVepdUR0rslSI2b0WgYXclHANJxH3C5ifQVFJF8OrdjfgxajnPnwcAN8OF2q6F5kHIVQ-E9vjztcX5NQhFqSpqe5D7ixc-wGaQNrDjiP2R7vPTbSXw7aL3L73Q0YJ3SUjEm5HfYsHb4ER8wAlgiGqN1-MRMh_AxA_hFlDTmtf--M8ipTLtUMDUeOH4FE56IRs63C6qN_uI",
  },
  {
    id: "autenticamente",
    label: "Programa Central",
    title: "AUTÉNTICAMENTE",
    duration: "8–12 semanas",
    format: "Psicoterapia grupal + digital",
    desc: "Programa profundo que integra psicoterapia grupal, journaling, espiritualidad guiada y comunidad para reconstruir identidad y propósito desde la verdad interior.",
    includes: [
      "Sesiones semanales de psicoterapia grupal",
      "Workbook de reconstrucción interior",
      "Meditaciones y prácticas somáticas",
      "Comunidad de mujeres en proceso",
      "Acceso a plataforma ESENCIA",
    ],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuQXzp2NMSxs1lp1bXStWUtHwZv4P__7laXkm1sZK0Oxf65iRern4zRi6WO30qfOyGyeE-E8h5mb0aBpwWpVqzRZrD-Npg4OqAkcAKTtdOYt2IJxOfR8G6z_2L-OFIlIuyIHXPvdzgTKQbOgTycOS4k_gOc-uIAfzQf5k_b3OJFhAzMwg--11l5X4ENTOqnpSUEAHSlMThbrUXQge9izsQ5QQcHB9YnUhGQ7RawiuyswgiVXrdl56Vnre2FrdH1JrGXEztRTK0QLI",
  },
  {
    id: "raiz",
    label: "Retiro Intensivo",
    title: "RAÍZ",
    duration: "7 días",
    format: "Presencial en naturaleza",
    desc: "Experiencia boutique de sanación profunda en naturaleza para trabajar identidad, silencio interior y transformación personal. Cupo máximo de 12 mujeres.",
    includes: [
      "Alojamiento todo incluido en santuario natural",
      "Hoja de ruta somática personalizada",
      "Sesiones individuales con Liset",
      "6 meses de acompañamiento post-retiro",
      "Acceso a plataforma ESENCIA",
    ],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBKDoJ7hMs5JOCuAq3QVurDuOHSTJlZDxV-bTDGqgcXQ9bqgK13EEyXvi4Y7rSAD1dGZkKmv5kQJqp7WK0XDJrsybAf4Xg-zJuo-FoYQV3LYGMrs7JRKMWItUO3N1RRmJ-VRbuUF7D7KUe5gRtmF58wg69i0NwZVYJD5_8LV0MsP19VvuENy6VpHSIgMMBIh9yiZASZaZlWYBKMbwRsoZ_i5svUsPNLtI36jRsVghsebi6vev_-NN2eXYuCVjZAE2teHZ01mX3g2o",
  },
];

const programsEN = [
  {
    id: "volver-a-ti",
    label: "Initiation",
    title: "RETURN TO YOURSELF",
    duration: "4 weeks",
    format: "Digital + group",
    desc: "An emotional reconnection experience designed to awaken consciousness and open the path toward inner transformation. The first step to reconnecting with your body and emotions.",
    includes: [
      "4 weekly group sessions",
      "Guided journaling",
      "Opening meditations",
      "Private community",
    ],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0mcZnfB7s6xpjhm9uF2aTv-gwmJbCvOMEkLHnNB6YBsXmRmPZtGFyFwQZKVvDTEmvVrVepdUR0rslSI2b0WgYXclHANJxH3C5ifQVFJF8OrdjfgxajnPnwcAN8OF2q6F5kHIVQ-E9vjztcX5NQhFqSpqe5D7ixc-wGaQNrDjiP2R7vPTbSXw7aL3L73Q0YJ3SUjEm5HfYsHb4ER8wAlgiGqN1-MRMh_AxA_hFlDTmtf--M8ipTLtUMDUeOH4FE56IRs63C6qN_uI",
  },
  {
    id: "autenticamente",
    label: "Core Program",
    title: "AUTÉNTICAMENTE",
    duration: "8–12 weeks",
    format: "Group psychotherapy + digital",
    desc: "A deep program that integrates group psychotherapy, journaling, guided spirituality, and community to rebuild identity and purpose from inner truth.",
    includes: [
      "Weekly group psychotherapy sessions",
      "Inner reconstruction workbook",
      "Meditations and somatic practices",
      "Community of women in process",
      "Access to ESENCIA platform",
    ],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuQXzp2NMSxs1lp1bXStWUtHwZv4P__7laXkm1sZK0Oxf65iRern4zRi6WO30qfOyGyeE-E8h5mb0aBpwWpVqzRZrD-Npg4OqAkcAKTtdOYt2IJxOfR8G6z_2L-OFIlIuyIHXPvdzgTKQbOgTycOS4k_gOc-uIAfzQf5k_b3OJFhAzMwg--11l5X4ENTOqnpSUEAHSlMThbrUXQge9izsQ5QQcHB9YnUhGQ7RawiuyswgiVXrdl56Vnre2FrdH1JrGXEztRTK0QLI",
  },
  {
    id: "raiz",
    label: "Intensive Retreat",
    title: "RAÍZ",
    duration: "7 days",
    format: "In-person in nature",
    desc: "A boutique deep healing experience in nature to work on identity, inner silence, and personal transformation. Maximum of 12 women.",
    includes: [
      "All-inclusive accommodation in a natural sanctuary",
      "Personalized somatic roadmap",
      "Individual sessions with Liset",
      "6 months of post-retreat support",
      "Access to ESENCIA platform",
    ],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBKDoJ7hMs5JOCuAq3QVurDuOHSTJlZDxV-bTDGqgcXQ9bqgK13EEyXvi4Y7rSAD1dGZkKmv5kQJqp7WK0XDJrsybAf4Xg-zJuo-FoYQV3LYGMrs7JRKMWItUO3N1RRmJ-VRbuUF7D7KUe5gRtmF58wg69i0NwZVYJD5_8LV0MsP19VvuENy6VpHSIgMMBIh9yiZASZaZlWYBKMbwRsoZ_i5svUsPNLtI36jRsVghsebi6vev_-NN2eXYuCVjZAE2teHZ01mX3g2o",
  },
];

export default function MetodoPage() {
  const { lang, t } = useLang();
  const pillars  = lang === "es" ? pillarsES  : pillarsEN;
  const programs = lang === "es" ? programsES : programsEN;

  return (
    <div style={{ backgroundColor: "#F9F4F1", color: "#000000" }}>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden px-6 py-24 lg:py-32" style={{ backgroundColor: "#F4E7E9" }}>
        <GeoBg className="w-[500px] h-[500px] -right-24 -top-24 opacity-50" />
        <div className="max-w-[1100px] mx-auto relative z-10">
          <div className="max-w-2xl space-y-6">
            <EyebrowLabel>{t("metodo.hero.label")}</EyebrowLabel>
            <h1
              className="font-display leading-[1.05] tracking-[0.02em] whitespace-pre-line"
              style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300, color: "#000000" }}
            >
              {t("metodo.hero.title")}
            </h1>
            <p className="text-xl font-body font-light leading-relaxed" style={{ color: "#928178" }}>
              {t("metodo.hero.desc")}
            </p>
          </div>
        </div>
      </section>

      {/* ── FOUR PILLARS ── */}
      <section className="py-24 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16 space-y-3">
            <EyebrowLabel>{t("metodo.pillars.label")}</EyebrowLabel>
            <h2 className="font-display tracking-[0.04em]" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400 }}>
              {t("metodo.pillars.title")}
            </h2>
          </div>

          <div className="space-y-6">
            {pillars.map((p) => (
              <div
                key={p.step}
                className="flex gap-8 p-10 border items-start"
                style={{ backgroundColor: "#F4E7E9", borderColor: "rgba(146,129,120,0.2)", borderRadius: "2px" }}
              >
                <span
                  className="font-display text-5xl font-light shrink-0 leading-none"
                  style={{ color: "rgba(84,19,43,0.3)" }}
                >
                  {p.step}
                </span>
                <div className="space-y-2">
                  <h3 className="font-display text-2xl" style={{ color: "#000000", fontWeight: 400 }}>
                    {p.title}
                  </h3>
                  <p className="font-body leading-relaxed" style={{ color: "#928178" }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      <section id="programas" className="py-24 px-6" style={{ backgroundColor: "#F4E7E9" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16 space-y-3">
            <EyebrowLabel>{t("metodo.programs.label")}</EyebrowLabel>
            <h2 className="font-display tracking-[0.04em]" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400 }}>
              {t("metodo.programs.title")}
            </h2>
            <p className="font-body" style={{ color: "#928178" }}>
              {t("metodo.programs.desc")}
            </p>
          </div>

          <div className="space-y-16">
            {programs.map((prog, i) => (
              <div
                key={prog.id}
                id={prog.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="relative overflow-hidden shadow-lg" style={{ aspectRatio: "4/3", borderRadius: "2px" }}>
                  <Image src={prog.img} alt={prog.title} fill className="object-cover" unoptimized />
                </div>
                <div className="space-y-6">
                  <div>
                    <EyebrowLabel>{prog.label}</EyebrowLabel>
                    <h3 className="font-display mt-2" style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 300, color: "#000000" }}>
                      {prog.title}
                    </h3>
                    <div className="flex gap-6 mt-3">
                      <span className="text-xs font-body" style={{ color: "#928178" }}>{prog.duration}</span>
                      <span style={{ color: "#928178" }}>·</span>
                      <span className="text-xs font-body" style={{ color: "#928178" }}>{prog.format}</span>
                    </div>
                  </div>
                  <p className="font-body leading-relaxed" style={{ color: "#000000", opacity: 0.8 }}>
                    {prog.desc}
                  </p>
                  <ul className="space-y-2">
                    {prog.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm font-body" style={{ color: "#928178" }}>
                        <span className="mt-1.5 w-3 h-px shrink-0" style={{ backgroundColor: "#54132B", display: "inline-block" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contacto"
                    className="inline-block px-8 py-3.5 text-sm font-body font-medium tracking-[0.08em] transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#54132B", color: "#F9F4F1", borderRadius: "2px" }}
                  >
                    {t("metodo.solicitar")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-[1100px] mx-auto text-center space-y-8">
          <EyebrowLabel>{t("metodo.cta.label")}</EyebrowLabel>
          <h2 className="font-display tracking-[0.04em]" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300, color: "#000000" }}>
            {t("metodo.cta.title")}
          </h2>
          <p className="font-body text-lg font-light max-w-xl mx-auto" style={{ color: "#928178" }}>
            {t("metodo.cta.desc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/test"
              className="inline-block px-8 py-4 text-sm font-body font-medium tracking-[0.08em] transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#54132B", color: "#F9F4F1", borderRadius: "2px" }}
            >
              {t("metodo.cta.test")}
            </Link>
            <Link
              href="/contacto"
              className="inline-block px-8 py-4 text-sm font-body font-medium tracking-[0.08em] border"
              style={{ color: "#000000", borderColor: "rgba(146,129,120,0.5)", borderRadius: "2px" }}
            >
              {t("metodo.cta.talk")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
