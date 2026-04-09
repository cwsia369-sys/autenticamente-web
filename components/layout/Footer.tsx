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
          <div className="sm:col-span-2 lg:col-span-1 space-y-6">
            <Link href="/" aria-label="AuténticaMente — inicio">
              <Image
                src="/logos/am-wordmark-white.svg"
                alt="AuténticaMente®"
                width={160}
                height={56}
                style={{ height: "26px", width: "auto", opacity: 0.7 }}
              />
            </Link>
            <p
              className="text-[13px] leading-[1.7]"
              style={{ fontFamily: "var(--font-am-body)", color: "rgba(255,255,255,0.38)" }}
            >
              {lang === "es"
                ? "Plataforma de desarrollo humano para quienes quieren crecer con más conciencia, verdad y dirección."
                : "Human development platform for those who want to grow with more awareness, truth and direction."}
            </p>

            {/* Social */}
            <div className="flex items-center gap-5">
              {[
                { label: "Instagram", href: "#", icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                  </svg>
                )},
                { label: "TikTok", href: "#", icon: (
                  <svg width="13" height="15" viewBox="0 0 24 27" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                    <path d="M9 13.5a7.5 7.5 0 1 0 7.5 7.5V4a5.5 5.5 0 0 0 5.5 5.5" />
                  </svg>
                )},
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{ color: "rgba(255,255,255,0.3)", transition: "color 0.2s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#F4E7E9")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                >
                  {icon}
                </a>
              ))}
              {["Spotify", "YouTube"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10.5px] uppercase tracking-[0.1em]"
                  style={{
                    fontFamily: "var(--font-am-body)",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.3)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#F4E7E9")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                >
                  {platform}
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
