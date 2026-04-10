"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/app/providers/LangProvider";

/* ── GeoLayer grid ─────────────────────────── */
function GeoGrid({ opacity = 0.07 }: { opacity?: number }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      style={{ opacity }}
    >
      {Array.from({ length: 16 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={`${(i / 15) * 100}%`} y1="0"
          x2={`${(i / 15) * 100}%`} y2="100%"
          stroke="#928178" strokeWidth="0.6"
        />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1="0" y1={`${(i / 9) * 100}%`}
          x2="100%" y2={`${(i / 9) * 100}%`}
          stroke="#928178" strokeWidth="0.6"
        />
      ))}
    </svg>
  );
}

/* ── Eyebrow label ─────────────────────────── */
function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className="text-[10px] uppercase tracking-[0.35em] font-semibold font-body"
      style={{ color: light ? "rgba(249,244,241,0.45)" : "#54132B" }}
    >
      {children}
    </p>
  );
}

/* ── Accordion FAQ item ────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b cursor-pointer select-none"
      style={{ borderColor: "rgba(146,129,120,0.2)" }}
      onClick={() => setOpen((v) => !v)}
    >
      <div className="flex items-center justify-between py-6 gap-4">
        <h3
          className="font-body text-[15px] leading-snug"
          style={{ color: "#000000", fontWeight: open ? 600 : 400 }}
        >
          {q}
        </h3>
        <span
          className="flex-shrink-0 text-lg leading-none transition-transform duration-300"
          style={{
            color: "#54132B",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            fontWeight: 300,
          }}
        >
          +
        </span>
      </div>
      {open && (
        <p
          className="font-body text-sm leading-relaxed pb-6"
          style={{ color: "#928178" }}
        >
          {a}
        </p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const previewES = {
  day:     "Lunes · 7:00am",
  title:   "El peso de las expectativas",
  p1:      "Cuántas veces has cargado el peso de lo que otros esperaban de ti, como si su decepción fuera tu responsabilidad. Hoy quiero preguntarte: ¿quién serías si no tuvieras que cumplir ninguna expectativa? No la de tu madre. No la de tu pareja. No la tuya de hace diez años.",
  p2:      "El crecimiento real no comienza cuando satisfaces las expectativas. Comienza cuando aprendes a soltarlas con amor.",
  cta:     "Leer completo con membresía →",
};

const previewEN = {
  day:     "Monday · 7:00am",
  title:   "The weight of expectations",
  p1:      "How many times have you carried the weight of what others expected of you, as if their disappointment were your responsibility. Today I want to ask you: who would you be if you had no expectations to meet? Not your mother's. Not your partner's. Not your own from ten years ago.",
  p2:      "Real growth doesn't begin when you satisfy expectations. It begins when you learn to release them with love.",
  cta:     "Read in full with membership →",
};

const pillarsES = [
  { n: "01", title: "2 veces por semana",          desc: "Llegan los lunes y los jueves. Para comenzar la semana y el fin de semana con presencia." },
  { n: "02", title: "Escritos por Liset Valencia",  desc: "Cada devocional es escrito con intención. No son mensajes genéricos — son palabras pensadas para ti." },
  { n: "03", title: "Temáticas que importan",       desc: "Identidad, emociones, vínculos, propósito, autocompasión, sanación. Siempre desde la profundidad." },
  { n: "04", title: "Directo a tu correo",          desc: "Sin plataformas extras. Sin apps. Todo llega donde ya estás, cuando lo necesitas." },
];

const pillarsEN = [
  { n: "01", title: "2 times per week",            desc: "They arrive on Mondays and Thursdays. To start the week and weekend with presence." },
  { n: "02", title: "Written by Liset Valencia",   desc: "Each devotional is written with intention. Not generic messages — words thought out for you." },
  { n: "03", title: "Topics that matter",           desc: "Identity, emotions, bonds, purpose, self-compassion, healing. Always from depth." },
  { n: "04", title: "Straight to your inbox",      desc: "No extra platforms. No apps. Everything arrives where you already are, when you need it." },
];

const faqES = [
  { q: "¿Con qué frecuencia llegan los devocionales?",  a: "Dos veces por semana — los lunes y los jueves." },
  { q: "¿Puedo cancelar cuando quiera?",                 a: "Sí. Cancelas cuando quieras sin penalidad. Sigues recibiendo hasta el final del período pagado." },
  { q: "¿Quedan archivados en algún lugar?",             a: "Sí. Los miembros del Círculo Vuelve a Ti tienen acceso al archivo completo desde su dashboard." },
  { q: "¿Son los mismos que la membresía incluye?",      a: "Sí. Los devocionales están incluidos en la membresía del Círculo. Si ya eres miembro, no necesitas suscribirte por separado." },
  { q: "¿En qué idioma llegan?",                         a: "En español. El contenido es escrito originalmente por Liset Valencia en español." },
];

const faqEN = [
  { q: "How often do the devotionals arrive?",          a: "Twice a week — on Mondays and Thursdays." },
  { q: "Can I cancel whenever I want?",                  a: "Yes. Cancel anytime without penalty. You keep receiving until the end of the paid period." },
  { q: "Are they archived somewhere?",                   a: "Yes. Return to Yourself Circle members have access to the full archive from their dashboard." },
  { q: "Are they the same ones included in the membership?", a: "Yes. Devotionals are included in the Circle membership. If you're already a member, you don't need to subscribe separately." },
  { q: "What language are they in?",                     a: "In Spanish. Content is written originally by Liset Valencia in Spanish." },
];

/* ══════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════ */
export default function DevocionalesPage() {
  const { lang } = useLang();
  const es       = lang === "es";
  const preview  = es ? previewES  : previewEN;
  const pillars  = es ? pillarsES  : pillarsEN;
  const faq      = es ? faqES      : faqEN;

  const [email, setEmail]         = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 800);
  };

  return (
    <div style={{ backgroundColor: "#F9F4F1", color: "#000000" }}>

      {/* ══ 1. HERO ════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "#0A0A0A", minHeight: "96vh" }}
      >
        <GeoGrid opacity={0.09} />

        {/* Radial glow center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(84,19,43,0.18) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-[860px] mx-auto px-6 flex flex-col items-center justify-center text-center min-h-[96vh] gap-10">

          {/* Top pill */}
          <div
            className="flex items-center gap-3 px-5 py-2"
            style={{
              border: "1px solid rgba(146,129,120,0.25)",
              backgroundColor: "rgba(249,244,241,0.03)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#54132B" }} />
            <span
              className="text-[10px] uppercase tracking-[0.28em] font-body"
              style={{ color: "rgba(249,244,241,0.45)" }}
            >
              {es ? "Devocionales semanales · Liset Valencia" : "Weekly devotionals · Liset Valencia"}
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1
              className="font-display leading-[1.05]"
              style={{
                fontSize:    "clamp(50px, 8vw, 100px)",
                fontWeight:  300,
                color:       "#F9F4F1",
                letterSpacing: "-0.02em",
              }}
            >
              {es ? "Palabras para" : "Words to"}
            </h1>
            <h1
              className="font-display italic leading-[1.05]"
              style={{
                fontSize:    "clamp(50px, 8vw, 100px)",
                fontWeight:  300,
                color:       "#54132B",
                letterSpacing: "-0.02em",
              }}
            >
              {es ? "comenzar bien el día." : "start your day right."}
            </h1>
          </div>

          <p
            className="font-body font-light max-w-[480px] leading-[1.8]"
            style={{ fontSize: "clamp(15px, 1.4vw, 17px)", color: "rgba(249,244,241,0.5)" }}
          >
            {es
              ? "Dos veces por semana, directamente en tu correo. Escritos por la Dra. Liset Valencia para acompañarte en tu proceso."
              : "Twice a week, directly in your inbox. Written by Dr. Liset Valencia to accompany you in your process."}
          </p>

          {/* Preview quote card */}
          <div
            className="w-full max-w-[520px] text-left p-8 space-y-4"
            style={{
              backgroundColor: "rgba(249,244,241,0.04)",
              border:          "1px solid rgba(146,129,120,0.18)",
              borderLeft:      "2px solid #54132B",
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="text-[9px] uppercase tracking-[0.28em] font-body"
                style={{ color: "rgba(84,19,43,0.7)" }}
              >
                {es ? "Vista previa del último devocional" : "Latest devotional preview"}
              </span>
            </div>
            <p
              className="font-display italic text-lg font-light leading-relaxed"
              style={{ color: "rgba(249,244,241,0.75)" }}
            >
              {es
                ? "\"Cuántas veces has cargado el peso de lo que otros esperaban de ti, como si su decepción fuera tu responsabilidad...\""
                : "\"How many times have you carried the weight of what others expected of you, as if their disappointment were your responsibility...\""}
            </p>
            <p
              className="text-[10px] font-body uppercase tracking-[0.2em]"
              style={{ color: "rgba(249,244,241,0.25)" }}
            >
              {es ? "— Dra. Liset Valencia" : "— Dr. Liset Valencia"}
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#suscribirse"
              className="inline-flex items-center gap-2 px-8 py-4 text-[12px] uppercase tracking-[0.12em] font-body font-medium transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#54132B", color: "#F9F4F1" }}
            >
              {es ? "Suscribirme ahora" : "Subscribe now"}
              <span>↓</span>
            </a>
            <Link
              href="/membresia"
              className="text-[11px] uppercase tracking-[0.12em] font-body transition-opacity hover:opacity-60"
              style={{ color: "rgba(249,244,241,0.4)", textDecoration: "none" }}
            >
              {es ? "Ver membresía completa →" : "View full membership →"}
            </Link>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <div className="w-px h-10" style={{ backgroundColor: "rgba(146,129,120,0.25)" }} />
          </div>
        </div>
      </section>

      {/* ══ 2. PILLARS ═════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: "#F9F4F1" }}>
        <div className="max-w-[1100px] mx-auto space-y-14">

          <div className="grid lg:grid-cols-2 gap-6 items-end">
            <div className="space-y-4">
              <Eyebrow>{es ? "Qué son" : "What they are"}</Eyebrow>
              <div className="w-8 h-px" style={{ backgroundColor: "#54132B", opacity: 0.4 }} />
              <h2
                className="font-display"
                style={{
                  fontSize:    "clamp(28px, 3.5vw, 44px)",
                  fontWeight:  400,
                  color:       "#000000",
                  lineHeight:  1.15,
                  letterSpacing: "0.01em",
                }}
              >
                {es ? "Más que un correo" : "More than an email"}
              </h2>
            </div>
            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "#928178", maxWidth: "400px" }}
            >
              {es
                ? "Un espacio de reflexión que llega a ti. Cada devocional está pensado para detenerte un momento y conectarte contigo misma."
                : "A space for reflection that comes to you. Each devotional is designed to pause you for a moment and reconnect you with yourself."}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "rgba(146,129,120,0.15)" }}>
            {pillars.map((p) => (
              <div
                key={p.n}
                className="p-8 space-y-5 flex flex-col"
                style={{ backgroundColor: "#F9F4F1" }}
              >
                <span
                  className="font-body text-[11px] uppercase tracking-[0.2em]"
                  style={{ color: "rgba(146,129,120,0.5)" }}
                >
                  {p.n}
                </span>
                <div className="w-5 h-px" style={{ backgroundColor: "#54132B", opacity: 0.5 }} />
                <h3
                  className="font-display text-lg"
                  style={{ color: "#000000", fontWeight: 400, lineHeight: 1.2 }}
                >
                  {p.title}
                </h3>
                <p
                  className="font-body text-sm leading-relaxed mt-auto"
                  style={{ color: "#928178" }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. PREVIEW DEVOCIONAL ══════════════════════════════ */}
      <section
        className="py-24 px-6"
        style={{ backgroundColor: "#F4E7E9" }}
      >
        <div className="max-w-[720px] mx-auto">

          <div className="space-y-8">
            <div className="space-y-3">
              <Eyebrow>{es ? "Así se sienten" : "How they feel"}</Eyebrow>
              <div className="w-8 h-px" style={{ backgroundColor: "#54132B", opacity: 0.4 }} />
            </div>

            {/* Email card */}
            <div
              className="relative overflow-hidden"
              style={{
                backgroundColor: "#FFFFFF",
                border:          "1px solid rgba(146,129,120,0.15)",
                boxShadow:       "0 4px 40px rgba(0,0,0,0.06)",
              }}
            >
              {/* Email header bar */}
              <div
                className="px-8 py-5 border-b flex items-center gap-4"
                style={{ borderColor: "rgba(146,129,120,0.12)", backgroundColor: "#FAFAF9" }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-body font-bold"
                  style={{ backgroundColor: "#54132B", color: "#F4E7E9" }}
                >
                  LV
                </div>
                <div>
                  <p className="font-body text-[12px] font-semibold" style={{ color: "#000000" }}>
                    Dra. Liset Valencia
                  </p>
                  <p className="font-body text-[10px]" style={{ color: "#928178" }}>
                    {es ? "Devocional · " : "Devotional · "}{preview.day}
                  </p>
                </div>
              </div>

              {/* Email body */}
              <div className="px-8 py-10 space-y-6">
                <h3
                  className="font-display"
                  style={{ fontSize: "22px", fontWeight: 400, color: "#000000" }}
                >
                  {preview.title}
                </h3>
                <p
                  className="font-body text-[15px] leading-[1.85]"
                  style={{ color: "rgba(0,0,0,0.72)" }}
                >
                  {preview.p1}
                </p>
                {/* Fade blur overlay */}
                <div
                  className="relative"
                  style={{
                    height:          "80px",
                    marginTop:       "-20px",
                    background:      "linear-gradient(to bottom, transparent, #FFFFFF)",
                    pointerEvents:   "none",
                  }}
                />
              </div>

              {/* CTA footer */}
              <div
                className="px-8 py-5 border-t flex items-center justify-between"
                style={{ borderColor: "rgba(146,129,120,0.12)", backgroundColor: "#FAFAF9" }}
              >
                <p className="font-body text-[11px]" style={{ color: "#928178" }}>
                  {es ? "Este devocional continúa para miembros..." : "This devotional continues for members..."}
                </p>
                <Link
                  href="/membresia"
                  className="text-[11px] font-body font-semibold uppercase tracking-[0.14em] transition-opacity hover:opacity-70"
                  style={{ color: "#54132B", textDecoration: "none" }}
                >
                  {preview.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 4. SUSCRIPCIÓN ═════════════════════════════════════ */}
      <section
        id="suscribirse"
        className="relative overflow-hidden py-28 px-6"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        <GeoGrid opacity={0.06} />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(84,19,43,0.2) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-[560px] mx-auto space-y-10">

          {/* Header */}
          <div className="space-y-5 text-center">
            <Eyebrow light>{es ? "Suscríbete" : "Subscribe"}</Eyebrow>
            <h2
              className="font-display"
              style={{
                fontSize:    "clamp(30px, 4vw, 48px)",
                fontWeight:  300,
                color:       "#F9F4F1",
                lineHeight:  1.15,
                letterSpacing: "0.01em",
              }}
            >
              {es
                ? "Recibe los devocionales\ndirectamente en tu correo."
                : "Receive devotionals\ndirectly in your inbox."}
            </h2>
            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "rgba(249,244,241,0.4)" }}
            >
              {es
                ? "Los devocionales están incluidos en la membresía del Círculo Vuelve a Ti. Si ya eres miembro, no necesitas suscribirte aquí."
                : "Devotionals are included in the Return to Yourself Circle membership. If you're already a member, you don't need to subscribe here."}
              {" "}
              <Link href="/membresia" className="underline" style={{ color: "#54132B" }}>
                {es ? "Ver membresía" : "View membership"}
              </Link>
            </p>
          </div>

          {/* Plan card */}
          <div
            className="flex items-center justify-between px-6 py-5 border"
            style={{
              borderColor:     "rgba(84,19,43,0.4)",
              backgroundColor: "rgba(84,19,43,0.06)",
            }}
          >
            <div className="space-y-1">
              <p className="font-body text-sm font-semibold" style={{ color: "#F9F4F1" }}>
                {es ? "Devocionales Semanales" : "Weekly Devotionals"}
              </p>
              <p className="font-body text-[11px]" style={{ color: "rgba(249,244,241,0.4)" }}>
                {es ? "2 veces por semana · Cancela cuando quieras" : "2×/week · Cancel anytime"}
              </p>
            </div>
            <div className="text-right">
              <p
                className="font-display font-light"
                style={{ fontSize: "26px", color: "#F9F4F1", lineHeight: 1 }}
              >
                $9
              </p>
              <p className="font-body text-[10px]" style={{ color: "rgba(249,244,241,0.35)" }}>
                {es ? "/mes" : "/month"}
              </p>
            </div>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="py-10 text-center space-y-3">
              <p
                className="font-display italic text-2xl font-light"
                style={{ color: "#F9F4F1" }}
              >
                {es ? "Bienvenida." : "Welcome."}
              </p>
              <p className="font-body text-sm" style={{ color: "rgba(249,244,241,0.5)" }}>
                {es
                  ? "Tu primer devocional llega el próximo lunes. Revisa tu correo."
                  : "Your first devotional arrives next Monday. Check your inbox."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex gap-0">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={es ? "tu@correo.com" : "your@email.com"}
                  className="flex-1 px-5 py-4 text-sm font-body border-y border-l outline-none"
                  style={{
                    backgroundColor: "rgba(249,244,241,0.05)",
                    borderColor:     "rgba(249,244,241,0.15)",
                    color:           "#F9F4F1",
                  }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-4 text-[11px] font-body font-semibold uppercase tracking-[0.12em] transition-opacity hover:opacity-80 flex-shrink-0"
                  style={{
                    backgroundColor: loading ? "rgba(84,19,43,0.7)" : "#54132B",
                    color:           "#F9F4F1",
                    border:          "none",
                    cursor:          loading ? "wait" : "pointer",
                  }}
                >
                  {loading
                    ? "..."
                    : (es ? "Suscribirme" : "Subscribe")}
                </button>
              </div>
              <p className="text-[10px] font-body text-center" style={{ color: "rgba(249,244,241,0.25)" }}>
                {es
                  ? "Pago seguro con Stripe · Sin compromisos mínimos"
                  : "Secure payment with Stripe · No minimum commitments"}
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ══ 5. FAQ ═════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: "#F9F4F1" }}>
        <div className="max-w-[720px] mx-auto space-y-12">

          <div className="space-y-4">
            <Eyebrow>{es ? "Preguntas frecuentes" : "FAQ"}</Eyebrow>
            <div className="w-8 h-px" style={{ backgroundColor: "#54132B", opacity: 0.4 }} />
            <h2
              className="font-display"
              style={{
                fontSize:  "clamp(24px, 3vw, 36px)",
                fontWeight: 400,
                color:     "#000000",
              }}
            >
              {es ? "Lo que más preguntan" : "Most asked questions"}
            </h2>
          </div>

          <div>
            {faq.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            className="flex items-center justify-between p-8"
            style={{
              backgroundColor: "#F4E7E9",
              border:          "1px solid rgba(146,129,120,0.15)",
            }}
          >
            <div className="space-y-1">
              <p className="font-display text-lg font-light" style={{ color: "#000000" }}>
                {es ? "¿Tienes más preguntas?" : "More questions?"}
              </p>
              <p className="font-body text-sm" style={{ color: "#928178" }}>
                {es ? "Estamos para ayudarte." : "We're here to help."}
              </p>
            </div>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-6 py-3 text-[11px] font-body font-semibold uppercase tracking-[0.12em] transition-opacity hover:opacity-80 flex-shrink-0"
              style={{ backgroundColor: "#54132B", color: "#F9F4F1" }}
            >
              {es ? "Contáctanos" : "Contact us"}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
