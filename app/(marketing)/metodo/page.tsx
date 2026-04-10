"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/app/providers/LangProvider";

/* ──────────────────────────────────────────────────────────
   CONFIG
   ────────────────────────────────────────────────────────── */
const ASSISTANT_CALENDLY_URL = "https://calendly.com/autenticamente/llamada-orientacion";
const LISET_CALENDLY_URL     = "https://calendly.com/lisetvalencia/consulta-clinica";
const LISET_CONSULT_PRICE    = "$150 USD";

/* ──────────────────────────────────────────────────────────
   Background grid — subtle editorial pattern
   ────────────────────────────────────────────────────────── */
function GridBg({ opacity = 0.04, color = "#928178", size = 60 }: { opacity?: number; color?: string; size?: number }) {
  const id = `grid-${size}-${color.replace("#", "")}`;
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ opacity }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
            <path d={`M ${size} 0 L 0 0 0 ${size}`} fill="none" stroke={color} strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Geometric overlay — editorial rectangles (same pattern as
   the Podcast section of the homepage). Layered concentric
   translucent rects + corner accents + vertical accent lines.
   ────────────────────────────────────────────────────────── */
function GeoLayer({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const stroke = variant === "dark" ? "rgba(255,255,255,0.045)" : "rgba(84,19,43,0.07)";
  const accent = variant === "dark" ? "rgba(255,255,255,0.06)"  : "rgba(84,19,43,0.09)";
  const lineClr = variant === "dark" ? "rgba(255,255,255,0.05)" : "rgba(84,19,43,0.06)";
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0 }} preserveAspectRatio="xMidYMid slice">
        {/* Large outer rect — full bleed */}
        <rect x="5%" y="8%" width="90%" height="84%" fill="none" stroke={stroke} strokeWidth="1" />
        {/* Mid rect — offset */}
        <rect x="14%" y="18%" width="72%" height="64%" fill="none" stroke={stroke} strokeWidth="0.8" />
        {/* Corner accent — top left */}
        <rect x="5%" y="8%" width="18%" height="22%" fill="none" stroke={accent} strokeWidth="1" />
        {/* Corner accent — bottom right */}
        <rect x="77%" y="70%" width="18%" height="22%" fill="none" stroke={accent} strokeWidth="1" />
        {/* Thin inner rect */}
        <rect x="22%" y="28%" width="56%" height="44%" fill="none" stroke={stroke} strokeWidth="0.6" />
        {/* Vertical line — left accent */}
        <line x1="5%" y1="8%" x2="5%" y2="92%" stroke={lineClr} strokeWidth="1" />
        {/* Vertical line — right accent */}
        <line x1="95%" y1="8%" x2="95%" y2="92%" stroke={lineClr} strokeWidth="1" />
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Animated Number — counts up when in view
   ────────────────────────────────────────────────────────── */
function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState<string>(value.match(/[^\d]/g)?.join("") || "0");

  const numericMatch = value.match(/\d+/);
  const suffix = numericMatch ? value.slice(numericMatch.index! + numericMatch[0].length) : "";
  const target = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const isNonNumeric = !numericMatch;

  useEffect(() => {
    if (isNonNumeric) {
      setDisplay(value);
      return;
    }
    const node = ref.current;
    if (!node) return;
    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const duration = 1400;
          const startTime = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(Math.round(target * eased) + suffix);
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target, suffix, isNonNumeric, value]);

  return <span ref={ref}>{display}</span>;
}

/* ──────────────────────────────────────────────────────────
   Reveal-on-scroll wrapper
   ────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Pilar Icons — Mente · Cuerpo · Espíritu
   ────────────────────────────────────────────────────────── */
function IconMind({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 8c-6 0-11 4-11 10 0 3 1.5 6 4 8v6h14v-6c2.5-2 4-5 4-8 0-6-5-10-11-10z" />
      <path d="M15 20c3-1 6 0 7 3" opacity="0.55" />
      <path d="M29 20c-3-1-6 0-7 3" opacity="0.55" />
      <circle cx="22" cy="23" r="1.5" fill={color} stroke="none" />
    </svg>
  );
}
function IconBody({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="22" cy="10" r="4" />
      <path d="M22 14v12" />
      <path d="M12 18l10 4 10-4" />
      <path d="M17 38l5-12 5 12" />
    </svg>
  );
}
function IconSpirit({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="22" cy="22" r="6" />
      <line x1="22" y1="4" x2="22" y2="10" />
      <line x1="22" y1="34" x2="22" y2="40" />
      <line x1="4" y1="22" x2="10" y2="22" />
      <line x1="34" y1="22" x2="40" y2="22" />
      <line x1="9" y1="9" x2="13" y2="13" opacity="0.6" />
      <line x1="31" y1="31" x2="35" y2="35" opacity="0.6" />
      <line x1="35" y1="9" x2="31" y2="13" opacity="0.6" />
      <line x1="13" y1="31" x2="9" y2="35" opacity="0.6" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────
   Area Icons — 7 complementary areas
   ────────────────────────────────────────────────────────── */
function IconHeartWave({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 24s-9-5.5-9-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-9 12-9 12z" />
      <path d="M7 13h3l2-3 2 6 2-3h5" />
    </svg>
  );
}
function IconCompass({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="14" r="11" />
      <path d="M18 10l-2 6-6 2 2-6 6-2z" />
      <circle cx="14" cy="14" r="0.8" fill={color} stroke="none" />
    </svg>
  );
}
function IconLink({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="14" r="6" />
      <circle cx="18" cy="14" r="6" />
    </svg>
  );
}
function IconLeaf({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 6c0 10-6 16-16 16 0-10 6-16 16-16z" />
      <path d="M6 22L14 14" />
    </svg>
  );
}
function IconRun({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="17" cy="5" r="2.5" />
      <path d="M12 26l3-8 3 3 4-2" />
      <path d="M10 14l5-4 4 4-3 4" />
    </svg>
  );
}
function IconChart({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22h20" />
      <path d="M6 18l5-5 4 3 7-8" />
      <path d="M16 10h6v6" />
    </svg>
  );
}
function IconSparkStar({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3l2.8 6.3 6.9.9-5 4.8 1.3 6.8L14 18.6l-5.9 3.2 1.3-6.8-5-4.8 6.9-.9z" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────
   Booking icons (reused)
   ────────────────────────────────────────────────────────── */
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
      <circle cx="8" cy="8" r="7" stroke={color} strokeWidth="0.8" opacity="0.6" />
      <path d="M5 8l2 2 4-4" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────────────────── */
const pilarIcons = [IconMind, IconBody, IconSpirit];

const pilaresES = [
  {
    n: "01",
    name: "Mente",
    tagline: "Pensar con claridad y verdad.",
    desc: "Autoconciencia, identidad, regulación del diálogo interno y del sistema nervioso. El espacio donde se sana lo que pesa y se reescribe lo que aprendimos.",
  },
  {
    n: "02",
    name: "Cuerpo",
    tagline: "Habitar tu primer territorio.",
    desc: "Movimiento, descanso, alimentación consciente y conexión somática. Porque sanar también es volver a sentir lo que el cuerpo recuerda.",
  },
  {
    n: "03",
    name: "Espíritu",
    tagline: "Reconectar con tu centro.",
    desc: "Presencia, propósito y sentido trascendente. El espacio donde la vida deja de ser rutina y se convierte en camino.",
  },
];
const pilaresEN = [
  { n: "01", name: "Mind",   tagline: "Think with clarity and truth.",      desc: "Self-awareness, identity, regulation of inner dialogue and the nervous system. Where you heal what weighs on you and rewrite what you were taught." },
  { n: "02", name: "Body",   tagline: "Inhabit your first territory.",       desc: "Movement, rest, conscious nutrition and somatic connection. Because healing is also learning to feel what the body remembers." },
  { n: "03", name: "Spirit", tagline: "Reconnect with your center.",         desc: "Presence, purpose and transcendent meaning. Where life stops being routine and becomes a path." },
];

type Mentor = {
  id: string;
  name: string;
  role: string;
  areas: string[];
  image?: string;
  status: "active" | "soon";
};

const mentoresES: Mentor[] = [
  {
    id: "liset",
    name: "Dra. Liset Valencia",
    role: "Psicóloga Clínica · Fundadora",
    areas: ["Psicología", "Emociones", "Identidad", "Regulación"],
    image: "/images/liset-valencia.jpg",
    status: "active",
  },
  {
    id: "bienestar",
    name: "Mentor de Bienestar Físico",
    role: "Cuerpo · Movimiento",
    areas: ["Ejercicio", "Disciplina", "Energía"],
    status: "soon",
  },
  {
    id: "nutricion",
    name: "Mentor de Nutrición",
    role: "Alimentación Consciente",
    areas: ["Nutrición", "Hábitos", "Bienestar"],
    status: "soon",
  },
  {
    id: "proposito",
    name: "Mentor de Propósito",
    role: "Dones y Vocación",
    areas: ["Propósito", "Talentos", "Expresión"],
    status: "soon",
  },
];
const mentoresEN: Mentor[] = [
  { id: "liset",     name: "Dr. Liset Valencia",      role: "Clinical Psychologist · Founder", areas: ["Psychology", "Emotions", "Identity", "Regulation"], image: "/images/liset-valencia.jpg", status: "active" },
  { id: "bienestar", name: "Physical Wellness Mentor", role: "Body · Movement",                 areas: ["Exercise", "Discipline", "Energy"],                                               status: "soon"   },
  { id: "nutricion", name: "Nutrition Mentor",         role: "Conscious Eating",                areas: ["Nutrition", "Habits", "Wellness"],                                                status: "soon"   },
  { id: "proposito", name: "Purpose Mentor",           role: "Gifts & Vocation",                areas: ["Purpose", "Talents", "Expression"],                                               status: "soon"   },
];

type Area = { icon: React.ComponentType<{ color?: string }>; name: string; desc: string };

const areasES: Area[] = [
  { icon: IconHeartWave,  name: "Emociones",        desc: "Comprender, nombrar y transformar lo que sientes." },
  { icon: IconCompass,    name: "Propósito",        desc: "Descubrir hacia dónde quieres caminar." },
  { icon: IconLink,       name: "Relaciones",       desc: "Vínculos sanos contigo y con los demás." },
  { icon: IconLeaf,       name: "Alimentación",     desc: "Nutrir el cuerpo con conciencia y gratitud." },
  { icon: IconRun,        name: "Ejercicio",        desc: "Movimiento como medicina diaria." },
  { icon: IconChart,      name: "Finanzas",         desc: "Abundancia desde la claridad, no desde el miedo." },
  { icon: IconSparkStar,  name: "Dones y Talentos", desc: "Reconocer lo que viniste a dar al mundo." },
];
const areasEN: Area[] = [
  { icon: IconHeartWave,  name: "Emotions",       desc: "Understand, name and transform what you feel." },
  { icon: IconCompass,    name: "Purpose",        desc: "Discover where you want to walk." },
  { icon: IconLink,       name: "Relationships",  desc: "Healthy bonds with yourself and others." },
  { icon: IconLeaf,       name: "Nutrition",      desc: "Nourish the body with consciousness and gratitude." },
  { icon: IconRun,        name: "Exercise",       desc: "Movement as daily medicine." },
  { icon: IconChart,      name: "Finances",       desc: "Abundance from clarity, not from fear." },
  { icon: IconSparkStar,  name: "Gifts & Talents", desc: "Recognize what you came to offer the world." },
];

const statsES = [
  { num: "3",   label: "Pilares" },
  { num: "7",   label: "Áreas de vida" },
  { num: "5",   label: "Mentores especialistas" },
  { num: "10",  label: "Años de Liset" },
];
const statsEN = [
  { num: "3",   label: "Pillars" },
  { num: "7",   label: "Life areas" },
  { num: "5",   label: "Specialist mentors" },
  { num: "10",  label: "Years of Liset" },
];

const bookingES = {
  eyebrow: "Cierre",
  title: "Tu proceso empieza",
  titleItalic: "con una conversación.",
  subtitle: "Elige cómo quieres empezar. Sin compromiso y sin presión.",
  cardA: {
    badge: "GRATIS · 20 MIN",
    title: "Llamada con la asistente",
    desc: "Conversa con nuestra asistente para entender cómo AuténticaMente puede acompañar tu proceso. Sin compromiso.",
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
};
const bookingEN = {
  eyebrow: "Closing",
  title: "Your process begins",
  titleItalic: "with a conversation.",
  subtitle: "Choose how you want to start. No commitment, no pressure.",
  cardA: {
    badge: "FREE · 20 MIN",
    title: "Call with the assistant",
    desc: "Talk to our assistant to understand how AuténticaMente can support your process. No commitment.",
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
};

/* ══════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════ */
export default function MetodoPage() {
  const { lang } = useLang();
  const pilares = lang === "es" ? pilaresES : pilaresEN;
  const mentores = lang === "es" ? mentoresES : mentoresEN;
  const areas    = lang === "es" ? areasES    : areasEN;
  const stats    = lang === "es" ? statsES    : statsEN;
  const booking  = lang === "es" ? bookingES  : bookingEN;

  return (
    <div style={{ backgroundColor: "#F9F4F1", color: "#0A0A0A" }}>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#000000" }}>
        <GeoLayer variant="dark" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 35%, rgba(84,19,43,0.38) 0%, transparent 72%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(84,19,43,0.18) 0%, transparent 60%)" }} />

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-8 text-center" style={{ paddingTop: "clamp(110px,14vw,180px)", paddingBottom: "clamp(80px,10vw,120px)" }}>
          <Reveal>
            <p className="font-body font-semibold uppercase tracking-[0.35em] mb-5" style={{ fontSize: "10px", color: "rgba(122,32,64,0.85)" }}>
              {lang === "es" ? "Metodología integral" : "Integral Methodology"}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h1
              className="font-display flex flex-col items-center gap-3"
              style={{
                fontSize: "clamp(44px, 7.5vw, 104px)",
                fontWeight: 300,
                lineHeight: 1.02,
                letterSpacing: "-0.028em",
                color: "#F9F4F1",
              }}
            >
              <span>{lang === "es" ? "El Método" : "The Method"}</span>
              <Image
                src="/logos/am-wordmark-burgundy.svg"
                alt="AuténticaMente"
                width={900}
                height={240}
                priority
                style={{
                  width: "clamp(260px, 54vw, 760px)",
                  height: "auto",
                  display: "block",
                }}
              />
            </h1>
          </Reveal>

          <Reveal delay={280}>
            <p className="font-body leading-relaxed mx-auto mt-8" style={{ fontSize: "clamp(15px, 1.4vw, 18px)", color: "rgba(249,244,241,0.55)", maxWidth: "620px" }}>
              {lang === "es"
                ? "Un enfoque integral y colaborativo que une mente, cuerpo y espíritu. Una red de mentores especialistas que acompaña tu transformación desde cada área de la vida."
                : "An integral and collaborative approach that unites mind, body and spirit. A network of specialist mentors accompanying your transformation across every area of life."}
            </p>
          </Reveal>

          <Reveal delay={440}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-11">
              <a
                href="#pilares"
                className="font-body font-semibold text-sm tracking-[0.04em] inline-flex items-center gap-2 transition-all duration-300"
                style={{ padding: "16px 40px", backgroundColor: "#F9F4F1", color: "#0A0A0A", borderRadius: "100px" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
              >
                {lang === "es" ? "Conocer los pilares" : "Explore the pillars"}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 3v8M3 7l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
          </Reveal>
        </div>
      </section>

      {/* ═══════════ STATS BAR — animated numbers ═══════════ */}
      <div style={{ backgroundColor: "#F4E7E9", borderBottom: "1px solid rgba(146,129,120,0.15)" }}>
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 120} className="text-center">
              <p
                className="font-display"
                style={{ fontSize: "clamp(34px, 4vw, 52px)", fontWeight: 200, color: "#54132B", lineHeight: 1, letterSpacing: "-0.02em" }}
              >
                <AnimatedNumber value={s.num} />
                {i === 2 || i === 3 ? "+" : ""}
              </p>
              <p className="font-body text-[10px] uppercase tracking-[0.22em] mt-3" style={{ color: "#928178" }}>
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ═══════════ 3 PILARES ═══════════ */}
      <section id="pilares" className="relative overflow-hidden px-6" style={{ paddingTop: "clamp(96px,14vw,160px)", paddingBottom: "clamp(96px,14vw,160px)" }}>
        <GridBg opacity={0.04} color="#54132B" size={72} />
        <div className="relative max-w-[1200px] mx-auto">

          <Reveal>
            <div className="text-center mb-20 space-y-5">
              <p className="font-body font-semibold uppercase tracking-[0.35em]" style={{ fontSize: "10px", color: "#54132B" }}>
                {lang === "es" ? "Tres pilares · Una vida" : "Three pillars · One life"}
              </p>
              <h2 className="font-display" style={{ fontSize: "clamp(34px, 5.5vw, 72px)", fontWeight: 300, color: "#0A0A0A", lineHeight: 1.06, letterSpacing: "-0.025em" }}>
                {lang === "es"
                  ? <>Un método que integra<br /><span className="italic" style={{ color: "#7A2040" }}>mente, cuerpo y espíritu.</span></>
                  : <>A method that integrates<br /><span className="italic" style={{ color: "#7A2040" }}>mind, body and spirit.</span></>}
              </h2>
              <p className="font-body mx-auto pt-2" style={{ fontSize: "15px", lineHeight: 1.7, color: "rgba(10,10,10,0.58)", maxWidth: "580px" }}>
                {lang === "es"
                  ? "No se sana en pedazos. Tu mente, tu cuerpo y tu espíritu son un solo sistema. Por eso cada pilar se trabaja con profundidad y con especialistas."
                  : "You don't heal in pieces. Your mind, your body and your spirit are one system. That's why each pillar is worked on with depth and with specialists."}
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 md:gap-5">
            {pilares.map((pilar, i) => {
              const Icon = pilarIcons[i];
              return (
                <Reveal key={pilar.n} delay={i * 160}>
                  <div
                    className="group relative overflow-hidden h-full flex flex-col"
                    style={{
                      backgroundColor: "#FDFAF8",
                      border: "1px solid rgba(146,129,120,0.18)",
                      borderRadius: "4px",
                      padding: "clamp(36px,4vw,52px)",
                      transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 28px 60px rgba(84,19,43,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, #54132B, rgba(84,19,43,0.08))" }} />

                    <div className="flex items-start justify-between mb-8">
                      <div style={{ color: "#54132B" }}>
                        <Icon />
                      </div>
                      <span
                        className="font-body font-bold uppercase"
                        style={{
                          fontSize: "10px",
                          letterSpacing: "0.2em",
                          color: "rgba(84,19,43,0.3)",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {pilar.n}
                      </span>
                    </div>

                    <h3
                      className="font-display mb-2"
                      style={{ fontSize: "clamp(32px, 3.5vw, 44px)", fontWeight: 300, color: "#0A0A0A", letterSpacing: "-0.015em", lineHeight: 1 }}
                    >
                      {pilar.name}
                    </h3>

                    <p
                      className="font-display italic mb-6"
                      style={{ fontSize: "16px", color: "#7A2040", lineHeight: 1.4 }}
                    >
                      {pilar.tagline}
                    </p>

                    <div className="w-8 h-[1px] mb-6" style={{ backgroundColor: "rgba(84,19,43,0.25)" }} />

                    <p
                      className="font-body flex-1"
                      style={{ fontSize: "14px", lineHeight: 1.8, color: "#928178" }}
                    >
                      {pilar.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ MENTORES ═══════════ */}
      <section id="mentores" className="relative overflow-hidden px-6" style={{ paddingTop: "clamp(96px,14vw,160px)", paddingBottom: "clamp(96px,14vw,160px)", backgroundColor: "#F4E7E9" }}>
        <GridBg opacity={0.055} color="#928178" size={48} />
        <div className="relative max-w-[1200px] mx-auto">

          <Reveal>
            <div className="text-center mb-20 space-y-5">
              <p className="font-body font-semibold uppercase tracking-[0.35em]" style={{ fontSize: "10px", color: "#54132B" }}>
                {lang === "es" ? "La red" : "The network"}
              </p>
              <h2 className="font-display" style={{ fontSize: "clamp(34px, 5.5vw, 72px)", fontWeight: 300, color: "#0A0A0A", lineHeight: 1.06, letterSpacing: "-0.025em" }}>
                {lang === "es"
                  ? <>Un equipo de<br /><span className="italic" style={{ color: "#7A2040" }}>mentores especialistas.</span></>
                  : <>A team of<br /><span className="italic" style={{ color: "#7A2040" }}>specialist mentors.</span></>}
              </h2>
              <p className="font-body mx-auto pt-2" style={{ fontSize: "15px", lineHeight: 1.7, color: "rgba(10,10,10,0.58)", maxWidth: "580px" }}>
                {lang === "es"
                  ? "AuténticaMente no depende de una sola voz. Cada área de vida tiene su mentor: profesionales que desarrollan su campo con rigor y profundidad."
                  : "AuténticaMente doesn't depend on a single voice. Each area of life has its mentor: professionals who develop their field with rigor and depth."}
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mentores.map((mentor, i) => {
              const isActive = mentor.status === "active";
              return (
                <Reveal key={mentor.id} delay={i * 110}>
                  <div
                    className="group relative overflow-hidden h-full"
                    style={{
                      backgroundColor: "#FDFAF8",
                      border: "1px solid rgba(146,129,120,0.2)",
                      borderRadius: "4px",
                      transition: "transform 0.35s ease, box-shadow 0.35s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 45px rgba(84,19,43,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    {/* Portrait area */}
                    <div
                      className="relative overflow-hidden"
                      style={{ aspectRatio: "4/5", backgroundColor: isActive ? "#0A0A0A" : "rgba(84,19,43,0.06)" }}
                    >
                      {isActive && mentor.image ? (
                        <Image
                          src={mentor.image}
                          alt={mentor.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(84,19,43,0.08) 0%, rgba(146,129,120,0.05) 100%)" }} />
                          <svg width="54" height="54" viewBox="0 0 54 54" fill="none" stroke="#54132B" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}>
                            <circle cx="27" cy="21" r="8" />
                            <path d="M10 46c0-8 7-14 17-14s17 6 17 14" />
                          </svg>
                        </div>
                      )}

                      {/* Status badge */}
                      <span
                        className="absolute top-3 left-3 font-body text-[8px] font-bold uppercase tracking-[0.15em] px-2.5 py-1"
                        style={{
                          backgroundColor: isActive ? "rgba(249,244,241,0.92)" : "rgba(249,244,241,0.78)",
                          color: isActive ? "#54132B" : "#928178",
                          borderRadius: "100px",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        {isActive ? (lang === "es" ? "Activo" : "Active") : (lang === "es" ? "Próximamente" : "Coming soon")}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="p-6">
                      <h3 className="font-display mb-1" style={{ fontSize: "18px", fontWeight: 400, color: "#0A0A0A", letterSpacing: "-0.005em" }}>
                        {mentor.name}
                      </h3>
                      <p className="font-body text-[11px] uppercase tracking-[0.14em] mb-4" style={{ color: "#54132B" }}>
                        {mentor.role}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {mentor.areas.map((area) => (
                          <span
                            key={area}
                            className="font-body text-[10px] font-medium px-2.5 py-1"
                            style={{
                              backgroundColor: "rgba(84,19,43,0.06)",
                              color: "#54132B",
                              borderRadius: "100px",
                            }}
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={200}>
            <p className="text-center font-body mt-10" style={{ fontSize: "12px", color: "#928178" }}>
              {lang === "es"
                ? "La red se está expandiendo. Cada mentor se integra al método con un propósito claro en tu proceso."
                : "The network is expanding. Each mentor joins the method with a clear purpose in your process."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ ÁREAS COMPLEMENTARIAS ═══════════ */}
      <section className="relative overflow-hidden px-6" style={{ paddingTop: "clamp(96px,14vw,160px)", paddingBottom: "clamp(96px,14vw,160px)" }}>
        <GridBg opacity={0.035} color="#54132B" size={56} />
        <div className="relative max-w-[1200px] mx-auto">

          <Reveal>
            <div className="text-center mb-16 space-y-5">
              <p className="font-body font-semibold uppercase tracking-[0.35em]" style={{ fontSize: "10px", color: "#54132B" }}>
                {lang === "es" ? "Siete áreas de vida" : "Seven life areas"}
              </p>
              <h2 className="font-display" style={{ fontSize: "clamp(34px, 5.5vw, 64px)", fontWeight: 300, color: "#0A0A0A", lineHeight: 1.06, letterSpacing: "-0.025em" }}>
                {lang === "es"
                  ? <>Todo lo que<br /><span className="italic" style={{ color: "#7A2040" }}>se puede sanar.</span></>
                  : <>Everything that<br /><span className="italic" style={{ color: "#7A2040" }}>can be healed.</span></>}
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {areas.map((area, i) => {
              const Icon = area.icon;
              return (
                <Reveal key={area.name} delay={i * 70}>
                  <div
                    className="relative h-full flex flex-col"
                    style={{
                      backgroundColor: "#FDFAF8",
                      border: "1px solid rgba(146,129,120,0.15)",
                      borderRadius: "4px",
                      padding: "28px 26px",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 28px rgba(84,19,43,0.07)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(84,19,43,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(146,129,120,0.15)";
                    }}
                  >
                    <div className="mb-4" style={{ color: "#54132B" }}>
                      <Icon />
                    </div>
                    <h3 className="font-display mb-2" style={{ fontSize: "18px", fontWeight: 400, color: "#0A0A0A", letterSpacing: "-0.005em" }}>
                      {area.name}
                    </h3>
                    <p className="font-body" style={{ fontSize: "12px", lineHeight: 1.65, color: "#928178" }}>
                      {area.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ CIERRE — BOOKING ═══════════ */}
      <section id="agendar" className="relative overflow-hidden" style={{ backgroundColor: "#000000" }}>
        <GridBg opacity={0.05} color="#F9F4F1" size={64} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 60% at 50% 40%, rgba(122,32,64,0.22) 0%, transparent 72%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(84,19,43,0.15) 0%, transparent 60%)" }} />

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-8" style={{ paddingTop: "clamp(96px,14vw,160px)", paddingBottom: "clamp(96px,14vw,160px)" }}>

          <Reveal>
            <div className="text-center mb-16 space-y-5">
              <p className="font-body font-semibold uppercase tracking-[0.35em]" style={{ fontSize: "10px", color: "rgba(122,32,64,0.85)" }}>
                {booking.eyebrow}
              </p>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(32px, 5.5vw, 72px)",
                  fontWeight: 300,
                  lineHeight: 1.06,
                  letterSpacing: "-0.025em",
                  color: "#F9F4F1",
                }}
              >
                {booking.title}
                <br />
                <span className="italic" style={{ color: "#7A2040" }}>{booking.titleItalic}</span>
              </h2>
              <p className="font-body leading-relaxed mx-auto pt-2" style={{ fontSize: "clamp(14px, 1.3vw, 17px)", color: "rgba(249,244,241,0.5)", maxWidth: "520px" }}>
                {booking.subtitle}
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Card A — Free */}
            <Reveal delay={100}>
              <div
                className="relative overflow-hidden flex flex-col h-full"
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

                <div className="flex items-center justify-between mb-6">
                  <div style={{ color: "#54132B" }}>
                    <IconChatBubble />
                  </div>
                  <span className="font-body text-[9px] font-bold uppercase tracking-[0.14em] px-3 py-1.5" style={{ backgroundColor: "rgba(84,19,43,0.08)", color: "#54132B", borderRadius: "100px" }}>
                    {booking.cardA.badge}
                  </span>
                </div>

                <h3 className="font-display mb-3" style={{ fontSize: "26px", fontWeight: 300, color: "#0A0A0A", letterSpacing: "-0.01em" }}>
                  {booking.cardA.title}
                </h3>
                <p className="font-body text-[13px] leading-[1.7] mb-8" style={{ color: "#928178" }}>
                  {booking.cardA.desc}
                </p>

                <div className="mb-8 pb-8 border-b" style={{ borderColor: "rgba(146,129,120,0.15)" }}>
                  <p className="font-display" style={{ fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 200, color: "#0A0A0A", lineHeight: 1, letterSpacing: "-0.03em" }}>
                    {booking.cardA.priceBig}
                  </p>
                  <p className="font-body text-[11px] uppercase tracking-[0.14em] mt-2" style={{ color: "#928178" }}>
                    {booking.cardA.priceLabel}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {booking.cardA.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 font-body text-[13px]">
                      <IconCheck />
                      <span style={{ color: "rgba(10,10,10,0.7)" }}>{f}</span>
                    </li>
                  ))}
                </ul>

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
            </Reveal>

            {/* Card B — Paid Liset */}
            <Reveal delay={240}>
              <div
                className="relative overflow-hidden flex flex-col h-full"
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
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)", borderRadius: "4px" }} />
                <div className="absolute pointer-events-none" style={{ top: 0, right: 0, opacity: 0.06 }}>
                  <svg width="260" height="200" viewBox="0 0 260 200" fill="none">
                    <circle cx="260" cy="0" r="140" stroke="#F9F4F1" strokeWidth="0.5" />
                    <circle cx="260" cy="0" r="90" stroke="#F9F4F1" strokeWidth="0.5" />
                    <circle cx="260" cy="0" r="40" stroke="#F9F4F1" strokeWidth="0.5" />
                  </svg>
                </div>

                <div className="relative flex items-center justify-between mb-6">
                  <div style={{ color: "#F9F4F1" }}>
                    <IconConsult color="#F9F4F1" />
                  </div>
                  <span className="font-body text-[9px] font-bold uppercase tracking-[0.14em] px-3 py-1.5" style={{ backgroundColor: "rgba(249,244,241,0.12)", color: "#F9F4F1", borderRadius: "100px" }}>
                    {booking.cardB.badge}
                  </span>
                </div>

                <h3 className="relative font-display mb-3" style={{ fontSize: "26px", fontWeight: 300, color: "#F9F4F1", letterSpacing: "-0.01em" }}>
                  {booking.cardB.title}
                </h3>
                <p className="relative font-body text-[13px] leading-[1.7] mb-8" style={{ color: "rgba(249,244,241,0.55)" }}>
                  {booking.cardB.desc}
                </p>

                <div className="relative mb-8 pb-8 border-b" style={{ borderColor: "rgba(249,244,241,0.12)" }}>
                  <p className="font-display" style={{ fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 200, color: "#F9F4F1", lineHeight: 1, letterSpacing: "-0.03em" }}>
                    {booking.cardB.priceBig}
                  </p>
                  <p className="font-body text-[11px] uppercase tracking-[0.14em] mt-2" style={{ color: "rgba(249,244,241,0.4)" }}>
                    {booking.cardB.priceLabel}
                  </p>
                </div>

                <ul className="relative space-y-3 mb-8 flex-1">
                  {booking.cardB.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 font-body text-[13px]">
                      <IconCheck color="#F9F4F1" />
                      <span style={{ color: "rgba(249,244,241,0.7)" }}>{f}</span>
                    </li>
                  ))}
                </ul>

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
            </Reveal>
          </div>

          {/* Trust line */}
          <Reveal delay={360}>
            <div className="text-center">
              <Link
                href="/test"
                className="inline-flex items-center gap-2 font-body text-[12px] transition-opacity hover:opacity-80"
                style={{ color: "rgba(249,244,241,0.4)" }}
              >
                {lang === "es" ? "¿No estás lista aún? Haz el test emocional primero" : "Not ready yet? Take the emotional test first"}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ FOOTER QUOTE ═══════════ */}
      <section className="px-6 text-center" style={{ paddingTop: "clamp(64px,9vw,120px)", paddingBottom: "clamp(64px,9vw,120px)" }}>
        <div className="max-w-xl mx-auto space-y-6">
          <p className="font-display italic" style={{ fontSize: "clamp(22px, 2.8vw, 34px)", fontWeight: 300, color: "#928178", lineHeight: 1.3 }}>
            {lang === "es"
              ? "\u201CEl proceso es tuyo. Nosotros ponemos el método.\u201D"
              : "\u201CThe process is yours. We provide the method.\u201D"}
          </p>
          <Link
            href="/conferencias"
            className="inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.2em] transition-opacity hover:opacity-60"
            style={{ color: "#54132B" }}
          >
            {lang === "es" ? "Explorar programas y eventos" : "Explore programs and events"}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
