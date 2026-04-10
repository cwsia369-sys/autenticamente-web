"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/app/providers/LangProvider";

/* ── Icons ── */
function LockIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="0.85" fill="none" />
      <path d="M5 6V4.5a2 2 0 0 1 4 0V6" stroke="currentColor" strokeWidth="0.85" />
    </svg>
  );
}

function PlayCircle({ size = 40, color = "#54132B" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="19" stroke={color} strokeWidth="0.8" fill="none" />
      <path d="M16 13.5l12 6.5-12 6.5V13.5z" fill={color} fillOpacity="0.9" />
    </svg>
  );
}

function Waveform({ color = "#928178", opacity = 0.4 }: { color?: string; opacity?: number }) {
  const bars = [3, 7, 12, 8, 5, 14, 10, 6, 13, 9, 4, 11, 7, 15, 8, 5, 12, 9, 6, 10, 4, 13, 7, 11, 5];
  return (
    <svg width="120" height="32" viewBox="0 0 120 32" fill="none" aria-hidden="true" style={{ opacity }}>
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 5}
          y={(32 - h) / 2}
          width="3"
          height={h}
          rx="1.5"
          fill={color}
        />
      ))}
    </svg>
  );
}

/* ── Types ── */
type AccessLevel = "free" | "members" | "paid";

interface Audio {
  id: string;
  title: string;
  category: string;
  duration: string;
  access: AccessLevel;
  price?: string;
  desc: string;
  bg: string;
  accent: string;
}

/* ── Data ── */
const categoriesES = ["Todos", "Meditaciones", "Regulación", "Para dormir", "Afirmaciones", "Exclusivos"];
const categoriesEN = ["All",   "Meditations",  "Regulation", "For sleep",  "Affirmations", "Exclusive"];

const audiosES: Audio[] = [
  { id: "a1", title: "Meditación de enraizamiento",        category: "Meditaciones", duration: "12 min", access: "free",    desc: "Vuelve a tu cuerpo y encuentra tierra firme cuando la mente va demasiado rápido.",           bg: "#0D1A1A", accent: "#4A9E8E" },
  { id: "a2", title: "Respiración para la ansiedad",       category: "Regulación",   duration: "8 min",  access: "free",    desc: "Técnica guiada para calmar el sistema nervioso en momentos de alta activación.",              bg: "#0E1A0E", accent: "#5A8A5A" },
  { id: "a3", title: "Meditación de sanación interior",    category: "Meditaciones", duration: "22 min", access: "members", desc: "Un recorrido por las partes de ti que necesitan más amor y menos juicio.",                    bg: "#0D1A1A", accent: "#4A9E8E" },
  { id: "a4", title: "Meditación para dormir: soltar",     category: "Para dormir",  duration: "18 min", access: "members", desc: "Guía nocturna para soltar el día, relajar el cuerpo y entrar en sueño restaurador.",          bg: "#0D0B1F", accent: "#7B6DB0" },
  { id: "a5", title: "Afirmaciones de identidad",          category: "Afirmaciones", duration: "10 min", access: "free",    desc: "Afirmaciones habladas para recordar quién eres más allá de tus roles y tus heridas.",          bg: "#1A0F08", accent: "#C49A5A" },
  { id: "a6", title: "Regulación en 5 minutos",            category: "Regulación",   duration: "5 min",  access: "paid", price: "$5 USD", desc: "Secuencia rápida de regulación nerviosa para usar en cualquier momento.", bg: "#0E1A0E", accent: "#5A8A5A" },
  { id: "a7", title: "Meditación de autocompasión",        category: "Meditaciones", duration: "20 min", access: "members", desc: "Aprende a relacionarte contigo desde la ternura. Una práctica transformadora.",               bg: "#0D1A1A", accent: "#4A9E8E" },
  { id: "a8", title: "Visualización de propósito",         category: "Exclusivos",   duration: "26 min", access: "members", desc: "Guía exclusiva para miembros: visualización profunda hacia tu versión más auténtica.",         bg: "#0A0A0A", accent: "#54132B" },
  { id: "a9", title: "Afirmaciones de abundancia y valor", category: "Afirmaciones", duration: "12 min", access: "members", desc: "Afirmaciones para sanar la relación con el dinero, el valor propio y la recepción.",          bg: "#1A0F08", accent: "#C49A5A" },
];

const audiosEN: Audio[] = [
  { id: "a1", title: "Grounding meditation",               category: "Meditations",  duration: "12 min", access: "free",    desc: "Return to your body and find solid ground when your mind is racing.",                        bg: "#0D1A1A", accent: "#4A9E8E" },
  { id: "a2", title: "Anxiety breathing",                  category: "Regulation",   duration: "8 min",  access: "free",    desc: "Guided technique to calm the nervous system during high activation moments.",               bg: "#0E1A0E", accent: "#5A8A5A" },
  { id: "a3", title: "Inner healing meditation",           category: "Meditations",  duration: "22 min", access: "members", desc: "A journey through the parts of you that need more love and less judgment.",                  bg: "#0D1A1A", accent: "#4A9E8E" },
  { id: "a4", title: "Sleep meditation: release",          category: "For sleep",    duration: "18 min", access: "members", desc: "A nightly guide to release the day, relax the body and enter restorative sleep.",           bg: "#0D0B1F", accent: "#7B6DB0" },
  { id: "a5", title: "Identity affirmations",              category: "Affirmations", duration: "10 min", access: "free",    desc: "Spoken affirmations to remember who you are beyond your roles and wounds.",                  bg: "#1A0F08", accent: "#C49A5A" },
  { id: "a6", title: "5-minute regulation",                category: "Regulation",   duration: "5 min",  access: "paid", price: "$5 USD", desc: "Quick nervous regulation sequence to use at any moment of the day.",    bg: "#0E1A0E", accent: "#5A8A5A" },
  { id: "a7", title: "Self-compassion meditation",         category: "Meditations",  duration: "20 min", access: "members", desc: "Learn to relate to yourself with tenderness. A transformative practice.",                  bg: "#0D1A1A", accent: "#4A9E8E" },
  { id: "a8", title: "Purpose visualization",              category: "Exclusive",    duration: "26 min", access: "members", desc: "Member-exclusive guide: deep visualization toward your most authentic version.",             bg: "#0A0A0A", accent: "#54132B" },
  { id: "a9", title: "Abundance and worth affirmations",   category: "Affirmations", duration: "12 min", access: "members", desc: "Affirmations to heal your relationship with money, self-worth and receiving.",              bg: "#1A0F08", accent: "#C49A5A" },
];

/* ── Stats ── */
const stats = [
  { numEs: "9+",  numEn: "9+",  labelEs: "Audios disponibles",  labelEn: "Available audios" },
  { numEs: "3",   numEn: "3",   labelEs: "Gratuitos",            labelEn: "Free" },
  { numEs: "78+", numEn: "78+", labelEs: "Minutos de contenido", labelEn: "Minutes of content" },
  { numEs: "5",   numEn: "5",   labelEs: "Categorías",           labelEn: "Categories" },
];

export default function AudiosPage() {
  const { lang } = useLang();
  const categories = lang === "es" ? categoriesES : categoriesEN;
  const audios     = lang === "es" ? audiosES     : audiosEN;
  const [active, setActive]     = useState(categories[0]);
  const [playing, setPlaying]   = useState<string | null>(null);

  const filtered = active === categories[0] ? audios : audios.filter(a => a.category === active);
  const featured = audiosES[0]; // Meditación de enraizamiento

  return (
    <div style={{ backgroundColor: "#F9F4F1", color: "#000000" }}>

      {/* ══════════════════════════ HERO ══ */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "#0A0A0A", minHeight: "540px" }}
      >
        {/* Background texture — subtle waveform (static values to avoid hydration mismatch) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" style={{ opacity: 0.04 }}>
          <svg width="1400" height="400" viewBox="0 0 1400 400" fill="none">
            {[97,120,148,170,180,176,160,138,114,94,82,80,88,104,126,150,170,180,178,164,142,118,96,82,78,84,98,118,142,164,178,180,170,152,130,108,90,80,80,90,106,128,150,168,178,180,168,148,124,102,86,80,82,92,110,132,154,172,180,176,162,140,116,96,82,80,84,96,114,138,158,174,180,174,158,136,112,92,82,80].map((h, i) => (
              <rect key={i} x={i * 18} y={(400 - h) / 2} width="10" height={h} rx="5" fill="#F9F4F1" />
            ))}
          </svg>
        </div>

        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 30% 50%, rgba(84,19,43,0.35) 0%, transparent 65%)" }} />

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-8 pt-28 pb-24 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="space-y-7">
            <p className="text-[10px] uppercase tracking-[0.32em] font-body font-semibold" style={{ color: "rgba(84,19,43,0.8)" }}>
              {lang === "es" ? "Audios y Meditaciones" : "Audios & Meditations"}
            </p>
            <h1 className="font-display leading-[1.04]" style={{ fontSize: "clamp(42px, 6vw, 76px)", fontWeight: 300, color: "#F9F4F1" }}>
              {lang === "es" ? "Espacios sonoros" : "Sound spaces"}
              <br />
              <span className="italic" style={{ color: "#7A2040" }}>
                {lang === "es" ? "para volverte a ti." : "to return to yourself."}
              </span>
            </h1>
            <p className="font-body leading-relaxed" style={{ fontSize: "clamp(15px, 1.3vw, 17px)", color: "rgba(249,244,241,0.55)", maxWidth: "440px" }}>
              {lang === "es"
                ? "Guías de audio para regular tu sistema nervioso, meditar, dormir mejor y afirmar lo que necesitas recordar."
                : "Audio guides to regulate your nervous system, meditate, sleep better and affirm what you need to remember."}
            </p>
            <div className="flex items-center gap-3 pt-1">
              <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#54132B" }} />
              <p className="text-sm font-body" style={{ color: "rgba(249,244,241,0.35)" }}>
                {lang === "es"
                  ? "Algunos audios son gratuitos. El acceso completo es para miembros del Círculo."
                  : "Some audios are free. Full access is for Circle members."}
              </p>
            </div>
          </div>

          {/* Right — Featured audio preview */}
          <div
            className="relative overflow-hidden"
            style={{ backgroundColor: "#141414", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.06)", padding: "32px" }}
          >
            <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${featured.accent}55, transparent)` }} />

            <p className="text-[9px] uppercase tracking-[0.28em] font-body font-semibold mb-6" style={{ color: "rgba(249,244,241,0.3)" }}>
              {lang === "es" ? "Audio destacado" : "Featured audio"}
            </p>

            {/* Artwork mini */}
            <div className="relative flex items-center justify-center mb-6" style={{ height: "140px", backgroundColor: featured.bg, borderRadius: "3px", overflow: "hidden" }}>
              <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 50%, ${featured.accent}22 0%, transparent 65%)` }} />
              <Waveform color={featured.accent} opacity={0.6} />
            </div>

            <div className="space-y-2 mb-6">
              <p className="font-body font-semibold text-sm" style={{ color: "#F9F4F1" }}>
                {lang === "es" ? audiosES[0].title : audiosEN[0].title}
              </p>
              <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(249,244,241,0.4)" }}>
                {lang === "es" ? audiosES[0].desc : audiosEN[0].desc}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPlaying(p => p ? null : "featured")}
                  className="transition-opacity hover:opacity-70"
                >
                  <PlayCircle size={40} color={featured.accent} />
                </button>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] font-body" style={{ color: "rgba(249,244,241,0.3)" }}>
                    {playing === "featured" ? (lang === "es" ? "Reproduciendo" : "Playing") : (lang === "es" ? "Escuchar" : "Listen")}
                  </p>
                  <p className="text-xs font-body font-semibold" style={{ color: featured.accent }}>{audiosES[0].duration}</p>
                </div>
              </div>
              <span
                className="px-2 py-1 text-[8px] font-body font-bold uppercase tracking-[0.14em]"
                style={{ backgroundColor: "rgba(84,19,43,0.3)", color: "#F4A0A0", borderRadius: "2px" }}
              >
                {lang === "es" ? "Gratis" : "Free"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════ STATS BAR ══ */}
      <div style={{ backgroundColor: "#F4E7E9", borderBottom: "1px solid rgba(146,129,120,0.2)" }}>
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center lg:text-left">
              <p className="font-display" style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 300, color: "#54132B", lineHeight: 1 }}>
                {lang === "es" ? s.numEs : s.numEn}
              </p>
              <p className="text-[10px] uppercase tracking-[0.18em] font-body mt-1" style={{ color: "#928178" }}>
                {lang === "es" ? s.labelEs : s.labelEn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════ FILTER + GRID ══ */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-[1100px] mx-auto space-y-10">

          {/* Filter pills */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="px-5 py-2 text-[10px] font-body font-semibold uppercase tracking-[0.12em] border transition-all duration-200"
                style={{
                  backgroundColor: active === cat ? "#54132B" : "transparent",
                  color:           active === cat ? "#F9F4F1" : "#928178",
                  borderColor:     active === cat ? "#54132B" : "rgba(146,129,120,0.3)",
                  borderRadius:    "2px",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((audio) => {
              const isLocked = audio.access === "members";
              const isPlaying = playing === audio.id;
              return (
                <div
                  key={audio.id}
                  className="group overflow-hidden"
                  style={{
                    backgroundColor: "#FDFAF8",
                    border:          "1px solid rgba(146,129,120,0.18)",
                    borderRadius:    "3px",
                    transition:      "box-shadow 0.25s ease, transform 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  {/* Artwork area */}
                  <div
                    className="relative flex flex-col justify-between overflow-hidden"
                    style={{ backgroundColor: audio.bg, height: "140px", padding: "20px 20px 16px" }}
                  >
                    {/* Glow */}
                    <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 20% 80%, ${audio.accent}20 0%, transparent 60%)` }} />

                    {/* Top row — category + duration */}
                    <div className="relative flex items-center justify-between">
                      <span
                        className="text-[8px] uppercase tracking-[0.18em] font-body font-semibold px-2 py-0.5"
                        style={{ backgroundColor: `${audio.accent}22`, color: audio.accent, borderRadius: "2px" }}
                      >
                        {audio.category}
                      </span>
                      {isLocked && (
                        <span style={{ color: "rgba(255,255,255,0.3)" }}>
                          <LockIcon size={12} />
                        </span>
                      )}
                    </div>

                    {/* Bottom row — waveform + play */}
                    <div className="relative flex items-center justify-between">
                      <Waveform color={audio.accent} opacity={isLocked ? 0.3 : 0.65} />
                      {!isLocked && (
                        <button
                          onClick={() => setPlaying(p => p === audio.id ? null : audio.id)}
                          className="transition-opacity"
                          style={{ opacity: 0.85 }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
                        >
                          <PlayCircle size={34} color={audio.accent} />
                        </button>
                      )}
                      {isLocked && (
                        <Link href="/membresia">
                          <div
                            className="flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-body font-semibold uppercase tracking-[0.12em]"
                            style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: "2px", color: "rgba(255,255,255,0.4)" }}
                          >
                            <LockIcon size={10} />
                            {lang === "es" ? "Miembros" : "Members"}
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-body font-semibold text-sm leading-snug" style={{ color: "#0A0A0A" }}>
                        {audio.title}
                      </h3>
                      <span
                        className="text-[9px] font-body shrink-0 pt-0.5 uppercase tracking-[0.1em]"
                        style={{ color: "#928178" }}
                      >
                        {audio.duration}
                      </span>
                    </div>
                    <p className="text-xs font-body leading-relaxed" style={{ color: "#928178", lineHeight: 1.65 }}>
                      {audio.desc}
                    </p>
                    <div className="pt-1 flex items-center justify-between">
                      {/* Access badge */}
                      {audio.access === "free" && (
                        <span className="text-[8px] font-body font-bold uppercase tracking-[0.14em] px-2 py-0.5" style={{ backgroundColor: "rgba(84,19,43,0.1)", color: "#54132B", borderRadius: "2px" }}>
                          {lang === "es" ? "Gratis" : "Free"}
                        </span>
                      )}
                      {audio.access === "members" && (
                        <span className="text-[8px] font-body font-bold uppercase tracking-[0.14em] px-2 py-0.5" style={{ backgroundColor: "rgba(146,129,120,0.12)", color: "#928178", borderRadius: "2px" }}>
                          {lang === "es" ? "Solo miembros" : "Members only"}
                        </span>
                      )}
                      {audio.access === "paid" && (
                        <span className="text-[8px] font-body font-bold uppercase tracking-[0.14em] px-2 py-0.5" style={{ backgroundColor: "rgba(0,0,0,0.07)", color: "#4A3F39", borderRadius: "2px" }}>
                          {audio.price}
                        </span>
                      )}

                      {/* CTA */}
                      {audio.access === "free" && (
                        <button
                          onClick={() => setPlaying(p => p === audio.id ? null : audio.id)}
                          className="text-[10px] font-body font-semibold uppercase tracking-[0.1em] transition-opacity hover:opacity-60"
                          style={{ color: "#54132B" }}
                        >
                          {isPlaying ? (lang === "es" ? "Pausar" : "Pause") : (lang === "es" ? "Escuchar →" : "Listen →")}
                        </button>
                      )}
                      {audio.access === "paid" && (
                        <a href="#" className="text-[10px] font-body font-semibold uppercase tracking-[0.1em] transition-opacity hover:opacity-60" style={{ color: "#54132B" }}>
                          {lang === "es" ? "Comprar →" : "Buy →"}
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

      {/* ══════════════════════════ CTA MEMBRESÍA — Apple-style ══ */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "#000000" }}
      >
        {/* Ambient glow — soft radial from center */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 60% at 50% 40%, rgba(122,32,64,0.25) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(84,19,43,0.15) 0%, transparent 60%)" }} />

        <div className="relative z-10 max-w-[900px] mx-auto px-6 lg:px-8 text-center" style={{ paddingTop: "clamp(80px,12vw,140px)", paddingBottom: "clamp(80px,12vw,140px)" }}>

          {/* Supertitle */}
          <p className="font-body font-semibold uppercase tracking-[0.35em] mb-6" style={{ fontSize: "10px", color: "#7A2040" }}>
            {lang === "es" ? "Membresía" : "Membership"}
          </p>

          {/* Main headline — Apple-style giant type */}
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(36px, 6.5vw, 80px)",
              fontWeight: 300,
              lineHeight: 1.06,
              letterSpacing: "-0.025em",
              color: "#F9F4F1",
            }}
          >
            {lang === "es" ? (
              <>Todo lo que necesitas.<br /><span className="italic" style={{ color: "#7A2040" }}>Un solo lugar.</span></>
            ) : (
              <>Everything you need.<br /><span className="italic" style={{ color: "#7A2040" }}>One place.</span></>
            )}
          </h2>

          {/* Subtitle */}
          <p
            className="font-body leading-relaxed mx-auto mt-7"
            style={{
              fontSize: "clamp(15px, 1.4vw, 18px)",
              color: "rgba(249,244,241,0.5)",
              maxWidth: "520px",
            }}
          >
            {lang === "es"
              ? "Audios, meditaciones, conferencias, devocionales y la comunidad que necesitas para no hacerlo sola."
              : "Audios, meditations, conferences, devotionals and the community you need so you don't do it alone."}
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {(lang === "es"
              ? ["9+ Audios", "Meditaciones", "Conferencias", "Devocionales", "Comunidad"]
              : ["9+ Audios", "Meditations", "Conferences", "Devotionals", "Community"]
            ).map((item) => (
              <span
                key={item}
                className="font-body text-[10px] uppercase tracking-[0.12em] font-semibold"
                style={{
                  padding: "7px 16px",
                  border: "1px solid rgba(122,32,64,0.3)",
                  borderRadius: "100px",
                  color: "rgba(249,244,241,0.45)",
                }}
              >
                {item}
              </span>
            ))}
          </div>

          {/* Divider line */}
          <div className="mx-auto mt-14 mb-12" style={{ width: "40px", height: "1px", backgroundColor: "rgba(122,32,64,0.5)" }} />

          {/* Price display — large, confident */}
          <div className="mb-10">
            <p
              className="font-display"
              style={{
                fontSize: "clamp(52px, 7vw, 88px)",
                fontWeight: 200,
                lineHeight: 1,
                color: "#F9F4F1",
                letterSpacing: "-0.03em",
              }}
            >
              $27
            </p>
            <p className="font-body mt-2" style={{ fontSize: "14px", color: "rgba(249,244,241,0.35)", fontWeight: 400 }}>
              {lang === "es" ? "al mes · Cancela cuando quieras" : "per month · Cancel anytime"}
            </p>
          </div>

          {/* CTA buttons — Apple dual-button style */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/membresia"
              className="font-body font-semibold text-sm tracking-[0.04em] transition-all duration-300"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "16px 40px",
                backgroundColor: "#F9F4F1",
                color: "#0A0A0A",
                borderRadius: "100px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#FFFFFF";
                (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#F9F4F1";
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}
            >
              {lang === "es" ? "Unirme al Círculo" : "Join the Circle"}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M5.5 3L9.5 7L5.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/membresia"
              className="font-body text-sm tracking-[0.02em] transition-all duration-300"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "16px 32px",
                color: "#7A9FFF",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              {lang === "es" ? "Conocer más" : "Learn more"}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Trust line */}
          <p className="font-body mt-10" style={{ fontSize: "11px", color: "rgba(249,244,241,0.18)" }}>
            {lang === "es" ? "Acceso inmediato a todos los beneficios. Sin compromisos." : "Immediate access to all benefits. No commitments."}
          </p>
        </div>
      </section>
    </div>
  );
}
