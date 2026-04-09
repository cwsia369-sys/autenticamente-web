"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/app/providers/LangProvider";

/* ─────────────────────────────────────────────
   DATOS DE EPISODIOS
───────────────────────────────────────────── */
const episodesES = [
  {
    number: 12, title: "Cómo la ansiedad te habla: señales que no debes ignorar",
    desc:   "El cuerpo como mensajero emocional. Aprende a distinguir entre ansiedad adaptativa y la que te pide atención urgente.",
    duration: "38 min", date: "31 mar 2026", tags: ["Ansiedad", "Regulación"], isNew: true,
    quote: "La ansiedad no es tu enemiga. Es tu sistema nervioso pidiéndote que escuches.",
  },
  {
    number: 11, title: "Identidad después de la maternidad: ¿quién soy ahora?",
    desc:   "Una conversación honesta sobre reconstitución de identidad cuando la maternidad lo transforma todo.",
    duration: "44 min", date: "17 mar 2026", tags: ["Identidad", "Transformación"], isNew: false,
    quote: "",
  },
  {
    number: 10, title: "El miedo a ser vista: visibilidad y vulnerabilidad",
    desc:   "Por qué brillar nos da miedo y cómo el miedo a ser vista puede estar limitando tu vida sin que lo notes.",
    duration: "41 min", date: "3 mar 2026", tags: ["Miedo", "Visibilidad"], isNew: false,
    quote: "",
  },
  {
    number: 9, title: "Límites: no como rechazo, sino como amor propio",
    desc:   "La diferencia entre un límite que protege y uno que aísla. Cómo decir no desde la presencia, no desde el miedo.",
    duration: "35 min", date: "17 feb 2026", tags: ["Límites", "Autoestima"], isNew: false,
    quote: "",
  },
  {
    number: 8, title: "Cuando el duelo no tiene nombre: pérdidas que no se hablan",
    desc:   "Duelos de relaciones que no terminaron con muerte, de versiones de ti que quedaron atrás.",
    duration: "49 min", date: "3 feb 2026", tags: ["Duelo", "Emociones"], isNew: false,
    quote: "",
  },
  {
    number: 7, title: "El síndrome del impostor: entre el logro y el miedo al fraude",
    desc:   "Por qué quienes más logran suelen sentirse más impostores, y cómo salir de esa trampa interna.",
    duration: "37 min", date: "20 ene 2026", tags: ["Impostor", "Logro"], isNew: false,
    quote: "",
  },
];

const episodesEN = [
  {
    number: 12, title: "How anxiety speaks to you: signals you shouldn't ignore",
    desc:   "The body as emotional messenger. Learn to distinguish adaptive anxiety from the kind that demands urgent attention.",
    duration: "38 min", date: "Mar 31, 2026", tags: ["Anxiety", "Regulation"], isNew: true,
    quote: "Anxiety isn't your enemy. It's your nervous system asking you to listen.",
  },
  {
    number: 11, title: "Identity after motherhood: who am I now?",
    desc:   "An honest conversation about identity reconstruction when motherhood transforms everything.",
    duration: "44 min", date: "Mar 17, 2026", tags: ["Identity", "Transformation"], isNew: false,
    quote: "",
  },
  {
    number: 10, title: "Fear of being seen: visibility and vulnerability",
    desc:   "Why shining scares us and how the fear of being seen may be limiting your life without you noticing.",
    duration: "41 min", date: "Mar 3, 2026", tags: ["Fear", "Visibility"], isNew: false,
    quote: "",
  },
  {
    number: 9, title: "Boundaries: not as rejection, but as self-love",
    desc:   "The difference between a boundary that protects and one that isolates. How to say no from presence, not fear.",
    duration: "35 min", date: "Feb 17, 2026", tags: ["Boundaries", "Self-esteem"], isNew: false,
    quote: "",
  },
  {
    number: 8, title: "When grief has no name: losses that aren't spoken",
    desc:   "Grief from relationships that didn't end in death, from past versions of yourself.",
    duration: "49 min", date: "Feb 3, 2026", tags: ["Grief", "Emotions"], isNew: false,
    quote: "",
  },
  {
    number: 7, title: "Imposter syndrome: between achievement and fear of fraud",
    desc:   "Why those who achieve the most often feel like the biggest impostors, and how to escape that internal trap.",
    duration: "37 min", date: "Jan 20, 2026", tags: ["Imposter", "Achievement"], isNew: false,
    quote: "",
  },
];

const platforms = [
  { name: "Spotify",        href: "#" },
  { name: "Apple Podcasts", href: "#" },
  { name: "YouTube",        href: "#" },
  { name: "iVoox",          href: "#" },
];

/* ─────────────────────────────────────────────
   ICONOS
───────────────────────────────────────────── */
function PlayIcon({ size = 18, color = "#54132B" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="8.3" stroke={color} strokeWidth="0.8" />
      <path d="M7.2 6.2l5.2 2.8-5.2 2.8V6.2z" fill={color} />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
      <circle cx="5.5" cy="5.5" r="4.8" stroke="#928178" strokeWidth="0.7" />
      <path d="M5.5 3v2.5l1.5 1" stroke="#928178" strokeWidth="0.7" strokeLinecap="round" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   COMPONENTE PRINCIPAL
───────────────────────────────────────────── */
export default function PodcastPage() {
  const { lang } = useLang();
  const episodes  = lang === "es" ? episodesES : episodesEN;
  const featured  = episodes[0];
  const rest      = episodes.slice(1);
  const [hoveredEp, setHoveredEp] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: "#F9F4F1", color: "#000000" }}>

      {/* ══════════════════════════════════════════════════════
          A. HERO — editorial tipográfico, cálido, sin card negra
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative px-6 pt-20 pb-24 lg:pt-28 lg:pb-32 overflow-hidden"
        style={{ backgroundColor: "#F9F4F1" }}
      >
        {/* Decorativo: número grande de fondo */}
        <div
          className="absolute right-0 top-0 select-none pointer-events-none hidden lg:block"
          aria-hidden="true"
          style={{
            fontFamily:    "var(--font-am-display)",
            fontSize:      "clamp(260px, 28vw, 400px)",
            fontWeight:    800,
            color:         "rgba(84,19,43,0.04)",
            lineHeight:    1,
            letterSpacing: "-0.04em",
            userSelect:    "none",
            top:           "-40px",
            right:         "-20px",
          }}
        >
          12
        </div>

        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-20 items-end">

          {/* Izquierda — titular grande */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <span style={{ display: "block", width: 32, height: 1, backgroundColor: "#54132B" }} />
              <span className="text-[10.5px] font-body font-bold uppercase tracking-[0.32em]" style={{ color: "#54132B" }}>
                Podcast
              </span>
            </div>
            <h1
              className="font-display leading-[0.88]"
              style={{ fontSize: "clamp(56px, 9vw, 124px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#000000" }}
            >
              {lang === "es" ? "Conversaciones" : "Conversations"}
              <br />
              <span style={{ color: "#54132B" }}>{lang === "es" ? "que van" : "that go"}</span>
              <br />
              {lang === "es" ? "adentro." : "deeper."}
            </h1>
          </div>

          {/* Derecha — descripción + plataformas */}
          <div className="space-y-8 pb-2">
            <div style={{ width: 36, height: 1, backgroundColor: "rgba(0,0,0,0.10)" }} />
            <p
              className="font-body leading-relaxed"
              style={{ fontSize: "clamp(14px, 1.3vw, 16.5px)", color: "#928178", lineHeight: 1.8 }}
            >
              {lang === "es"
                ? "Psicología, emociones, identidad y propósito. Cada episodio, una herramienta para tu proceso de transformación."
                : "Psychology, emotions, identity and purpose. Each episode, a tool for your transformation process."}
            </p>
            <div className="space-y-3">
              <p className="text-[10px] font-body font-bold uppercase tracking-[0.25em]" style={{ color: "rgba(0,0,0,0.28)" }}>
                {lang === "es" ? "Escúchanos en" : "Listen on"}
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {platforms.map((p) => (
                  <a
                    key={p.name}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11.5px] font-body font-semibold uppercase tracking-[0.12em] transition-colors"
                    style={{ color: "rgba(0,0,0,0.42)", textDecoration: "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#54132B")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.42)")}
                  >
                    {p.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          B. EPISODIO DESTACADO — fondo negro, editorial fuerte
      ══════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#000000" }}>
        <div className="max-w-[1280px] mx-auto px-6 py-16 lg:py-24">

          {/* Label */}
          <div className="mb-12 flex items-center gap-4">
            <span style={{ display: "block", width: 28, height: 1, backgroundColor: "rgba(244,231,233,0.35)" }} />
            <span
              className="text-[10px] font-body font-bold uppercase tracking-[0.32em]"
              style={{ color: "rgba(244,231,233,0.5)" }}
            >
              {lang === "es" ? "Episodio más reciente" : "Latest episode"}
            </span>
          </div>

          <div className="grid lg:grid-cols-[auto_1fr_auto] gap-8 lg:gap-16 items-start">

            {/* Número grande */}
            <div className="hidden lg:block">
              <span
                className="font-display font-bold"
                style={{
                  fontSize:      "clamp(80px, 10vw, 140px)",
                  fontWeight:    800,
                  color:         "rgba(255,255,255,0.06)",
                  lineHeight:    1,
                  letterSpacing: "-0.04em",
                  display:       "block",
                }}
              >
                {String(featured.number).padStart(2, "0")}
              </span>
            </div>

            {/* Contenido central */}
            <div className="space-y-6">
              {/* Badge NUEVO */}
              {featured.isNew && (
                <span
                  className="inline-block text-[9px] font-body font-bold uppercase tracking-[0.22em] px-3 py-1.5"
                  style={{ backgroundColor: "#54132B", color: "#FFFFFF", borderRadius: "2px" }}
                >
                  {lang === "es" ? "Nuevo episodio" : "New episode"}
                </span>
              )}

              <h2
                className="font-display leading-[1.0]"
                style={{
                  fontSize:      "clamp(26px, 3.5vw, 48px)",
                  fontWeight:    700,
                  color:         "#FFFFFF",
                  letterSpacing: "-0.02em",
                }}
              >
                {featured.title}
              </h2>

              <p
                className="font-body leading-relaxed"
                style={{ fontSize: "clamp(14px, 1.2vw, 16px)", color: "rgba(255,255,255,0.5)", maxWidth: 500 }}
              >
                {featured.desc}
              </p>

              {/* Quote del episodio */}
              {featured.quote && (
                <blockquote
                  className="font-detail"
                  style={{
                    fontSize:    "clamp(16px, 1.5vw, 20px)",
                    color:       "#F4E7E9",
                    lineHeight:  1.6,
                    borderLeft:  "2px solid #54132B",
                    paddingLeft: "1.2rem",
                    maxWidth:    440,
                    fontStyle:   "italic",
                  }}
                >
                  "{featured.quote}"
                </blockquote>
              )}

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-1.5">
                  <ClockIcon />
                  <span className="text-[11px] font-body" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {featured.duration}
                  </span>
                </div>
                <span className="text-[11px] font-body" style={{ color: "rgba(255,255,255,0.22)" }}>
                  {featured.date}
                </span>
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9.5px] font-body font-semibold uppercase tracking-[0.14em] px-2.5 py-1"
                    style={{ backgroundColor: "rgba(244,231,233,0.08)", color: "#F4E7E9", borderRadius: "2px" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA derecha */}
            <div className="flex flex-col gap-3 items-start lg:items-end">
              <a
                href={"#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-7 py-4 transition-all duration-200"
                style={{ backgroundColor: "#F4E7E9", color: "#54132B", borderRadius: "2px" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#FFFFFF"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#F4E7E9"; }}
              >
                <PlayIcon size={16} color="#54132B" />
                <span className="text-[11px] font-body font-bold uppercase tracking-[0.16em]">
                  {lang === "es" ? "Escuchar" : "Listen"}
                </span>
              </a>
              <span className="text-[10px] font-body text-center" style={{ color: "rgba(255,255,255,0.2)" }}>
                Spotify · Apple · YouTube
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          C. LISTA DE EPISODIOS — editorial, limpia, con hover
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 px-6" style={{ backgroundColor: "#FAF9F9" }}>
        <div className="max-w-[1280px] mx-auto">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div className="space-y-3">
              <span
                className="text-[10px] font-body font-bold uppercase tracking-[0.3em]"
                style={{ color: "#54132B" }}
              >
                {lang === "es" ? "Todos los episodios" : "All episodes"}
              </span>
              <h2
                className="font-display leading-none"
                style={{
                  fontSize:      "clamp(28px, 4vw, 52px)",
                  fontWeight:    700,
                  color:         "#000000",
                  letterSpacing: "-0.025em",
                }}
              >
                {lang === "es" ? "TEMPORADA 1" : "SEASON 1"}
              </h2>
            </div>
            <p className="font-body text-[12px]" style={{ color: "#928178" }}>
              {episodes.length} {lang === "es" ? "conversaciones" : "conversations"}
            </p>
          </div>

          {/* Filas de episodios */}
          <div>
            {rest.map((ep, idx) => (
              <div
                key={ep.number}
                className="group relative"
                style={{
                  borderTop:         "1px solid rgba(0,0,0,0.06)",
                  borderBottom:      idx === rest.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
                  backgroundColor:   hoveredEp === ep.number ? "#FFFFFF" : "transparent",
                  transition:        "background-color 0.22s ease",
                }}
                onMouseEnter={() => setHoveredEp(ep.number)}
                onMouseLeave={() => setHoveredEp(null)}
              >
                {/* Línea burgundy izquierda en hover */}
                <div
                  style={{
                    position:        "absolute",
                    left:            0,
                    top:             0,
                    bottom:          0,
                    width:           "2px",
                    backgroundColor: "#54132B",
                    opacity:         hoveredEp === ep.number ? 1 : 0,
                    transition:      "opacity 0.22s ease",
                  }}
                />

                <div className="grid sm:grid-cols-[56px_1fr_auto] gap-4 lg:gap-8 py-6 lg:py-7 px-4 lg:px-6 items-center">

                  {/* Número */}
                  <div className="hidden sm:flex items-center justify-center">
                    <span
                      className="font-display font-bold tabular-nums"
                      style={{
                        fontSize:   "clamp(13px, 1.4vw, 17px)",
                        color:      hoveredEp === ep.number ? "#54132B" : "rgba(0,0,0,0.18)",
                        transition: "color 0.22s ease",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {String(ep.number).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Título + descripción */}
                  <div className="space-y-2 min-w-0">
                    <h3
                      className="font-body font-semibold leading-snug"
                      style={{
                        fontSize:   "clamp(13.5px, 1.3vw, 16px)",
                        color:      "#000000",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {ep.title}
                    </h3>
                    <p
                      className="font-body leading-relaxed line-clamp-2"
                      style={{ fontSize: "12.5px", color: "#928178", lineHeight: 1.6 }}
                    >
                      {ep.desc}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
                      {ep.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-body font-bold uppercase tracking-[0.14em]"
                          style={{ color: "#54132B" }}
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="text-[9px] font-body" style={{ color: "rgba(0,0,0,0.25)" }}>
                        ·
                      </span>
                      <div className="flex items-center gap-1">
                        <ClockIcon />
                        <span className="text-[10px] font-body" style={{ color: "#928178" }}>
                          {ep.duration}
                        </span>
                      </div>
                      <span className="text-[10px] font-body" style={{ color: "rgba(0,0,0,0.22)" }}>
                        {ep.date}
                      </span>
                    </div>
                  </div>

                  {/* CTA escuchar */}
                  <div
                    className="flex items-center gap-2 shrink-0 transition-all duration-200"
                    style={{
                      opacity:   hoveredEp === ep.number ? 1 : 0,
                      transform: hoveredEp === ep.number ? "translateX(0)" : "translateX(8px)",
                    }}
                  >
                    <PlayIcon size={15} color="#54132B" />
                    <a
                      href={"#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10.5px] font-body font-bold uppercase tracking-[0.14em]"
                      style={{ color: "#54132B", textDecoration: "none" }}
                    >
                      {lang === "es" ? "Escuchar" : "Listen"}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          D. CTA FINAL — membresía / más episodios
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 px-6" style={{ backgroundColor: "#54132B" }}>
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-12 items-center">

          <div className="space-y-6">
            <span
              className="text-[10px] font-body font-bold uppercase tracking-[0.32em]"
              style={{ color: "rgba(244,231,233,0.5)" }}
            >
              {lang === "es" ? "Círculo Vuelve a Ti" : "Return to Yourself Circle"}
            </span>
            <h2
              className="font-display leading-[0.95]"
              style={{
                fontSize:      "clamp(32px, 5vw, 62px)",
                fontWeight:    700,
                color:         "#FFFFFF",
                letterSpacing: "-0.025em",
              }}
            >
              {lang === "es"
                ? <>Hay más<br />conversaciones<br />esperando.</>
                : <>More<br />conversations<br />waiting.</>}
            </h2>
          </div>

          <div className="space-y-5">
            <p
              className="font-body leading-relaxed"
              style={{ fontSize: "clamp(14px, 1.3vw, 16px)", color: "rgba(244,231,233,0.65)", lineHeight: 1.75 }}
            >
              {lang === "es"
                ? "Los miembros del Círculo acceden a episodios exclusivos, audios de profundización y contenido que no está disponible en ninguna plataforma pública."
                : "Circle members access exclusive episodes, deep-dive audios and content not available on any public platform."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/membresia"
                className="text-[11px] font-body font-bold uppercase tracking-[0.16em] px-8 py-4 transition-all"
                style={{ backgroundColor: "#F4E7E9", color: "#54132B", borderRadius: "2px" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#FFFFFF"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#F4E7E9"; }}
              >
                {lang === "es" ? "Unirme al Círculo →" : "Join the Circle →"}
              </Link>
              <Link
                href="/audios"
                className="text-[11px] font-body font-semibold uppercase tracking-[0.14em] px-8 py-4 border transition-all"
                style={{ color: "rgba(244,231,233,0.7)", borderColor: "rgba(244,231,233,0.22)", borderRadius: "2px" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(244,231,233,0.6)"; e.currentTarget.style.color = "#F4E7E9"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(244,231,233,0.22)"; e.currentTarget.style.color = "rgba(244,231,233,0.7)"; }}
              >
                {lang === "es" ? "Explorar audios" : "Explore audios"}
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
