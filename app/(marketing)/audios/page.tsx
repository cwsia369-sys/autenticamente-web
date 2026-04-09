"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/app/providers/LangProvider";

function Divider() {
  return <hr className="border-none h-px my-0" style={{ backgroundColor: "rgba(146,129,120,0.3)" }} />;
}

function EyebrowLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.3em] font-body font-semibold" style={{ color: "#54132B" }}>
      {children}
    </p>
  );
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="8" height="6" rx="1" stroke="#928178" strokeWidth="0.8" fill="none" />
      <path d="M5 6V4.5a2 2 0 0 1 4 0V6" stroke="#928178" strokeWidth="0.8" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="#54132B" strokeWidth="0.7" />
      <path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="#54132B" />
    </svg>
  );
}

/* ── Audio data ── */
type AccessLevel = "free" | "members" | "paid";

interface Audio {
  id: string;
  title: string;
  category: string;
  duration: string;
  access: AccessLevel;
  price?: string;
  desc: string;
  artwork: string;
}

const categoriesES = ["Todos", "Meditaciones", "Regulación", "Para dormir", "Afirmaciones", "Exclusivos"];
const categoriesEN = ["All",   "Meditations",  "Regulation", "For sleep",  "Affirmations","Exclusive"];

const audiosES: Audio[] = [
  { id: "a1", title: "Meditación de enraizamiento",        category: "Meditaciones", duration: "12 min", access: "free",    desc: "Una guía para volver a tu cuerpo y encontrar tierra firme cuando la mente va muy rápido.",       artwork: "🌿" },
  { id: "a2", title: "Respiración para la ansiedad",       category: "Regulación",   duration: "8 min",  access: "free",    desc: "Técnica de respiración guiada para calmar el sistema nervioso en momentos de activación.",        artwork: "🌬️" },
  { id: "a3", title: "Meditación de sanación interior",    category: "Meditaciones", duration: "22 min", access: "members", desc: "Un recorrido profundo por las partes de ti que necesitan más amor y menos juicio.",               artwork: "🌸" },
  { id: "a4", title: "Meditación para dormir: soltar",     category: "Para dormir",  duration: "18 min", access: "members", desc: "Una guía nocturna para soltar el día, relajar el cuerpo y entrar en un sueño restaurador.",       artwork: "🌙" },
  { id: "a5", title: "Afirmaciones de identidad",          category: "Afirmaciones", duration: "10 min", access: "free",    desc: "Afirmaciones habladas para recordar quién eres más allá de tus roles y tus heridas.",            artwork: "✨" },
  { id: "a6", title: "Regulación en 5 minutos",            category: "Regulación",   duration: "5 min",  access: "paid",  price: "$5 USD", desc: "Una secuencia rápida de regulación nerviosa para usar en cualquier momento del día.",  artwork: "⚡" },
  { id: "a7", title: "Meditación de autocompasión",        category: "Meditaciones", duration: "20 min", access: "members", desc: "Aprende a relacionarte contigo desde la ternura. Una práctica transformadora de autocompasión.", artwork: "💛" },
  { id: "a8", title: "Visualización de propósito",         category: "Exclusivos",   duration: "26 min", access: "members", desc: "Guía exclusiva para miembros: visualización profunda hacia tu versión más auténtica.",             artwork: "🔮" },
  { id: "a9", title: "Afirmaciones de abundancia y valor", category: "Afirmaciones", duration: "12 min", access: "members", desc: "Afirmaciones para sanar la relación con el dinero, el valor propio y la recepción.",             artwork: "🌻" },
];

const audiosEN: Audio[] = [
  { id: "a1", title: "Grounding meditation",               category: "Meditations",  duration: "12 min", access: "free",    desc: "A guide to return to your body and find solid ground when your mind is racing.",                artwork: "🌿" },
  { id: "a2", title: "Anxiety breathing",                  category: "Regulation",   duration: "8 min",  access: "free",    desc: "Guided breathing technique to calm the nervous system during activation moments.",              artwork: "🌬️" },
  { id: "a3", title: "Inner healing meditation",           category: "Meditations",  duration: "22 min", access: "members", desc: "A deep journey through the parts of you that need more love and less judgment.",                artwork: "🌸" },
  { id: "a4", title: "Sleep meditation: release",          category: "For sleep",    duration: "18 min", access: "members", desc: "A nightly guide to release the day, relax the body and enter restorative sleep.",               artwork: "🌙" },
  { id: "a5", title: "Identity affirmations",              category: "Affirmations", duration: "10 min", access: "free",    desc: "Spoken affirmations to remember who you are beyond your roles and wounds.",                     artwork: "✨" },
  { id: "a6", title: "5-minute regulation",                category: "Regulation",   duration: "5 min",  access: "paid",  price: "$5 USD", desc: "A quick nervous regulation sequence to use at any moment of the day.",          artwork: "⚡" },
  { id: "a7", title: "Self-compassion meditation",         category: "Meditations",  duration: "20 min", access: "members", desc: "Learn to relate to yourself with tenderness. A transformative self-compassion practice.",       artwork: "💛" },
  { id: "a8", title: "Purpose visualization",              category: "Exclusive",    duration: "26 min", access: "members", desc: "Member-exclusive guide: deep visualization toward your most authentic version.",                artwork: "🔮" },
  { id: "a9", title: "Abundance and worth affirmations",   category: "Affirmations", duration: "12 min", access: "members", desc: "Affirmations to heal your relationship with money, self-worth and receiving.",                  artwork: "🌻" },
];

function AccessBadge({ access, price, lang }: { access: AccessLevel; price?: string; lang: string }) {
  if (access === "free") {
    return (
      <span
        className="px-2 py-0.5 text-[9px] font-body font-semibold uppercase tracking-[0.12em]"
        style={{ backgroundColor: "rgba(84,19,43,0.15)", color: "#54132B", borderRadius: "2px" }}
      >
        {lang === "es" ? "Gratis" : "Free"}
      </span>
    );
  }
  if (access === "paid") {
    return (
      <span
        className="px-2 py-0.5 text-[9px] font-body font-semibold uppercase tracking-[0.12em]"
        style={{ backgroundColor: "rgba(0,0,0,0.08)", color: "#000000", borderRadius: "2px" }}
      >
        {price}
      </span>
    );
  }
  return (
    <span
      className="px-2 py-0.5 text-[9px] font-body font-semibold uppercase tracking-[0.12em] flex items-center gap-1"
      style={{ backgroundColor: "rgba(146,129,120,0.15)", color: "#928178", borderRadius: "2px" }}
    >
      <LockIcon />
      {lang === "es" ? "Miembros" : "Members"}
    </span>
  );
}

export default function AudiosPage() {
  const { lang } = useLang();
  const categories = lang === "es" ? categoriesES : categoriesEN;
  const audios     = lang === "es" ? audiosES     : audiosEN;
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filteredAudios = activeCategory === categories[0]
    ? audios
    : audios.filter(a => a.category === activeCategory);

  return (
    <div style={{ backgroundColor: "#F9F4F1", color: "#000000" }}>

      {/* ══════════════════════════════════════ HERO ══ */}
      <section className="relative overflow-hidden px-6 pt-24 pb-28" style={{ backgroundColor: "#F4E7E9" }}>
        <div className="relative z-10 max-w-[1100px] mx-auto space-y-6">
          <EyebrowLabel>
            {lang === "es" ? "Audios y Meditaciones" : "Audios & Meditations"}
          </EyebrowLabel>
          <h1
            className="font-display leading-tight hero-title"
            style={{ fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 300, color: "#000000" }}
          >
            {lang === "es" ? "Espacios sonoros" : "Sound spaces"}
            <br />
            <span className="italic" style={{ color: "#54132B" }}>
              {lang === "es" ? "para volverte a ti." : "to return to yourself."}
            </span>
          </h1>
          <p
            className="font-body font-light max-w-lg leading-relaxed"
            style={{ fontSize: "clamp(15px, 1.4vw, 17.5px)", color: "#000000", opacity: 0.65 }}
          >
            {lang === "es"
              ? "Guías de audio para regular tu sistema nervioso, meditar, dormir mejor y afirmar lo que necesitas recordar."
              : "Audio guides to regulate your nervous system, meditate, sleep better and affirm what you need to remember."}
          </p>

          {/* Free notice */}
          <div className="flex items-center gap-3 pt-2">
            <PlayIcon />
            <p className="text-sm font-body" style={{ color: "#000000", opacity: 0.7 }}>
              {lang === "es"
                ? "Algunos audios son gratuitos. El acceso completo es para miembros del Círculo."
                : "Some audios are free. Full access is for Circle members."}
            </p>
          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════ FILTER + GRID ══ */}
      <section className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto space-y-10">

          {/* Category filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 text-xs font-body font-semibold uppercase tracking-[0.1em] border transition-all duration-200"
                style={{
                  backgroundColor: activeCategory === cat ? "#54132B"                    : "transparent",
                  color:           activeCategory === cat ? "#F9F4F1"                    : "#928178",
                  borderColor:     activeCategory === cat ? "#54132B" : "rgba(146,129,120,0.35)",
                  borderRadius:    "2px",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Audio grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAudios.map((audio) => {
              const isLocked = audio.access === "members";
              return (
                <div
                  key={audio.id}
                  className="biblio-card group border"
                  style={{
                    backgroundColor: "#F4E7E9",
                    borderColor:     "rgba(146,129,120,0.2)",
                    borderRadius:    "2px",
                    opacity:         isLocked ? 0.88 : 1,
                  }}
                >
                  {/* Artwork */}
                  <div
                    className="flex items-center justify-center text-4xl"
                    style={{
                      height:          "120px",
                      backgroundColor: isLocked ? "rgba(0,0,0,0.06)" : "#F9F4F1",
                      borderBottom:    "1px solid rgba(146,129,120,0.15)",
                      position:        "relative",
                    }}
                  >
                    <span aria-hidden="true">{audio.artwork}</span>
                    {isLocked && (
                      <div
                        className="absolute top-3 right-3"
                        style={{ opacity: 0.5 }}
                      >
                        <LockIcon />
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className="font-body font-semibold text-sm leading-snug"
                        style={{ color: "#000000" }}
                      >
                        {audio.title}
                      </h3>
                      <span className="text-[10px] font-body shrink-0 pt-0.5" style={{ color: "#928178" }}>
                        {audio.duration}
                      </span>
                    </div>
                    <p className="text-xs font-body leading-relaxed" style={{ color: "#928178" }}>
                      {audio.desc}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <AccessBadge access={audio.access} price={audio.price} lang={lang} />

                      {audio.access === "free" && (
                        <button
                          className="biblio-buy-btn flex items-center gap-1.5 text-xs font-body font-semibold uppercase tracking-[0.1em]"
                          style={{ color: "#54132B" }}
                        >
                          <PlayIcon />
                          {lang === "es" ? "Escuchar" : "Listen"}
                        </button>
                      )}
                      {audio.access === "members" && (
                        <Link
                          href="/membresia"
                          className="text-xs font-body font-semibold uppercase tracking-[0.1em]"
                          style={{ color: "#928178" }}
                        >
                          {lang === "es" ? "Ver membresía" : "View membership"}
                        </Link>
                      )}
                      {audio.access === "paid" && (
                        <a
                          href="#"
                          className="biblio-buy-btn text-xs font-body font-semibold uppercase tracking-[0.1em]"
                          style={{ color: "#54132B" }}
                        >
                          {lang === "es" ? "Comprar" : "Buy"}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════ CTA MEMBRESÍA ══ */}
      <section className="py-24 px-6" style={{ backgroundColor: "#F4E7E9" }}>
        <div className="max-w-[1100px] mx-auto">
          <div
            className="relative overflow-hidden px-10 py-16 lg:px-20 lg:py-20"
            style={{ backgroundColor: "#000000", borderRadius: "2px" }}
          >
            <svg
              className="absolute pointer-events-none select-none -right-20 -bottom-20 w-[400px] h-[400px] opacity-20"
              viewBox="0 0 400 400" fill="none" aria-hidden="true"
            >
              <circle cx="200" cy="200" r="180" stroke="#928178" strokeWidth="0.6" />
              <circle cx="200" cy="200" r="120" stroke="#928178" strokeWidth="0.6" />
              <circle cx="200" cy="200" r="60"  stroke="#928178" strokeWidth="0.6" />
            </svg>
            <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] font-body font-semibold" style={{ color: "rgba(84,19,43,0.7)" }}>
                  {lang === "es" ? "Círculo Vuelve a Ti" : "Return to Yourself Circle"}
                </p>
                <h2
                  className="font-display leading-tight"
                  style={{ fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, color: "#F9F4F1" }}
                >
                  {lang === "es"
                    ? "Accede a toda la biblioteca ilimitada."
                    : "Access the entire unlimited library."}
                </h2>
                <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(249,244,241,0.6)" }}>
                  {lang === "es"
                    ? "Los miembros del Círculo tienen acceso completo a todos los audios, meditaciones y contenidos exclusivos."
                    : "Circle members have full access to all audios, meditations and exclusive content."}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row md:flex-col gap-4 md:items-end">
                <div>
                  <p
                    className="font-display"
                    style={{ fontSize: "clamp(38px, 4vw, 52px)", fontWeight: 300, color: "#F9F4F1", lineHeight: 1 }}
                  >
                    $27
                    <span className="font-body text-sm font-light ml-1" style={{ color: "rgba(249,244,241,0.45)" }}>
                      / {lang === "es" ? "mes" : "month"}
                    </span>
                  </p>
                  <p className="text-xs font-body mt-1 tracking-[0.12em] uppercase" style={{ color: "rgba(249,244,241,0.35)" }}>
                    {lang === "es" ? "Cancela cuando quieras" : "Cancel anytime"}
                  </p>
                </div>
                <Link
                  href="/membresia"
                  className="btn-primary px-8 py-4 text-sm font-body font-medium tracking-[0.08em] text-center"
                  style={{ backgroundColor: "#54132B", color: "#F9F4F1", borderRadius: "2px" }}
                >
                  {lang === "es" ? "Unirme al Círculo →" : "Join the Circle →"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
