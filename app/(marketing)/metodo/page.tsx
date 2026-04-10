"use client";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/app/providers/LangProvider";

/* ──────────────────────────────────────────────────────────
   CONFIG — Replace with real Calendly URLs when ready
   ────────────────────────────────────────────────────────── */
const ASSISTANT_CALENDLY_URL = "https://calendly.com/autenticamente/llamada-orientacion";
const LISET_CALENDLY_URL     = "https://calendly.com/lisetvalencia/consulta-clinica";
const LISET_CONSULT_PRICE    = "$150 USD";

/* ── SVG Icons ── */
function IconEye() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 18s5.5-10 16-10 16 10 16 10-5.5 10-16 10S2 18 2 18z" />
      <circle cx="18" cy="18" r="5" />
      <circle cx="18" cy="18" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconWave() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 18c3-8 6-8 9 0s6 8 9 0 6-8 9 0 6 8 5 0" />
    </svg>
  );
}
function IconInterlock() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="18" r="9" />
      <circle cx="22" cy="18" r="9" />
    </svg>
  );
}
function IconTarget() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="18" r="14" />
      <circle cx="18" cy="18" r="8" />
      <circle cx="18" cy="18" r="2" fill="currentColor" stroke="none" />
      <line x1="18" y1="2" x2="18" y2="6" />
      <line x1="30" y1="6" x2="33" y2="3" />
    </svg>
  );
}
function IconChatBubble({ color = "#54132B" }: { color?: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 18c0 7.73-6.27 14-14 14a13.9 13.9 0 0 1-6.61-1.66L4 32l1.66-7.39A13.9 13.9 0 0 1 4 18c0-7.73 6.27-14 14-14s14 6.27 14 14z" />
      <circle cx="12" cy="18" r="1.2" fill={color} stroke="none" />
      <circle cx="18" cy="18" r="1.2" fill={color} stroke="none" />
      <circle cx="24" cy="18" r="1.2" fill={color} stroke="none" />
    </svg>
  );
}
function IconConsult({ color = "#F9F4F1" }: { color?: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 31s-12-7-12-16a6 6 0 0 1 12-3 6 6 0 0 1 12 3c0 9-12 16-12 16z" />
      <path d="M12 17h3l2-4 3 8 2-4h4" />
    </svg>
  );
}
function IconCheck({ color = "#54132B" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
      <circle cx="8" cy="8" r="7" stroke={color} strokeWidth="0.8" />
      <path d="M5 8l2 2 4-4" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Data ── */
const phaseIcons = [IconEye, IconWave, IconInterlock, IconTarget];

const phasesES = [
  { step: "01", title: "Conciencia",   desc: "Desarrollar autoconciencia radical y anclaje somático. Observar las heridas y patrones desde la presencia, sin juicio." },
  { step: "02", title: "Regulación",   desc: "Dominar el sistema nervioso para navegar el estrés con resiliencia fisiológica. Calmar el cuerpo para recuperar la seguridad interna." },
  { step: "03", title: "Integración",  desc: "Traducir las percepciones en hábitos diarios y arquitectura conductual. Unificar las partes fragmentadas de tu historia." },
  { step: "04", title: "Propósito",    desc: "Vivir con intencionalidad, claridad de visión e impacto. Desde tu verdad más profunda hacia tu expresión más auténtica." },
];
const phasesEN = [
  { step: "01", title: "Consciousness", desc: "Develop radical self-awareness and somatic grounding. Observe wounds and patterns from presence, without judgment." },
  { step: "02", title: "Regulation",    desc: "Master the nervous system to navigate stress with physiological resilience. Calm the body to recover inner safety." },
  { step: "03", title: "Integration",   desc: "Translate insights into daily habits and behavioral architecture. Unify the fragmented parts of your story." },
  { step: "04", title: "Purpose",       desc: "Live with intentionality, clarity of vision and impact. From your deepest truth toward your most authentic expression." },
];

const statsES = [
  { num: "4",   label: "Fases" },
  { num: "3",   label: "Programas" },
  { num: "10+", label: "Años de Liset" },
  { num: "∞",   label: "Acompañamiento" },
];
const statsEN = [
  { num: "4",   label: "Phases" },
  { num: "3",   label: "Programs" },
  { num: "10+", label: "Years of Liset" },
  { num: "∞",   label: "Support" },
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

/* ── Booking copy ── */
const bookingES = {
  eyebrow: "Agendar",
  title: "Dos caminos",
  titleItalic: "para empezar.",
  subtitle: "Elige el que mejor se adapte a tu momento.",
  cardA: {
    badge: "GRATIS · 20 MIN",
    title: "Llamada con la asistente",
    desc: "Conversa con la asistente de Liset para entender cómo AuténticaMente puede acompañar tu proceso. Sin compromiso y sin costo.",
    priceBig: "$0",
    priceLabel: "Sin costo · 20 minutos",
    cta: "Agendar llamada gratis",
    features: ["Sin tarjeta", "20 minutos", "Orientación personalizada", "Sin compromiso"],
  },
  cardB: {
    badge: "CLÍNICO · 60 MIN",
    title: "Consulta con Dra. Valencia",
    desc: "Sesión individual de acompañamiento clínico con la Dra. Liset Valencia, psicóloga clínica.",
    priceBig: LISET_CONSULT_PRICE,
    priceLabel: "por sesión · 60 minutos",
    cta: "Agendar consulta",
    features: ["Psicoterapia individual", "60 minutos", "Cancelación hasta 24h antes", "Pago seguro online"],
  },
  trustLine: "¿No estás lista aún? Haz el test emocional primero",
};
const bookingEN = {
  eyebrow: "Book",
  title: "Two paths",
  titleItalic: "to begin.",
  subtitle: "Choose the one that best fits your moment.",
  cardA: {
    badge: "FREE · 20 MIN",
    title: "Call with the assistant",
    desc: "Talk to Liset's assistant to understand how AuténticaMente can support your process. No commitment and no cost.",
    priceBig: "$0",
    priceLabel: "No cost · 20 minutes",
    cta: "Book free call",
    features: ["No card required", "20 minutes", "Personalized guidance", "No commitment"],
  },
  cardB: {
    badge: "CLINICAL · 60 MIN",
    title: "Session with Dr. Valencia",
    desc: "Individual clinical support session with Dr. Liset Valencia, clinical psychologist.",
    priceBig: LISET_CONSULT_PRICE,
    priceLabel: "per session · 60 minutes",
    cta: "Book session",
    features: ["Individual psychotherapy", "60 minutes", "Cancel up to 24h before", "Secure online payment"],
  },
  trustLine: "Not ready yet? Take the emotional test first",
};

/* ══════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════ */
export default function MetodoPage() {
  const { lang } = useLang();
  const phases   = lang === "es" ? phasesES   : phasesEN;
  const stats    = lang === "es" ? statsES    : statsEN;
  const programs = lang === "es" ? programsES : programsEN;
  const booking  = lang === "es" ? bookingES  : bookingEN;

  return (
    <div style={{ backgroundColor: "#F9F4F1", color: "#0A0A0A" }}>

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#000000" }}>
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 30%, rgba(84,19,43,0.35) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-8 text-center" style={{ paddingTop: "clamp(100px,14vw,160px)", paddingBottom: "clamp(80px,12vw,140px)" }}>

          <p className="font-body font-semibold uppercase tracking-[0.35em] mb-5" style={{ fontSize: "10px", color: "rgba(122,32,64,0.8)" }}>
            {lang === "es" ? "Metodología" : "Methodology"}
          </p>

          <h1
            className="font-display"
            style={{
              fontSize: "clamp(44px, 7vw, 92px)",
              fontWeight: 300,
              lineHeight: 1.04,
              letterSpacing: "-0.025em",
              color: "#F9F4F1",
            }}
          >
            {lang === "es" ? "El Método" : "The Method"}
            <br />
            <span className="italic" style={{ color: "#7A2040" }}>
              AuténticaMente
            </span>
          </h1>

          <p className="font-body leading-relaxed mx-auto mt-7" style={{ fontSize: "clamp(15px, 1.4vw, 18px)", color: "rgba(249,244,241,0.5)", maxWidth: "560px" }}>
            {lang === "es"
              ? "Un método integral que une psicología clínica, regulación del sistema nervioso y conciencia espiritual para acompañarte desde tu verdad interior."
              : "An integral method that unites clinical psychology, nervous system regulation and spiritual awareness to accompany you from your inner truth."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a
              href="#programas"
              className="font-body font-semibold text-sm tracking-[0.04em] inline-flex items-center gap-2 transition-all duration-300"
              style={{ padding: "16px 40px", backgroundColor: "#F9F4F1", color: "#0A0A0A", borderRadius: "100px" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
            >
              {lang === "es" ? "Conocer los programas" : "Explore programs"}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.5 3L9.5 7L5.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a
              href="#agendar"
              className="font-body text-sm tracking-[0.02em] inline-flex items-center gap-1.5 transition-opacity hover:opacity-70"
              style={{ color: "#7A9FFF", padding: "16px 24px" }}
            >
              {lang === "es" ? "Agendar consulta" : "Book a session"}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════ STATS BAR ═══════════════════ */}
      <div style={{ backgroundColor: "#F4E7E9", borderBottom: "1px solid rgba(146,129,120,0.15)" }}>
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="font-display" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 200, color: "#54132B", lineHeight: 1 }}>{s.num}</p>
              <p className="font-body text-[10px] uppercase tracking-[0.18em] mt-2" style={{ color: "#928178" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════ 4 FASES ═══════════════════ */}
      <section className="px-6" style={{ paddingTop: "clamp(80px,12vw,140px)", paddingBottom: "clamp(80px,12vw,140px)" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16 space-y-4">
            <p className="font-body font-semibold uppercase tracking-[0.35em]" style={{ fontSize: "10px", color: "#54132B" }}>
              {lang === "es" ? "El Marco" : "The Framework"}
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 300, color: "#0A0A0A", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              {lang === "es" ? <>Cuatro fases<br /><span className="italic" style={{ color: "#7A2040" }}>de transformación.</span></> : <>Four phases<br /><span className="italic" style={{ color: "#7A2040" }}>of transformation.</span></>}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {phases.map((p, i) => {
              const PhaseIcon = phaseIcons[i];
              return (
                <div
                  key={p.step}
                  className="relative overflow-hidden"
                  style={{
                    backgroundColor: "#FDFAF8",
                    border: "1px solid rgba(146,129,120,0.15)",
                    borderRadius: "3px",
                    padding: "40px 36px",
                    transition: "box-shadow 0.3s ease, transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(84,19,43,0.08)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, #54132B, rgba(84,19,43,0.1))" }} />

                  <div className="flex items-start justify-between mb-6">
                    <div style={{ color: "#54132B" }}>
                      <PhaseIcon />
                    </div>
                    <span
                      className="font-body text-[9px] font-bold uppercase tracking-[0.18em] px-3 py-1"
                      style={{ backgroundColor: "rgba(84,19,43,0.08)", color: "#54132B", borderRadius: "100px" }}
                    >
                      {p.step}
                    </span>
                  </div>

                  <h3 className="font-display mb-3" style={{ fontSize: "24px", fontWeight: 300, color: "#0A0A0A", letterSpacing: "-0.01em" }}>
                    {p.title}
                  </h3>
                  <p className="font-body text-[13px] leading-[1.75]" style={{ color: "#928178" }}>
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ PROGRAMAS ═══════════════════ */}
      <section id="programas" className="px-6" style={{ paddingTop: "clamp(64px,10vw,120px)", paddingBottom: "clamp(64px,10vw,120px)", backgroundColor: "#F4E7E9" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16 space-y-4">
            <p className="font-body font-semibold uppercase tracking-[0.35em]" style={{ fontSize: "10px", color: "#54132B" }}>
              {lang === "es" ? "Programas" : "Programs"}
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 300, color: "#0A0A0A", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              {lang === "es" ? <>Tres caminos,<br /><span className="italic" style={{ color: "#7A2040" }}>un solo método.</span></> : <>Three paths,<br /><span className="italic" style={{ color: "#7A2040" }}>one method.</span></>}
            </h2>
          </div>

          <div className="space-y-20">
            {programs.map((prog, i) => (
              <div
                key={prog.id}
                id={prog.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div
                  className="relative overflow-hidden group"
                  style={{ aspectRatio: "4/3", borderRadius: "3px", boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
                >
                  <Image
                    src={prog.img}
                    alt={prog.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="font-body font-semibold uppercase tracking-[0.3em]" style={{ fontSize: "10px", color: "#54132B" }}>
                      {prog.label}
                    </p>
                    <h3 className="font-display mt-3" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 300, color: "#0A0A0A", letterSpacing: "-0.01em" }}>
                      {prog.title}
                    </h3>
                    <div className="flex gap-4 mt-4">
                      <span className="font-body text-[11px] uppercase tracking-[0.14em]" style={{ color: "#928178" }}>{prog.duration}</span>
                      <span style={{ color: "#928178" }}>·</span>
                      <span className="font-body text-[11px] uppercase tracking-[0.14em]" style={{ color: "#928178" }}>{prog.format}</span>
                    </div>
                  </div>
                  <p className="font-body leading-relaxed" style={{ fontSize: "15px", color: "rgba(10,10,10,0.72)" }}>
                    {prog.desc}
                  </p>
                  <ul className="space-y-3">
                    {prog.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 font-body text-[13px]" style={{ color: "#0A0A0A" }}>
                        <IconCheck />
                        <span style={{ color: "rgba(10,10,10,0.7)" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#agendar"
                    className="inline-flex items-center gap-2 font-body font-semibold text-[13px] tracking-[0.04em] transition-all duration-300"
                    style={{ padding: "14px 32px", backgroundColor: "#54132B", color: "#F9F4F1", borderRadius: "100px" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                  >
                    {lang === "es" ? "Solicitar información" : "Request information"}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ BOOKING ═══════════════════ */}
      <section id="agendar" className="relative overflow-hidden" style={{ backgroundColor: "#000000" }}>
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 60% at 50% 40%, rgba(122,32,64,0.2) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(84,19,43,0.15) 0%, transparent 60%)" }} />

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-8" style={{ paddingTop: "clamp(80px,12vw,140px)", paddingBottom: "clamp(80px,12vw,140px)" }}>

          {/* Header */}
          <div className="text-center mb-14 space-y-5">
            <p className="font-body font-semibold uppercase tracking-[0.35em]" style={{ fontSize: "10px", color: "rgba(122,32,64,0.8)" }}>
              {booking.eyebrow}
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(32px, 5vw, 64px)",
                fontWeight: 300,
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                color: "#F9F4F1",
              }}
            >
              <span className="italic" style={{ color: "#7A2040" }}>{booking.title}</span> {booking.titleItalic}
            </h2>
            <p className="font-body leading-relaxed mx-auto" style={{ fontSize: "clamp(14px, 1.3vw, 17px)", color: "rgba(249,244,241,0.5)", maxWidth: "480px" }}>
              {booking.subtitle}
            </p>
          </div>

          {/* Two booking cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">

            {/* ── Card A — Free assistant call ── */}
            <div
              className="relative overflow-hidden flex flex-col"
              style={{
                backgroundColor: "#FDFAF8",
                border: "1px solid rgba(146,129,120,0.2)",
                borderRadius: "4px",
                padding: "40px 36px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, #54132B, rgba(84,19,43,0.1))" }} />

              {/* Badge */}
              <div className="flex items-center justify-between mb-6">
                <div style={{ color: "#54132B" }}>
                  <IconChatBubble />
                </div>
                <span
                  className="font-body text-[9px] font-bold uppercase tracking-[0.14em] px-3 py-1.5"
                  style={{ backgroundColor: "rgba(84,19,43,0.08)", color: "#54132B", borderRadius: "100px" }}
                >
                  {booking.cardA.badge}
                </span>
              </div>

              {/* Title + desc */}
              <h3 className="font-display mb-3" style={{ fontSize: "26px", fontWeight: 300, color: "#0A0A0A", letterSpacing: "-0.01em" }}>
                {booking.cardA.title}
              </h3>
              <p className="font-body text-[13px] leading-[1.7] mb-8" style={{ color: "#928178" }}>
                {booking.cardA.desc}
              </p>

              {/* Price block */}
              <div className="mb-8 pb-8 border-b" style={{ borderColor: "rgba(146,129,120,0.15)" }}>
                <p className="font-display" style={{ fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 200, color: "#0A0A0A", lineHeight: 1, letterSpacing: "-0.03em" }}>
                  {booking.cardA.priceBig}
                </p>
                <p className="font-body text-[11px] uppercase tracking-[0.14em] mt-2" style={{ color: "#928178" }}>
                  {booking.cardA.priceLabel}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {booking.cardA.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 font-body text-[13px]">
                    <IconCheck />
                    <span style={{ color: "rgba(10,10,10,0.7)" }}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={ASSISTANT_CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body font-semibold text-[13px] tracking-[0.04em] inline-flex items-center justify-center gap-2 transition-all duration-300"
                style={{ padding: "16px 32px", backgroundColor: "#54132B", color: "#F9F4F1", borderRadius: "100px", width: "100%" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.02)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
              >
                {booking.cardA.cta}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.5 3L9.5 7L5.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>

            {/* ── Card B — Paid Liset consult ── */}
            <div
              className="relative overflow-hidden flex flex-col"
              style={{
                background: "linear-gradient(135deg, #54132B 0%, #2A0915 50%, #0A0A0A 100%)",
                borderRadius: "4px",
                padding: "40px 36px",
                boxShadow: "0 20px 60px rgba(84,19,43,0.4), 0 8px 20px rgba(0,0,0,0.3)",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              {/* Glossy overlay */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)", borderRadius: "4px" }} />

              {/* Decorative circles */}
              <div className="absolute pointer-events-none" style={{ top: 0, right: 0, opacity: 0.05 }}>
                <svg width="260" height="200" viewBox="0 0 260 200" fill="none">
                  <circle cx="260" cy="0" r="140" stroke="#F9F4F1" strokeWidth="0.5" />
                  <circle cx="260" cy="0" r="90" stroke="#F9F4F1" strokeWidth="0.5" />
                  <circle cx="260" cy="0" r="40" stroke="#F9F4F1" strokeWidth="0.5" />
                </svg>
              </div>

              {/* Badge */}
              <div className="relative flex items-center justify-between mb-6">
                <div style={{ color: "#F9F4F1" }}>
                  <IconConsult color="#F9F4F1" />
                </div>
                <span
                  className="font-body text-[9px] font-bold uppercase tracking-[0.14em] px-3 py-1.5"
                  style={{ backgroundColor: "rgba(249,244,241,0.12)", color: "#F9F4F1", borderRadius: "100px" }}
                >
                  {booking.cardB.badge}
                </span>
              </div>

              {/* Title + desc */}
              <h3 className="relative font-display mb-3" style={{ fontSize: "26px", fontWeight: 300, color: "#F9F4F1", letterSpacing: "-0.01em" }}>
                {booking.cardB.title}
              </h3>
              <p className="relative font-body text-[13px] leading-[1.7] mb-8" style={{ color: "rgba(249,244,241,0.55)" }}>
                {booking.cardB.desc}
              </p>

              {/* Price block */}
              <div className="relative mb-8 pb-8 border-b" style={{ borderColor: "rgba(249,244,241,0.12)" }}>
                <p className="font-display" style={{ fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 200, color: "#F9F4F1", lineHeight: 1, letterSpacing: "-0.03em" }}>
                  {booking.cardB.priceBig}
                </p>
                <p className="font-body text-[11px] uppercase tracking-[0.14em] mt-2" style={{ color: "rgba(249,244,241,0.4)" }}>
                  {booking.cardB.priceLabel}
                </p>
              </div>

              {/* Features */}
              <ul className="relative space-y-3 mb-8 flex-1">
                {booking.cardB.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 font-body text-[13px]">
                    <IconCheck color="#F9F4F1" />
                    <span style={{ color: "rgba(249,244,241,0.7)" }}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={LISET_CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative font-body font-semibold text-[13px] tracking-[0.04em] inline-flex items-center justify-center gap-2 transition-all duration-300"
                style={{ padding: "16px 32px", backgroundColor: "#F9F4F1", color: "#0A0A0A", borderRadius: "100px", width: "100%" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.02)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
              >
                {booking.cardB.cta}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.5 3L9.5 7L5.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>
          </div>

          {/* Trust line */}
          <div className="text-center">
            <Link
              href="/test"
              className="inline-flex items-center gap-2 font-body text-[12px] transition-opacity hover:opacity-80"
              style={{ color: "rgba(249,244,241,0.4)" }}
            >
              {booking.trustLine}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FOOTER QUOTE ═══════════════════ */}
      <section className="px-6 text-center" style={{ paddingTop: "clamp(60px,8vw,100px)", paddingBottom: "clamp(60px,8vw,100px)" }}>
        <div className="max-w-xl mx-auto space-y-6">
          <p className="font-display italic" style={{ fontSize: "clamp(20px, 2.5vw, 30px)", fontWeight: 300, color: "#928178" }}>
            {lang === "es"
              ? "\u201CEl proceso es tuyo. Nosotras ponemos el marco.\u201D"
              : "\u201CThe process is yours. We provide the framework.\u201D"}
          </p>
          <Link
            href="/test"
            className="inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.2em] transition-opacity hover:opacity-60"
            style={{ color: "#54132B" }}
          >
            {lang === "es" ? "Hacer el test emocional" : "Take the emotional test"}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
