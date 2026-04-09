"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/app/providers/LangProvider";
import { useRef, useState, useEffect, useCallback } from "react";

/* ─── Micro helpers ─── */
function Divider() {
  return <hr className="border-none h-px" style={{ backgroundColor: "rgba(0,0,0,0.07)" }} />;
}

/* ─── Decorative geometric overlay — recuadros translúcidos ─── */
function GeoLayer({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const stroke = variant === "dark"
    ? "rgba(255,255,255,0.045)"
    : "rgba(84,19,43,0.07)";
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0 }} preserveAspectRatio="xMidYMid slice">
        {/* Large outer rect — full bleed */}
        <rect x="5%" y="8%" width="90%" height="84%" fill="none" stroke={stroke} strokeWidth="1"/>
        {/* Mid rect — offset */}
        <rect x="14%" y="18%" width="72%" height="64%" fill="none" stroke={stroke} strokeWidth="0.8"/>
        {/* Corner accent — top left */}
        <rect x="5%" y="8%" width="18%" height="22%" fill="none" stroke={variant === "dark" ? "rgba(255,255,255,0.06)" : "rgba(84,19,43,0.09)"} strokeWidth="1"/>
        {/* Corner accent — bottom right */}
        <rect x="77%" y="70%" width="18%" height="22%" fill="none" stroke={variant === "dark" ? "rgba(255,255,255,0.06)" : "rgba(84,19,43,0.09)"} strokeWidth="1"/>
        {/* Thin inner rect */}
        <rect x="22%" y="28%" width="56%" height="44%" fill="none" stroke={stroke} strokeWidth="0.6"/>
        {/* Vertical line — left accent */}
        <line x1="5%" y1="8%" x2="5%" y2="92%" stroke={variant === "dark" ? "rgba(255,255,255,0.05)" : "rgba(84,19,43,0.06)"} strokeWidth="1"/>
        {/* Vertical line — right accent */}
        <line x1="95%" y1="8%" x2="95%" y2="92%" stroke={variant === "dark" ? "rgba(255,255,255,0.05)" : "rgba(84,19,43,0.06)"} strokeWidth="1"/>
      </svg>
    </div>
  );
}

function Tag({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className="inline-block text-[10.5px] font-body font-bold uppercase tracking-[0.32em]"
      style={{ color: light ? "rgba(255,255,255,0.5)" : "#54132B" }}
    >
      {children}
    </span>
  );
}

/* ─── Platform features ─── */
const featuresES = [
  { label: "Conferencias",          icon: "01", desc: "Experiencias presenciales y virtuales para despertar, conectar y avanzar con más conciencia.", href: "/conferencias" },
  { label: "Membresía",             icon: "02", desc: "Un espacio de crecimiento continuo con acceso a recursos, experiencias y comunidad.",          href: "/membresia"   },
  { label: "Podcast",               icon: "03", desc: "Conversaciones que te ayudan a entender lo que sientes.",                                      href: "/podcast"     },
  { label: "Audios y Meditaciones", icon: "04", desc: "Espacios sonoros para regularte, reconectarte y avanzar desde adentro.",                      href: "/audios"      },
  { label: "Biblioteca Digital",    icon: "05", desc: "Ebooks, workbooks y guías para profundizar en distintas áreas de tu desarrollo.",             href: "/biblioteca"  },
  { label: "Devocionales",          icon: "06", desc: "Dos veces por semana, palabras para avanzar con más intención y más verdad.",                  href: "/devocionales"},
];
const featuresEN = [
  { label: "Conferences",           icon: "01", desc: "In-person and virtual experiences to awaken, connect and move forward with more awareness.",   href: "/conferencias"},
  { label: "Membership",            icon: "02", desc: "A continuous growth space with access to resources, experiences and community.",                href: "/membresia"  },
  { label: "Podcast",               icon: "03", desc: "Conversations that help you understand what you feel.",                                         href: "/podcast"    },
  { label: "Audios & Meditations",  icon: "04", desc: "Sound spaces to regulate, reconnect and move forward from within.",                             href: "/audios"     },
  { label: "Digital Library",       icon: "05", desc: "Ebooks, workbooks and guides to deepen different areas of your development.",                   href: "/biblioteca" },
  { label: "Devotionals",           icon: "06", desc: "Twice a week, words to move forward with more intention and more truth.",                       href: "/devocionales"},
];

const testimonialsES = [
  {
    quote: "Llegué buscando respuestas y encontré algo más valioso: las preguntas correctas. Esto me cambió la manera de ver quién soy.",
    name: "Mariana R.", city: "Bogotá, Colombia", tag: "Conferencia AuténticaMente",
    result: "Reconectó con su identidad", initial: "M",
  },
  {
    quote: "No sabía que había una diferencia entre crecer y transformarse. AuténticaMente me mostró que sí la hay. Y quería la segunda.",
    name: "Carlos M.", city: "Medellín, Colombia", tag: "Membresía · Círculo Vuelve a Ti",
    result: "Encontró un proceso real de crecimiento", initial: "C",
  },
  {
    quote: "Fue la primera vez que alguien describió exactamente lo que yo sentía sin juzgarlo. Escuché el podcast llorando y sintiéndome menos sola en el proceso.",
    name: "Valentina S.", city: "Ciudad de México", tag: "Podcast AuténticaMente",
    result: "Dejó de sentirse sola en su proceso", initial: "V",
  },
  {
    quote: "Vine con dudas de si esto era para mí. Terminé siendo el miembro más constante del círculo. El contenido es honesto, profundo y distinto a todo lo que había probado.",
    name: "Jorge A.", city: "Miami, EE.UU.", tag: "Membresía · Círculo Vuelve a Ti",
    result: "Comprometido con su transformación", initial: "J",
  },
];
const testimonialsEN = [
  {
    quote: "I came looking for answers and found something more valuable: the right questions. This changed how I see who I am.",
    name: "Mariana R.", city: "Bogotá, Colombia", tag: "AuténticaMente Conference",
    result: "Reconnected with her identity", initial: "M",
  },
  {
    quote: "I didn't know there was a difference between growing and transforming. AuténticaMente showed me there is — and I wanted the second.",
    name: "Carlos M.", city: "Medellín, Colombia", tag: "Círculo Vuelve a Ti · Membership",
    result: "Found a real growth process", initial: "C",
  },
  {
    quote: "It was the first time someone described exactly what I was feeling without judging it. I listened to the podcast in tears, feeling less alone in the process.",
    name: "Valentina S.", city: "Mexico City", tag: "AuténticaMente Podcast",
    result: "Stopped feeling alone in her journey", initial: "V",
  },
  {
    quote: "I came in with doubts about whether this was for me. I ended up being the most consistent member of the circle. The content is honest, deep and unlike anything I'd tried before.",
    name: "Jorge A.", city: "Miami, USA", tag: "Círculo Vuelve a Ti · Membership",
    result: "Committed to his transformation", initial: "J",
  },
];

/* ─── Pillars (Sloth green strip) ─── */
const pillarsES = [
  { icon: "○", title: "Crecimiento multidimensional", desc: "Un enfoque que integra identidad, emociones, propósito, finanzas, cuerpo, relaciones, dones y talentos." },
  { icon: "◇", title: "Experiencias que transforman", desc: "Conferencias, programas y recorridos diseñados para acompañar procesos reales de transformación."         },
  { icon: "□", title: "Contenido con profundidad",    desc: "Podcast, audios, ebooks, meditaciones y devocionales para ir más adentro de lo que ya sabes."            },
];
const pillarsEN = [
  { icon: "○", title: "Multidimensional growth",     desc: "An approach that integrates identity, emotions, purpose, finances, body, relationships, gifts and talents." },
  { icon: "◇", title: "Experiences that transform",  desc: "Conferences, programs and journeys designed to accompany real processes of transformation."                  },
  { icon: "□", title: "Content with depth",          desc: "Podcast, audios, ebooks, meditations and devotionals to go deeper than what you already know."              },
];

/* ══════════════════════════════════════════════════════════ */

/* ──────────────────────────────────────────────────────────
   PODCAST SECTION — dark, split layout + spotify-style cards
───────────────────────────────────────────────────────── */
const podcastEpisodes = [
  {
    id: 1,
    numLabel: "EP 01",
    titleEs: "Cuando dejar de ser quien crees que eres",
    titleEn: "When you stop being who you think you are",
    descEs:  "Identidad, miedo al cambio y la valentía de reinventarte sin perder lo que eres.",
    descEn:  "Identity, fear of change and the courage to reinvent yourself without losing who you are.",
    duration: "52 min",
    color: "#54132B",
  },
  {
    id: 2,
    numLabel: "EP 02",
    titleEs: "El silencio como acto de poder",
    titleEn: "Silence as an act of power",
    descEs:  "Por qué guardar silencio no es debilidad. Una conversación sobre límites, energía y presencia.",
    descEn:  "Why staying silent is not weakness. A conversation about boundaries, energy and presence.",
    duration: "44 min",
    color: "#425546",
  },
  {
    id: 3,
    numLabel: "EP 03",
    titleEs: "Belleza, propósito y la mirada que te defines",
    titleEn: "Beauty, purpose and the gaze that defines you",
    descEs:  "Cómo la forma en que te ves impacta todo lo que creas, atraes y construyes.",
    descEn:  "How the way you see yourself impacts everything you create, attract and build.",
    duration: "38 min",
    color: "#928178",
  },
  {
    id: 4,
    numLabel: "EP 04",
    titleEs: "Sanar no es olvidar",
    titleEn: "Healing is not forgetting",
    descEs:  "Una conversación honesta sobre el duelo, la memoria y lo que significa integrar el pasado.",
    descEn:  "An honest conversation about grief, memory and what it means to integrate the past.",
    duration: "61 min",
    color: "#2A2420",
  },
  {
    id: 5,
    numLabel: "EP 05",
    titleEs: "La trampa del control",
    titleEn: "The control trap",
    descEs:  "Por qué controlar todo es una forma de miedo — y cómo soltar sin desaparecer.",
    descEn:  "Why controlling everything is a form of fear — and how to let go without disappearing.",
    duration: "49 min",
    color: "#3D2B1F",
  },
];

function PodcastSection({ lang }: { lang: "es" | "en" }) {
  const [active, setActive] = useState(0);
  const ep = podcastEpisodes[active];

  return (
    <section style={{ backgroundColor: "#0A0A0A", position: "relative" }}>
      <GeoLayer variant="dark" />
      <div
        style={{
          maxWidth: "1400px",
          position: "relative", zIndex: 1,
          margin: "0 auto",
          padding: "clamp(60px,8vw,100px) clamp(24px,5vw,80px)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(40px,6vw,100px)",
          alignItems: "center",
        }}
        className="grid-cols-1 lg:grid-cols-2"
      >
        {/* ── Left: label + title + desc + CTA ── */}
        <div>
          <p style={{ fontFamily: "var(--font-am-body)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: "#54132B", marginBottom: "20px" }}>
            {lang === "es" ? "El Podcast" : "The Podcast"}
          </p>

          {/* Active episode cover — big colored block */}
          <div
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              maxWidth: "320px",
              borderRadius: "4px",
              backgroundColor: ep.color,
              marginBottom: "32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "28px",
              position: "relative",
              overflow: "hidden",
              transition: "background-color 0.5s ease",
            }}
          >
            {/* Isotipo watermark */}
            <div style={{ position: "absolute", top: "20px", right: "20px", opacity: 0.12 }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" stroke="white" strokeWidth="1.5"/>
                <circle cx="24" cy="24" r="12" stroke="white" strokeWidth="1.5"/>
                <circle cx="24" cy="24" r="4" fill="white"/>
              </svg>
            </div>
            {/* Now playing indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "14px" }}>
                {[4,8,6,10,5,7,9,4,6].map((h, i) => (
                  <div key={i} style={{ width: "2px", height: `${h}px`, backgroundColor: "rgba(255,255,255,0.6)", borderRadius: "1px" }} />
                ))}
              </div>
              <span style={{ fontFamily: "var(--font-am-body)", fontSize: "9px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
                {lang === "es" ? "Escuchando" : "Now playing"}
              </span>
            </div>
            <p style={{ fontFamily: "var(--font-am-body)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "6px" }}>
              {ep.numLabel}
            </p>
            <h3 style={{ fontFamily: "var(--font-am-display)", fontSize: "clamp(18px,2vw,24px)", fontWeight: 300, fontStyle: "italic", color: "#FFFFFF", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
              {lang === "es" ? ep.titleEs : ep.titleEn}
            </h3>
          </div>

          <p style={{ fontFamily: "var(--font-am-body)", fontSize: "13.5px", color: "rgba(255,255,255,0.45)", lineHeight: 1.72, marginBottom: "32px", maxWidth: "380px" }}>
            {lang === "es" ? ep.descEs : ep.descEn}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <a
              href="/podcast"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontFamily: "var(--font-am-body)", fontSize: "11px", fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "#FFFFFF", textDecoration: "none",
                backgroundColor: "#54132B", padding: "13px 24px", borderRadius: "2px",
              }}
            >
              {lang === "es" ? "Escuchar en Spotify" : "Listen on Spotify"}
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 11L11 2M11 2H5M11 2v6" stroke="white" strokeWidth="1.3" strokeLinecap="round"/></svg>
            </a>
            <a
              href="/podcast"
              style={{ fontFamily: "var(--font-am-body)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}
            >
              {lang === "es" ? "Ver todos →" : "View all →"}
            </a>
          </div>
        </div>

        {/* ── Right: episode list (spotify style) ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <p style={{ fontFamily: "var(--font-am-body)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: "12px" }}>
            {lang === "es" ? "Episodios recientes" : "Recent episodes"}
          </p>
          {podcastEpisodes.map((e, i) => {
            const isActive = active === i;
            return (
              <button
                key={e.id}
                onClick={() => setActive(i)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px 16px",
                  borderRadius: "3px",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  backgroundColor: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(el) => { if (!isActive) el.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)"; }}
                onMouseLeave={(el) => { if (!isActive) el.currentTarget.style.backgroundColor = "transparent"; }}
              >
                {/* Color thumb */}
                <div style={{
                  flexShrink: 0,
                  width: "44px", height: "44px",
                  borderRadius: "3px",
                  backgroundColor: e.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {isActive ? (
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "14px" }}>
                      {[5,9,6,10,7].map((h, idx) => (
                        <div key={idx} style={{ width: "2px", height: `${h}px`, backgroundColor: "rgba(255,255,255,0.8)", borderRadius: "1px" }} />
                      ))}
                    </div>
                  ) : (
                    <span style={{ fontFamily: "var(--font-am-body)", fontSize: "8px", fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em" }}>{e.numLabel.split(" ")[1]}</span>
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontFamily: "var(--font-am-body)", fontSize: "13px", fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.55)",
                    lineHeight: 1.3, marginBottom: "3px",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    transition: "color 0.2s ease",
                  }}>
                    {lang === "es" ? e.titleEs : e.titleEn}
                  </p>
                  <p style={{ fontFamily: "var(--font-am-body)", fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.04em" }}>
                    AuténticaMente · {e.duration}
                  </p>
                </div>

                {/* Duration + play icon */}
                <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "10px" }}>
                  {isActive && (
                    <div style={{
                      width: "28px", height: "28px", borderRadius: "50%",
                      backgroundColor: "#54132B",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg width="9" height="10" viewBox="0 0 9 10" fill="none">
                        <path d="M1 1.5l7 3.5-7 3.5V1.5z" fill="white"/>
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────
   CONFERENCIAS CARRUSEL — componente editorial
   Cards semitransparentes con imagen de fondo.
   Alterna: card imagen (con overlay) + card color plano.
   Scroll horizontal con botones de navegación.
───────────────────────────────────────────────────────── */
const conferencesData = [
  {
    id: 1,
    numberLabel: "01",
    titleEs: "Vuelve a Ti",
    titleEn: "Return to Yourself",
    dateEs: "Mayo 2026",
    dateEn: "May 2026",
    modeEs: "Virtual",
    modeEn: "Virtual",
    tagEs: "Próximo evento",
    tagEn: "Upcoming event",
    type: "image",
    image: "/liset-valencia-hero.jpg",
    accentColor: "#54132B",
    descEs: "Un espacio íntimo y transformador para reconectarte con quién eres cuando dejas de complacer, de esconderte y de vivir para los demás. Una experiencia diseñada para que te encuentres.",
    descEn: "An intimate and transformative space to reconnect with who you are when you stop pleasing, hiding and living for others. An experience designed for you to find yourself.",
    detailsEs: ["Duración: 3 horas", "Formato: 100% virtual en vivo", "Incluye: grabación + material de trabajo"],
    detailsEn: ["Duration: 3 hours", "Format: 100% live virtual", "Includes: recording + workbook"],
  },
  {
    id: 2,
    numberLabel: "02",
    titleEs: "Belleza con\nPropósito",
    titleEn: "Beauty with\nPurpose",
    dateEs: "Mayo 2026",
    dateEn: "May 2026",
    modeEs: "Virtual",
    modeEn: "Virtual",
    tagEs: "Próximo evento",
    tagEn: "Upcoming event",
    type: "image",
    image: "/belleza-proposito.jpg",
    accentColor: "#F4E7E9",
    descEs: "Una conferencia sobre la relación entre tu imagen, tu identidad y tu propósito. Porque cuidarte no es vanidad — es coherencia. Aprende a habitar tu cuerpo desde adentro hacia afuera.",
    descEn: "A conference on the relationship between your image, identity and purpose. Because taking care of yourself isn't vanity — it's coherence. Learn to inhabit your body from the inside out.",
    detailsEs: ["Duración: 2.5 horas", "Formato: Virtual en vivo", "Incluye: guía de trabajo"],
    detailsEn: ["Duration: 2.5 hours", "Format: Live virtual", "Includes: workbook"],
  },
  {
    id: 3,
    numberLabel: "03",
    titleEs: "RAÍZ",
    titleEn: "ROOT",
    dateEs: "Junio 2026",
    dateEn: "June 2026",
    modeEs: "Bogotá, Colombia",
    modeEn: "Bogotá, Colombia",
    tagEs: "Presencial",
    tagEn: "In-person",
    type: "color",
    bgColor: "#928178",
    accentColor: "#F4E7E9",
    descEs: "Una experiencia presencial de un día completo para ir a las raíces de lo que te mueve, te frena y te define. Trabajo profundo, comunidad real, espacio para la verdad.",
    descEn: "A full-day in-person experience to go to the roots of what moves you, holds you back and defines you. Deep work, real community, space for truth.",
    detailsEs: ["Duración: Día completo (8h)", "Formato: Presencial · Bogotá", "Incluye: almuerzo + material + grabación de sesiones"],
    detailsEn: ["Duration: Full day (8h)", "Format: In-person · Bogotá", "Includes: lunch + materials + session recordings"],
  },
  {
    id: 5,
    numberLabel: "05",
    titleEs: "Masterclass:\nIdentidad",
    titleEn: "Masterclass:\nIdentity",
    dateEs: "Disponible ahora",
    dateEn: "Available now",
    modeEs: "Grabación",
    modeEn: "Recording",
    tagEs: "Online",
    tagEn: "Online",
    type: "image",
    image: "/am-hero.jpg",
    accentColor: "#F4E7E9",
    descEs: "¿Quién eres cuando nadie te está mirando? Una masterclass de 90 minutos para explorar los fundamentos de tu identidad y comenzar a vivir desde un lugar más real y más tuyo.",
    descEn: "Who are you when no one is watching? A 90-minute masterclass to explore the foundations of your identity and begin living from a more real, more authentic place.",
    detailsEs: ["Duración: 90 minutos", "Formato: Grabación on-demand", "Acceso: inmediato tras la compra"],
    detailsEn: ["Duration: 90 minutes", "Format: On-demand recording", "Access: immediate after purchase"],
  },
  {
    id: 6,
    numberLabel: "06",
    titleEs: "Propósito\ny Vocación",
    titleEn: "Purpose\n& Calling",
    dateEs: "Agosto 2026",
    dateEn: "August 2026",
    modeEs: "Híbrido",
    modeEn: "Hybrid",
    tagEs: "Híbrido",
    tagEn: "Hybrid",
    type: "color",
    bgColor: "#425546",
    accentColor: "#F4E7E9",
    descEs: "Una conferencia para las personas que sienten que lo que hacen no las llena pero aún no saben cómo nombrarlo. Claridad, dirección y herramientas para reconectar con lo que te fue dado hacer.",
    descEn: "A conference for people who feel that what they do doesn't fulfill them but don't yet know how to name it. Clarity, direction and tools to reconnect with what you were meant to do.",
    detailsEs: ["Duración: 4 horas", "Formato: Híbrido (presencial + virtual)", "Próximamente disponible"],
    detailsEn: ["Duration: 4 hours", "Format: Hybrid (in-person + virtual)", "Coming soon"],
  },
  {
    id: 7,
    numberLabel: "07",
    titleEs: "Sanar en\nComunidad",
    titleEn: "Healing in\nCommunity",
    dateEs: "Septiembre 2026",
    dateEn: "September 2026",
    modeEs: "Virtual",
    modeEn: "Virtual",
    tagEs: "Virtual",
    tagEn: "Virtual",
    type: "image",
    image: "/liset-valencia-hero.jpg",
    accentColor: "#F9F4F1",
    descEs: "Sanar no siempre ocurre en soledad. Esta conferencia explora cómo los vínculos, la comunidad y el acompañamiento mutuo se convierten en el espacio donde la transformación real es posible.",
    descEn: "Healing doesn't always happen in solitude. This conference explores how bonds, community and mutual support become the space where real transformation is possible.",
    detailsEs: ["Duración: 3 horas", "Formato: Virtual en vivo", "Próximamente disponible"],
    detailsEn: ["Duration: 3 hours", "Format: Live virtual", "Coming soon"],
  },
];

const confCategories = [
  { key: "todos",      labelEs: "Todos",        labelEn: "All",         icon: "★" },
  { key: "virtual",    labelEs: "Virtual",      labelEn: "Virtual",     icon: "◎" },
  { key: "presencial", labelEs: "Presencial",   labelEn: "In-person",   icon: "◈" },
  { key: "grabacion",  labelEs: "Grabaciones",  labelEn: "Recordings",  icon: "▶" },
];

// Extend conferencesData with category tags
const confWithCats = conferencesData.map((c) => ({
  ...c,
  cat: c.modeEs === "Bogotá, Colombia" ? "presencial"
     : c.modeEs === "Grabación"        ? "grabacion"
     : "virtual",
}));

function ConferenciasCarrusel({ lang }: { lang: "es" | "en" }) {
  const [activeCat, setActiveCat] = useState("todos");
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  const filtered = activeCat === "todos" ? confWithCats : confWithCats.filter((c) => c.cat === activeCat);

  const CARD_W = 300;

  const checkScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    // reset scroll when filter changes
    el.scrollLeft = 0;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll, activeCat]);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? CARD_W : -CARD_W, behavior: "smooth" });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current; if (!el) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, scrollLeft: el.scrollLeft };
    el.style.cursor = "grabbing"; el.style.userSelect = "none";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const el = trackRef.current; if (!el) return;
    el.scrollLeft = dragStart.current.scrollLeft - (e.clientX - dragStart.current.x);
  };
  const onMouseUp = () => {
    setIsDragging(false);
    const el = trackRef.current;
    if (el) { el.style.cursor = "grab"; el.style.userSelect = ""; }
  };

  return (
    <section style={{ backgroundColor: "#54132B", padding: "clamp(56px,7vw,88px) 0" }}>
      <style>{`
        .conf-card-img { transition: transform 0.6s cubic-bezier(0.4,0,0.2,1); }
        .conf-card:hover .conf-card-img { transform: scale(1.06); }
        .conf-card { transition: box-shadow 0.38s ease; cursor: pointer; }
        .conf-card:hover { box-shadow: 0 24px 56px rgba(0,0,0,0.7); }
        .conf-cat-pill { transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease; }
        .conf-cat-pill.active { background-color: #FFFFFF; color: #54132B; border-color: #FFFFFF; }
      `}</style>

      {/* ── Header ── */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 clamp(24px,5vw,80px)", marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "20px", flexWrap: "wrap", marginBottom: "28px" }}>
          <div>
            <p style={{ fontFamily: "var(--font-am-body)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.34em", textTransform: "uppercase", color: "#54132B", marginBottom: "12px" }}>
              {lang === "es" ? "Eventos & Conferencias" : "Events & Conferences"}
            </p>
            <h2 style={{ fontFamily: "var(--font-am-display)", fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 300, fontStyle: "italic", letterSpacing: "-0.02em", lineHeight: 1.05, color: "#FFFFFF" }}>
              {lang === "es" ? "Experiencias que transforman." : "Experiences that transform."}
            </h2>
          </div>
          {/* Arrows */}
          <div style={{ display: "flex", gap: "10px", paddingBottom: "4px" }}>
            {[
              { dir: "left"  as const, can: canLeft,  d: "M10 6L5 11L10 16" },
              { dir: "right" as const, can: canRight, d: "M7 6L12 11L7 16"  },
            ].map(({ dir, can, d }) => (
              <button key={dir} onClick={() => scroll(dir)}
                style={{
                  width: 40, height: 40, borderRadius: "50%",
                  border: `1px solid ${can ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.08)"}`,
                  backgroundColor: "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: can ? "pointer" : "default", transition: "border-color 0.2s ease",
                }}>
                <svg width="17" height="22" viewBox="0 0 17 22" fill="none">
                  <path d={d} stroke={can ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.18)"} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Category pills — MasterClass style */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {confCategories.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCat(c.key)}
              className={`conf-cat-pill${activeCat === c.key ? " active" : ""}`}
              style={{
                fontFamily: "var(--font-am-body)", fontSize: "11px", fontWeight: 600,
                letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "8px 18px", borderRadius: "2px", border: "1px solid",
                borderColor: activeCat === c.key ? "#FFFFFF" : "rgba(255,255,255,0.14)",
                backgroundColor: activeCat === c.key ? "#FFFFFF" : "rgba(255,255,255,0.05)",
                color: activeCat === c.key ? "#0A0A0A" : "rgba(255,255,255,0.45)",
                cursor: "pointer", display: "flex", alignItems: "center", gap: "7px",
              }}
            >
              <span style={{ fontSize: "9px", opacity: 0.7 }}>{c.icon}</span>
              {lang === "es" ? c.labelEs : c.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* ── Popular now row ── */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 clamp(24px,5vw,80px)", marginBottom: "20px", display: "flex", alignItems: "center", gap: "16px" }}>
        <span style={{ fontFamily: "var(--font-am-body)", fontSize: "13px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.01em" }}>
          {lang === "es" ? "Próximos eventos" : "Upcoming events"}
        </span>
        <Link href="/conferencias" style={{ fontFamily: "var(--font-am-body)", fontSize: "13px", color: "rgba(255,255,255,0.35)", textDecoration: "none", letterSpacing: "0" }}>
          {lang === "es" ? "Ver todos" : "See all"}
        </Link>
      </div>

      {/* ── Cards track ── */}
      <div
        ref={trackRef}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove}
        onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
        style={{
          display: "flex", gap: "14px", overflowX: "auto",
          paddingLeft: "clamp(24px,5vw,80px)", paddingRight: "clamp(24px,5vw,80px)",
          paddingBottom: "16px", scrollbarWidth: "none", cursor: "grab",
          WebkitOverflowScrolling: "touch",
        } as React.CSSProperties}
        className="[&::-webkit-scrollbar]:hidden"
      >
        {filtered.map((conf) => {
          const isImage = conf.type === "image";
          const title = lang === "es" ? conf.titleEs : conf.titleEn;
          const date  = lang === "es" ? conf.dateEs  : conf.dateEn;
          const mode  = lang === "es" ? conf.modeEs  : conf.modeEn;
          const tag   = lang === "es" ? conf.tagEs   : conf.tagEn;

          return (
            <div key={conf.id} className="conf-card" style={{ flexShrink: 0, width: "clamp(240px,26vw,300px)" }}>
              {/* Image block — portrait 3:4 */}
              <div style={{
                width: "100%", aspectRatio: "3 / 4", borderRadius: "4px",
                overflow: "hidden", position: "relative",
                backgroundColor: isImage ? "#1A1410" : (conf.bgColor ?? "#2A1F1F"),
                marginBottom: "12px",
              }}>
                {/* Image or color bg */}
                <div className="conf-card-img" style={{ position: "absolute", inset: 0 }}>
                  {isImage && conf.image ? (
                    <Image src={conf.image} alt={title} fill
                      style={{ objectFit: "cover", objectPosition: "center 15%" }} draggable={false} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", background: `linear-gradient(160deg, ${conf.bgColor}cc 0%, ${conf.bgColor} 100%)` }} />
                  )}
                </div>

                {/* Gradient overlay */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.82) 100%)" }} />

                {/* Badge pill — top left, MasterClass style */}
                <div style={{ position: "absolute", top: "12px", left: "12px" }}>
                  <span style={{
                    fontFamily: "var(--font-am-body)", fontSize: "9px", fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    backgroundColor: "#FFFFFF", color: "#0A0A0A",
                    padding: "4px 10px", borderRadius: "20px",
                  }}>
                    {tag}
                  </span>
                </div>

                {/* Title overlay — bottom of card */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 18px" }}>
                  <h3 style={{
                    fontFamily: "var(--font-am-display)",
                    fontSize: "clamp(20px,2.2vw,28px)",
                    fontWeight: 400,
                    fontStyle: "italic",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.1,
                    color: "#FFFFFF",
                    whiteSpace: "pre-line",
                  }}>
                    {title}
                  </h3>
                </div>
              </div>

              {/* Below card — speaker + info (MasterClass style) */}
              <div style={{ padding: "0 2px" }}>
                <p style={{ fontFamily: "var(--font-am-body)", fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.75)", marginBottom: "3px", letterSpacing: "0.01em" }}>
                  {lang === "es" ? `Con Dra. Liset Valencia` : `With Dr. Liset Valencia`}
                </p>
                <p style={{ fontFamily: "var(--font-am-body)", fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.02em" }}>
                  {date} · {mode}
                </p>
              </div>
            </div>
          );
        })}

        {/* End card — see all */}
        <div style={{
          flexShrink: 0, width: "clamp(140px,15vw,180px)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "14px",
        }}>
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <circle cx="17" cy="17" r="16.5" stroke="rgba(255,255,255,0.15)"/>
            <path d="M11 17h12M18 12l5 5-5 5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <Link href="/conferencias" style={{
            fontFamily: "var(--font-am-body)", fontSize: "10px", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)", textDecoration: "none", textAlign: "center",
            whiteSpace: "pre-line",
          }}>
            {lang === "es" ? "Ver todos\nlos eventos" : "View all\nevents"}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────
   EXPLORA SECTION — MasterClass-inspired speakers carousel
   Fondo: #0D0D0D / cards premium con hover lift + zoom
───────────────────────────────────────────────────────── */
const masterclassData = [
  {
    id: 1,
    titleEs: "Vuelve a Ti: Identidad y Propósito",
    titleEn: "Return to Yourself: Identity & Purpose",
    speakerName: "Dra. Liset Valencia",
    speakerRoleEs: "Psicóloga Clínica · Fundadora",
    speakerRoleEn: "Clinical Psychologist · Founder",
    speakerImage: "/liset-valencia-hero.jpg",
    coverImage: "/liset-valencia-hero.jpg",
    coverPos: "center 15%",
    modulesEs: "12 módulos",
    modulesEn: "12 modules",
    categoryEs: "Identidad",
    categoryEn: "Identity",
    href: "/conferencias",
  },
  {
    id: 2,
    titleEs: "Belleza con Propósito",
    titleEn: "Beauty with Purpose",
    speakerName: "Melissa Payares",
    speakerRoleEs: "Comunicadora Social",
    speakerRoleEn: "Social Communicator",
    speakerImage: "/melissa-payares.jpg",
    coverImage: "/melissa-payares.jpg",
    coverPos: "center 20%",
    modulesEs: "6 módulos",
    modulesEn: "6 modules",
    categoryEs: "Propósito",
    categoryEn: "Purpose",
    href: "/conferencias",
  },
  {
    id: 3,
    titleEs: "Regulación Emocional",
    titleEn: "Emotional Regulation",
    speakerName: "Dra. Liset Valencia",
    speakerRoleEs: "Psicóloga Clínica",
    speakerRoleEn: "Clinical Psychologist",
    speakerImage: "/liset-valencia-hero.jpg",
    coverImage: "/liset-valencia-hero.jpg",
    coverPos: "center 10%",
    modulesEs: "8 módulos",
    modulesEn: "8 modules",
    categoryEs: "Emociones",
    categoryEn: "Emotions",
    href: "/conferencias",
  },
  {
    id: 4,
    titleEs: "Vínculos y Relaciones",
    titleEn: "Bonds & Relationships",
    speakerName: "Dra. Liset Valencia",
    speakerRoleEs: "Psicóloga Clínica",
    speakerRoleEn: "Clinical Psychologist",
    speakerImage: "/liset-valencia-hero.jpg",
    coverImage: "/am-hero.jpg",
    coverPos: "center 30%",
    modulesEs: "10 módulos",
    modulesEn: "10 modules",
    categoryEs: "Relaciones",
    categoryEn: "Relationships",
    href: "/conferencias",
  },
  {
    id: 5,
    titleEs: "Propósito y Vocación",
    titleEn: "Purpose & Calling",
    speakerName: "Dra. Liset Valencia",
    speakerRoleEs: "Conferenciante",
    speakerRoleEn: "Speaker",
    speakerImage: "/liset-valencia-hero.jpg",
    coverImage: "/belleza-proposito.jpg",
    coverPos: "center 25%",
    modulesEs: "7 módulos",
    modulesEn: "7 modules",
    categoryEs: "Propósito",
    categoryEn: "Purpose",
    href: "/conferencias",
  },
];

function ExploraSection({ lang }: { lang: "es" | "en" }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  const CARD_W = 380;

  const checkScroll = useCallback(() => {
    const el = trackRef.current; if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current; if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current; if (!el) return;
    el.scrollBy({ left: dir === "right" ? CARD_W : -CARD_W, behavior: "smooth" });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current; if (!el) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, scrollLeft: el.scrollLeft };
    el.style.cursor = "grabbing"; el.style.userSelect = "none";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const el = trackRef.current; if (!el) return;
    el.scrollLeft = dragStart.current.scrollLeft - (e.clientX - dragStart.current.x);
  };
  const onMouseUp = () => {
    setIsDragging(false);
    const el = trackRef.current;
    if (el) { el.style.cursor = "grab"; el.style.userSelect = ""; }
  };

  return (
    <section style={{ backgroundColor: "#000000", paddingTop: "clamp(56px,7vw,96px)", paddingBottom: "clamp(56px,7vw,96px)", position: "relative" }}>
      <GeoLayer variant="dark" />
      <style>{`
        .mc-card {
          flex-shrink: 0;
          cursor: pointer;
          width: clamp(280px, 30vw, 380px);
        }
        .mc-img-wrap {
          width: 100%;
          aspect-ratio: 16 / 10;
          border-radius: 3px;
          overflow: hidden;
          position: relative;
          background: #1A1410;
          transition: box-shadow 0.4s ease;
        }
        .mc-card:hover .mc-img-wrap {
          box-shadow: 0 20px 50px rgba(0,0,0,0.7);
        }
        .mc-cover-img {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mc-card:hover .mc-cover-img {
          transform: scale(1.06);
        }
        .mc-title {
          transition: color 0.25s ease;
          color: rgba(255,255,255,0.88);
        }
        .mc-card:hover .mc-title {
          color: #FFFFFF;
        }
        .mc-arrow-btn {
          transition: background-color 0.22s ease, border-color 0.22s ease;
        }
        .mc-arrow-btn:hover {
          background-color: rgba(255,255,255,0.12) !important;
        }
      `}</style>

      {/* ── Header row ── */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 clamp(24px,5vw,80px)", marginBottom: "clamp(36px,5vw,56px)", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
          <div style={{ flex: 1 }}>
            <h2 style={{
              fontFamily: "var(--font-am-body)",
              fontSize: "clamp(20px, 2.4vw, 30px)",
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
              marginBottom: "8px",
            }}>
              {lang === "es" ? "Masterclasses AuténticaMente" : "AuténticaMente Masterclasses"}
            </h2>
            <p style={{
              fontFamily: "var(--font-am-body)",
              fontSize: "13.5px",
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.5,
            }}>
              {lang === "es"
                ? "Certifícate en cada programa. Accede a los primeros módulos gratis como miembro."
                : "Get certified in each program. Access the first modules free as a member."}
            </p>
          </div>

          {/* Nav arrows — top right like MasterClass */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "4px" }}>
            {[
              { dir: "left"  as const, can: canLeft,  d: "M10 6L5 11L10 16" },
              { dir: "right" as const, can: canRight, d: "M7 6L12 11L7 16"  },
            ].map(({ dir, can, d }) => (
              <button
                key={dir}
                onClick={() => scroll(dir)}
                className="mc-arrow-btn"
                aria-label={dir === "left" ? "Anterior" : "Siguiente"}
                style={{
                  width: 40, height: 40, borderRadius: "50%",
                  border: `1px solid ${can ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.08)"}`,
                  backgroundColor: "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: can ? "pointer" : "default",
                }}
              >
                <svg width="17" height="22" viewBox="0 0 17 22" fill="none">
                  <path d={d} stroke={can ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.18)"} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Cards track ── */}
      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{
          display: "flex",
          gap: "20px",
          overflowX: "auto",
          paddingLeft: "clamp(24px,5vw,80px)",
          paddingRight: "clamp(24px,5vw,80px)",
          paddingBottom: "8px",
          scrollbarWidth: "none",
          cursor: "grab",
          WebkitOverflowScrolling: "touch",
          position: "relative", zIndex: 1,
        } as React.CSSProperties}
        className="[&::-webkit-scrollbar]:hidden"
      >
        {masterclassData.map((mc) => (
          <Link
            key={mc.id}
            href={mc.href}
            className="mc-card"
            style={{ textDecoration: "none" }}
          >
            {/* ── Cover image (landscape 16:10) ── */}
            <div className="mc-img-wrap">
              <div className="mc-cover-img" style={{ position: "absolute", inset: 0 }}>
                <Image
                  src={mc.coverImage}
                  alt={lang === "es" ? mc.titleEs : mc.titleEn}
                  fill
                  style={{ objectFit: "cover", objectPosition: mc.coverPos }}
                  draggable={false}
                />
              </div>
              {/* Subtle vignette */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.18) 0%, transparent 60%)" }} />
              {/* Category badge top-left */}
              <div style={{
                position: "absolute", top: "14px", left: "14px",
                fontFamily: "var(--font-am-body)", fontSize: "8.5px", fontWeight: 700,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.85)",
                backgroundColor: "rgba(0,0,0,0.45)",
                border: "1px solid rgba(255,255,255,0.18)",
                padding: "4px 10px", borderRadius: "1px",
                backdropFilter: "blur(4px)",
              }}>
                {lang === "es" ? mc.categoryEs : mc.categoryEn}
              </div>
            </div>

            {/* ── Below image: AM badge + speaker ── */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "14px", marginBottom: "10px" }}>
              {/* AM icon badge */}
              <div style={{
                width: "28px", height: "28px", borderRadius: "4px",
                backgroundColor: "#54132B",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.8)" strokeWidth="1.4"/>
                  <circle cx="12" cy="12" r="4.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2"/>
                  <circle cx="12" cy="12" r="1.5" fill="rgba(255,255,255,0.9)"/>
                </svg>
              </div>

              {/* Divider */}
              <div style={{ width: "1px", height: "22px", backgroundColor: "rgba(255,255,255,0.12)" }} />

              {/* Speaker mini avatar + name */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", overflow: "hidden" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, position: "relative", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <Image src={mc.speakerImage} alt={mc.speakerName} fill style={{ objectFit: "cover", objectPosition: "center 10%" }} />
                </div>
                <span style={{
                  fontFamily: "var(--font-am-body)", fontSize: "11px", fontWeight: 500,
                  color: "rgba(255,255,255,0.55)", letterSpacing: "0.02em",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>
                  {mc.speakerName}
                </span>
              </div>
            </div>

            {/* ── Course title ── */}
            <h3 className="mc-title" style={{
              fontFamily: "var(--font-am-body)",
              fontSize: "clamp(13px,1.3vw,15px)",
              fontWeight: 600,
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              marginBottom: "6px",
            }}>
              {lang === "es" ? mc.titleEs : mc.titleEn}
            </h3>

            {/* ── Modules count ── */}
            <p style={{
              fontFamily: "var(--font-am-body)", fontSize: "11px",
              color: "rgba(255,255,255,0.28)", letterSpacing: "0.06em",
            }}>
              {lang === "es" ? mc.modulesEs : mc.modulesEn}
            </p>
          </Link>
        ))}
      </div>

      {/* ── Bottom link ── */}
      <div style={{ maxWidth: "1400px", margin: "28px auto 0", padding: "0 clamp(24px,5vw,80px)" }}>
        <Link
          href="/conferencias"
          style={{
            fontFamily: "var(--font-am-body)", fontSize: "11px", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)", textDecoration: "none",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
        >
          {lang === "es" ? "Ver todos los programas →" : "View all programs →"}
        </Link>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════ */

export default function HomePage() {
  const { lang } = useLang();
  const features     = lang === "es" ? featuresES     : featuresEN;
  const testimonials = lang === "es" ? testimonialsES : testimonialsEN;
  const pillars      = lang === "es" ? pillarsES      : pillarsEN;

  return (
    <div style={{ backgroundColor: "#F9F4F1", color: "#000000" }}>

      {/* ══════════════════════════════════════════════ HERO
          Layout: full-bleed — imagen de fondo completa
          Gradiente izquierdo protege legibilidad del texto
          Sin división rectangular
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "calc(100vh - 88px)", backgroundColor: "#F9F4F1" }}
      >
        {/* ── Imagen fondo full-bleed — desktop ── */}
        <div className="absolute inset-0 hidden lg:block">
          {/* Ghost doble exposición */}
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              backgroundImage:    "url('/am-hero.jpg')",
              backgroundSize:     "cover",
              backgroundPosition: "60% 28%",
              transform:          "translate(20px, -12px) scale(1.07)",
              filter:             "blur(8px) saturate(1.3) brightness(0.85)",
              opacity:            0.38,
            }}
          />
          {/* Imagen principal */}
          <Image
            src="/am-hero.jpg"
            alt="AuténticaMente — Experiencias de transformación"
            fill
            className="object-cover"
            style={{ objectPosition: "60% 28%" }}
            priority
          />
          {/* Degradé izquierdo fuerte — texto legible */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to right, #F9F4F1 0%, #F9F4F1 30%, rgba(249,244,241,0.88) 42%, rgba(249,244,241,0.45) 58%, rgba(249,244,241,0.08) 75%, transparent 100%)",
            }}
          />
          {/* Degradé inferior sutil */}
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{ height: "35%", background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)" }}
          />
          {/* Tinte burgundy esquina inferior derecha */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(140deg, transparent 50%, rgba(84,19,43,0.22) 100%)" }}
          />
          {/* Frase — centrada verticalmente en la zona derecha de la imagen */}
          <div
            className="absolute z-10 text-center"
            style={{
              right: "clamp(32px, 8vw, 100px)",
              top:   "50%",
              transform: "translateY(-50%)",
              maxWidth: 280,
            }}
          >
            <p
              className="font-detail leading-relaxed"
              style={{ color: "rgba(255,255,255,0.92)", fontSize: "clamp(18px, 1.8vw, 24px)" }}
            >
              {lang === "es" ? "Porque sanar" : "Because healing"}
            </p>
            <p
              className="font-detail leading-relaxed"
              style={{ color: "rgba(255,255,255,0.92)", fontSize: "clamp(18px, 1.8vw, 24px)" }}
            >
              {lang === "es" ? "no es calma." : "isn't calm."}
            </p>
            <div style={{ width: 28, height: 1, backgroundColor: "rgba(255,255,255,0.35)", margin: "12px auto" }} />
            <p
              className="font-detail"
              style={{ color: "#F4E7E9", fontSize: "clamp(20px, 2vw, 28px)" }}
            >
              {lang === "es" ? "Es despertar." : "It's awakening."}
            </p>
          </div>
          {/* Isotipo watermark */}
          <div className="absolute top-8 right-10 z-10" style={{ opacity: 0.18 }}>
            <Image src="/logos/am-icon-white.svg" alt="" width={44} height={44} aria-hidden="true" style={{ height: "44px", width: "auto" }} />
          </div>
        </div>

        {/* ── Texto — z-10 sobre la imagen ── */}
        <div
          className="relative z-10 flex flex-col justify-center px-6 py-16 lg:py-0"
          style={{
            paddingLeft:  "clamp(24px, 6vw, 80px)",
            paddingRight: "clamp(24px, 4vw, 48px)",
            maxWidth:     "clamp(460px, 52vw, 680px)",
            minHeight:    "calc(100vh - 88px)",
          }}
        >
          {/* Eyebrow with decorative line */}
          <div className="flex items-center gap-4 mb-8 lg:mb-12">
            <span
              className="shrink-0"
              style={{ display: "block", width: 36, height: 1, backgroundColor: "#54132B" }}
            />
            <span
              className="text-[10.5px] font-body font-bold uppercase tracking-[0.3em]"
              style={{ color: "#54132B" }}
            >
              {lang === "es"
                ? "Identidad · Propósito · Transformación"
                : "Identity · Purpose · Transformation"}
            </span>
          </div>

          {/* H1 — headline */}
          <h1
            className="font-display hero-title"
            style={{
              fontSize:      "clamp(44px, 6vw, 88px)",
              fontWeight:    800,
              lineHeight:    0.9,
              letterSpacing: "-0.025em",
              color:         "#000000",
            }}
          >
            {lang === "es" ? (
              <>
                RECONECTA<br />
                CONTIGO<br />
                <span style={{ color: "#54132B" }}>Y ACTIVA</span><br />
                TU <span style={{ fontFamily: "var(--font-mynerve)", fontWeight: 400, letterSpacing: "0.01em" }}>Poder</span>
              </>
            ) : (
              <>
                RECONNECT<br />
                WITH YOU<br />
                <span style={{ color: "#54132B" }}>AND ACTIVATE</span><br />
                YOUR <span className="font-detail" style={{ fontWeight: 400, letterSpacing: "-0.01em" }}>Power</span>
              </>
            )}
          </h1>

          {/* Thin separator */}
          <div style={{ width: 48, height: 1, backgroundColor: "rgba(0,0,0,0.12)", margin: "40px 0" }} />

          {/* Subtitle */}
          <p
            className="font-body"
            style={{
              color:     "#928178",
              fontSize:  "clamp(15px, 1.3vw, 17px)",
              lineHeight: 1.7,
              maxWidth:   420,
              fontWeight: 400,
            }}
          >
            {lang === "es"
              ? "Una plataforma de desarrollo humano para hombres y mujeres que quieren crecer con más conciencia, verdad y dirección."
              : "A human development platform for men and women who want to grow with more awareness, truth and direction."}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mt-10">
            <Link
              href="/membresia"
              className="btn-primary text-[11.5px] font-body font-bold uppercase tracking-[0.14em] px-8 py-4 text-center"
              style={{ backgroundColor: "#54132B", color: "#FFFFFF", borderRadius: "2px" }}
            >
              {lang === "es" ? "Únete al Círculo" : "Join the Circle"}
            </Link>
            <Link
              href="/test"
              className="btn-ghost text-[11.5px] font-body font-semibold uppercase tracking-[0.14em] px-8 py-4 text-center border"
              style={{ color: "#000000", borderColor: "rgba(0,0,0,0.15)", borderRadius: "2px" }}
            >
              {lang === "es" ? "Hacer el test" : "Take the test"}
            </Link>
          </div>

          {/* Social handle — whisper level */}
          <p
            className="mt-12 text-[10px] font-body uppercase tracking-[0.22em]"
            style={{ color: "rgba(0,0,0,0.22)" }}
          >
            @somosautenticamente
          </p>
        </div>

        {/* Mobile — imagen bajo el texto */}
        <div className="lg:hidden relative overflow-hidden" style={{ height: "60vw", maxHeight: 380 }}>
          <Image
            src="/am-hero.jpg"
            alt="AuténticaMente"
            fill
            className="object-cover"
            style={{ objectPosition: "50% 30%" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(249,244,241,1) 0%, rgba(249,244,241,0.1) 45%, transparent 100%)" }}
          />
        </div>
      </section>

      {/* ══════════════════════ PILARES — Minimal, editorial, premium ══════════ */}
      <style>{`
        .pillar-col {
          transition: background-color 0.4s ease;
        }
        .pillar-col:hover {
          background-color: rgba(255,255,255,0.04);
        }
        .pillar-col .pillar-icon svg circle,
        .pillar-col .pillar-icon svg path,
        .pillar-col .pillar-icon svg ellipse {
          transition: stroke 0.4s ease, fill 0.4s ease, opacity 0.4s ease;
        }
        .pillar-col:hover .pillar-icon svg circle,
        .pillar-col:hover .pillar-icon svg path,
        .pillar-col:hover .pillar-icon svg ellipse {
          stroke: rgba(255,255,255,0.85) !important;
        }
        .pillar-col:hover .pillar-icon svg circle[fill],
        .pillar-col:hover .pillar-icon svg path[fill] {
          fill: rgba(255,255,255,0.85) !important;
        }
        .pillar-word {
          transition: color 0.35s ease, letter-spacing 0.35s ease;
        }
        .pillar-col:hover .pillar-word {
          color: #FFFFFF !important;
          letter-spacing: -0.01em;
        }
        .pillar-sub {
          transition: color 0.35s ease;
        }
        .pillar-col:hover .pillar-sub {
          color: rgba(255,255,255,0.7) !important;
        }
        .pillar-line {
          width: 0;
          height: 1px;
          background: rgba(255,255,255,0.25);
          transition: width 0.45s cubic-bezier(0.4,0,0.2,1);
        }
        .pillar-col:hover .pillar-line {
          width: 40px;
        }
      `}</style>
      <section style={{ backgroundColor: "#000000", borderTop: "1px solid rgba(255,255,255,0.06)", position: "relative" }}>
        <GeoLayer variant="dark" />
        <div className="grid md:grid-cols-3" style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          {[
            {
              word: lang === "es" ? "Identidad" : "Identity",
              sub:  lang === "es" ? "Saber quién eres." : "Knowing who you are.",
              icon: (
                <svg width="44" height="44" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                  <circle cx="13" cy="9" r="4.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
                  <path d="M3.5 24.5C3.5 19.253 7.753 15 13 15s9.5 4.253 9.5 9.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round"/>
                </svg>
              ),
            },
            {
              word: lang === "es" ? "Experiencia" : "Experience",
              sub:  lang === "es" ? "Vivir el proceso." : "Living the process.",
              icon: (
                <svg width="44" height="44" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                  <path d="M13 2 L13 24" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round"/>
                  <path d="M5 7.5 L13 2.5 L21 7.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 13 L13 8 L21 13" stroke="rgba(255,255,255,0.28)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 18.5 L13 13.5 L21 18.5" stroke="rgba(255,255,255,0.16)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
            },
            {
              word: lang === "es" ? "Profundidad" : "Depth",
              sub:  lang === "es" ? "Ir más adentro." : "Going deeper.",
              icon: (
                <svg width="44" height="44" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                  <circle cx="13" cy="13" r="10.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
                  <circle cx="13" cy="13" r="6"    stroke="rgba(255,255,255,0.26)" strokeWidth="1"/>
                  <circle cx="13" cy="13" r="2"    fill="rgba(255,255,255,0.45)"/>
                </svg>
              ),
            },
          ].map((p, i) => (
            <div
              key={i}
              className="pillar-col"
              style={{
                padding: "clamp(48px,6vw,88px) clamp(32px,4vw,64px)",
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "0",
                cursor: "default",
              }}
            >
              {/* Icon — centered, larger */}
              <div className="pillar-icon" style={{ marginBottom: "24px" }}>
                {p.icon}
              </div>

              {/* Display word — smaller, italic */}
              <h3
                className="pillar-word"
                style={{
                  fontFamily:    "var(--font-am-display)",
                  fontSize:      "clamp(24px, 2.6vw, 36px)",
                  fontWeight:    300,
                  fontStyle:     "italic",
                  letterSpacing: "-0.01em",
                  lineHeight:    1,
                  color:         "rgba(255,255,255,0.75)",
                  marginBottom:  "16px",
                }}
              >
                {p.word}
              </h3>

              {/* Animated underline */}
              <div className="pillar-line" style={{ marginBottom: "14px" }} />

              {/* Support line — always visible, highlighted */}
              <p
                className="pillar-sub"
                style={{
                  fontFamily:    "var(--font-am-body)",
                  fontSize:      "11.5px",
                  fontWeight:    500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color:         "rgba(255,255,255,0.38)",
                  lineHeight:    1.5,
                  opacity:       1,
                  transform:     "translateY(0)",
                }}
              >
                {p.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════ MANIFIESTO — redesigned ══ */}
      <section className="py-16 lg:py-28 px-6" style={{ position: "relative" }}>
        <GeoLayer variant="light" />
        <div
          className="max-w-[1280px] mx-auto grid md:grid-cols-[5fr_4fr] gap-10 lg:gap-20 items-start"
          style={{ position: "relative", zIndex: 1 }}
        >

          {/* ── Columna izquierda: quote poderoso ── */}
          <div>
            <Tag>{lang === "es" ? "Manifiesto" : "Manifesto"}</Tag>

            {/* Línea decorativa */}
            <div style={{ width: "48px", height: "2px", backgroundColor: "#54132B", margin: "28px 0 24px" }} />

            {/* Frase en dos registros tipográficos */}
            <div>
              {/* Línea 1 — serif italic, tono contemplativo */}
              <p
                className="font-display"
                style={{
                  fontSize: "clamp(22px, 3vw, 42px)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "#928178",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  marginBottom: "10px",
                }}
              >
                {lang === "es"
                  ? "Hay personas que cargan años"
                  : "Some people carry years"}
              </p>

              {/* Línea 2 — sans bold, la declaración fuerte */}
              <p
                className="font-body"
                style={{
                  fontSize: "clamp(28px, 4.2vw, 60px)",
                  fontWeight: 800,
                  color: "#000000",
                  lineHeight: 0.95,
                  letterSpacing: "-0.035em",
                  marginBottom: "8px",
                }}
              >
                {lang === "es" ? "sin saber exactamente" : "without knowing exactly"}
              </p>

              {/* Línea 3 — burgundy, el golpe final */}
              <p
                className="font-body"
                style={{
                  fontSize: "clamp(28px, 4.2vw, 60px)",
                  fontWeight: 800,
                  color: "#54132B",
                  lineHeight: 0.95,
                  letterSpacing: "-0.035em",
                }}
              >
                {lang === "es" ? "qué les pesa." : "what weighs on them."}
              </p>
            </div>

            {/* Sub-statement */}
            <p
              className="font-body mt-8"
              style={{
                fontSize: "clamp(14px, 1.2vw, 16px)",
                color: "#4A3F39",
                lineHeight: 1.75,
                maxWidth: "520px",
                borderLeft: "2px solid rgba(84,19,43,0.18)",
                paddingLeft: "20px",
              }}
            >
              {lang === "es"
                ? "Solo sienten que algo no está bien. AuténticaMente nació para eso: para nombrar lo que duele, ordenarlo con profundidad y acompañarte a avanzar de verdad."
                : "They just feel that something isn't right. AuténticaMente was born for that: to name what hurts, sort it with depth, and accompany you in truly moving forward."}
            </p>
          </div>

          {/* ── Columna derecha: pilares + CTA ── */}
          <div className="space-y-0 md:pt-8">

            {/* 3 afirmaciones poderosas */}
            {(lang === "es" ? [
              { num: "01", title: "Toca todo lo que eres.", desc: "Identidad, emociones, propósito, cuerpo, finanzas, relaciones y dones. No puedes mover una parte sin que se mueva el todo." },
              { num: "02", title: "Sin atajos ni clichés.", desc: "No prometemos transformación en 21 días. Prometemos un proceso real, con raíces, que dura porque viene de adentro." },
              { num: "03", title: "No lo haces sola.", desc: "Hay una comunidad, un método y acompañamiento detrás de cada recurso. Esto no es contenido. Es un ecosistema." },
            ] : [
              { num: "01", title: "Touches everything you are.", desc: "Identity, emotions, purpose, body, finances, relationships and gifts. You can't move one part without moving the whole." },
              { num: "02", title: "No shortcuts or clichés.", desc: "We don't promise transformation in 21 days. We promise a real process, with roots, that lasts because it comes from within." },
              { num: "03", title: "You don't do it alone.", desc: "There's a community, a method and support behind every resource. This isn't content. It's an ecosystem." },
            ]).map((item, i) => (
              <div
                key={i}
                className="py-6"
                style={{ borderBottom: i < 2 ? "1px solid rgba(74,63,57,0.1)" : "none" }}
              >
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <span
                    className="font-display"
                    style={{ fontSize: "11px", fontWeight: 700, color: "#54132B", opacity: 0.5, letterSpacing: "0.1em", marginTop: "4px", flexShrink: 0 }}
                  >
                    {item.num}
                  </span>
                  <div>
                    <p className="font-body" style={{ fontSize: "clamp(13px, 1.1vw, 15px)", fontWeight: 700, color: "#000000", letterSpacing: "-0.01em", marginBottom: "6px" }}>
                      {item.title}
                    </p>
                    <p className="font-body" style={{ fontSize: "clamp(12px, 1vw, 14px)", color: "#928178", lineHeight: 1.7 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-5">
              <Link
                href="/sobre"
                className="font-body font-bold uppercase tracking-[0.2em] transition-all inline-flex items-center gap-2 group"
                style={{ fontSize: "11px", color: "#54132B" }}
              >
                <span style={{ textDecoration: "none", borderBottom: "1px solid rgba(84,19,43,0.4)", paddingBottom: "2px" }}>
                  {lang === "es" ? "Descubrir AuténticaMente" : "Discover AuténticaMente"}
                </span>
                <span style={{ transition: "transform 0.2s ease" }}>→</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════ CONFERENCIAS — CARRUSEL EDITORIAL
          Estilo: cards con imagen semitransparente + texto, scroll horizontal
          Inspiración: galería de masterpieces alternando imagen / color plano
      ══════════════════════════════════════════════════════════════════════ */}
      <ConferenciasCarrusel lang={lang} />

      <Divider />

      {/* ══════════════════════════════════ TRES PILARES — editorial, hover animado ══ */}
      <style>{`
        .pilar-card {
          background-color: #F9F4F1;
          border-right: 1px solid rgba(0,0,0,0.08);
          transition: background-color 0.38s ease;
          text-decoration: none;
          display: flex;
          flex-direction: column;
        }
        .pilar-card:last-child { border-right: none; }
        .pilar-card:hover { background-color: #F0E8E3; }

        .pilar-num {
          transition: color 0.3s ease;
          color: rgba(0,0,0,0.14);
        }
        .pilar-card:hover .pilar-num { color: #54132B; }

        .pilar-title {
          transition: letter-spacing 0.38s cubic-bezier(0.4,0,0.2,1), color 0.3s ease;
        }
        .pilar-card:hover .pilar-title {
          letter-spacing: 0.01em;
          color: #54132B !important;
        }

        .pilar-arrow {
          transform: translate(0, 0);
          opacity: 0;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.28s ease;
        }
        .pilar-card:hover .pilar-arrow {
          transform: translate(3px, -3px);
          opacity: 1;
        }

        .pilar-bar {
          width: 0;
          height: 2px;
          background-color: #54132B;
          transition: width 0.42s cubic-bezier(0.4,0,0.2,1);
          margin-top: 28px;
        }
        .pilar-card:hover .pilar-bar { width: 36px; }

        .pilar-desc {
          transition: color 0.3s ease;
        }
        .pilar-card:hover .pilar-desc { color: rgba(0,0,0,0.65) !important; }
      `}</style>
      <section style={{ backgroundColor: "#F9F4F1", paddingTop: "clamp(60px,8vw,110px)", paddingBottom: "clamp(60px,8vw,110px)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>

          {/* Header */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "20px", marginBottom: "clamp(48px,6vw,80px)" }}>
            <div>
              <p style={{ fontFamily: "var(--font-am-body)", fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: "#54132B", marginBottom: "14px" }}>
                {lang === "es" ? "La plataforma" : "The platform"}
              </p>
              <h2
                style={{
                  fontFamily:    "var(--font-am-display)",
                  fontSize:      "clamp(36px, 5vw, 68px)",
                  fontWeight:    300,
                  fontStyle:     "italic",
                  letterSpacing: "-0.02em",
                  lineHeight:    1.02,
                  color:         "#000000",
                }}
              >
                {lang === "es" ? <>Todo lo que<br />estás buscando.</> : <>Everything<br />you need.</>}
              </h2>
            </div>
            <p style={{ fontFamily: "var(--font-am-body)", fontSize: "14px", color: "rgba(0,0,0,0.42)", lineHeight: 1.7, maxWidth: "320px" }}>
              {lang === "es"
                ? "Tres experiencias diseñadas para acompañar distintas etapas de tu proceso."
                : "Three experiences designed to support different stages of your journey."}
            </p>
          </div>

          {/* 3 cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "2px", overflow: "hidden" }}
               className="grid-cols-1 md:grid-cols-3">
            {[
              {
                num:   "01",
                cat:   lang === "es" ? "Encuentro" : "Encounter",
                title: lang === "es" ? "Conferencias" : "Conferences",
                desc:  lang === "es"
                  ? "Eventos de alto impacto diseñados para confrontar la realidad, expandir tu visión y reconectarte con quién eres en espacios que transforman."
                  : "High-impact events designed to confront reality, expand your vision and reconnect with who you are in spaces that transform.",
                href:  "/conferencias",
              },
              {
                num:   "02",
                cat:   lang === "es" ? "Comunidad" : "Community",
                title: lang === "es" ? "Membresía" : "Membership",
                desc:  lang === "es"
                  ? "Acceso a un círculo de introspección continua: recursos digitales, audios, devocionales y experiencias exclusivas para seguir creciendo."
                  : "Access to a circle of continuous introspection: digital resources, audios, devotionals and exclusive experiences to keep growing.",
                href:  "/membresia",
              },
              {
                num:   "03",
                cat:   lang === "es" ? "Voz" : "Voice",
                title: lang === "es" ? "Podcast" : "Podcast",
                desc:  lang === "es"
                  ? "Conversaciones que van adentro. Una auditoría honesta de tus creencias, tus vínculos y el propósito que aún no te has atrevido a nombrar."
                  : "Conversations that go deep. An honest audit of your beliefs, your bonds and the purpose you haven't dared to name yet.",
                href:  "/podcast",
              },
            ].map((p, i) => (
              <Link
                key={i}
                href={p.href}
                className="pilar-card"
                style={{ padding: "clamp(32px,4vw,56px) clamp(24px,3vw,44px)" }}
              >
                {/* Top row: number + category + arrow */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span className="pilar-num" style={{ fontFamily: "var(--font-am-body)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em" }}>
                      {p.num}
                    </span>
                    <span style={{ width: "1px", height: "10px", backgroundColor: "rgba(0,0,0,0.12)" }} />
                    <span style={{ fontFamily: "var(--font-am-body)", fontSize: "9.5px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(0,0,0,0.3)" }}>
                      {p.cat}
                    </span>
                  </div>
                  <svg className="pilar-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 12L12 2M12 2H5.5M12 2V8.5" stroke="#54132B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Title */}
                <h3
                  className="pilar-title"
                  style={{
                    fontFamily:    "var(--font-am-display)",
                    fontSize:      "clamp(28px, 3vw, 44px)",
                    fontWeight:    300,
                    fontStyle:     "italic",
                    letterSpacing: "-0.015em",
                    lineHeight:    1.05,
                    color:         "#000000",
                  }}
                >
                  {p.title}
                </h3>

                {/* Animated bar */}
                <div className="pilar-bar" />

                {/* Description */}
                <p
                  className="pilar-desc"
                  style={{
                    fontFamily: "var(--font-am-body)",
                    fontSize:   "13.5px",
                    color:      "rgba(0,0,0,0.45)",
                    lineHeight: 1.72,
                    marginTop:  "20px",
                    flex:       1,
                  }}
                >
                  {p.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════ PODCAST — dark, spotify-style carrusel ══════════ */}
      <PodcastSection lang={lang} />

      {/* ══════════════════════════════════ EXPLORA — Speakers & Experiencias ══ */}
      <ExploraSection lang={lang} />

      <Divider />

      {/* ══════════════════════════════════ TEST EMOCIONAL — premium redesign ══ */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "#54132B", padding: "clamp(52px,6vw,88px) clamp(24px,5vw,80px)" }}
      >
        {/* GeoLayer — dark sobre burgundy */}
        <GeoLayer variant="dark" />

        {/* Isotipo watermark — gigante, centrado-derecho */}
        <div
          aria-hidden="true"
          className="hidden lg:block"
          style={{
            position: "absolute",
            right: "-4%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "clamp(400px,50vw,680px)",
            height: "clamp(400px,50vw,680px)",
            opacity: 0.07,
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <Image
            src="/logos/am-icon-white.svg"
            alt=""
            fill
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
        </div>

        {/* Content */}
        <div
          className="max-w-[1280px] mx-auto relative"
          style={{ zIndex: 1 }}
        >
          {/* Top label */}
          <p style={{
            fontFamily: "var(--font-am-body)",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
            marginBottom: "clamp(32px,4vw,56px)",
          }}>
            {lang === "es" ? "Test Emocional · Gratuito" : "Emotional Test · Free"}
          </p>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-end">

            {/* Left — headline + stats + CTA */}
            <div>
              <h2 style={{
                fontFamily: "var(--font-am-display)",
                fontSize: "clamp(32px, 5vw, 72px)",
                fontWeight: 300,
                fontStyle: "italic",
                letterSpacing: "-0.03em",
                lineHeight: 0.92,
                color: "#FFFFFF",
                marginBottom: "clamp(20px,3vw,32px)",
              }}>
                {lang === "es"
                  ? <>¿No sabes<br />por dónde<br /><span style={{ color: "#F4E7E9", opacity: 0.75 }}>empezar?</span></>
                  : <>Don't know<br />where to<br /><span style={{ color: "#F4E7E9", opacity: 0.75 }}>start?</span></>}
              </h2>

              <p style={{
                fontFamily: "var(--font-am-body)",
                fontSize: "clamp(14px, 1.3vw, 16px)",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.75,
                maxWidth: "460px",
                marginBottom: "clamp(20px,3vw,36px)",
              }}>
                {lang === "es"
                  ? "Responde 5 preguntas y descubre qué experiencias, recursos o recorridos están alineados con lo que estás viviendo ahora."
                  : "Answer 5 questions and discover which experiences, resources or journeys are aligned with what you're living right now."}
              </p>

              {/* Stats row */}
              <div style={{ display: "flex", gap: "clamp(24px,4vw,48px)", marginBottom: "clamp(24px,3vw,40px)", flexWrap: "wrap" }}>
                {[
                  { num: "5",    labelEs: "preguntas",   labelEn: "questions"   },
                  { num: "3",    labelEs: "minutos",     labelEn: "minutes"     },
                  { num: "100%", labelEs: "gratuito",    labelEn: "free"        },
                ].map((s) => (
                  <div key={s.num}>
                    <p style={{
                      fontFamily: "var(--font-am-display)",
                      fontSize: "clamp(28px,3.5vw,48px)",
                      fontWeight: 300,
                      color: "#FFFFFF",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      marginBottom: "4px",
                    }}>
                      {s.num}
                    </p>
                    <p style={{
                      fontFamily: "var(--font-am-body)",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.35)",
                    }}>
                      {lang === "es" ? s.labelEs : s.labelEn}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="/test"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: "var(--font-am-body)",
                  fontSize: "11.5px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#54132B",
                  backgroundColor: "#FFFFFF",
                  padding: "16px 36px",
                  borderRadius: "2px",
                  textDecoration: "none",
                  transition: "background-color 0.22s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F4E7E9")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
              >
                {lang === "es" ? "Comenzar el test" : "Start the test"}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H4.5M10 2V7.5" stroke="#54132B" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </Link>
            </div>

            {/* Right — decorative quote pill (desktop) */}
            <div
              className="hidden lg:flex"
              style={{
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "16px",
                paddingBottom: "8px",
              }}
            >
              <div style={{
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "2px",
                padding: "24px 28px",
                maxWidth: "260px",
                backgroundColor: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(4px)",
              }}>
                <p style={{
                  fontFamily: "var(--font-am-display)",
                  fontSize: "16px",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.55,
                  marginBottom: "16px",
                }}>
                  {lang === "es"
                    ? '"No tienes que saber qué necesitas. Eso lo descubrimos juntas."'
                    : '"You don\'t have to know what you need. We\'ll discover it together."'}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "16px", height: "1px", backgroundColor: "rgba(255,255,255,0.3)" }} />
                  <span style={{
                    fontFamily: "var(--font-am-body)",
                    fontSize: "9.5px",
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                  }}>
                    Dra. Liset Valencia
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════ TESTIMONIOS — Central Carousel ══ */}
      {(() => {
        // Burgundi y verde — máximo contraste sobre negro
        const cardBgs   = ["#54132B", "#425546", "#54132B", "#425546"];
        const starColors = ["#F4C5CE", "#A8C5A8", "#F4C5CE", "#A8C5A8"]; // rose / sage
        const [tIdx, setTIdx] = useState(0);
        const tPrev = () => setTIdx(i => (i - 1 + testimonials.length) % testimonials.length);
        const tNext = () => setTIdx(i => (i + 1) % testimonials.length);
        const t = testimonials[tIdx];
        const cardBg   = cardBgs[tIdx];
        const starColor = starColors[tIdx];
        return (
          <section className="py-20 px-6" style={{ backgroundColor: "#0A0A0A", position: "relative", overflow: "hidden" }}>
            <GeoLayer variant="dark" />
            <div className="max-w-[800px] mx-auto" style={{ position: "relative", zIndex: 1 }}>

              {/* Header */}
              <div className="text-center mb-12">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "14px" }}>
                  <span style={{ display: "inline-block", width: "28px", height: "1px", backgroundColor: "rgba(255,255,255,0.2)" }} />
                  <span className="font-body uppercase tracking-[0.3em]" style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.35)" }}>
                    {lang === "es" ? "Testimonios" : "Testimonials"}
                  </span>
                  <span style={{ display: "inline-block", width: "28px", height: "1px", backgroundColor: "rgba(255,255,255,0.2)" }} />
                </div>
                <h2
                  className="font-display"
                  style={{ fontSize: "clamp(18px, 2.2vw, 28px)", fontWeight: 300, fontStyle: "italic", color: "#FFFFFF", letterSpacing: "-0.01em" }}
                >
                  {lang === "es"
                    ? <>Lo que encontraron <span style={{ color: "#F4E7E9" }}>aquí.</span></>
                    : <>What they found <span style={{ color: "#F4E7E9" }}>here.</span></>}
                </h2>
              </div>

              {/* Card central */}
              <div
                key={tIdx}
                style={{
                  backgroundColor: cardBg,
                  borderRadius: "4px",
                  padding: "clamp(28px, 5vw, 52px)",
                  boxShadow: `0 16px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07)`,
                  position: "relative",
                  overflow: "hidden",
                  animation: "tFadeIn 0.4s ease",
                }}
              >
                <style>{`@keyframes tFadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }`}</style>

                {/* Large quote watermark */}
                <div aria-hidden="true" style={{ position: "absolute", top: -28, right: 12, fontFamily: "var(--font-am-display)", fontStyle: "italic", fontWeight: 700, fontSize: "160px", lineHeight: 1, color: "#FFFFFF", opacity: 0.05, userSelect: "none", pointerEvents: "none" }}>"</div>

                {/* Thin color band top-left accent */}
                <div style={{ position: "absolute", top: 0, left: 0, width: "3px", height: "100%", backgroundColor: "rgba(255,255,255,0.18)" }} />

                {/* Stars — color por perfil */}
                <div style={{ display: "flex", gap: "5px", marginBottom: "22px" }}>
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill={starColor}>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote
                  className="font-body"
                  style={{ fontSize: "clamp(15px, 1.8vw, 20px)", color: "#FFFFFF", lineHeight: 1.85, fontStyle: "italic", marginBottom: "24px", opacity: 0.95 }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Result pill */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "24px", padding: "5px 12px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "2px" }}>
                  <div style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: starColor, flexShrink: 0 }} />
                  <span className="font-body" style={{ fontSize: "10.5px", fontWeight: 600, color: starColor, letterSpacing: "0.06em" }}>{t.result}</span>
                </div>

                {/* Divider */}
                <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.12)", marginBottom: "20px" }} />

                {/* Author */}
                <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "50%", flexShrink: 0, backgroundColor: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="font-display" style={{ fontSize: "20px", fontWeight: 400, color: "#FFFFFF", fontStyle: "italic" }}>{t.initial}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: "100px" }}>
                    <p className="font-body" style={{ fontSize: "11.5px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.1em", textTransform: "uppercase" }}>{t.name}</p>
                    <p className="font-body" style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "3px" }}>{t.city}</p>
                  </div>
                  <div style={{ padding: "5px 12px", borderRadius: "2px", backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", flexShrink: 0 }}>
                    <span className="font-body" style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>{t.tag}</span>
                  </div>
                </div>
              </div>

              {/* Controles */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", marginTop: "32px" }}>
                <button
                  onClick={tPrev}
                  aria-label={lang === "es" ? "Anterior" : "Previous"}
                  style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.18)", backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s ease" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor=cardBg; el.style.borderColor=cardBg; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor="transparent"; el.style.borderColor="rgba(255,255,255,0.18)"; }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>

                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTIdx(i)}
                      aria-label={`Testimonio ${i + 1}`}
                      style={{
                        width: tIdx === i ? "24px" : "6px",
                        height: "6px",
                        borderRadius: "3px",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.35s ease",
                        backgroundColor: tIdx === i ? cardBg : "rgba(255,255,255,0.18)",
                        boxShadow: tIdx === i ? `0 0 10px ${cardBg}99` : "none",
                        padding: 0,
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={tNext}
                  aria-label={lang === "es" ? "Siguiente" : "Next"}
                  style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.18)", backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s ease" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor=cardBg; el.style.borderColor=cardBg; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor="transparent"; el.style.borderColor="rgba(255,255,255,0.18)"; }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>

              <p className="font-body text-center mt-4" style={{ fontSize: "9.5px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.16em" }}>
                {tIdx + 1} / {testimonials.length}&nbsp;&nbsp;·&nbsp;&nbsp;{lang === "es" ? "Publicado con permiso · Nombres protegidos" : "Published with consent · Names protected"}
              </p>

            </div>
          </section>
        );
      })()}
      {/* ══════════════════════════════════════════════════════════════════
          BIBLIOTECA & DEVOCIONALES — Infinite Ticker Carousel
          Ebooks: book-cover aesthetic (sharp, bold, spine)
          Devocionales: journal/devotional (rounded, gradient, ornament)
          Workbooks: notebook (dot-grid, tab, structured)
      ══════════════════════════════════════════════════════════════════ */}
      <style>{`
        @keyframes ticker-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes ticker-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .ticker-track-left  { animation: ticker-left  40s linear infinite; }
        .ticker-track-right { animation: ticker-right 36s linear infinite; }
        .ticker-track-left:hover,
        .ticker-track-right:hover { animation-play-state: paused; }

        /* ── BASE CARD ── */
        .bib-card {
          flex-shrink: 0;
          width: 215px;
          height: 305px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .bib-card:hover { transform: translateY(-10px) scale(1.03); z-index: 2; }

        /* ── EBOOK — book cover: sharp corners + bold spine ── */
        .bib-card-ebook {
          border-radius: 3px;
          box-shadow: 4px 6px 20px rgba(0,0,0,0.45);
        }
        .bib-card-ebook:hover { box-shadow: 8px 28px 56px rgba(0,0,0,0.7); }

        /* ── DEVOCIONAL — journal: very rounded, soft ── */
        .bib-card-devocional {
          border-radius: 20px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.18);
        }
        .bib-card-devocional:hover { box-shadow: 0 20px 52px rgba(0,0,0,0.35); }

        /* ── WORKBOOK — notebook: slightly rounded, structured ── */
        .bib-card-workbook {
          border-radius: 5px;
          box-shadow: 0 4px 18px rgba(0,0,0,0.4);
        }
        .bib-card-workbook:hover { box-shadow: 0 22px 52px rgba(0,0,0,0.65); }

        /* ── Badges ── */
        .bib-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 4px 10px;
          font-family: var(--font-am-body);
        }
        .bib-badge-ebook     { border-radius: 2px; }
        .bib-badge-devocional{ border-radius: 30px; left: 50%; transform: translateX(-50%); top: 16px; white-space: nowrap; }
        .bib-badge-workbook  { border-radius: 2px; top: 46px; }
      `}</style>

      <section style={{ backgroundColor: "#0A0A0A", position: "relative", overflow: "hidden", paddingTop: "80px", paddingBottom: "80px" }}>
        <GeoLayer variant="dark" />

        {/* ── Header ── */}
        <div className="text-center px-6 mb-12" style={{ position: "relative", zIndex: 1 }}>
          <p
            className="font-body uppercase tracking-[0.26em] mb-3"
            style={{ fontSize: "10px", fontWeight: 700, color: "rgba(244,231,233,0.45)" }}
          >
            {lang === "es" ? "Recursos · Biblioteca · Devocionales" : "Resources · Library · Devotionals"}
          </p>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 300, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, fontStyle: "italic" }}
          >
            {lang === "es" ? "Todo para tu proceso." : "Everything for your journey."}
          </h2>
          <p
            className="font-body mt-3"
            style={{ fontSize: "clamp(13px, 1.1vw, 15px)", color: "rgba(255,255,255,0.4)", maxWidth: 500, margin: "12px auto 0" }}
          >
            {lang === "es"
              ? "Ebooks, workbooks y devocionales creados para acompañarte en cada etapa."
              : "Ebooks, workbooks and devotionals created to accompany you at every stage."}
          </p>
        </div>

        {/* ─── Differentiated card helpers + carousel rows ─── */}
        {(() => {
          // ── EBOOK card — bold book-cover: spine + color block top + big number ──
          const EbookCard = ({ card, num }: { card: { title: string; bg: string; accent: string; textColor: string }; num: number }) => (
            <div className="bib-card bib-card-ebook" style={{ backgroundColor: card.bg, borderLeft: `8px solid ${card.accent}` }}>
              {/* Top 55% — rich color block with editorial geometry */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "55%", overflow: "hidden", backgroundColor: card.bg }}>
                {/* Diagonal line texture */}
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 215 167" fill="none" preserveAspectRatio="xMidYMid slice">
                  {[-40,-20,0,20,40,60,80].map((offset, k) => (
                    <line key={k} x1={offset} y1="0" x2={offset + 167} y2="167" stroke={card.accent} strokeWidth="0.6" strokeOpacity="0.18" />
                  ))}
                  <circle cx="188" cy="20" r="62" fill="none" stroke={card.accent} strokeWidth="1" strokeOpacity="0.15" />
                  <circle cx="188" cy="20" r="40" fill="none" stroke={card.accent} strokeWidth="0.6" strokeOpacity="0.12" />
                </svg>
                {/* AM monogram watermark */}
                <div style={{ position: "absolute", top: "10px", right: "12px", fontFamily: "var(--font-am-display)", fontStyle: "italic", fontWeight: 700, fontSize: "11px", letterSpacing: "0.12em", color: card.accent, opacity: 0.55, textTransform: "uppercase" }}>
                  AM®
                </div>
              </div>
              {/* Ebook badge */}
              <div className="bib-badge bib-badge-ebook" style={{ backgroundColor: card.accent, color: card.bg }}>Ebook</div>
              {/* Ordinal number — very large, ghost */}
              <div style={{ position: "absolute", bottom: "68px", right: "6px", fontFamily: "var(--font-am-display)", fontStyle: "italic", fontWeight: 700, fontSize: "100px", lineHeight: 1, opacity: 0.05, color: card.textColor, pointerEvents: "none", userSelect: "none" }}>
                {String(num + 1).padStart(2, "0")}
              </div>
              {/* Bottom content area — contrasting */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px 16px 18px 16px", backgroundColor: `${card.bg}EE`, backdropFilter: "blur(2px)", borderTop: `1px solid ${card.accent}30` }}>
                <p style={{ fontFamily: "var(--font-am-body)", fontSize: "7.5px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: card.accent, opacity: 0.7, marginBottom: "5px" }}>
                  Dra. Liset Valencia
                </p>
                <h3 style={{ fontFamily: "var(--font-am-display)", fontSize: "18px", fontWeight: 400, fontStyle: "italic", color: card.textColor, lineHeight: 1.2, letterSpacing: "-0.01em", marginBottom: "10px" }}>
                  {card.title}
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ flex: 1, height: "1px", backgroundColor: card.accent, opacity: 0.3 }} />
                  <p style={{ fontFamily: "var(--font-am-body)", fontSize: "7.5px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: card.accent, opacity: 0.5 }}>
                    AuténticaMente®
                  </p>
                </div>
              </div>
            </div>
          );

          // ── DEVOCIONAL card — intimate journal: rounded, warm gradient, mandala, centered ──
          const DevocionalCard = ({ card }: { card: { title: string; bg: string; bgTo?: string; accent: string; textColor: string } }) => (
            <div
              className="bib-card bib-card-devocional"
              style={{ background: `linear-gradient(150deg, ${card.bg} 0%, ${card.bgTo || card.bg} 100%)`, border: `1.5px solid ${card.accent}40` }}
            >
              {/* Subtle dot texture overlay */}
              <div style={{ position: "absolute", inset: 0, borderRadius: "20px", backgroundImage: `radial-gradient(${card.accent}18 1px, transparent 1px)`, backgroundSize: "12px 12px", pointerEvents: "none" }} />
              {/* Inner frame */}
              <div style={{ position: "absolute", inset: "10px", borderRadius: "12px", border: `1px solid ${card.accent}25`, pointerEvents: "none" }} />
              {/* Mandala — rich radiating ornament */}
              <div style={{ position: "absolute", top: "38%", left: "50%", transform: "translate(-50%, -50%)", width: "120px", height: "120px" }}>
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                  {/* Outer petals */}
                  {Array.from({ length: 8 }).map((_, j) => {
                    const r = (v: number) => Math.round(v * 1000) / 1000;
                    const a = (j * 45) * Math.PI / 180;
                    const x1 = r(60 + 40 * Math.cos(a - 0.15)); const y1 = r(60 + 40 * Math.sin(a - 0.15));
                    const x2 = r(60 + 52 * Math.cos(a));         const y2 = r(60 + 52 * Math.sin(a));
                    const x3 = r(60 + 40 * Math.cos(a + 0.15)); const y3 = r(60 + 40 * Math.sin(a + 0.15));
                    return <path key={j} d={`M ${x1} ${y1} Q ${x2} ${y2} ${x3} ${y3}`} stroke={card.accent} strokeWidth="1" strokeOpacity="0.5" fill="none" />;
                  })}
                  {/* Radiating lines */}
                  {Array.from({ length: 24 }).map((_, j) => {
                    const r = (v: number) => Math.round(v * 1000) / 1000;
                    const a = (j * 15) * Math.PI / 180;
                    const r1 = j % 2 === 0 ? 28 : 32; const r2 = j % 2 === 0 ? 46 : 42;
                    return <line key={j} x1={r(60 + r1 * Math.cos(a))} y1={r(60 + r1 * Math.sin(a))} x2={r(60 + r2 * Math.cos(a))} y2={r(60 + r2 * Math.sin(a))} stroke={card.accent} strokeWidth="0.7" strokeOpacity="0.4" />;
                  })}
                  {/* Concentric rings */}
                  <circle cx="60" cy="60" r="26" fill="none" stroke={card.accent} strokeWidth="0.8" strokeOpacity="0.35" />
                  <circle cx="60" cy="60" r="17" fill="none" stroke={card.accent} strokeWidth="0.6" strokeOpacity="0.28" />
                  <circle cx="60" cy="60" r="8"  fill={card.accent} fillOpacity="0.2" />
                  <circle cx="60" cy="60" r="3.5" fill={card.accent} fillOpacity="0.65" />
                </svg>
              </div>
              {/* Badge — centered pill at top */}
              <div className="bib-badge bib-badge-devocional" style={{ backgroundColor: `${card.accent}20`, color: card.textColor, border: `1px solid ${card.accent}50`, backdropFilter: "blur(4px)" }}>
                ✦ Devocional
              </div>
              {/* Title — centered, below mandala */}
              <div style={{ position: "absolute", bottom: "52px", left: 0, right: 0, textAlign: "center", padding: "0 22px" }}>
                <h3 style={{ fontFamily: "var(--font-am-display)", fontSize: "20px", fontWeight: 300, fontStyle: "italic", color: card.textColor, lineHeight: 1.25, letterSpacing: "-0.01em" }}>
                  {card.title}
                </h3>
              </div>
              {/* Bottom */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, textAlign: "center", padding: "0 16px 15px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <div style={{ flex: 1, height: "0.5px", backgroundColor: card.accent, opacity: 0.3 }} />
                  <p style={{ fontFamily: "var(--font-am-body)", fontSize: "7.5px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: card.textColor, opacity: 0.38 }}>AuténticaMente®</p>
                  <div style={{ flex: 1, height: "0.5px", backgroundColor: card.accent, opacity: 0.3 }} />
                </div>
              </div>
            </div>
          );

          // ── WORKBOOK card — structured notebook: dark, dot-grid, tab, ruled lines ──
          const WorkbookCard = ({ card }: { card: { title: string; bg: string; accent: string; textColor: string; tab: string } }) => (
            <div
              className="bib-card bib-card-workbook"
              style={{ backgroundColor: card.bg, backgroundImage: `radial-gradient(${card.accent}25 1.4px, transparent 1.4px)`, backgroundSize: "14px 14px" }}
            >
              {/* Spiral dots along top — simulated binding */}
              <div style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px", zIndex: 2 }}>
                {[1,2,3,4,5,6,7].map(j => (
                  <div key={j} style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: card.bg, border: `1.5px solid ${card.tab}`, boxShadow: `0 1px 3px rgba(0,0,0,0.4)` }} />
                ))}
              </div>
              {/* Top tab bar */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "26px", backgroundColor: card.tab }} />
              {/* Tab label */}
              <div style={{ position: "absolute", top: "26px", left: "16px", height: "24px", width: "64px", backgroundColor: card.tab, borderRadius: "0 0 5px 5px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "var(--font-am-body)", fontSize: "6.5px", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: card.bg }}>WORKBOOK</span>
              </div>
              {/* Red margin line */}
              <div style={{ position: "absolute", top: "60px", left: "32px", bottom: "72px", width: "1.5px", backgroundColor: `${card.accent}40` }} />
              {/* Workbook badge */}
              <div className="bib-badge bib-badge-workbook" style={{ backgroundColor: card.accent, color: card.bg, top: "62px", left: "42px" }}>Workbook</div>
              {/* Notebook ruled lines */}
              <div style={{ position: "absolute", top: "100px", left: "38px", right: "16px" }}>
                {[0,1,2,3,4,5,6].map(j => (
                  <div key={j} style={{ borderBottom: `1px solid ${card.accent}22`, marginBottom: "17px" }} />
                ))}
              </div>
              {/* AM watermark */}
              <div style={{ position: "absolute", bottom: "54px", right: "6px", fontFamily: "var(--font-am-display)", fontStyle: "italic", fontWeight: 700, fontSize: "80px", lineHeight: 1, opacity: 0.05, color: card.textColor, pointerEvents: "none", userSelect: "none" }}>m</div>
              {/* Content */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 18px 18px 36px", borderTop: `1px solid ${card.accent}20` }}>
                <p style={{ fontFamily: "var(--font-am-body)", fontSize: "7.5px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: card.accent, opacity: 0.65, marginBottom: "5px", paddingTop: "12px" }}>
                  Cuaderno de trabajo
                </p>
                <h3 style={{ fontFamily: "var(--font-am-display)", fontSize: "18px", fontWeight: 400, fontStyle: "italic", color: card.textColor, lineHeight: 1.25, letterSpacing: "-0.01em", marginBottom: "8px" }}>
                  {card.title}
                </h3>
                <p style={{ fontFamily: "var(--font-am-body)", fontSize: "7.5px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: card.accent, opacity: 0.45 }}>
                  AuténticaMente®
                </p>
              </div>
            </div>
          );

          type CardDef =
            | { type: "ebook";      title: string; bg: string; accent: string; textColor: string }
            | { type: "devocional"; title: string; bg: string; bgTo?: string; accent: string; textColor: string }
            | { type: "workbook";   title: string; bg: string; accent: string; textColor: string; tab: string };

          const row1: CardDef[] = [
            { type: "ebook",      title: lang === "es" ? "Identidad y Propósito"  : "Identity & Purpose",      bg: "#54132B", accent: "#C9A29A", textColor: "#FFFFFF" },
            { type: "devocional", title: lang === "es" ? "Lunes de Intención"     : "Monday of Intention",     bg: "#F4E7E9", bgTo: "#E8D5D8", accent: "#928178",  textColor: "#3D2B25" },
            { type: "ebook",      title: lang === "es" ? "El Cuerpo como Hogar"   : "The Body as Home",        bg: "#2A2018", accent: "#928178", textColor: "#F4E7E9" },
            { type: "devocional", title: lang === "es" ? "Jueves de Verdad"       : "Thursday of Truth",       bg: "#F9F0E8", bgTo: "#EFE2D5", accent: "#C79C8C",  textColor: "#54132B" },
            { type: "workbook",   title: lang === "es" ? "Sanar en Comunidad"     : "Healing in Community",    bg: "#0F0F0F", accent: "#928178", textColor: "#F4E7E9", tab: "#928178" },
            { type: "ebook",      title: lang === "es" ? "Relaciones que Sanan"   : "Relationships that Heal", bg: "#54132B", accent: "#F4E7E9", textColor: "#FFFFFF" },
            { type: "workbook",   title: lang === "es" ? "Propósito Real"         : "Real Purpose",            bg: "#1C2B20", accent: "#6B9975", textColor: "#D4E8D8", tab: "#425546" },
            { type: "devocional", title: lang === "es" ? "Semilla de Gratitud"    : "Seed of Gratitude",       bg: "#EDE3DC", bgTo: "#DDD0C8", accent: "#928178",  textColor: "#3D2B25" },
          ];

          const row2: CardDef[] = [
            { type: "workbook",   title: lang === "es" ? "Finanzas con Propósito" : "Finances with Purpose",   bg: "#0A0A0A", accent: "#C9A29A", textColor: "#F4E7E9", tab: "#54132B" },
            { type: "devocional", title: lang === "es" ? "Miércoles de Presencia" : "Wednesday of Presence",   bg: "#E8EEE9", bgTo: "#D8E3DA", accent: "#425546",  textColor: "#2A3D2E" },
            { type: "ebook",      title: lang === "es" ? "Límites que Liberan"    : "Boundaries that Free",    bg: "#425546", accent: "#A8C4AD", textColor: "#FFFFFF" },
            { type: "devocional", title: lang === "es" ? "Domingo de Gratitud"    : "Sunday of Gratitude",     bg: "#F5EDE8", bgTo: "#E8DDD5", accent: "#C79C8C",  textColor: "#54132B" },
            { type: "ebook",      title: lang === "es" ? "Heridas que Forman"     : "Wounds that Shape",       bg: "#928178", accent: "#F9F4F1", textColor: "#FFFFFF" },
            { type: "workbook",   title: lang === "es" ? "El Arte de Soltar"      : "The Art of Letting Go",   bg: "#141414", accent: "#A8C4AD", textColor: "#D4E8D8", tab: "#425546" },
            { type: "ebook",      title: lang === "es" ? "Crianza Consciente"     : "Conscious Parenting",     bg: "#1A2E22", accent: "#6B9975", textColor: "#D4E8D8" },
            { type: "devocional", title: lang === "es" ? "Viernes de Reflexión"   : "Friday of Reflection",    bg: "#EEE8F0", bgTo: "#E0D6E5", accent: "#7C5E8C",  textColor: "#3A2545" },
          ];

          const renderCard = (card: CardDef, i: number) => {
            if (card.type === "ebook")      return <EbookCard      key={i} card={card} num={i % 8} />;
            if (card.type === "devocional") return <DevocionalCard key={i} card={card} />;
            return                                 <WorkbookCard   key={i} card={card} />;
          };

          return (
            <>
              {/* ── Fila 1 — Ticker izquierda ── */}
              <div style={{ overflow: "hidden", marginBottom: "18px", position: "relative", zIndex: 1 }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "100px", background: "linear-gradient(to right, #0A0A0A, transparent)", zIndex: 2, pointerEvents: "none" }} />
                <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "100px", background: "linear-gradient(to left, #0A0A0A, transparent)", zIndex: 2, pointerEvents: "none" }} />
                <div className="ticker-track-left" style={{ display: "flex", gap: "18px", width: "max-content", padding: "20px 0" }}>
                  {[...row1, ...row1].map((card, i) => renderCard(card, i))}
                </div>
              </div>

              {/* ── Fila 2 — Ticker derecha ── */}
              <div style={{ overflow: "hidden", position: "relative", zIndex: 1 }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "100px", background: "linear-gradient(to right, #0A0A0A, transparent)", zIndex: 2, pointerEvents: "none" }} />
                <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "100px", background: "linear-gradient(to left, #0A0A0A, transparent)", zIndex: 2, pointerEvents: "none" }} />
                <div className="ticker-track-right" style={{ display: "flex", gap: "18px", width: "max-content", padding: "20px 0" }}>
                  {[...row2, ...row2].map((card, i) => renderCard(card, i))}
                </div>
              </div>
            </>
          );
        })()}

        {/* ── CTAs ── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 px-6"
          style={{ position: "relative", zIndex: 1 }}
        >
          <Link
            href="/biblioteca"
            className="font-body font-bold uppercase tracking-[0.14em] px-8 py-3.5 transition-all"
            style={{ fontSize: "11px", backgroundColor: "#FFFFFF", color: "#0A0A0A", borderRadius: "2px" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#F4E7E9"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#FFFFFF"; }}
          >
            {lang === "es" ? "Explorar la biblioteca →" : "Explore the library →"}
          </Link>
          <Link
            href="/devocionales"
            className="font-body font-semibold uppercase tracking-[0.14em] px-8 py-3.5 border transition-all"
            style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", borderColor: "rgba(255,255,255,0.2)", borderRadius: "2px" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.55)"; (e.currentTarget as HTMLElement).style.color = "#FFFFFF"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)"; }}
          >
            {lang === "es" ? "Suscribirme a Devocionales" : "Subscribe to Devotionals"}
          </Link>
        </div>

      </section>

    </div>
  );
}
