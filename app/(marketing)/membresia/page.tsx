"use client";

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
      <circle cx="300" cy="300" r="50"  stroke="#928178" strokeWidth="0.8" opacity="0.12" />
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
      style={{ color: light ? "rgba(249,244,241,0.6)" : "#54132B" }}
    >
      {children}
    </p>
  );
}

function CheckIcon({ light = false }: { light?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 mt-0.5">
      <circle cx="8" cy="8" r="7" stroke={light ? "rgba(249,244,241,0.4)" : "#54132B"} strokeWidth="0.8" />
      <path d="M5 8l2 2 4-4" stroke={light ? "#F9F4F1" : "#54132B"} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

const benefitsES = [
  {
    icon: "🎧",
    title: "Biblioteca de audios y meditaciones",
    desc: "Acceso ilimitado a toda la colección — meditaciones guiadas, audios de regulación, afirmaciones y más.",
  },
  {
    icon: "📖",
    title: "Ebooks y workbooks exclusivos",
    desc: "Recursos digitales para profundizar tu proceso. Disponibles para descarga inmediata.",
  },
  {
    icon: "💌",
    title: "Devocionales semanales",
    desc: "Dos veces por semana recibes palabras para comenzar tu día con presencia y propósito.",
  },
  {
    icon: "🎤",
    title: "Acceso prioritario a conferencias",
    desc: "Inscripción anticipada y descuento exclusivo para miembros en todos los eventos de AuténticaMente.",
  },
  {
    icon: "🤝",
    title: "Comunidad de mujeres en proceso",
    desc: "Un espacio íntimo donde compartir, crecer y no hacerlo sola. Próximamente.",
  },
  {
    icon: "✨",
    title: "Beneficios vinculados a Liset Valencia",
    desc: "Acceso a sesiones grupales, descuentos especiales y contenido exclusivo de la Dra. Valencia.",
  },
];

const benefitsEN = [
  {
    icon: "🎧",
    title: "Audio & meditation library",
    desc: "Unlimited access to the full collection — guided meditations, regulation audios, affirmations and more.",
  },
  {
    icon: "📖",
    title: "Exclusive ebooks & workbooks",
    desc: "Digital resources to deepen your process. Available for immediate download.",
  },
  {
    icon: "💌",
    title: "Weekly devotionals",
    desc: "Twice a week you receive words to start your day with presence and purpose.",
  },
  {
    icon: "🎤",
    title: "Priority access to conferences",
    desc: "Early registration and exclusive member discounts on all AuténticaMente events.",
  },
  {
    icon: "🤝",
    title: "Community of women in process",
    desc: "An intimate space to share, grow and not do it alone. Coming soon.",
  },
  {
    icon: "✨",
    title: "Benefits linked to Liset Valencia",
    desc: "Access to group sessions, special discounts and exclusive content from Dr. Valencia.",
  },
];

const forWhoES = [
  "Sientes que llevas tiempo desconectada de ti misma",
  "Quieres crecer de forma continua, no solo en crisis",
  "Buscas recursos, comunidad y presencia regular en tu proceso",
  "Quieres acompañamiento sin la estructura de una consulta clínica",
];

const forWhoEN = [
  "You feel you've been disconnected from yourself for a while",
  "You want to grow continuously, not only in crisis",
  "You're looking for resources, community and regular presence in your process",
  "You want support without the structure of a clinical consultation",
];

const faqES = [
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Sí. Cancelas cuando quieras desde tu perfil o escribiéndonos. No hay compromisos mínimos ni penalidades.",
  },
  {
    q: "¿Qué pasa si cancelo? ¿Pierdo el acceso inmediatamente?",
    a: "No. Mantienes el acceso hasta el final del período que ya pagaste. Luego el acceso se desactiva automáticamente.",
  },
  {
    q: "¿La membresía incluye consulta terapéutica con Liset?",
    a: "No. La membresía es una plataforma de contenidos, recursos y comunidad. No reemplaza un proceso terapéutico. Si buscas consulta individual, visita lisetvalencia.com.",
  },
  {
    q: "¿Cómo accedo al contenido?",
    a: "Al suscribirte, creas una cuenta y accedes a tu dashboard personal desde cualquier dispositivo.",
  },
  {
    q: "¿Hay período de prueba?",
    a: "Próximamente. Por ahora el primer cobro es inmediato al unirte.",
  },
];

const faqEN = [
  {
    q: "Can I cancel whenever I want?",
    a: "Yes. Cancel anytime from your profile or by writing to us. No minimum commitments or penalties.",
  },
  {
    q: "What happens if I cancel? Do I lose access immediately?",
    a: "No. You keep access until the end of the period you already paid for. Then access is automatically deactivated.",
  },
  {
    q: "Does the membership include a therapy consultation with Liset?",
    a: "No. The membership is a content, resource and community platform. It does not replace a therapeutic process. If you are looking for individual consultation, visit lisetvalencia.com.",
  },
  {
    q: "How do I access the content?",
    a: "When you subscribe, you create an account and access your personal dashboard from any device.",
  },
  {
    q: "Is there a trial period?",
    a: "Coming soon. For now, the first charge is immediate upon joining.",
  },
];

export default function MembresiaPage() {
  const { lang } = useLang();
  const benefits = lang === "es" ? benefitsES : benefitsEN;
  const forWho   = lang === "es" ? forWhoES   : forWhoEN;
  const faq      = lang === "es" ? faqES      : faqEN;

  return (
    <div style={{ backgroundColor: "#F9F4F1", color: "#000000" }}>

      {/* ══════════════════════════════════════ HERO ══ */}
      <section
        className="relative overflow-hidden px-6 pt-28 pb-36"
        style={{ backgroundColor: "#000000" }}
      >
        <GeoBg className="w-[700px] h-[700px] -right-40 -top-40 opacity-30" />
        <GeoBg className="w-[500px] h-[500px] -left-32 -bottom-32 opacity-20" />

        <div className="relative z-10 max-w-[1100px] mx-auto text-center space-y-8">
          <EyebrowLabel light>
            {lang === "es" ? "Membresía" : "Membership"}
          </EyebrowLabel>
          <h1
            className="font-display leading-tight"
            style={{
              fontSize:   "clamp(52px, 8vw, 88px)",
              fontWeight: 300,
              color:      "#F9F4F1",
              letterSpacing: "-0.01em",
            }}
          >
            {lang === "es" ? "Círculo" : "Circle"}
            <br />
            <span className="italic" style={{ color: "#54132B" }}>
              {lang === "es" ? "Vuelve a Ti" : "Return to Yourself"}
            </span>
          </h1>
          <p
            className="font-body font-light max-w-xl mx-auto leading-relaxed"
            style={{ fontSize: "clamp(16px, 1.5vw, 19px)", color: "rgba(249,244,241,0.72)" }}
          >
            {lang === "es"
              ? "Tu lugar para sanar, crecer y no hacerlo sola. Acceso completo a recursos, comunidad y presencia continua."
              : "Your place to heal, grow and not do it alone. Full access to resources, community and continuous presence."}
          </p>

          {/* Price + CTA */}
          <div className="flex flex-col items-center gap-5 pt-4">
            <div className="space-y-1">
              <p
                className="font-display"
                style={{ fontSize: "clamp(42px, 5vw, 58px)", fontWeight: 300, color: "#F9F4F1", lineHeight: 1 }}
              >
                $27
                <span className="font-body text-lg font-light ml-1" style={{ color: "rgba(249,244,241,0.5)" }}>
                  USD / {lang === "es" ? "mes" : "month"}
                </span>
              </p>
              <p className="text-xs font-body tracking-[0.15em] uppercase" style={{ color: "rgba(249,244,241,0.45)" }}>
                {lang === "es" ? "Cancela cuando quieras · Sin compromisos" : "Cancel anytime · No commitments"}
              </p>
            </div>
            <a
              href="#unirse"
              className="btn-primary inline-block px-10 py-4 font-body font-medium tracking-[0.08em] text-sm"
              style={{ backgroundColor: "#54132B", color: "#F9F4F1", borderRadius: "2px" }}
            >
              {lang === "es" ? "Unirme al Círculo →" : "Join the Circle →"}
            </a>
            <p className="text-xs font-body" style={{ color: "rgba(249,244,241,0.38)" }}>
              {lang === "es" ? "Acceso inmediato al unirte" : "Immediate access upon joining"}
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ PROPUESTA DE VALOR ══ */}
      <section className="py-28 px-6">
        <div className="max-w-[720px] mx-auto text-center space-y-8">
          <EyebrowLabel>
            {lang === "es" ? "Por qué el Círculo" : "Why the Circle"}
          </EyebrowLabel>
          <h2
            className="font-display leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "#000000" }}
          >
            {lang === "es"
              ? "El proceso de sanación no es lineal. Y no tiene que ser solitario."
              : "The healing process is not linear. And it doesn't have to be lonely."}
          </h2>
          <div className="w-12 h-px mx-auto" style={{ backgroundColor: "#54132B" }} />
          <p
            className="font-body leading-relaxed"
            style={{ fontSize: "clamp(15.5px, 1.3vw, 17.5px)", color: "#000000", opacity: 0.72 }}
          >
            {lang === "es"
              ? "El Círculo Vuelve a Ti es un espacio de acompañamiento continuo: recursos de calidad, presencia regular y comunidad real. No es una aplicación de meditación. No es un grupo de Facebook. Es un espacio diseñado para que tu proceso tenga sostén, incluso los días donde no tienes energía para buscar."
              : "The Return to Yourself Circle is a space of continuous accompaniment: quality resources, regular presence and real community. It's not a meditation app. It's not a Facebook group. It's a space designed so your process has support, even on the days when you don't have the energy to search."}
          </p>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════ BENEFICIOS ══ */}
      <section className="py-28 px-6" style={{ backgroundColor: "#F4E7E9" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-20 space-y-3">
            <EyebrowLabel>
              {lang === "es" ? "Qué incluye" : "What's included"}
            </EyebrowLabel>
            <h2
              className="font-display tracking-[0.04em]"
              style={{ fontSize: "clamp(28px, 3.8vw, 42px)", fontWeight: 400, color: "#000000" }}
            >
              {lang === "es" ? "TODO LO QUE RECIBES" : "EVERYTHING YOU RECEIVE"}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="pillar-card p-8 space-y-4 border"
                style={{
                  backgroundColor: "#F9F4F1",
                  borderColor:     "rgba(146,129,120,0.2)",
                  borderRadius:    "2px",
                }}
              >
                <span className="text-3xl" aria-hidden="true">{b.icon}</span>
                <h3
                  className="font-body font-semibold text-sm uppercase tracking-[0.1em]"
                  style={{ color: "#000000" }}
                >
                  {b.title}
                </h3>
                <p className="text-sm font-body leading-relaxed" style={{ color: "#928178" }}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════ PARA QUIÉN ES ══ */}
      <section className="py-28 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Para quién SÍ */}
            <div className="space-y-8">
              <div className="space-y-3">
                <EyebrowLabel>
                  {lang === "es" ? "Para quién es" : "Who it's for"}
                </EyebrowLabel>
                <h2
                  className="font-display"
                  style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 300, color: "#000000" }}
                >
                  {lang === "es" ? "El Círculo es para ti si…" : "The Circle is for you if…"}
                </h2>
              </div>
              <ul className="space-y-5">
                {forWho.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckIcon />
                    <p className="font-body text-base leading-relaxed" style={{ color: "#000000", opacity: 0.8 }}>
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Para quién NO + nota ética */}
            <div
              className="p-10 space-y-6 border-l-2"
              style={{ borderColor: "rgba(146,129,120,0.4)", backgroundColor: "#F4E7E9" }}
            >
              <h3
                className="font-display italic"
                style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 300, color: "#000000" }}
              >
                {lang === "es"
                  ? "Una nota importante de honestidad"
                  : "An important note of honesty"}
              </h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: "#000000", opacity: 0.75 }}>
                {lang === "es"
                  ? "El Círculo Vuelve a Ti es una membresía de contenidos, recursos y comunidad. No es un proceso terapéutico y no reemplaza una consulta clínica individual."
                  : "The Return to Yourself Circle is a content, resources and community membership. It is not a therapeutic process and does not replace an individual clinical consultation."}
              </p>
              <p className="font-body text-sm leading-relaxed" style={{ color: "#000000", opacity: 0.75 }}>
                {lang === "es"
                  ? "Si buscas acompañamiento clínico directo con la Dra. Liset Valencia, ese espacio vive en otro lugar."
                  : "If you are looking for direct clinical support with Dr. Liset Valencia, that space lives somewhere else."}
              </p>
              <a
                href="https://lisetvalencia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs font-body font-semibold uppercase tracking-[0.15em] border-b pb-0.5 transition-colors"
                style={{ color: "#54132B", borderColor: "#54132B" }}
              >
                {lang === "es" ? "Visitar lisetvalencia.com →" : "Visit lisetvalencia.com →"}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════ CTA PRINCIPAL ══ */}
      <section id="unirse" className="py-28 px-6" style={{ backgroundColor: "#F4E7E9" }}>
        <div className="max-w-[640px] mx-auto">
          <div
            className="relative overflow-hidden px-10 py-16 lg:px-16 lg:py-20 text-center space-y-8"
            style={{ backgroundColor: "#000000", borderRadius: "2px" }}
          >
            <GeoBg className="w-[500px] h-[500px] -top-24 -right-24 opacity-25" />
            <div className="relative z-10 space-y-6">
              <EyebrowLabel light>
                {lang === "es" ? "Únete hoy" : "Join today"}
              </EyebrowLabel>
              <h2
                className="font-display leading-tight"
                style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 300, color: "#F9F4F1" }}
              >
                {lang === "es"
                  ? "Tu proceso importa. Tu comunidad te espera."
                  : "Your process matters. Your community is waiting."}
              </h2>
              <div className="space-y-1">
                <p
                  className="font-display"
                  style={{ fontSize: "clamp(36px, 4vw, 50px)", fontWeight: 300, color: "#F9F4F1", lineHeight: 1 }}
                >
                  $27
                  <span className="font-body text-base font-light ml-1" style={{ color: "rgba(249,244,241,0.5)" }}>
                    / {lang === "es" ? "mes" : "month"}
                  </span>
                </p>
                <p className="text-xs font-body tracking-[0.15em] uppercase" style={{ color: "rgba(249,244,241,0.4)" }}>
                  {lang === "es" ? "Cancela cuando quieras" : "Cancel anytime"}
                </p>
              </div>
              {/* Stripe Checkout — placeholder href */}
              <a
                href="#"
                className="btn-primary inline-block w-full max-w-xs px-8 py-4 font-body font-medium tracking-[0.08em] text-sm text-center"
                style={{ backgroundColor: "#54132B", color: "#F9F4F1", borderRadius: "2px" }}
              >
                {lang === "es" ? "Unirme al Círculo →" : "Join the Circle →"}
              </a>
              <p className="text-xs font-body" style={{ color: "rgba(249,244,241,0.35)" }}>
                {lang === "es"
                  ? "Pago seguro con Stripe · Acceso inmediato"
                  : "Secure payment with Stripe · Immediate access"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════ FAQ ══ */}
      <section className="py-28 px-6">
        <div className="max-w-[720px] mx-auto">
          <div className="text-center mb-16 space-y-3">
            <EyebrowLabel>
              {lang === "es" ? "Preguntas frecuentes" : "FAQ"}
            </EyebrowLabel>
            <h2
              className="font-display tracking-[0.04em]"
              style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 400, color: "#000000" }}
            >
              {lang === "es" ? "LO QUE MÁS NOS PREGUNTAN" : "FREQUENTLY ASKED"}
            </h2>
          </div>

          <div className="space-y-0">
            {faq.map((item, i) => (
              <div
                key={i}
                className="py-8 border-b space-y-3"
                style={{ borderColor: "rgba(146,129,120,0.25)" }}
              >
                <h3
                  className="font-body font-semibold text-base"
                  style={{ color: "#000000" }}
                >
                  {item.q}
                </h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#928178" }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ FOOTER CTA ══ */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "#F9F4F1" }}>
        <div className="max-w-xl mx-auto space-y-6">
          <p
            className="font-display italic"
            style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 300, color: "#928178" }}
          >
            {lang === "es"
              ? '"El proceso es tuyo. Nosotras ponemos el espacio."'
              : '"The process is yours. We provide the space."'}
          </p>
          <Link
            href="/test"
            className="inline-block text-xs font-body font-semibold uppercase tracking-[0.2em] border-b pb-0.5"
            style={{ color: "#54132B", borderColor: "rgba(84,19,43,0.4)" }}
          >
            {lang === "es" ? "Hacer el test emocional primero →" : "Take the emotional test first →"}
          </Link>
        </div>
      </section>
    </div>
  );
}
