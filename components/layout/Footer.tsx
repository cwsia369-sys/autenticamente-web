"use client";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/app/providers/LangProvider";

export default function Footer() {
  const { lang } = useLang();

  const explorar = [
    { labelEs: "El Método",       labelEn: "The Method",     href: "/metodo"       },
    { labelEs: "Conferencias",    labelEn: "Conferences",    href: "/conferencias" },
    { labelEs: "Podcast",         labelEn: "Podcast",        href: "/podcast"      },
    { labelEs: "Audios",          labelEn: "Audios",         href: "/audios"       },
    { labelEs: "Biblioteca",      labelEn: "Library",        href: "/biblioteca"   },
    { labelEs: "Test Emocional",  labelEn: "Emotional Test", href: "/test"         },
  ];

  const comunidad = [
    { labelEs: "Membresía",              labelEn: "Membership",  href: "/membresia"   },
    { labelEs: "Devocionales",           labelEn: "Devotionals", href: "/devocionales"},
    { labelEs: "Sobre AuténticaMente",   labelEn: "About us",    href: "/sobre"       },
    { labelEs: "Contacto",               labelEn: "Contact",     href: "/contacto"    },
  ];

  const legal = [
    { labelEs: "Privacidad", labelEn: "Privacy", href: "/privacidad" },
    { labelEs: "Términos",   labelEn: "Terms",   href: "/terminos"   },
  ];

  /* ── Sub-components ── */
  const FLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <li>
      <Link
        href={href}
        className="text-[13px] leading-relaxed transition-colors"
        style={{
          fontFamily: "var(--font-am-body)",
          color: "rgba(255,255,255,0.38)",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#F4E7E9")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
      >
        {children}
      </Link>
    </li>
  );

  const ColTitle = ({ children }: { children: React.ReactNode }) => (
    <h5
      className="text-[10.5px] uppercase tracking-[0.26em] mb-5"
      style={{
        fontFamily: "var(--font-am-body)",
        fontWeight: 700,
        color: "rgba(255,255,255,0.22)",
      }}
    >
      {children}
    </h5>
  );

  return (
    <footer
      style={{
        backgroundColor: "#000000",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-[1100px] mx-auto px-6 pt-16 pb-10">

        {/* ── Main grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-7">
            <Link href="/" aria-label="AuténticaMente — inicio" className="inline-block">
              <Image
                src="/logos/am-wordmark-white.svg"
                alt="AuténticaMente®"
                width={260}
                height={92}
                style={{ height: "52px", width: "auto", opacity: 0.95 }}
              />
            </Link>
            <p
              className="text-[13px] leading-[1.7]"
              style={{ fontFamily: "var(--font-am-body)", color: "rgba(255,255,255,0.42)", maxWidth: "280px" }}
            >
              {lang === "es"
                ? "Plataforma de desarrollo humano para quienes quieren crecer con más conciencia, verdad y dirección."
                : "Human development platform for those who want to grow with more awareness, truth and direction."}
            </p>

            {/* Social — all icons same size */}
            <div className="flex items-center gap-4 pt-1">
              {[
                {
                  label: "Instagram",
                  href: "https://www.instagram.com/lisetvalenciam/",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4.5" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  ),
                },
                {
                  label: "TikTok",
                  href: "https://www.tiktok.com/@dralisetvalencia",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
                    </svg>
                  ),
                },
                {
                  label: "Spotify",
                  href: "https://open.spotify.com/show/autenticamente",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.959-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.361 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                  ),
                },
                {
                  label: "YouTube",
                  href: "https://www.youtube.com/@lisetvalenciam",
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  ),
                },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center transition-all duration-200"
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.55)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#F4E7E9";
                    e.currentTarget.style.backgroundColor = "rgba(244,231,233,0.12)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Explorar */}
          <div>
            <ColTitle>{lang === "es" ? "Explorar" : "Explore"}</ColTitle>
            <ul className="space-y-2.5">
              {explorar.map((l) => (
                <FLink key={l.href} href={l.href}>
                  {lang === "es" ? l.labelEs : l.labelEn}
                </FLink>
              ))}
            </ul>
          </div>

          {/* Comunidad */}
          <div>
            <ColTitle>{lang === "es" ? "Comunidad" : "Community"}</ColTitle>
            <ul className="space-y-2.5">
              {comunidad.map((l) => (
                <FLink key={l.href} href={l.href}>
                  {lang === "es" ? l.labelEs : l.labelEn}
                </FLink>
              ))}
            </ul>
          </div>

          {/* Consulta directa + Legal */}
          <div className="space-y-8">
            {/* Bridge to Liset */}
            <div
              className="p-5 space-y-3"
              style={{
                borderLeft: "2px solid rgba(244,231,233,0.2)",
                backgroundColor: "rgba(255,255,255,0.04)",
              }}
            >
              <p
                className="text-[10px] uppercase tracking-[0.22em]"
                style={{ fontFamily: "var(--font-am-body)", fontWeight: 700, color: "#F4E7E9" }}
              >
                {lang === "es" ? "Consulta directa" : "Direct consultation"}
              </p>
              <p
                className="text-[13px] leading-relaxed"
                style={{ fontFamily: "var(--font-am-body)", color: "rgba(255,255,255,0.38)" }}
              >
                {lang === "es"
                  ? "¿Buscas acompañamiento clínico con la Dra. Valencia?"
                  : "Looking for clinical support with Dr. Valencia?"}
              </p>
              <a
                href="https://lisetvalencia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[12px] tracking-[0.08em] transition-opacity"
                style={{
                  fontFamily: "var(--font-am-body)",
                  fontWeight: 600,
                  color: "#F4E7E9",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.65")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                lisetvalencia.com →
              </a>
            </div>

            {/* Legal */}
            <div>
              <ColTitle>Legal</ColTitle>
              <ul className="space-y-2.5">
                {legal.map((l) => (
                  <FLink key={l.href} href={l.href}>
                    {lang === "es" ? l.labelEs : l.labelEn}
                  </FLink>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Sello central ── */}
        <div className="flex justify-center mb-10">
          <Image
            src="/logos/am-icon-white.svg"
            alt=""
            width={64}
            height={64}
            aria-hidden="true"
            style={{ height: "52px", width: "auto", opacity: 0.12 }}
          />
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-3"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <p
            className="text-[11px]"
            style={{ fontFamily: "var(--font-am-body)", color: "rgba(255,255,255,0.25)" }}
          >
            © {new Date().getFullYear()} AUTÉNTICAMENTE® · Dra. Liset Valencia.{" "}
            {lang === "es" ? "Todos los derechos reservados." : "All rights reserved."}
          </p>
          <p
            className="text-[11px]"
            style={{ fontFamily: "var(--font-am-body)", color: "rgba(255,255,255,0.15)" }}
          >
            {lang === "es"
              ? "Desarrollo Humano · Transformación Psicoespiritual"
              : "Human Development · Psycho-spiritual Transformation"}
          </p>
        </div>
      </div>
    </footer>
  );
}
