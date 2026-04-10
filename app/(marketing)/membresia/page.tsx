"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLang } from "@/app/providers/LangProvider";

/* ── SVG Icons (línea fina, profesionales) ── */
function IconHeadphones() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 18V14a10 10 0 0 1 20 0v4" />
      <rect x="2" y="18" width="4" height="7" rx="1.5" />
      <rect x="22" y="18" width="4" height="7" rx="1.5" />
    </svg>
  );
}
function IconBook() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h7a3 3 0 0 1 3 3v17a2 2 0 0 0-2-2H4V4z" />
      <path d="M24 4h-7a3 3 0 0 0-3 3v17a2 2 0 0 1 2-2h8V4z" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="22" height="16" rx="2" />
      <path d="M3 8l11 7 11-7" />
    </svg>
  );
}
function IconMic() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="3" width="8" height="14" rx="4" />
      <path d="M6 14a8 8 0 0 0 16 0" />
      <line x1="14" y1="22" x2="14" y2="26" />
      <line x1="10" y1="26" x2="18" y2="26" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="9" r="4" />
      <path d="M2 24c0-4 3.5-7 8-7s8 3 8 7" />
      <circle cx="21" cy="9" r="3" />
      <path d="M22 17c3 .5 5 3 5 7" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="14,3 17.1,10.4 25,11.3 19.2,16.5 20.7,24.2 14,20.3 7.3,24.2 8.8,16.5 3,11.3 10.9,10.4" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 mt-0.5">
      <circle cx="9" cy="9" r="8" stroke="#54132B" strokeWidth="0.8" />
      <path d="M6 9l2.5 2.5L13 7" stroke="#54132B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const benefitIcons = [IconHeadphones, IconBook, IconMail, IconMic, IconUsers, IconStar];

/* ── Data ── */
const benefitsES = [
  { title: "Audios y meditaciones", desc: "Acceso ilimitado a toda la biblioteca — meditaciones guiadas, regulación emocional, afirmaciones y audios para dormir.", highlight: "Ilimitado" },
  { title: "Ebooks y workbooks", desc: "Recursos digitales exclusivos para profundizar tu proceso. Descarga inmediata, sin restricciones.", highlight: "Exclusivos" },
  { title: "Devocionales semanales", desc: "Dos veces por semana recibes palabras para comenzar tu día con presencia y propósito. Directo a tu correo.", highlight: "2x semana" },
  { title: "Conferencias y eventos", desc: "Inscripción anticipada y descuento exclusivo para miembros en todos los eventos de AuténticaMente.", highlight: "Prioridad" },
  { title: "Comunidad privada", desc: "Un espacio íntimo donde compartir, crecer y acompañarte con otras mujeres en proceso. Próximamente.", highlight: "Próximamente" },
  { title: "Acceso a Liset Valencia", desc: "Sesiones grupales, descuentos especiales y contenido exclusivo de la Dra. Liset Valencia para miembros.", highlight: "Especial" },
];
const benefitsEN = [
  { title: "Audios & meditations", desc: "Unlimited access to the full library — guided meditations, emotional regulation, affirmations and sleep audios.", highlight: "Unlimited" },
  { title: "Ebooks & workbooks", desc: "Exclusive digital resources to deepen your process. Immediate download, no restrictions.", highlight: "Exclusive" },
  { title: "Weekly devotionals", desc: "Twice a week you receive words to start your day with presence and purpose. Delivered to your inbox.", highlight: "2x week" },
  { title: "Conferences & events", desc: "Early registration and exclusive member discounts on all AuténticaMente events.", highlight: "Priority" },
  { title: "Private community", desc: "An intimate space to share, grow and walk alongside other women in process. Coming soon.", highlight: "Coming soon" },
  { title: "Access to Liset Valencia", desc: "Group sessions, special discounts and exclusive content from Dr. Liset Valencia for members.", highlight: "Special" },
];

const forWhoES = [
  "Llevas tiempo sintiéndote desconectada de ti misma",
  "Quieres crecer de forma continua, no solo cuando llegas al límite",
  "Buscas recursos de calidad, comunidad real y presencia regular",
  "Quieres acompañamiento sin la estructura de una consulta clínica",
];
const forWhoEN = [
  "You've been feeling disconnected from yourself for a while",
  "You want to grow continuously, not only when you reach your limit",
  "You're looking for quality resources, real community and regular presence",
  "You want support without the structure of a clinical consultation",
];

const faqES = [
  { q: "¿Puedo cancelar cuando quiera?", a: "Sí. Cancelas cuando quieras desde tu perfil. No hay compromisos mínimos ni penalidades." },
  { q: "¿Pierdo el acceso al cancelar?", a: "No. Mantienes el acceso hasta el final del período pagado. Luego se desactiva automáticamente." },
  { q: "¿Incluye consulta con Liset?", a: "No. La membresía es de contenidos, recursos y comunidad. No reemplaza un proceso terapéutico individual." },
  { q: "¿Cómo accedo al contenido?", a: "Al suscribirte, accedes a tu dashboard personal desde cualquier dispositivo." },
  { q: "¿Hay período de prueba?", a: "Próximamente. Por ahora el primer cobro es inmediato al unirte." },
];
const faqEN = [
  { q: "Can I cancel anytime?", a: "Yes. Cancel anytime from your profile. No minimum commitments or penalties." },
  { q: "Do I lose access when I cancel?", a: "No. You keep access until the end of the period you already paid for." },
  { q: "Does it include consultation with Liset?", a: "No. The membership is for content, resources and community. It does not replace individual therapy." },
  { q: "How do I access the content?", a: "When you subscribe, you access your personal dashboard from any device." },
  { q: "Is there a trial period?", a: "Coming soon. For now, the first charge is immediate upon joining." },
];

const numbersES = [
  { num: "9+", label: "Audios y meditaciones" },
  { num: "6+", label: "Ebooks y guías" },
  { num: "2x", label: "Devocionales / semana" },
  { num: "∞",  label: "Acceso ilimitado" },
];
const numbersEN = [
  { num: "9+", label: "Audios & meditations" },
  { num: "6+", label: "Ebooks & guides" },
  { num: "2x", label: "Devotionals / week" },
  { num: "∞",  label: "Unlimited access" },
];

/* ── Membership Card Component ── */
function MembershipCard({ lang }: { lang: string }) {
  return (
    <div
      className="relative overflow-hidden mx-auto"
      style={{
        width: "340px",
        height: "210px",
        borderRadius: "16px",
        background: "linear-gradient(135deg, #54132B 0%, #2A0915 50%, #0A0A0A 100%)",
        boxShadow: "0 25px 60px rgba(84,19,43,0.4), 0 8px 20px rgba(0,0,0,0.3)",
        padding: "28px 30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Glossy overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)", borderRadius: "16px" }} />

      {/* Subtle pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03 }}>
        <svg width="340" height="210" viewBox="0 0 340 210" fill="none">
          <circle cx="280" cy="40" r="80" stroke="#F9F4F1" strokeWidth="0.5" />
          <circle cx="280" cy="40" r="50" stroke="#F9F4F1" strokeWidth="0.5" />
          <circle cx="280" cy="40" r="20" stroke="#F9F4F1" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Top row */}
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="font-body text-[8px] uppercase tracking-[0.3em] font-semibold" style={{ color: "rgba(249,244,241,0.45)" }}>
            {lang === "es" ? "Membresía" : "Membership"}
          </p>
          <p className="font-display text-[22px] mt-1" style={{ color: "#F9F4F1", fontWeight: 300, letterSpacing: "-0.01em" }}>
            {lang === "es" ? "Círculo" : "Circle"}
            <span className="italic ml-1.5" style={{ color: "rgba(249,244,241,0.5)" }}>
              {lang === "es" ? "Vuelve a Ti" : "Return to You"}
            </span>
          </p>
        </div>
        {/* Isotipo */}
        <Image
          src="/logos/am-icon-white.svg"
          alt="AuténticaMente"
          width={30}
          height={30}
          style={{ opacity: 0.7 }}
        />
      </div>

      {/* Bottom row */}
      <div className="relative z-10 flex items-end justify-between">
        <div>
          <p className="font-body text-[9px] uppercase tracking-[0.2em]" style={{ color: "rgba(249,244,241,0.35)" }}>
            {lang === "es" ? "Miembro activo" : "Active member"}
          </p>
          <p className="font-body text-[11px] mt-0.5" style={{ color: "rgba(249,244,241,0.55)" }}>
            autenticamente.com
          </p>
        </div>
        <div className="text-right">
          <p className="font-display text-[28px]" style={{ color: "#F9F4F1", fontWeight: 200, lineHeight: 1 }}>
            $99
          </p>
          <p className="font-body text-[9px] uppercase tracking-[0.15em]" style={{ color: "rgba(249,244,241,0.4)" }}>
            / {lang === "es" ? "mes" : "month"}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── FAQ Accordion Item ── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b cursor-pointer"
      style={{ borderColor: "rgba(146,129,120,0.2)" }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-6">
        <h3 className="font-body font-semibold text-[15px] pr-4" style={{ color: "#0A0A0A" }}>{q}</h3>
        <svg
          width="20" height="20" viewBox="0 0 20 20" fill="none"
          className="shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <line x1="10" y1="4" x2="10" y2="16" stroke="#928178" strokeWidth="1.2" />
          <line x1="4" y1="10" x2="16" y2="10" stroke="#928178" strokeWidth="1.2" />
        </svg>
      </div>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "200px" : "0", opacity: open ? 1 : 0, paddingBottom: open ? "20px" : "0" }}
      >
        <p className="font-body text-sm leading-relaxed" style={{ color: "#928178" }}>{a}</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════ */
export default function MembresiaPage() {
  const { lang } = useLang();
  const benefits = lang === "es" ? benefitsES : benefitsEN;
  const forWho   = lang === "es" ? forWhoES   : forWhoEN;
  const faq      = lang === "es" ? faqES      : faqEN;
  const numbers  = lang === "es" ? numbersES  : numbersEN;

  return (
    <div style={{ backgroundColor: "#F9F4F1", color: "#0A0A0A" }}>

      {/* ══════════════════ HERO ══ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#000000" }}>
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 30%, rgba(84,19,43,0.35) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-8 text-center" style={{ paddingTop: "clamp(100px,14vw,160px)", paddingBottom: "clamp(80px,12vw,140px)" }}>

          {/* Supertitle */}
          <p className="font-body font-semibold uppercase tracking-[0.35em] mb-5" style={{ fontSize: "10px", color: "rgba(122,32,64,0.8)" }}>
            {lang === "es" ? "Membresía" : "Membership"}
          </p>

          {/* Headline */}
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
            {lang === "es" ? "Círculo" : "Circle"}
            <br />
            <span className="italic" style={{ color: "#7A2040" }}>
              {lang === "es" ? "Vuelve a Ti" : "Return to You"}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-body leading-relaxed mx-auto mt-7" style={{ fontSize: "clamp(15px, 1.4vw, 18px)", color: "rgba(249,244,241,0.5)", maxWidth: "480px" }}>
            {lang === "es"
              ? "Tu lugar para sanar, crecer y no hacerlo sola. Recursos, comunidad y presencia continua."
              : "Your place to heal, grow and not do it alone. Resources, community and continuous presence."}
          </p>

          {/* Membership Card */}
          <div className="mt-14 mb-12">
            <MembershipCard lang={lang} />
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-4">
            <a
              href="#unirse"
              className="font-body font-semibold text-sm tracking-[0.04em] inline-flex items-center gap-2 transition-all duration-300"
              style={{ padding: "16px 44px", backgroundColor: "#F9F4F1", color: "#0A0A0A", borderRadius: "100px" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
            >
              {lang === "es" ? "Unirme al Círculo" : "Join the Circle"}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.5 3L9.5 7L5.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <p className="font-body text-[11px]" style={{ color: "rgba(249,244,241,0.25)" }}>
              {lang === "es" ? "$99 USD / mes · Cancela cuando quieras" : "$99 USD / month · Cancel anytime"}
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════ NUMBERS BAR ══ */}
      <div style={{ backgroundColor: "#F4E7E9", borderBottom: "1px solid rgba(146,129,120,0.15)" }}>
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {numbers.map((n, i) => (
            <div key={i} className="text-center">
              <p className="font-display" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 200, color: "#54132B", lineHeight: 1 }}>{n.num}</p>
              <p className="font-body text-[10px] uppercase tracking-[0.18em] mt-2" style={{ color: "#928178" }}>{n.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════ PROPUESTA — 3-column visual ══ */}
      <section className="relative overflow-hidden px-6" style={{ paddingTop: "clamp(80px,12vw,140px)", paddingBottom: "clamp(80px,12vw,140px)", backgroundColor: "#F9F4F1" }}>
        <div className="max-w-[1100px] mx-auto">

          {/* Header */}
          <div className="text-center mb-16 space-y-5">
            <p className="font-body font-semibold uppercase tracking-[0.35em]" style={{ fontSize: "10px", color: "#54132B" }}>
              {lang === "es" ? "Por qué el Círculo" : "Why the Circle"}
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 300, lineHeight: 1.1, color: "#0A0A0A", letterSpacing: "-0.02em" }}>
              {lang === "es"
                ? <>El camino de regreso a ti<br /><span className="italic" style={{ color: "#7A2040" }}>no tiene que ser solitario.</span></>
                : <>The path back to yourself<br /><span className="italic" style={{ color: "#7A2040" }}>doesn{"'"}t have to be lonely.</span></>}
            </h2>
          </div>

          {/* Three pillars */}
          <div className="grid md:grid-cols-3 gap-0 border rounded-[4px] overflow-hidden" style={{ borderColor: "rgba(146,129,120,0.2)" }}>
            {/* Pillar 1 — No es una app */}
            <div className="relative p-10 lg:p-12 border-b md:border-b-0 md:border-r" style={{ borderColor: "rgba(146,129,120,0.2)", backgroundColor: "#FDFAF8" }}>
              <div className="mb-6">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#54132B" strokeWidth="1" strokeLinecap="round">
                  <line x1="18" y1="4" x2="18" y2="32" />
                  <line x1="4" y1="18" x2="32" y2="18" />
                  <circle cx="18" cy="18" r="14" strokeDasharray="3 3" />
                </svg>
              </div>
              <p className="font-body text-[9px] uppercase tracking-[0.25em] font-semibold mb-3" style={{ color: "#54132B" }}>
                {lang === "es" ? "No es una app" : "Not an app"}
              </p>
              <h3 className="font-display text-[22px] mb-4" style={{ fontWeight: 300, color: "#0A0A0A", lineHeight: 1.25 }}>
                {lang === "es" ? "Presencia real." : "Real presence."}
              </h3>
              <p className="font-body text-[13px] leading-[1.75]" style={{ color: "#928178" }}>
                {lang === "es"
                  ? "No es otra app de meditación con notificaciones genéricas. Es un espacio con contenido creado por la Dra. Valencia, con intención y profundidad clínica."
                  : "Not another meditation app with generic notifications. It's a space with content created by Dr. Valencia, with intention and clinical depth."}
              </p>
            </div>

            {/* Pillar 2 — No es un grupo */}
            <div className="relative p-10 lg:p-12 border-b md:border-b-0 md:border-r" style={{ borderColor: "rgba(146,129,120,0.2)", backgroundColor: "#FDFAF8" }}>
              <div className="mb-6">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#54132B" strokeWidth="1" strokeLinecap="round">
                  <circle cx="18" cy="18" r="6" />
                  <circle cx="18" cy="18" r="11" strokeDasharray="2 4" />
                  <circle cx="18" cy="18" r="16" strokeDasharray="1 5" />
                </svg>
              </div>
              <p className="font-body text-[9px] uppercase tracking-[0.25em] font-semibold mb-3" style={{ color: "#54132B" }}>
                {lang === "es" ? "No es un grupo más" : "Not just a group"}
              </p>
              <h3 className="font-display text-[22px] mb-4" style={{ fontWeight: 300, color: "#0A0A0A", lineHeight: 1.25 }}>
                {lang === "es" ? "Comunidad con sostén." : "Community with support."}
              </h3>
              <p className="font-body text-[13px] leading-[1.75]" style={{ color: "#928178" }}>
                {lang === "es"
                  ? "No es un grupo genérico de Facebook. Es un espacio íntimo y curado donde cada recurso tiene un propósito en tu proceso de transformación."
                  : "Not a generic Facebook group. It's an intimate, curated space where every resource has a purpose in your transformation process."}
              </p>
            </div>

            {/* Pillar 3 — Es tu lugar */}
            <div className="relative p-10 lg:p-12" style={{ backgroundColor: "#0A0A0A" }}>
              <div className="mb-6">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#7A2040" strokeWidth="1" strokeLinecap="round">
                  <path d="M18 6L18 30" />
                  <path d="M10 14L18 6L26 14" />
                  <circle cx="18" cy="30" r="2" fill="#7A2040" stroke="none" />
                </svg>
              </div>
              <p className="font-body text-[9px] uppercase tracking-[0.25em] font-semibold mb-3" style={{ color: "rgba(122,32,64,0.7)" }}>
                {lang === "es" ? "Es tu lugar" : "It's your place"}
              </p>
              <h3 className="font-display text-[22px] mb-4" style={{ fontWeight: 300, color: "#F9F4F1", lineHeight: 1.25 }}>
                {lang === "es" ? "Diseñado para ti." : "Designed for you."}
              </h3>
              <p className="font-body text-[13px] leading-[1.75]" style={{ color: "rgba(249,244,241,0.5)" }}>
                {lang === "es"
                  ? "Sostén para los días buenos y para los días donde no tienes energía ni para buscar. Todo en un solo lugar, siempre disponible."
                  : "Support for the good days and for the days when you don't even have the energy to search. Everything in one place, always available."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ BENEFICIOS ══ */}
      <section className="px-6" style={{ paddingTop: "clamp(40px,6vw,80px)", paddingBottom: "clamp(64px,10vw,120px)", backgroundColor: "#F4E7E9" }}>
        <div className="max-w-[1100px] mx-auto">

          <div className="text-center mb-16 space-y-4">
            <p className="font-body font-semibold uppercase tracking-[0.3em]" style={{ fontSize: "10px", color: "#54132B" }}>
              {lang === "es" ? "Qué incluye" : "What's included"}
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300, color: "#0A0A0A" }}>
              {lang === "es" ? "Todo en un solo lugar." : "Everything in one place."}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => {
              const BenefitIcon = benefitIcons[i];
              return (
                <div
                  key={i}
                  className="group relative overflow-hidden"
                  style={{
                    backgroundColor: "#FDFAF8",
                    border: "1px solid rgba(146,129,120,0.15)",
                    borderRadius: "3px",
                    padding: "36px 32px",
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
                  {/* Accent top line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, #54132B, rgba(84,19,43,0.1))" }} />

                  {/* Icon + highlight badge */}
                  <div className="flex items-start justify-between mb-5">
                    <div style={{ color: "#54132B" }}>
                      <BenefitIcon />
                    </div>
                    <span
                      className="font-body text-[8px] font-bold uppercase tracking-[0.14em] px-2.5 py-1"
                      style={{ backgroundColor: "rgba(84,19,43,0.08)", color: "#54132B", borderRadius: "100px" }}
                    >
                      {b.highlight}
                    </span>
                  </div>

                  <h3 className="font-body font-semibold text-[15px] mb-3" style={{ color: "#0A0A0A" }}>
                    {b.title}
                  </h3>
                  <p className="font-body text-[13px] leading-[1.7]" style={{ color: "#928178" }}>
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════ PARA QUIÉN ══ */}
      <section className="px-6" style={{ paddingTop: "clamp(64px,10vw,120px)", paddingBottom: "clamp(64px,10vw,120px)" }}>
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — For who */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="font-body font-semibold uppercase tracking-[0.3em]" style={{ fontSize: "10px", color: "#54132B" }}>
                {lang === "es" ? "Para quién es" : "Who it's for"}
              </p>
              <h2 className="font-display" style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 300, color: "#0A0A0A" }}>
                {lang === "es" ? "El Círculo es para ti si…" : "The Circle is for you if…"}
              </h2>
            </div>
            <ul className="space-y-5">
              {forWho.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <IconCheck />
                  <p className="font-body text-[15px] leading-relaxed" style={{ color: "rgba(10,10,10,0.75)" }}>{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Honest note */}
          <div
            className="relative overflow-hidden"
            style={{
              backgroundColor: "#0A0A0A",
              borderRadius: "3px",
              padding: "clamp(32px,4vw,48px)",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, #54132B, transparent)" }} />

            <p className="font-body font-semibold uppercase tracking-[0.25em] mb-5" style={{ fontSize: "9px", color: "rgba(249,244,241,0.4)" }}>
              {lang === "es" ? "Una nota importante" : "An important note"}
            </p>
            <h3 className="font-display italic mb-5" style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 300, color: "#F9F4F1" }}>
              {lang === "es" ? "Honestidad ante todo." : "Honesty above all."}
            </h3>
            <p className="font-body text-[14px] leading-[1.75] mb-4" style={{ color: "rgba(249,244,241,0.55)" }}>
              {lang === "es"
                ? "El Círculo es una membresía de contenidos, recursos y comunidad. No es un proceso terapéutico y no reemplaza una consulta clínica individual."
                : "The Circle is a membership of content, resources and community. It is not a therapeutic process and does not replace individual clinical consultation."}
            </p>
            <p className="font-body text-[14px] leading-[1.75] mb-6" style={{ color: "rgba(249,244,241,0.55)" }}>
              {lang === "es"
                ? "Si necesitas acompañamiento clínico directo, ese espacio existe."
                : "If you need direct clinical support, that space exists."}
            </p>
            <a
              href="https://lisetvalencia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.15em] transition-opacity hover:opacity-70"
              style={{ color: "#7A2040" }}
            >
              lisetvalencia.com
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════ CTA CENTRAL ══ */}
      <section id="unirse" className="relative overflow-hidden" style={{ backgroundColor: "#000000" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 60% at 50% 40%, rgba(122,32,64,0.2) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-[700px] mx-auto px-6 text-center" style={{ paddingTop: "clamp(80px,10vw,120px)", paddingBottom: "clamp(80px,10vw,120px)" }}>

          <p className="font-body font-semibold uppercase tracking-[0.35em] mb-6" style={{ fontSize: "10px", color: "rgba(122,32,64,0.8)" }}>
            {lang === "es" ? "Únete hoy" : "Join today"}
          </p>

          <h2 className="font-display mb-7" style={{ fontSize: "clamp(30px, 5vw, 54px)", fontWeight: 300, lineHeight: 1.1, color: "#F9F4F1", letterSpacing: "-0.02em" }}>
            {lang === "es"
              ? <>Tu proceso importa.<br /><span className="italic" style={{ color: "#7A2040" }}>Tu comunidad te espera.</span></>
              : <>Your process matters.<br /><span className="italic" style={{ color: "#7A2040" }}>Your community awaits.</span></>}
          </h2>

          {/* Mini card */}
          <div className="mb-10">
            <MembershipCard lang={lang} />
          </div>

          {/* Price */}
          <p className="font-display mb-1" style={{ fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 200, lineHeight: 1, color: "#F9F4F1", letterSpacing: "-0.03em" }}>$99</p>
          <p className="font-body mb-10" style={{ fontSize: "13px", color: "rgba(249,244,241,0.35)" }}>
            {lang === "es" ? "al mes · Cancela cuando quieras · Sin compromisos" : "per month · Cancel anytime · No commitments"}
          </p>

          {/* CTA */}
          <a
            href="#"
            className="font-body font-semibold text-sm tracking-[0.04em] inline-flex items-center gap-2 transition-all duration-300"
            style={{ padding: "18px 52px", backgroundColor: "#F9F4F1", color: "#0A0A0A", borderRadius: "100px" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"; (e.currentTarget as HTMLElement).style.backgroundColor = "#FFFFFF"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.backgroundColor = "#F9F4F1"; }}
          >
            {lang === "es" ? "Unirme al Círculo" : "Join the Circle"}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.5 3L9.5 7L5.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>

          <p className="font-body mt-6" style={{ fontSize: "11px", color: "rgba(249,244,241,0.2)" }}>
            {lang === "es" ? "Pago seguro con Stripe · Acceso inmediato a todos los beneficios" : "Secure payment with Stripe · Immediate access to all benefits"}
          </p>
        </div>
      </section>

      {/* ══════════════════ FAQ ══ */}
      <section className="px-6" style={{ paddingTop: "clamp(64px,10vw,120px)", paddingBottom: "clamp(64px,10vw,100px)" }}>
        <div className="max-w-[680px] mx-auto">
          <div className="text-center mb-14 space-y-4">
            <p className="font-body font-semibold uppercase tracking-[0.3em]" style={{ fontSize: "10px", color: "#54132B" }}>
              {lang === "es" ? "Preguntas frecuentes" : "FAQ"}
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, color: "#0A0A0A" }}>
              {lang === "es" ? "Lo que más nos preguntan." : "What people ask most."}
            </h2>
          </div>
          <div>
            {faq.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ FOOTER QUOTE ══ */}
      <section className="px-6 text-center" style={{ paddingTop: "clamp(40px,6vw,60px)", paddingBottom: "clamp(60px,8vw,100px)" }}>
        <div className="max-w-xl mx-auto space-y-6">
          <p className="font-display italic" style={{ fontSize: "clamp(20px, 2.5vw, 30px)", fontWeight: 300, color: "#928178" }}>
            {lang === "es"
              ? "\u201CEl proceso es tuyo. Nosotras ponemos el espacio.\u201D"
              : "\u201CThe process is yours. We provide the space.\u201D"}
          </p>
          <Link
            href="/test"
            className="inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.2em] transition-opacity hover:opacity-60"
            style={{ color: "#54132B" }}
          >
            {lang === "es" ? "Hacer el test emocional primero" : "Take the emotional test first"}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
