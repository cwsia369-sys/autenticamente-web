"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/app/providers/LangProvider";

function GeoBg({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute pointer-events-none select-none ${className}`}
      viewBox="0 0 600 600" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
    >
      <circle cx="300" cy="300" r="280" stroke="#928178" strokeWidth="0.8" opacity="0.12" />
      <circle cx="300" cy="300" r="200" stroke="#928178" strokeWidth="0.8" opacity="0.1"  />
      <circle cx="300" cy="300" r="120" stroke="#928178" strokeWidth="0.8" opacity="0.1"  />
      <line x1="20"  y1="300" x2="580" y2="300" stroke="#928178" strokeWidth="0.5" opacity="0.08" />
      <line x1="300" y1="20"  x2="300" y2="580" stroke="#928178" strokeWidth="0.5" opacity="0.08" />
    </svg>
  );
}

function Divider() {
  return <hr className="border-none h-px my-0" style={{ backgroundColor: "rgba(146,129,120,0.3)" }} />;
}

function EyebrowLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className="text-xs uppercase tracking-[0.3em] font-body font-semibold"
      style={{ color: light ? "rgba(249,244,241,0.55)" : "#54132B" }}
    >
      {children}
    </p>
  );
}

const previewES = {
  title:   "Lunes · El peso de las expectativas",
  excerpt: "Cuántas veces has cargado el peso de lo que otros esperaban de ti, como si su decepción fuera tu responsabilidad. Hoy quiero preguntarte: ¿quién serías si no tuvieras que cumplir ninguna expectativa? No la de tu madre. No la de tu pareja. No la tuya de hace diez años.\n\nEl crecimiento real no comienza cuando satisfaces las expectativas. Comienza cuando aprendes a soltarlas con amor.",
  cta:     "Leer completo con membresía →",
};

const previewEN = {
  title:   "Monday · The weight of expectations",
  excerpt: "How many times have you carried the weight of what others expected of you, as if their disappointment were your responsibility. Today I want to ask you: who would you be if you had no expectations to meet? Not your mother's. Not your partner's. Not your own from ten years ago.\n\nReal growth doesn't begin when you satisfy expectations. It begins when you learn to release them with love.",
  cta:     "Read in full with membership →",
};

const featuresES = [
  { icon: "📅", title: "2 veces por semana",         desc: "Llegan los lunes y los jueves, para comenzar la semana y el fin de semana con presencia." },
  { icon: "📝", title: "Escritos por Liset Valencia", desc: "Cada devocional es escrito con intención. No son mensajes genéricos — son palabras pensadas para ti." },
  { icon: "💛", title: "Temáticas que importan",      desc: "Identidad, emociones, vínculos, propósito, autocompasión, sanación. Siempre desde la profundidad." },
  { icon: "📧", title: "Directo a tu correo",         desc: "Sin plataformas extras. Sin apps que descargar. Todo llega donde ya estás." },
];

const featuresEN = [
  { icon: "📅", title: "2 times per week",          desc: "They arrive on Mondays and Thursdays, to start the week and weekend with presence." },
  { icon: "📝", title: "Written by Liset Valencia",  desc: "Each devotional is written with intention. Not generic messages — words thought out for you." },
  { icon: "💛", title: "Topics that matter",          desc: "Identity, emotions, bonds, purpose, self-compassion, healing. Always from depth." },
  { icon: "📧", title: "Straight to your inbox",     desc: "No extra platforms. No apps to download. Everything arrives where you already are." },
];

const faqES = [
  { q: "¿Con qué frecuencia llegan los devocionales?", a: "Dos veces por semana — los lunes y los jueves." },
  { q: "¿Puedo cancelar cuando quiera?",                a: "Sí. Cancelas cuando quieras sin penalidad. Sigues recibiendo hasta el final del período pagado." },
  { q: "¿Quedan archivados en algún lugar?",            a: "Sí. Los miembros del Círculo Vuelve a Ti tienen acceso al archivo completo desde su dashboard." },
  { q: "¿Son los mismos que la membresía incluye?",     a: "Sí. Los devocionales están incluidos en la membresía del Círculo. Si ya eres miembro, no necesitas suscribirte por separado." },
  { q: "¿En qué idioma llegan?",                        a: "En español. El contenido es escrito originalmente por Liset Valencia en español." },
];

const faqEN = [
  { q: "How often do the devotionals arrive?",         a: "Twice a week — on Mondays and Thursdays." },
  { q: "Can I cancel whenever I want?",                 a: "Yes. Cancel anytime without penalty. You keep receiving until the end of the paid period." },
  { q: "Are they archived somewhere?",                  a: "Yes. Return to Yourself Circle members have access to the full archive from their dashboard." },
  { q: "Are they the same ones included in the membership?", a: "Yes. Devotionals are included in the Circle membership. If you're already a member, you don't need to subscribe separately." },
  { q: "What language are they in?",                    a: "In Spanish. Content is written originally by Liset Valencia in Spanish." },
];

export default function DevocionalesPage() {
  const { lang } = useLang();
  const preview  = lang === "es" ? previewES  : previewEN;
  const features = lang === "es" ? featuresES : featuresEN;
  const faq      = lang === "es" ? faqES      : faqEN;

  const [email, setEmail]         = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // TODO: connect to Stripe Checkout for subscription
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 800);
  };

  return (
    <div style={{ backgroundColor: "#F9F4F1", color: "#000000" }}>

      {/* ══════════════════════════════════════ HERO ══ */}
      <section
        className="relative overflow-hidden px-6 pt-28 pb-36"
        style={{ backgroundColor: "#000000" }}
      >
        <GeoBg className="w-[700px] h-[700px] -right-40 -top-40 opacity-25" />
        <GeoBg className="w-[450px] h-[450px] -left-28 bottom-0 opacity-15" />

        <div className="relative z-10 max-w-[860px] mx-auto text-center space-y-8">
          <EyebrowLabel light>
            {lang === "es" ? "Devocionales semanales" : "Weekly devotionals"}
          </EyebrowLabel>
          <h1
            className="font-display leading-tight hero-title"
            style={{
              fontSize:   "clamp(44px, 7vw, 84px)",
              fontWeight: 300,
              color:      "#F9F4F1",
            }}
          >
            {lang === "es" ? "Palabras para" : "Words to"}
            <br />
            <span className="italic" style={{ color: "#54132B" }}>
              {lang === "es" ? "comenzar bien el día." : "start your day right."}
            </span>
          </h1>
          <p
            className="font-body font-light max-w-md mx-auto leading-relaxed"
            style={{ fontSize: "clamp(15px, 1.4vw, 18px)", color: "rgba(249,244,241,0.65)" }}
          >
            {lang === "es"
              ? "Dos veces por semana, directamente en tu correo. Escritos por la Dra. Liset Valencia para acompañarte en tu proceso."
              : "Twice a week, directly in your inbox. Written by Dr. Liset Valencia to accompany you in your process."}
          </p>

          {/* Preview strip */}
          <div
            className="mx-auto max-w-sm px-6 py-4 border-l-2 text-left"
            style={{ borderColor: "rgba(84,19,43,0.5)", backgroundColor: "rgba(249,244,241,0.06)" }}
          >
            <p className="text-[10px] font-body uppercase tracking-[0.2em]" style={{ color: "rgba(84,19,43,0.7)" }}>
              {lang === "es" ? "Vista previa" : "Preview"}
            </p>
            <p className="font-display italic text-base font-light mt-1" style={{ color: "rgba(249,244,241,0.8)" }}>
              {lang === "es"
                ? "\"Cuántas veces has cargado el peso de lo que otros esperaban de ti…\""
                : '"How many times have you carried the weight of what others expected of you…"'}
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ FEATURES ══ */}
      <section className="py-24 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16 space-y-3">
            <EyebrowLabel>
              {lang === "es" ? "Qué son" : "What they are"}
            </EyebrowLabel>
            <h2
              className="font-display tracking-[0.04em]"
              style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 400, color: "#000000" }}
            >
              {lang === "es" ? "MÁS QUE UN CORREO" : "MORE THAN AN EMAIL"}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="pillar-card p-8 space-y-4 border"
                style={{
                  backgroundColor: "#F4E7E9",
                  borderColor:     "rgba(146,129,120,0.2)",
                  borderRadius:    "2px",
                }}
              >
                <span className="text-3xl" aria-hidden="true">{f.icon}</span>
                <h3
                  className="font-body font-semibold text-sm uppercase tracking-[0.1em]"
                  style={{ color: "#000000" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm font-body leading-relaxed" style={{ color: "#928178" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════ PREVIEW DEVOCIONAL ══ */}
      <section className="py-24 px-6" style={{ backgroundColor: "#F4E7E9" }}>
        <div className="max-w-[720px] mx-auto space-y-8">
          <EyebrowLabel>
            {lang === "es" ? "Así se sienten" : "How they feel"}
          </EyebrowLabel>

          <div
            className="border-l-2 pl-8 space-y-5"
            style={{ borderColor: "#54132B" }}
          >
            <p className="text-xs font-body uppercase tracking-[0.2em]" style={{ color: "#54132B" }}>
              {preview.title}
            </p>
            <div className="space-y-4">
              {preview.excerpt.split("\n\n").map((p, i) => (
                <p
                  key={i}
                  className={i === 0 ? "font-body text-base leading-relaxed" : "font-display italic text-lg font-light leading-relaxed"}
                  style={{ color: "#000000", opacity: i === 0 ? 0.78 : 0.9 }}
                >
                  {p}
                </p>
              ))}
            </div>
            {/* Fade out + CTA */}
            <div
              className="relative pt-4"
              style={{
                WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                maskImage:       "linear-gradient(to bottom, black 0%, transparent 100%)",
                height:          "60px",
              }}
            />
          </div>

          <Link
            href="/membresia"
            className="inline-block text-xs font-body font-semibold uppercase tracking-[0.2em] border-b pb-0.5"
            style={{ color: "#54132B", borderColor: "rgba(84,19,43,0.4)" }}
          >
            {preview.cta}
          </Link>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════ SUSCRIPCIÓN / CTA ══ */}
      <section className="py-24 px-6">
        <div className="max-w-[640px] mx-auto">
          <div
            className="relative overflow-hidden px-10 py-16 lg:px-16 lg:py-20 space-y-8"
            style={{ backgroundColor: "#000000", borderRadius: "2px" }}
          >
            <GeoBg className="w-[480px] h-[480px] -top-20 -right-20 opacity-20" />
            <div className="relative z-10 space-y-6">
              <EyebrowLabel light>
                {lang === "es" ? "Suscríbete" : "Subscribe"}
              </EyebrowLabel>
              <h2
                className="font-display leading-tight"
                style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 300, color: "#F9F4F1" }}
              >
                {lang === "es"
                  ? "Recibe los devocionales en tu correo."
                  : "Receive devotionals in your inbox."}
              </h2>

              {/* Membership note */}
              <div
                className="px-4 py-3 border-l"
                style={{ borderColor: "rgba(84,19,43,0.5)", backgroundColor: "rgba(84,19,43,0.08)" }}
              >
                <p className="text-xs font-body leading-relaxed" style={{ color: "rgba(249,244,241,0.65)" }}>
                  {lang === "es"
                    ? "Los devocionales están incluidos en la membresía del Círculo Vuelve a Ti. Si ya eres miembro, no necesitas suscribirte aquí."
                    : "Devotionals are included in the Return to Yourself Circle membership. If you're already a member, you don't need to subscribe here."}
                  {" "}
                  <Link href="/membresia" className="underline" style={{ color: "#54132B" }}>
                    {lang === "es" ? "Ver membresía →" : "View membership →"}
                  </Link>
                </p>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <p
                    className="font-display italic text-2xl font-light"
                    style={{ color: "#F9F4F1" }}
                  >
                    {lang === "es" ? "Bienvenida." : "Welcome."}
                  </p>
                  <p className="font-body text-sm" style={{ color: "rgba(249,244,241,0.6)" }}>
                    {lang === "es"
                      ? "Tu primer devocional llega el próximo lunes. Revisa tu correo."
                      : "Your first devotional arrives next Monday. Check your inbox."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="devo-email"
                      className="block text-xs font-body font-semibold uppercase tracking-[0.15em]"
                      style={{ color: "rgba(249,244,241,0.5)" }}
                    >
                      {lang === "es" ? "Tu correo" : "Your email"}
                    </label>
                    <input
                      id="devo-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={lang === "es" ? "tu@correo.com" : "your@email.com"}
                      className="lv-focus-ring w-full px-4 py-3 text-sm font-body border"
                      style={{
                        backgroundColor: "rgba(249,244,241,0.08)",
                        borderColor:     "rgba(249,244,241,0.18)",
                        color:           "#F9F4F1",
                        borderRadius:    "2px",
                        outline:         "none",
                      }}
                    />
                  </div>

                  <div>
                    <p
                      className="text-[10px] font-body font-semibold uppercase tracking-[0.15em] mb-2"
                      style={{ color: "rgba(249,244,241,0.5)" }}
                    >
                      {lang === "es" ? "Plan" : "Plan"}
                    </p>
                    <div
                      className="flex items-center justify-between px-5 py-4 border"
                      style={{ borderColor: "rgba(84,19,43,0.4)", borderRadius: "2px", backgroundColor: "rgba(84,19,43,0.08)" }}
                    >
                      <div>
                        <p className="font-body font-semibold text-sm" style={{ color: "#F9F4F1" }}>
                          {lang === "es" ? "Devocionales Semanales" : "Weekly Devotionals"}
                        </p>
                        <p className="text-xs font-body" style={{ color: "rgba(249,244,241,0.5)" }}>
                          {lang === "es" ? "2 veces por semana · Cancela cuando quieras" : "2 times per week · Cancel anytime"}
                        </p>
                      </div>
                      <p
                        className="font-display font-light"
                        style={{ fontSize: "22px", color: "#F9F4F1" }}
                      >
                        $9<span className="font-body text-xs font-light" style={{ color: "rgba(249,244,241,0.45)" }}>/mes</span>
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-4 text-sm font-body font-medium tracking-[0.08em]"
                    style={{
                      backgroundColor: loading ? "rgba(84,19,43,0.7)" : "#54132B",
                      color:           "#F9F4F1",
                      borderRadius:    "2px",
                      border:          "none",
                      cursor:          loading ? "wait" : "pointer",
                    }}
                  >
                    {loading
                      ? (lang === "es" ? "Un momento..." : "One moment...")
                      : (lang === "es" ? "Suscribirme →" : "Subscribe →")}
                  </button>

                  <p className="text-[10px] font-body text-center" style={{ color: "rgba(249,244,241,0.35)" }}>
                    {lang === "es"
                      ? "Pago seguro con Stripe. Sin compromisos mínimos."
                      : "Secure payment with Stripe. No minimum commitments."}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════ FAQ ══ */}
      <section className="py-24 px-6" style={{ backgroundColor: "#F4E7E9" }}>
        <div className="max-w-[720px] mx-auto">
          <div className="text-center mb-14 space-y-3">
            <EyebrowLabel>
              {lang === "es" ? "Preguntas frecuentes" : "FAQ"}
            </EyebrowLabel>
            <h2
              className="font-display tracking-[0.04em]"
              style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400, color: "#000000" }}
            >
              {lang === "es" ? "LO QUE MÁS PREGUNTAN" : "MOST ASKED"}
            </h2>
          </div>

          <div className="space-y-0">
            {faq.map((item, i) => (
              <div
                key={i}
                className="py-7 border-b space-y-2"
                style={{ borderColor: "rgba(146,129,120,0.25)" }}
              >
                <h3 className="font-body font-semibold text-sm" style={{ color: "#000000" }}>{item.q}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#928178" }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
