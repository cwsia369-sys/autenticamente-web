"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useLang } from "@/app/providers/LangProvider";

export default function Navbar() {
  const [open,         setOpen]         = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [recursosOpen, setRecursosOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const recursosLinks = [
    { labelEs: "Ebooks",       labelEn: "Ebooks",      href: "/biblioteca"  },
    { labelEs: "Audios",       labelEn: "Audios",       href: "/audios"      },
    { labelEs: "Devocionales", labelEn: "Devotionals",  href: "/devocionales"},
  ];

  // Main centered nav links
  const navLinks = [
    { key: "nav.metodo",       href: "/metodo"       },
    { key: "nav.conferencias", href: "/conferencias" },
    { key: "nav.podcast",      href: "/podcast"      },
  ];

  const openRecursos  = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setRecursosOpen(true);  };
  const closeRecursos = () => { closeTimer.current = setTimeout(() => setRecursosOpen(false), 120); };

  const navH   = scrolled ? "68px" : "96px";
  const navBg  = scrolled ? "rgba(249,244,241,0.98)" : "rgba(249,244,241,0.90)";
  const border = scrolled ? "1px solid rgba(0,0,0,0.09)" : "1px solid rgba(0,0,0,0.04)";
  const shadow = scrolled ? "0 1px 24px rgba(0,0,0,0.07)" : "none";

  const navTextColor   = "rgba(0,0,0,0.52)";
  const navTextHover   = "#54132B";
  const navLineColor   = "#54132B";
  const langColor      = "rgba(0,0,0,0.30)";
  const sepColor       = "rgba(0,0,0,0.13)";
  const hamburgerColor = "#000000";

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor:      navBg,
        backdropFilter:       "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom:  border,
        boxShadow:     shadow,
        transition:    "background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      <div
        className="mx-auto px-8 lg:px-14 flex items-center justify-between"
        style={{ maxWidth: "1400px", height: navH, transition: "height 0.35s ease" }}
      >

        {/* ── Logo ─────────────────────────────────────────── */}
        <Link href="/" aria-label="AuténticaMente — inicio" className="shrink-0 group">
          <Image
            src={scrolled ? "/logos/am-icon-black.svg" : "/logos/am-wordmark-black.svg"}
            alt="AuténticaMente®"
            width={240} height={80} priority
            className="hidden lg:block group-hover:opacity-50 transition-opacity duration-200"
            style={{ height: scrolled ? "38px" : "76px", width: "auto", opacity: 0.85, transition: "height 0.35s ease, opacity 0.25s ease" }}
          />
          <Image
            src={scrolled ? "/logos/am-icon-black.svg" : "/logos/am-wordmark-black.svg"}
            alt="AuténticaMente®"
            width={240} height={80} priority
            className="lg:hidden group-hover:opacity-50 transition-opacity duration-200"
            style={{ height: scrolled ? "28px" : "52px", width: "auto", opacity: 0.85, transition: "height 0.35s ease, opacity 0.25s ease" }}
          />
        </Link>

        {/* ── Desktop nav — centrado ───────────────────────── */}
        <nav
          className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2"
          aria-label="Navegación principal"
        >
          {navLinks.map(({ key, href }) => (
            <Link
              key={href} href={href}
              className="nav-item relative pb-0.5 text-[11px] tracking-[0.1em] uppercase"
              style={{ fontFamily: "var(--font-am-body)", fontWeight: 600, color: navTextColor }}
              onMouseEnter={(e) => { e.currentTarget.style.color = navTextHover; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = navTextColor; }}
            >
              {t(key)}
              <span className="nav-line" style={{ backgroundColor: navLineColor }} />
            </Link>
          ))}

          {/* Membresía — destacada */}
          <Link
            href="/membresia"
            className="nav-item relative pb-0.5 text-[11px] tracking-[0.1em] uppercase"
            style={{ fontFamily: "var(--font-am-body)", fontWeight: 600, color: "#54132B" }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            {lang === "es" ? "Membresía" : "Membership"}
            <span className="nav-line" style={{ backgroundColor: "#54132B" }} />
          </Link>

          {/* ── Recursos dropdown ───────────────────────────── */}
          <div className="relative" onMouseEnter={openRecursos} onMouseLeave={closeRecursos}>
            <button
              className="nav-item relative pb-0.5 text-[11px] tracking-[0.1em] uppercase flex items-center gap-[5px]"
              style={{ fontFamily: "var(--font-am-body)", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0, color: navTextColor }}
              onMouseEnter={(e) => { e.currentTarget.style.color = navTextHover; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = navTextColor; }}
              aria-expanded={recursosOpen} aria-haspopup="true"
            >
              {lang === "es" ? "Recursos" : "Resources"}
              <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", transform: recursosOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)", opacity: 0.45, marginTop: "1px" }}>
                <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
                  <path d="M1 1l2.5 2.5L6 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="nav-line" />
            </button>

            {/* Dropdown */}
            <div
              className="absolute top-full left-1/2 pt-[14px]"
              style={{
                pointerEvents: recursosOpen ? "auto" : "none",
                opacity:   recursosOpen ? 1 : 0,
                transform: recursosOpen
                  ? "translateX(-50%) translateY(0px) scale(1)"
                  : "translateX(-50%) translateY(-6px) scale(0.97)",
                transition: recursosOpen
                  ? "opacity 0.18s ease, transform 0.24s cubic-bezier(0.34,1.4,0.64,1)"
                  : "opacity 0.15s ease, transform 0.18s ease",
                transformOrigin: "50% 0%",
                zIndex: 200,
              }}
            >
              <div style={{ backgroundColor: "#FDFAF8", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "4px", boxShadow: "0 20px 60px rgba(0,0,0,0.13), 0 4px 12px rgba(0,0,0,0.06)", minWidth: "200px", padding: "6px 0", overflow: "hidden" }}>
                {recursosLinks.map((item) => (
                  <Link
                    key={item.href} href={item.href}
                    className="dropdown-row flex items-center px-6 py-[11px] text-[12px] tracking-[0.04em]"
                    style={{ fontFamily: "var(--font-am-body)", fontWeight: 500 }}
                  >
                    {lang === "es" ? item.labelEs : item.labelEn}
                  </Link>
                ))}

                {/* LV en dropdown — separador */}
                <div style={{ height: "1px", backgroundColor: "rgba(0,0,0,0.06)", margin: "4px 0" }} />
                <Link
                  href="/sobre"
                  className="dropdown-row flex items-center justify-between px-6 py-[11px]"
                  style={{ fontFamily: "var(--font-am-body)", fontWeight: 500, fontSize: "12px", tracking: "0.04em" }}
                >
                  <span style={{ color: "rgba(0,0,0,0.52)" }}>
                    {lang === "es" ? "Sobre nosotros" : "About us"}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* ── Right: LV + Lang + Acceder + CTA ────────────── */}
        <div className="hidden lg:flex items-center gap-[16px] shrink-0">

          {/* LV — Dra. Liset Valencia */}
          <LVButton lang={lang} />

          <span aria-hidden="true" style={{ width: 1, height: 13, backgroundColor: sepColor, flexShrink: 0 }} />

          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="lang-btn"
            style={{ fontFamily: "var(--font-am-body)", color: langColor }}
          >
            {lang === "es" ? "EN" : "ES"}
          </button>

          <span aria-hidden="true" style={{ width: 1, height: 13, backgroundColor: sepColor, flexShrink: 0 }} />

          <Link
            href="/acceder"
            className="nav-item text-[11px] tracking-[0.07em]"
            style={{ fontFamily: "var(--font-am-body)", fontWeight: 500, color: navTextColor }}
            onMouseEnter={(e) => { e.currentTarget.style.color = navTextHover; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = navTextColor; }}
          >
            {t("nav.acceder")}
          </Link>

          <Link
            href="/membresia"
            className="cta-pill text-[10px] tracking-[0.16em] uppercase px-[20px] py-[10px]"
            style={{ fontFamily: "var(--font-am-body)", fontWeight: 700 }}
          >
            {lang === "es" ? "Únete Ahora" : "Join Now"}
          </Link>
        </div>

        {/* ── Hamburger ────────────────────────────────────── */}
        <button
          className="lg:hidden w-10 h-10 flex flex-col justify-center items-end gap-[5px] pr-1"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          <span className="block h-px origin-right transition-all duration-300" style={{ width: "20px", backgroundColor: hamburgerColor, transform: open ? "translateY(6px) rotate(-45deg) scaleX(1.05)" : "none" }} />
          <span className="block h-px transition-all duration-300" style={{ width: "14px", backgroundColor: hamburgerColor, opacity: open ? 0 : 1, transform: open ? "translateX(6px)" : "none" }} />
          <span className="block h-px origin-right transition-all duration-300" style={{ width: "20px", backgroundColor: hamburgerColor, transform: open ? "translateY(-6px) rotate(45deg) scaleX(1.05)" : "none" }} />
        </button>
      </div>

      {/* ── Mobile menu ──────────────────────────────────────── */}
      <div
        className="lg:hidden overflow-hidden"
        style={{ maxHeight: open ? "800px" : "0", opacity: open ? 1 : 0, transition: "max-height 0.52s cubic-bezier(0.4,0,0.2,1), opacity 0.32s ease" }}
      >
        <div className="px-8 pt-6 pb-10 border-t" style={{ borderColor: "rgba(0,0,0,0.07)", backgroundColor: "#F9F4F1" }}>

          {/* Main links */}
          <div>
            {navLinks.map(({ key, href }, i) => (
              <Link
                key={href} href={href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-[15px] text-[13px] border-b"
                style={{
                  fontFamily: "var(--font-am-body)", fontWeight: 600, color: "#000",
                  borderColor: "rgba(0,0,0,0.07)", letterSpacing: "0.06em", textTransform: "uppercase",
                  transform: open ? "translateX(0)" : "translateX(-8px)",
                  opacity: open ? 1 : 0,
                  transition: `transform 0.35s ease ${i * 0.06 + 0.1}s, opacity 0.3s ease ${i * 0.06 + 0.1}s`,
                }}
              >
                {t(key)}
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ opacity: 0.2, flexShrink: 0 }}>
                  <path d="M2 5.5h7M6 2.5l3 3-3 3" stroke="#000" strokeWidth="0.9" strokeLinecap="round"/>
                </svg>
              </Link>
            ))}

            {/* Membresía — destacada en móvil */}
            <Link
              href="/membresia"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-[15px] text-[13px] border-b"
              style={{
                fontFamily: "var(--font-am-body)", fontWeight: 700, color: "#54132B",
                borderColor: "rgba(0,0,0,0.07)", letterSpacing: "0.06em", textTransform: "uppercase",
                transform: open ? "translateX(0)" : "translateX(-8px)",
                opacity: open ? 1 : 0,
                transition: `transform 0.35s ease ${navLinks.length * 0.06 + 0.1}s, opacity 0.3s ease ${navLinks.length * 0.06 + 0.1}s`,
              }}
            >
              {lang === "es" ? "Membresía" : "Membership"}
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ opacity: 0.4, flexShrink: 0 }}>
                <path d="M2 5.5h7M6 2.5l3 3-3 3" stroke="#54132B" strokeWidth="0.9" strokeLinecap="round"/>
              </svg>
            </Link>
          </div>

          {/* Recursos */}
          <p className="text-[9px] uppercase tracking-[0.24em] pt-6 pb-2" style={{ fontFamily: "var(--font-am-body)", fontWeight: 700, color: "rgba(0,0,0,0.28)" }}>
            {lang === "es" ? "Recursos" : "Resources"}
          </p>
          {recursosLinks.map((item, i) => (
            <Link
              key={item.href} href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-[11px] text-[13px] border-b"
              style={{
                fontFamily: "var(--font-am-body)", fontWeight: 400, color: "rgba(0,0,0,0.45)",
                borderColor: "rgba(0,0,0,0.05)",
                transform: open ? "translateX(0)" : "translateX(-8px)",
                opacity: open ? 1 : 0,
                transition: `transform 0.35s ease ${(navLinks.length + 1 + i) * 0.06 + 0.15}s, opacity 0.3s ease ${(navLinks.length + 1 + i) * 0.06 + 0.15}s`,
              }}
            >
              {lang === "es" ? item.labelEs : item.labelEn}
            </Link>
          ))}

          {/* LV card — Dra. Liset Valencia */}
          <Link
            href="/sobre"
            onClick={() => setOpen(false)}
            className="flex items-center gap-4 mt-6 p-4"
            style={{
              border: "1px solid rgba(84,19,43,0.2)",
              borderRadius: "3px",
              backgroundColor: "rgba(84,19,43,0.03)",
              textDecoration: "none",
            }}
          >
            <div style={{
              width: "38px", height: "38px", borderRadius: "50%",
              backgroundColor: "#54132B",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <span style={{ fontFamily: "var(--font-am-display)", fontSize: "14px", fontWeight: 400, fontStyle: "italic", color: "#F4E7E9", letterSpacing: "0.04em" }}>
                LV
              </span>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-am-body)", fontSize: "12px", fontWeight: 600, color: "#54132B", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "2px" }}>
                Dra. Liset Valencia
              </p>
              <p style={{ fontFamily: "var(--font-am-body)", fontSize: "11px", color: "rgba(0,0,0,0.38)", letterSpacing: "0.02em" }}>
                {lang === "es" ? "Fundadora · Psicóloga Clínica" : "Founder · Clinical Psychologist"}
              </p>
            </div>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ marginLeft: "auto", opacity: 0.3, flexShrink: 0 }}>
              <path d="M2 5.5h7M6 2.5l3 3-3 3" stroke="#54132B" strokeWidth="0.9" strokeLinecap="round"/>
            </svg>
          </Link>

          {/* Language selector */}
          <div className="flex gap-2 mt-6">
            {(["es", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="flex-1 py-[10px] text-[10px] uppercase tracking-[0.14em] border transition-all duration-200"
                style={{
                  fontFamily: "var(--font-am-body)", fontWeight: 700,
                  backgroundColor: lang === l ? "#54132B" : "transparent",
                  color: lang === l ? "#fff" : "rgba(0,0,0,0.35)",
                  borderColor: lang === l ? "#54132B" : "rgba(0,0,0,0.1)",
                  borderRadius: "2px", cursor: "pointer",
                }}
              >
                {l === "es" ? "ES — Español" : "EN — English"}
              </button>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 mt-3">
            <Link
              href="/acceder"
              onClick={() => setOpen(false)}
              className="text-[12.5px] text-center py-3 transition-colors"
              style={{ fontFamily: "var(--font-am-body)", fontWeight: 500, color: "rgba(0,0,0,0.35)" }}
            >
              {t("nav.acceder")}
            </Link>
            <Link
              href="/membresia"
              onClick={() => setOpen(false)}
              className="text-[10.5px] text-center py-4 uppercase tracking-[0.16em]"
              style={{ fontFamily: "var(--font-am-body)", fontWeight: 700, backgroundColor: "#54132B", color: "#fff", borderRadius: "2px" }}
            >
              {lang === "es" ? "Únete Ahora" : "Join the Circle"}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

// ── LV Button component ──────────────────────────────────────────────────────
function LVButton({ lang }: { lang: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href="/sobre"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: "8px",
        padding: "7px 14px",
        border: `1px solid ${hovered ? "#54132B" : "rgba(84,19,43,0.28)"}`,
        borderRadius: "2px",
        backgroundColor: hovered ? "#54132B" : "transparent",
        textDecoration: "none",
        transition: "background-color 0.2s ease, border-color 0.2s ease",
      }}
    >
      <span style={{
        fontFamily: "var(--font-am-display)",
        fontSize: "14px", fontWeight: 400, fontStyle: "italic",
        letterSpacing: "0.04em", lineHeight: 1,
        color: hovered ? "#F4E7E9" : "#54132B",
        transition: "color 0.2s",
      }}>
        LV
      </span>
      <span style={{
        fontFamily: "var(--font-am-body)",
        fontSize: "9px", fontWeight: 600,
        letterSpacing: "0.12em", textTransform: "uppercase", lineHeight: 1,
        color: hovered ? "rgba(244,231,233,0.8)" : "rgba(84,19,43,0.6)",
        transition: "color 0.2s",
      }}>
        {lang === "es" ? "Dra. Liset" : "Dr. Liset"}
      </span>
    </Link>
  );
}
