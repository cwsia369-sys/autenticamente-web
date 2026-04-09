"use client";

import Link from "next/link";
import { useLang } from "@/app/providers/LangProvider";

function GeoBg({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute pointer-events-none select-none ${className}`}
      viewBox="0 0 600 600" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
    >
      <circle cx="300" cy="300" r="280" stroke="#928178" strokeWidth="0.8" opacity="0.12" />
      <circle cx="300" cy="300" r="200" stroke="#928178" strokeWidth="0.8" opacity="0.1"  />
      <circle cx="300" cy="300" r="120" stroke="#928178" strokeWidth="0.8" opacity="0.1"  />
      <line x1="20"  y1="300" x2="580" y2="300" stroke="#928178" strokeWidth="0.5" opacity="0.08" />
      <line x1="300" y1="20"  x2="300" y2="580" stroke="#928178" strokeWidth="0.5" opacity="0.08" />
    </svg>
  );
}

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

/* ── Sample events data (replace with CMS/Sanity data) ── */
const eventsES = [
  {
    slug:     "vuelve-a-ti-2026",
    badge:    "Próximo evento",
    badgeColor: "#54132B",
    title:    "Vuelve a Ti — Conferencia de Sanación Emocional",
    date:     "Sábado 24 de mayo, 2026",
    time:     "10:00 AM — 2:00 PM",
    location: "Virtual (Zoom)",
    priceFrom:"$45 USD",
    desc:     "Una experiencia de cuatro horas para reconectar con tu cuerpo, tus emociones y tu dirección interior. Con herramientas prácticas de regulación y presencia.",
    img:      "https://lh3.googleusercontent.com/aida-public/AB6AXuB0mcZnfB7s6xpjhm9uF2aTv-gwmJbCvOMEkLHnNB6YBsXmRmPZtGFyFwQZKVvDTEmvVrVepdUR0rslSI2b0WgYXclHANJxH3C5ifQVFJF8OrdjfgxajnPnwcAN8OF2q6F5kHIVQ-E9vjztcX5NQhFqSpqe5D7ixc-wGaQNrDjiP2R7vPTbSXw7aL3L73Q0YJ3SUjEm5HfYsHb4ER8wAlgiGqN1-MRMh_AxA_hFlDTmtf--M8ipTLtUMDUeOH4FE56IRs63C6qN_uI",
    status:   "upcoming",
  },
  {
    slug:     "raiz-retiro-junio-2026",
    badge:    "Cupos limitados",
    badgeColor: "#928178",
    title:    "RAÍZ — Retiro de Sanación en Naturaleza",
    date:     "13–15 de junio, 2026",
    time:     "Viernes noche — Domingo tarde",
    location: "Bogotá, Colombia",
    priceFrom:"$380 USD",
    desc:     "Una experiencia boutique de tres días para trabajar identidad, silencio interior y transformación personal en un entorno de naturaleza y presencia plena.",
    img:      "https://lh3.googleusercontent.com/aida-public/AB6AXuCBKDoJ7hMs5JOCuAq3QVurDuOHSTJlZDxV-bTDGqgcXQ9bqgK13EEyXvi4Y7rSAD1dGZkKmv5kQJqp7WK0XDJrsybAf4Xg-zJuo-FoYQV3LYGMrs7JRKMWItUO3N1RRmJ-VRbuUF7D7KUe5gRtmF58wg69i0NwZVYJD5_8LV0MsP19VvuENy6VpHSIgMMBIh9yiZASZaZlWYBKMbwRsoZ_i5svUsPNLtI36jRsVghsebi6vev_-NN2eXYuCVjZAE2teHZ01mX3g2o",
    status:   "upcoming",
  },
  {
    slug:     "autenticamente-masterclass-marzo-2026",
    badge:    "Grabación disponible",
    badgeColor: "#928178",
    title:    "AuténticaMente — Masterclass: Identidad y Propósito",
    date:     "Sábado 8 de marzo, 2026",
    time:     "Grabación — 2h 45 min",
    location: "Online — acceso inmediato",
    priceFrom:"$29 USD",
    desc:     "Un recorrido profundo por el proceso de construir identidad auténtica. Accede a la grabación completa con materiales descargables.",
    img:      "https://lh3.googleusercontent.com/aida-public/AB6AXuCuQXzp2NMSxs1lp1bXStWUtHwZv4P__7laXkm1sZK0Oxf65iRern4zRi6WO30qfOyGyeE-E8h5mb0aBpwWpVqzRZrD-Npg4OqAkcAKTtdOYt2IJxOfR8G6z_2L-OFIlIuyIHXPvdzgTKQbOgTycOS4k_gOc-uIAfzQf5k_b3OJFhAzMwg--11l5X4ENTOqnpSUEAHSlMThbrUXQge9izsQ5QQcHB9YnUhGQ7RawiuyswgiVXrdl56Vnre2FrdH1JrGXEztRTK0QLI",
    status:   "past",
  },
];

const eventsEN = [
  {
    slug:     "vuelve-a-ti-2026",
    badge:    "Upcoming event",
    badgeColor: "#54132B",
    title:    "Return to Yourself — Emotional Healing Conference",
    date:     "Saturday May 24, 2026",
    time:     "10:00 AM — 2:00 PM",
    location: "Virtual (Zoom)",
    priceFrom:"$45 USD",
    desc:     "A four-hour experience to reconnect with your body, emotions and inner direction. With practical tools for regulation and presence.",
    img:      "https://lh3.googleusercontent.com/aida-public/AB6AXuB0mcZnfB7s6xpjhm9uF2aTv-gwmJbCvOMEkLHnNB6YBsXmRmPZtGFyFwQZKVvDTEmvVrVepdUR0rslSI2b0WgYXclHANJxH3C5ifQVFJF8OrdjfgxajnPnwcAN8OF2q6F5kHIVQ-E9vjztcX5NQhFqSpqe5D7ixc-wGaQNrDjiP2R7vPTbSXw7aL3L73Q0YJ3SUjEm5HfYsHb4ER8wAlgiGqN1-MRMh_AxA_hFlDTmtf--M8ipTLtUMDUeOH4FE56IRs63C6qN_uI",
    status:   "upcoming",
  },
  {
    slug:     "raiz-retiro-junio-2026",
    badge:    "Limited spots",
    badgeColor: "#928178",
    title:    "RAÍZ — Nature Healing Retreat",
    date:     "June 13–15, 2026",
    time:     "Friday evening — Sunday afternoon",
    location: "Bogotá, Colombia",
    priceFrom:"$380 USD",
    desc:     "A three-day boutique experience to work on identity, inner silence and personal transformation in a nature and full presence environment.",
    img:      "https://lh3.googleusercontent.com/aida-public/AB6AXuCBKDoJ7hMs5JOCuAq3QVurDuOHSTJlZDxV-bTDGqgcXQ9bqgK13EEyXvi4Y7rSAD1dGZkKmv5kQJqp7WK0XDJrsybAf4Xg-zJuo-FoYQV3LYGMrs7JRKMWItUO3N1RRmJ-VRbuUF7D7KUe5gRtmF58wg69i0NwZVYJD5_8LV0MsP19VvuENy6VpHSIgMMBIh9yiZASZaZlWYBKMbwRsoZ_i5svUsPNLtI36jRsVghsebi6vev_-NN2eXYuCVjZAE2teHZ01mX3g2o",
    status:   "upcoming",
  },
  {
    slug:     "autenticamente-masterclass-marzo-2026",
    badge:    "Recording available",
    badgeColor: "#928178",
    title:    "AuténticaMente — Masterclass: Identity and Purpose",
    date:     "Saturday March 8, 2026",
    time:     "Recording — 2h 45 min",
    location: "Online — immediate access",
    priceFrom:"$29 USD",
    desc:     "A deep journey through the process of building authentic identity. Access the full recording with downloadable materials.",
    img:      "https://lh3.googleusercontent.com/aida-public/AB6AXuCuQXzp2NMSxs1lp1bXStWUtHwZv4P__7laXkm1sZK0Oxf65iRern4zRi6WO30qfOyGyeE-E8h5mb0aBpwWpVqzRZrD-Npg4OqAkcAKTtdOYt2IJxOfR8G6z_2L-OFIlIuyIHXPvdzgTKQbOgTycOS4k_gOc-uIAfzQf5k_b3OJFhAzMwg--11l5X4ENTOqnpSUEAHSlMThbrUXQge9izsQ5QQcHB9YnUhGQ7RawiuyswgiVXrdl56Vnre2FrdH1JrGXEztRTK0QLI",
    status:   "past",
  },
];

export default function ConferenciasPage() {
  const { lang } = useLang();
  const events   = lang === "es" ? eventsES : eventsEN;
  const upcoming = events.filter(e => e.status === "upcoming");
  const past     = events.filter(e => e.status === "past");

  return (
    <div style={{ backgroundColor: "#F9F4F1", color: "#000000" }}>

      {/* ══════════════════════════════════════ HERO ══ */}
      <section className="relative overflow-hidden px-6 pt-24 pb-28">
        <GeoBg className="w-[600px] h-[600px] -right-32 -top-32 opacity-60" />
        <div className="relative z-10 max-w-[1100px] mx-auto space-y-6">
          <EyebrowLabel>
            {lang === "es" ? "Conferencias y Eventos" : "Conferences & Events"}
          </EyebrowLabel>
          <h1
            className="font-display leading-tight hero-title"
            style={{ fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 300, color: "#000000" }}
          >
            {lang === "es" ? "Experiencias para" : "Experiences to"}
            <br />
            <span className="italic" style={{ color: "#54132B" }}>
              {lang === "es" ? "transformar." : "transform."}
            </span>
          </h1>
          <p
            className="font-body font-light max-w-lg leading-relaxed"
            style={{ fontSize: "clamp(15.5px, 1.4vw, 18px)", color: "#000000", opacity: 0.65 }}
          >
            {lang === "es"
              ? "Conferencias presenciales y virtuales diseñadas para conectar, sanar y avanzar. Desde talleres de un día hasta retiros boutique."
              : "In-person and virtual conferences designed to connect, heal and move forward. From one-day workshops to boutique retreats."}
          </p>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════ PRÓXIMOS EVENTOS ══ */}
      <section className="py-24 px-6">
        <div className="max-w-[1100px] mx-auto space-y-12">
          <div className="space-y-3">
            <EyebrowLabel>
              {lang === "es" ? "Próximos eventos" : "Upcoming events"}
            </EyebrowLabel>
            <h2
              className="font-display tracking-[0.04em]"
              style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 400, color: "#000000" }}
            >
              {lang === "es" ? "AGENDA 2026" : "2026 SCHEDULE"}
            </h2>
          </div>

          <div className="space-y-6">
            {upcoming.map((event) => (
              <div
                key={event.slug}
                className="program-card group grid md:grid-cols-[300px_1fr] overflow-hidden border"
                style={{
                  backgroundColor: "#F4E7E9",
                  borderColor:     "rgba(146,129,120,0.25)",
                  borderRadius:    "2px",
                }}
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "16/9", minHeight: "200px" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={event.img}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Badge */}
                  <div
                    className="absolute top-4 left-4 px-3 py-1 text-[10px] font-body font-semibold uppercase tracking-[0.15em]"
                    style={{ backgroundColor: event.badgeColor, color: "#F9F4F1", borderRadius: "2px" }}
                  >
                    {event.badge}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-between gap-6">
                  <div className="space-y-3">
                    <h3
                      className="font-display"
                      style={{ fontSize: "clamp(20px, 2.5vw, 30px)", fontWeight: 400, color: "#000000" }}
                    >
                      {event.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed" style={{ color: "#928178" }}>
                      {event.desc}
                    </p>
                  </div>

                  {/* Details row */}
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-3 gap-4 text-xs font-body">
                      <div className="space-y-0.5">
                        <p className="uppercase tracking-[0.15em] font-semibold" style={{ color: "#54132B" }}>
                          {lang === "es" ? "Fecha" : "Date"}
                        </p>
                        <p style={{ color: "#000000" }}>{event.date}</p>
                      </div>
                      <div className="space-y-0.5">
                        <p className="uppercase tracking-[0.15em] font-semibold" style={{ color: "#54132B" }}>
                          {lang === "es" ? "Horario" : "Time"}
                        </p>
                        <p style={{ color: "#000000" }}>{event.time}</p>
                      </div>
                      <div className="space-y-0.5">
                        <p className="uppercase tracking-[0.15em] font-semibold" style={{ color: "#54132B" }}>
                          {lang === "es" ? "Lugar" : "Location"}
                        </p>
                        <p style={{ color: "#000000" }}>{event.location}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div>
                        <p className="text-[10px] font-body uppercase tracking-[0.15em]" style={{ color: "#928178" }}>
                          {lang === "es" ? "Desde" : "From"}
                        </p>
                        <p
                          className="font-display"
                          style={{ fontSize: "clamp(22px, 2vw, 28px)", fontWeight: 300, color: "#000000" }}
                        >
                          {event.priceFrom}
                        </p>
                      </div>
                      <Link
                        href={`/conferencias/${event.slug}`}
                        className="btn-primary px-7 py-3 text-sm font-body font-medium tracking-[0.07em]"
                        style={{ backgroundColor: "#54132B", color: "#F9F4F1", borderRadius: "2px" }}
                      >
                        {lang === "es" ? "Ver detalles →" : "View details →"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ BANNER MEMBRESÍA ══ */}
      <section className="py-20 px-6" style={{ backgroundColor: "#F4E7E9" }}>
        <div className="max-w-[1100px] mx-auto">
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-6 px-10 py-8 border-l-2"
            style={{ borderColor: "#54132B", backgroundColor: "#F9F4F1" }}
          >
            <div className="space-y-1">
              <p className="text-xs font-body font-semibold uppercase tracking-[0.2em]" style={{ color: "#54132B" }}>
                {lang === "es" ? "Círculo Vuelve a Ti" : "Return to Yourself Circle"}
              </p>
              <p className="font-body text-base" style={{ color: "#000000" }}>
                {lang === "es"
                  ? "Los miembros tienen acceso prioritario y descuento en todos los eventos."
                  : "Members get priority access and a discount on all events."}
              </p>
            </div>
            <Link
              href="/membresia"
              className="btn-ghost shrink-0 px-7 py-3 text-sm font-body font-medium tracking-[0.07em] border"
              style={{ color: "#000000", borderColor: "rgba(146,129,120,0.45)", borderRadius: "2px" }}
            >
              {lang === "es" ? "Ver membresía →" : "View membership →"}
            </Link>
          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════ EVENTOS PASADOS ══ */}
      {past.length > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-[1100px] mx-auto space-y-12">
            <div className="space-y-3">
              <EyebrowLabel>
                {lang === "es" ? "Ediciones anteriores" : "Previous editions"}
              </EyebrowLabel>
              <h2
                className="font-display tracking-[0.04em]"
                style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400, color: "#000000" }}
              >
                {lang === "es" ? "GRABACIONES DISPONIBLES" : "RECORDINGS AVAILABLE"}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((event) => (
                <div
                  key={event.slug}
                  className="program-card group overflow-hidden border"
                  style={{
                    backgroundColor: "#F4E7E9",
                    borderColor:     "rgba(146,129,120,0.2)",
                    borderRadius:    "2px",
                    opacity:         0.8,
                  }}
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={event.img}
                      alt={event.title}
                      className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                    />
                    <div
                      className="absolute top-3 left-3 px-2.5 py-0.5 text-[10px] font-body font-semibold uppercase tracking-[0.15em]"
                      style={{ backgroundColor: event.badgeColor, color: "#F9F4F1", borderRadius: "2px" }}
                    >
                      {event.badge}
                    </div>
                  </div>
                  <div className="p-7 space-y-4">
                    <h3
                      className="font-display"
                      style={{ fontSize: "clamp(16px, 2vw, 22px)", fontWeight: 400, color: "#000000" }}
                    >
                      {event.title}
                    </h3>
                    <p className="text-xs font-body" style={{ color: "#928178" }}>{event.date}</p>
                    <div className="flex items-center justify-between">
                      <span
                        className="font-display"
                        style={{ fontSize: "20px", fontWeight: 300, color: "#000000" }}
                      >
                        {event.priceFrom}
                      </span>
                      <Link
                        href={`/conferencias/${event.slug}`}
                        className="text-xs font-body font-semibold uppercase tracking-[0.12em] border-b pb-0.5"
                        style={{ color: "#54132B", borderColor: "#54132B" }}
                      >
                        {lang === "es" ? "Acceder →" : "Access →"}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════ SPEAKER CTA ══ */}
      <section className="py-20 px-6" style={{ backgroundColor: "#F4E7E9" }}>
        <div className="max-w-[1100px] mx-auto text-center space-y-6">
          <p
            className="font-display italic"
            style={{ fontSize: "clamp(20px, 2.5vw, 30px)", fontWeight: 300, color: "#000000" }}
          >
            {lang === "es"
              ? "¿Quieres a Liset Valencia en tu evento?"
              : "Want Liset Valencia at your event?"}
          </p>
          <a
            href="https://lisetvalencia.com/speaker"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs font-body font-semibold uppercase tracking-[0.2em] border-b pb-0.5"
            style={{ color: "#54132B", borderColor: "rgba(84,19,43,0.4)" }}
          >
            {lang === "es" ? "Solicitar información como speaker →" : "Request speaker information →"}
          </a>
        </div>
      </section>
    </div>
  );
}
