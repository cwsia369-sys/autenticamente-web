"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/app/providers/LangProvider";

/* ──────────────────────────────────────────────────────────
   SVG Icons — inline, stroke-based, brand palette
   ────────────────────────────────────────────────────────── */
function IconHeadphones({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 20V16a11 11 0 0 1 22 0v4" />
      <rect x="2.5" y="20" width="5" height="8" rx="1.5" />
      <rect x="24.5" y="20" width="5" height="8" rx="1.5" />
    </svg>
  );
}
function IconUsers({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="4.5" />
      <path d="M3 27c0-4.5 4-8 8.5-8s8.5 3.5 8.5 8" />
      <circle cx="23" cy="11" r="3.5" />
      <path d="M24 19c3.5.6 6 3.5 6 8" />
    </svg>
  );
}
function IconStar({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 3.5l3.8 8.1 8.7 1-6.4 6.1 1.7 8.8L16 23.3l-7.8 4.2 1.7-8.8-6.4-6.1 8.7-1z" />
    </svg>
  );
}
function IconCheck({ color = "#54132B" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
      <circle cx="8" cy="8" r="7" stroke={color} strokeWidth="0.8" opacity="0.6" />
      <path d="M5 8l2 2 4-4" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconSpark({ color = "#54132B" }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
      <path d="M7 1v4M7 9v4M1 7h4M9 7h4" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────
   3-TIER DATA
   ────────────────────────────────────────────────────────── */
type Tier = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceLabel: string;
  featured: boolean;
  badge?: string;
  features: string[];
  bonuses: string[];
  cta: string;
};

const tiersES: Tier[] = [
  {
    id: "despertar",
    name: "Despertar",
    tagline: "El primer paso para reconectar contigo",
    price: "$19",
    priceLabel: "USD / mes",
    featured: false,
    features: [
      "Biblioteca completa de audios y meditaciones (9+ audios)",
      "Devocionales semanales (2x por semana)",
      "Newsletter exclusivo de la Dra. Valencia",
      "Comunidad online",
      "Test emocional básico",
    ],
    bonuses: [],
    cta: "Empezar con Despertar",
  },
  {
    id: "circulo",
    name: "Círculo",
    tagline: "Tu espacio de transformación continua",
    price: "$49",
    priceLabel: "USD / mes",
    featured: true,
    badge: "Más popular",
    features: [
      "Todo lo de Despertar",
      "Ebooks y workbooks exclusivos",
      "Workshops grupales mensuales en vivo",
      "Test emocional avanzado + reportes",
      "Conferencias online en vivo",
      "Acceso anticipado a nuevos contenidos",
    ],
    bonuses: [
      "15% de descuento en consultas con Dra. Valencia",
      "15% de descuento en eventos presenciales",
    ],
    cta: "Unirme al Círculo",
  },
  {
    id: "verdad",
    name: "Verdad",
    tagline: "Profundidad y acompañamiento directo",
    price: "$99",
    priceLabel: "USD / mes",
    featured: false,
    features: [
      "Todo lo de Círculo",
      "Sesión grupal mensual con Dra. Liset Valencia (1.5h online)",
      "Acceso prioritario a retiros RAÍZ",
      "Curso exclusivo 'Verdad Interior'",
      "Workbook personalizado anual",
      "Llamada de bienvenida 1:1 con la asistente",
    ],
    bonuses: [
      "25% de descuento en consultas individuales con Liset",
      "25% de descuento en eventos y retiros presenciales",
    ],
    cta: "Elegir Verdad",
  },
];

const tiersEN: Tier[] = [
  {
    id: "despertar",
    name: "Awaken",
    tagline: "The first step to reconnect with yourself",
    price: "$19",
    priceLabel: "USD / month",
    featured: false,
    features: [
      "Full audio and meditation library (9+ audios)",
      "Weekly devotionals (2x per week)",
      "Exclusive newsletter from Dr. Valencia",
      "Online community",
      "Basic emotional test",
    ],
    bonuses: [],
    cta: "Start with Awaken",
  },
  {
    id: "circulo",
    name: "Circle",
    tagline: "Your space for continuous transformation",
    price: "$49",
    priceLabel: "USD / month",
    featured: true,
    badge: "Most popular",
    features: [
      "Everything in Awaken",
      "Exclusive ebooks & workbooks",
      "Monthly live group workshops",
      "Advanced emotional test + reports",
      "Live online conferences",
      "Early access to new content",
    ],
    bonuses: [
      "15% discount on sessions with Dr. Valencia",
      "15% discount on in-person events",
    ],
    cta: "Join the Circle",
  },
  {
    id: "verdad",
    name: "Truth",
    tagline: "Depth and direct support",
    price: "$99",
    priceLabel: "USD / month",
    featured: false,
    features: [
      "Everything in Circle",
      "Monthly group session with Dr. Liset Valencia (1.5h online)",
      "Priority access to RAÍZ retreats",
      "Exclusive 'Inner Truth' course",
      "Annual personalized workbook",
      "1:1 welcome call with the assistant",
    ],
    bonuses: [
      "25% discount on individual sessions with Liset",
      "25% discount on in-person events and retreats",
    ],
    cta: "Choose Truth",
  },
];

const tierIcons = [IconHeadphones, IconUsers, IconStar];

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
  { q: "¿Puedo empezar con Despertar y subir de tier después?", a: "Sí. Puedes cambiar de tier en cualquier momento desde tu perfil. Si subes, se ajusta el cobro proporcionalmente. Si bajas, el cambio aplica en tu próximo ciclo." },
  { q: "¿Los bonos de descuento son acumulables con promociones?", a: "Los bonos de miembros aplican sobre el precio regular de consultas y eventos presenciales. No se combinan con otras promociones, pero siempre usamos el mejor descuento disponible." },
  { q: "¿Puedo cancelar cuando quiera?", a: "Sí. Cancelas cuando quieras desde tu perfil. No hay compromisos mínimos ni penalidades." },
  { q: "¿Pierdo el acceso al cancelar?", a: "No. Mantienes el acceso hasta el final del período pagado. Luego se desactiva automáticamente." },
  { q: "¿La membresía incluye consulta individual con Liset?", a: "Solo el tier Verdad incluye una sesión grupal mensual con la Dra. Valencia. Las consultas individuales son aparte pero los miembros de Círculo y Verdad tienen descuento." },
  { q: "¿Cómo accedo al contenido?", a: "Al suscribirte, accedes a tu dashboard personal desde cualquier dispositivo con tu email." },
];
const faqEN = [
  { q: "Can I start with Awaken and upgrade later?", a: "Yes. You can change tiers anytime from your profile. Upgrades are prorated. Downgrades apply on your next billing cycle." },
  { q: "Are member discounts stackable with promotions?", a: "Member bonuses apply to the regular price of consultations and in-person events. They don't combine with other promotions, but we always use the best available discount." },
  { q: "Can I cancel anytime?", a: "Yes. Cancel anytime from your profile. No minimum commitments or penalties." },
  { q: "Do I lose access when I cancel?", a: "No. You keep access until the end of the period you already paid for." },
  { q: "Does the membership include individual sessions with Liset?", a: "Only the Truth tier includes a monthly group session with Dr. Valencia. Individual sessions are separate but Circle and Truth members get a discount." },
  { q: "How do I access the content?", a: "When you subscribe, you access your personal dashboard from any device with your email." },
];

const numbersES = [
  { num: "3",  label: "Tiers" },
  { num: "9+", label: "Audios y meditaciones" },
  { num: "2x", label: "Devocionales / semana" },
  { num: "25%", label: "Descuento máximo" },
];
const numbersEN = [
  { num: "3",  label: "Tiers" },
  { num: "9+", label: "Audios & meditations" },
  { num: "2x", label: "Devotionals / week" },
  { num: "25%", label: "Max discount" },
];

/* ──────────────────────────────────────────────────────────
   FAQ Accordion
   ────────────────────────────────────────────────────────── */
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
        style={{ maxHeight: open ? "240px" : "0", opacity: open ? 1 : 0, paddingBottom: open ? "20px" : "0" }}
      >
        <p className="font-body text-sm leading-relaxed" style={{ color: "#928178" }}>{a}</p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   TIER CARD — 2 variants: light + featured dark
   ────────────────────────────────────────────────────────── */
function TierCard({ tier, index, lang }: { tier: Tier; index: number; lang: string }) {
  const [hovered, setHovered] = useState(false);
  const Icon = tierIcons[index];
  const featured = tier.featured;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col"
      style={{
        backgroundColor: featured ? "transparent" : "#FDFAF8",
        background: featured
          ? "linear-gradient(160deg, #54132B 0%, #2A0915 55%, #0A0A0A 100%)"
          : undefined,
        border: featured ? "none" : "1px solid rgba(146,129,120,0.18)",
        borderRadius: "8px",
        padding: featured ? "48px 36px" : "44px 36px",
        boxShadow: featured
          ? "0 30px 70px rgba(84,19,43,0.35), 0 10px 25px rgba(0,0,0,0.25)"
          : hovered
          ? "0 16px 40px rgba(84,19,43,0.08)"
          : "none",
        transform: featured
          ? hovered ? "translateY(-6px) scale(1.02)" : "translateY(-4px) scale(1.02)"
          : hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        zIndex: featured ? 2 : 1,
        overflow: "hidden",
      }}
    >
      {/* Featured glossy overlay + decorative circles */}
      {featured && (
        <>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 45%)", borderRadius: "8px" }} />
          <div className="absolute pointer-events-none" style={{ top: 0, right: 0, opacity: 0.06 }}>
            <svg width="220" height="180" viewBox="0 0 220 180" fill="none">
              <circle cx="220" cy="0" r="130" stroke="#F9F4F1" strokeWidth="0.5" />
              <circle cx="220" cy="0" r="80" stroke="#F9F4F1" strokeWidth="0.5" />
              <circle cx="220" cy="0" r="35" stroke="#F9F4F1" strokeWidth="0.5" />
            </svg>
          </div>
        </>
      )}

      {/* Top accent line (only for non-featured) */}
      {!featured && (
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, #54132B, rgba(84,19,43,0.08))" }} />
      )}

      {/* Badge "Más popular" */}
      {featured && tier.badge && (
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            backgroundColor: "#F9F4F1",
            color: "#54132B",
            fontFamily: "var(--font-instrument), system-ui, sans-serif",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            padding: "6px 16px",
            borderRadius: "100px",
            boxShadow: "0 6px 18px rgba(84,19,43,0.35)",
          }}
        >
          {tier.badge}
        </div>
      )}

      {/* Icon */}
      <div className="relative mb-6" style={{ color: featured ? "#F4E7E9" : "#54132B" }}>
        <Icon />
      </div>

      {/* Tier name */}
      <h3
        className="relative font-display mb-2"
        style={{
          fontSize: "30px",
          fontWeight: 300,
          letterSpacing: "-0.015em",
          color: featured ? "#F9F4F1" : "#0A0A0A",
        }}
      >
        {tier.name}
      </h3>

      {/* Tagline */}
      <p
        className="relative font-body mb-8"
        style={{
          fontSize: "13px",
          lineHeight: 1.6,
          color: featured ? "rgba(249,244,241,0.55)" : "#928178",
        }}
      >
        {tier.tagline}
      </p>

      {/* Price */}
      <div className="relative mb-8 pb-8 border-b" style={{ borderColor: featured ? "rgba(249,244,241,0.1)" : "rgba(146,129,120,0.12)" }}>
        <div className="flex items-baseline gap-2">
          <p
            className="font-display"
            style={{
              fontSize: "clamp(48px, 5.5vw, 64px)",
              fontWeight: 200,
              lineHeight: 1,
              letterSpacing: "-0.035em",
              color: featured ? "#F9F4F1" : "#0A0A0A",
            }}
          >
            {tier.price}
          </p>
          <p
            className="font-body"
            style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: featured ? "rgba(249,244,241,0.4)" : "#928178",
            }}
          >
            {tier.priceLabel}
          </p>
        </div>
      </div>

      {/* Features list */}
      <ul className="relative space-y-3 mb-6 flex-1">
        {tier.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <IconCheck color={featured ? "#F9F4F1" : "#54132B"} />
            <span
              className="font-body"
              style={{
                fontSize: "13px",
                lineHeight: 1.55,
                color: featured ? "rgba(249,244,241,0.78)" : "rgba(10,10,10,0.72)",
              }}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* Bonuses — only if present */}
      {tier.bonuses.length > 0 && (
        <div
          className="relative mb-8 pt-5 border-t"
          style={{ borderColor: featured ? "rgba(249,244,241,0.1)" : "rgba(146,129,120,0.15)" }}
        >
          <p
            className="font-body mb-3"
            style={{
              fontSize: "9px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: featured ? "rgba(249,244,241,0.5)" : "#54132B",
            }}
          >
            {lang === "es" ? "Bonos de miembro" : "Member bonuses"}
          </p>
          <ul className="space-y-2">
            {tier.bonuses.map((bonus, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <IconSpark color={featured ? "#F9F4F1" : "#54132B"} />
                <span
                  className="font-body"
                  style={{
                    fontSize: "12px",
                    lineHeight: 1.55,
                    color: featured ? "rgba(249,244,241,0.7)" : "rgba(10,10,10,0.62)",
                  }}
                >
                  {bonus}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA button */}
      <a
        href="#"
        className="relative font-body font-semibold text-sm tracking-[0.04em] inline-flex items-center justify-center gap-2 transition-all duration-300"
        style={{
          padding: "15px 28px",
          backgroundColor: featured ? "#F9F4F1" : "#54132B",
          color: featured ? "#0A0A0A" : "#F9F4F1",
          borderRadius: "100px",
          width: "100%",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.02)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
      >
        {tier.cta}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5.5 3L9.5 7L5.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════ */
export default function MembresiaPage() {
  const { lang } = useLang();
  const tiers   = lang === "es" ? tiersES   : tiersEN;
  const forWho  = lang === "es" ? forWhoES  : forWhoEN;
  const faq     = lang === "es" ? faqES     : faqEN;
  const numbers = lang === "es" ? numbersES : numbersEN;

  return (
    <div style={{ backgroundColor: "#F9F4F1", color: "#0A0A0A" }}>

      {/* ══════════════════ HERO ══ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#000000" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 30%, rgba(84,19,43,0.35) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-8 text-center" style={{ paddingTop: "clamp(100px,14vw,160px)", paddingBottom: "clamp(64px,8vw,100px)" }}>

          <p className="font-body font-semibold uppercase tracking-[0.35em] mb-5" style={{ fontSize: "10px", color: "rgba(122,32,64,0.8)" }}>
            {lang === "es" ? "Membresía" : "Membership"}
          </p>

          <h1
            className="font-display"
            style={{
              fontSize: "clamp(42px, 6.5vw, 88px)",
              fontWeight: 300,
              lineHeight: 1.04,
              letterSpacing: "-0.025em",
              color: "#F9F4F1",
            }}
          >
            {lang === "es" ? "Tres caminos." : "Three paths."}
            <br />
            <span className="italic" style={{ color: "#7A2040" }}>
              {lang === "es" ? "Una transformación." : "One transformation."}
            </span>
          </h1>

          <p className="font-body leading-relaxed mx-auto mt-7" style={{ fontSize: "clamp(15px, 1.4vw, 18px)", color: "rgba(249,244,241,0.5)", maxWidth: "520px" }}>
            {lang === "es"
              ? "Elige el nivel de acompañamiento que necesitas hoy. Empieza por $19/mes y avanza a tu ritmo."
              : "Choose the level of support you need today. Start from $19/month and grow at your own pace."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a
              href="#tiers"
              className="font-body font-semibold text-sm tracking-[0.04em] inline-flex items-center gap-2 transition-all duration-300"
              style={{ padding: "16px 40px", backgroundColor: "#F9F4F1", color: "#0A0A0A", borderRadius: "100px" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
            >
              {lang === "es" ? "Ver los planes" : "View plans"}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 3v8M3 7l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <Link
              href="/test"
              className="font-body text-sm tracking-[0.02em] inline-flex items-center gap-1.5 transition-opacity hover:opacity-70"
              style={{ color: "#7A9FFF", padding: "16px 24px" }}
            >
              {lang === "es" ? "Hacer el test primero" : "Take the test first"}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
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

      {/* ══════════════════ 3 TIERS — main section ══ */}
      <section id="tiers" className="px-6" style={{ paddingTop: "clamp(80px,12vw,140px)", paddingBottom: "clamp(80px,12vw,140px)" }}>
        <div className="max-w-[1200px] mx-auto">

          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <p className="font-body font-semibold uppercase tracking-[0.35em]" style={{ fontSize: "10px", color: "#54132B" }}>
              {lang === "es" ? "Elige tu camino" : "Choose your path"}
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 300, color: "#0A0A0A", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
              {lang === "es"
                ? <>Cada tier es<br /><span className="italic" style={{ color: "#7A2040" }}>un paso más profundo.</span></>
                : <>Every tier is<br /><span className="italic" style={{ color: "#7A2040" }}>one step deeper.</span></>}
            </h2>
            <p className="font-body mx-auto" style={{ fontSize: "15px", color: "rgba(10,10,10,0.6)", maxWidth: "560px", lineHeight: 1.65, paddingTop: "8px" }}>
              {lang === "es"
                ? "Todos los planes se pagan mensual. Cancelas cuando quieras. Puedes subir o bajar de tier en cualquier momento."
                : "All plans are monthly. Cancel anytime. You can upgrade or downgrade at any time."}
            </p>
          </div>

          {/* Tier cards grid */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-5 items-start">
            {tiers.map((tier, i) => (
              <TierCard key={tier.id} tier={tier} index={i} lang={lang} />
            ))}
          </div>

          {/* Fine print */}
          <p className="text-center font-body mt-12" style={{ fontSize: "12px", color: "#928178" }}>
            {lang === "es"
              ? "Los bonos de descuento aplican a consultas clínicas, eventos presenciales (RAÍZ, Belleza con Propósito, etc.) y retiros. Se activan automáticamente al ser miembro activo."
              : "Member bonuses apply to clinical sessions, in-person events (RAÍZ, Belleza con Propósito, etc.) and retreats. Activated automatically while your membership is active."}
          </p>
        </div>
      </section>

      {/* ══════════════════ PROPUESTA — why 3 pillars ══ */}
      <section className="relative overflow-hidden px-6" style={{ paddingTop: "clamp(64px,10vw,120px)", paddingBottom: "clamp(80px,12vw,140px)", backgroundColor: "#F4E7E9" }}>
        <div className="max-w-[1100px] mx-auto">

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

          <div className="grid md:grid-cols-3 gap-0 border rounded-[4px] overflow-hidden" style={{ borderColor: "rgba(146,129,120,0.2)" }}>
            {/* Pillar 1 */}
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

            {/* Pillar 2 */}
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

            {/* Pillar 3 */}
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

      {/* ══════════════════ PARA QUIÉN + HONEST NOTE ══ */}
      <section className="px-6" style={{ paddingTop: "clamp(64px,10vw,120px)", paddingBottom: "clamp(64px,10vw,120px)" }}>
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-16 items-start">

          <div className="space-y-8">
            <div className="space-y-4">
              <p className="font-body font-semibold uppercase tracking-[0.3em]" style={{ fontSize: "10px", color: "#54132B" }}>
                {lang === "es" ? "Para quién es" : "Who it's for"}
              </p>
              <h2 className="font-display" style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 300, color: "#0A0A0A", letterSpacing: "-0.01em" }}>
                {lang === "es" ? "Esta membresía es para ti si…" : "This membership is for you if…"}
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

          <div
            className="relative overflow-hidden"
            style={{ backgroundColor: "#0A0A0A", borderRadius: "3px", padding: "clamp(32px,4vw,48px)" }}
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
                ? "Los 3 tiers son membresías de contenido, recursos y comunidad. Solo el tier Verdad incluye una sesión grupal mensual con la Dra. Valencia. Ninguno reemplaza una consulta clínica individual."
                : "All 3 tiers are content, resources and community memberships. Only the Truth tier includes a monthly group session with Dr. Valencia. None of them replace individual clinical sessions."}
            </p>
            <p className="font-body text-[14px] leading-[1.75] mb-6" style={{ color: "rgba(249,244,241,0.55)" }}>
              {lang === "es"
                ? "Si necesitas acompañamiento clínico directo, ese espacio existe. Los miembros Círculo y Verdad tienen descuento."
                : "If you need direct clinical support, that space exists. Circle and Truth members get a discount."}
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

      {/* ══════════════════ FAQ ══ */}
      <section className="px-6" style={{ paddingTop: "clamp(64px,10vw,120px)", paddingBottom: "clamp(64px,10vw,100px)", backgroundColor: "#F4E7E9" }}>
        <div className="max-w-[720px] mx-auto">
          <div className="text-center mb-14 space-y-4">
            <p className="font-body font-semibold uppercase tracking-[0.3em]" style={{ fontSize: "10px", color: "#54132B" }}>
              {lang === "es" ? "Preguntas frecuentes" : "FAQ"}
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, color: "#0A0A0A", letterSpacing: "-0.01em" }}>
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
