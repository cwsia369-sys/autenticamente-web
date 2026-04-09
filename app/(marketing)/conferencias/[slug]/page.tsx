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

function EyebrowLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className="text-xs uppercase tracking-[0.3em] font-body font-semibold"
      style={{ color: light ? "rgba(249,244,241,0.55)" : "#54132B" }}
    >
      {children}
    </p>
  );
}

/* ── Static demo data for the event (replace with CMS fetch by slug) ── */
const eventDataES = {
  badge:       "Próximo evento",
  title:       "Vuelve a Ti",
  subtitle:    "Conferencia de Sanación Emocional",
  date:        "Sábado 24 de mayo, 2026",
  time:        "10:00 AM — 2:00 PM (GMT-5)",
  location:    "Virtual — Zoom",
  duration:    "4 horas",
  img:         "https://lh3.googleusercontent.com/aida-public/AB6AXuB0mcZnfB7s6xpjhm9uF2aTv-gwmJbCvOMEkLHnNB6YBsXmRmPZtGFyFwQZKVvDTEmvVrVepdUR0rslSI2b0WgYXclHANJxH3C5ifQVFJF8OrdjfgxajnPnwcAN8OF2q6F5kHIVQ-E9vjztcX5NQhFqSpqe5D7ixc-wGaQNrDjiP2R7vPTbSXw7aL3L73Q0YJ3SUjEm5HfYsHb4ER8wAlgiGqN1-MRMh_AxA_hFlDTmtf--M8ipTLtUMDUeOH4FE56IRs63C6qN_uI",
  description: "Una experiencia de cuatro horas diseñada para que reconectas con tu cuerpo, tus emociones y tu dirección interior. No es una clase magistral. Es un espacio de presencia, herramientas prácticas y transformación real.",
  forWho:      "Para mujeres que sienten que se perdieron en el camino y quieren encontrar el hilo de vuelta a sí mismas. No necesitas experiencia previa en desarrollo personal.",
  agenda: [
    { time: "10:00 AM", title: "Bienvenida y apertura",   desc: "Creación del espacio. Respiración y presencia inicial." },
    { time: "10:30 AM", title: "El mapa de tus emociones", desc: "Cómo leer las señales de tu cuerpo y qué te están diciendo." },
    { time: "11:30 AM", title: "Regulación emocional",     desc: "Herramientas prácticas para calmar el sistema nervioso." },
    { time: "12:30 PM", title: "Descanso",                 desc: "15 minutos de pausa guiada." },
    { time: "12:45 PM", title: "Identidad y propósito",    desc: "¿Quién eres más allá de tus roles? Un recorrido hacia tu esencia." },
    { time: "01:45 PM", title: "Integración y cierre",     desc: "Ejercicio de cierre, compromisos y espacio de preguntas." },
  ],
  includes: [
    "Acceso en vivo vía Zoom",
    "Grabación disponible por 30 días",
    "Material descargable (workbook PDF)",
    "Espacio de preguntas con Liset",
    "Certificado de participación",
  ],
  tickets: [
    { type: "General",          price: "$45 USD", desc: "Acceso completo al evento + grabación + material",    stripePriceId: "price_general_placeholder" },
    { type: "Miembro Círculo",  price: "$35 USD", desc: "Precio especial para miembros del Círculo Vuelve a Ti", stripePriceId: "price_member_placeholder", forMembers: true },
  ],
  faq: [
    { q: "¿Puedo ver la grabación si no puedo asistir en vivo?", a: "Sí. La grabación queda disponible por 30 días desde el evento." },
    { q: "¿Qué necesito para conectarme?", a: "Solo una cuenta gratuita de Zoom y una conexión estable a internet." },
    { q: "¿Hay reembolso si no puedo asistir?", a: "Puedes solicitar reembolso hasta 48 horas antes del evento. Luego de ese plazo no hay reembolsos, pero tienes acceso a la grabación." },
    { q: "¿El evento incluye evaluación o diagnóstico?", a: "No. Este es un espacio de experiencia y herramientas, no de diagnóstico clínico." },
  ],
};

const eventDataEN = {
  badge:       "Upcoming event",
  title:       "Return to Yourself",
  subtitle:    "Emotional Healing Conference",
  date:        "Saturday May 24, 2026",
  time:        "10:00 AM — 2:00 PM (GMT-5)",
  location:    "Virtual — Zoom",
  duration:    "4 hours",
  img:         "https://lh3.googleusercontent.com/aida-public/AB6AXuB0mcZnfB7s6xpjhm9uF2aTv-gwmJbCvOMEkLHnNB6YBsXmRmPZtGFyFwQZKVvDTEmvVrVepdUR0rslSI2b0WgYXclHANJxH3C5ifQVFJF8OrdjfgxajnPnwcAN8OF2q6F5kHIVQ-E9vjztcX5NQhFqSpqe5D7ixc-wGaQNrDjiP2R7vPTbSXw7aL3L73Q0YJ3SUjEm5HfYsHb4ER8wAlgiGqN1-MRMh_AxA_hFlDTmtf--M8ipTLtUMDUeOH4FE56IRs63C6qN_uI",
  description: "A four-hour experience designed for you to reconnect with your body, emotions and inner direction. It's not a lecture. It's a space of presence, practical tools and real transformation.",
  forWho:      "For women who feel they've lost their way and want to find the thread back to themselves. No prior personal development experience required.",
  agenda: [
    { time: "10:00 AM", title: "Welcome and opening",       desc: "Creating the space. Initial breathing and presence." },
    { time: "10:30 AM", title: "Your emotional map",        desc: "How to read your body's signals and what they're telling you." },
    { time: "11:30 AM", title: "Emotional regulation",      desc: "Practical tools to calm the nervous system." },
    { time: "12:30 PM", title: "Break",                     desc: "15-minute guided pause." },
    { time: "12:45 PM", title: "Identity and purpose",      desc: "Who are you beyond your roles? A journey to your essence." },
    { time: "01:45 PM", title: "Integration and closing",   desc: "Closing exercise, commitments and Q&A." },
  ],
  includes: [
    "Live access via Zoom",
    "Recording available for 30 days",
    "Downloadable material (workbook PDF)",
    "Q&A session with Liset",
    "Certificate of participation",
  ],
  tickets: [
    { type: "General",         price: "$45 USD", desc: "Full event access + recording + material",              stripePriceId: "price_general_placeholder" },
    { type: "Circle Member",   price: "$35 USD", desc: "Special price for Return to Yourself Circle members",   stripePriceId: "price_member_placeholder", forMembers: true },
  ],
  faq: [
    { q: "Can I watch the recording if I can't attend live?", a: "Yes. The recording is available for 30 days from the event." },
    { q: "What do I need to connect?", a: "Just a free Zoom account and a stable internet connection." },
    { q: "Is there a refund if I can't attend?", a: "You can request a refund up to 48 hours before the event. After that deadline no refunds, but you have access to the recording." },
    { q: "Does the event include evaluation or diagnosis?", a: "No. This is an experience and tools space, not clinical diagnosis." },
  ],
};

export default function ConferenciaDetailPage() {
  const { lang } = useLang();
  const ev = lang === "es" ? eventDataES : eventDataEN;

  return (
    <div style={{ backgroundColor: "#F9F4F1", color: "#000000" }}>

      {/* ══════════════════════════════════════ HERO ══ */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "60vh", backgroundColor: "#000000" }}
      >
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ev.img}
          alt={ev.title}
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.6) 100%)" }} />

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 pt-24 pb-32 space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-body" style={{ color: "rgba(249,244,241,0.45)" }}>
            <Link href="/conferencias" className="hover:opacity-70 transition-opacity">
              {lang === "es" ? "Conferencias" : "Conferences"}
            </Link>
            <span>/</span>
            <span style={{ color: "rgba(249,244,241,0.7)" }}>{ev.title}</span>
          </div>

          <div
            className="inline-block px-3 py-1 text-[10px] font-body font-semibold uppercase tracking-[0.15em]"
            style={{ backgroundColor: "#54132B", color: "#F9F4F1", borderRadius: "2px" }}
          >
            {ev.badge}
          </div>

          <h1
            className="font-display leading-tight hero-title"
            style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300, color: "#F9F4F1" }}
          >
            {ev.title}
          </h1>
          <p
            className="font-display italic font-light"
            style={{ fontSize: "clamp(18px, 2vw, 26px)", color: "rgba(84,19,43,0.85)" }}
          >
            {ev.subtitle}
          </p>

          {/* Quick info strip */}
          <div className="flex flex-wrap gap-6 pt-2 text-xs font-body" style={{ color: "rgba(249,244,241,0.65)" }}>
            <span>📅 {ev.date}</span>
            <span>🕐 {ev.time}</span>
            <span>📍 {ev.location}</span>
            <span>⏱ {ev.duration}</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ BODY ══ */}
      <section className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-[1fr_360px] gap-16">

          {/* LEFT: Content */}
          <div className="space-y-16">

            {/* Descripción */}
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] font-body font-semibold" style={{ color: "#54132B" }}>
                {lang === "es" ? "Sobre este evento" : "About this event"}
              </p>
              <p
                className="font-body leading-relaxed"
                style={{ fontSize: "clamp(15.5px, 1.3vw, 17.5px)", color: "#000000", opacity: 0.78 }}
              >
                {ev.description}
              </p>
              <p className="font-display italic text-lg font-light" style={{ color: "#928178" }}>
                {ev.forWho}
              </p>
            </div>

            {/* Agenda */}
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.3em] font-body font-semibold" style={{ color: "#54132B" }}>
                {lang === "es" ? "Agenda del evento" : "Event agenda"}
              </p>
              <div className="space-y-0">
                {ev.agenda.map((item, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[80px_1fr] gap-4 py-5 border-b"
                    style={{ borderColor: "rgba(146,129,120,0.2)" }}
                  >
                    <p className="text-xs font-body font-semibold pt-0.5" style={{ color: "#54132B" }}>
                      {item.time}
                    </p>
                    <div>
                      <p className="font-body font-semibold text-sm" style={{ color: "#000000" }}>{item.title}</p>
                      <p className="font-body text-xs leading-relaxed mt-0.5" style={{ color: "#928178" }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Qué incluye */}
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.3em] font-body font-semibold" style={{ color: "#54132B" }}>
                {lang === "es" ? "Qué incluye" : "What's included"}
              </p>
              <ul className="space-y-3">
                {ev.includes.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <circle cx="7" cy="7" r="6" stroke="#54132B" strokeWidth="0.8" />
                      <path d="M4.5 7l1.8 1.8 3.2-3.2" stroke="#54132B" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                    <p className="font-body text-sm" style={{ color: "#000000", opacity: 0.8 }}>{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ */}
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.3em] font-body font-semibold" style={{ color: "#54132B" }}>
                {lang === "es" ? "Preguntas frecuentes" : "FAQ"}
              </p>
              <div className="space-y-0">
                {ev.faq.map((item, i) => (
                  <div key={i} className="py-5 border-b space-y-1.5" style={{ borderColor: "rgba(146,129,120,0.2)" }}>
                    <p className="font-body font-semibold text-sm" style={{ color: "#000000" }}>{item.q}</p>
                    <p className="font-body text-sm leading-relaxed" style={{ color: "#928178" }}>{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Tickets sticky */}
          <div>
            <div
              className="sticky top-24 space-y-4 border p-8"
              style={{ backgroundColor: "#F4E7E9", borderColor: "rgba(146,129,120,0.2)", borderRadius: "2px" }}
            >
              <p className="text-xs uppercase tracking-[0.2em] font-body font-semibold" style={{ color: "#54132B" }}>
                {lang === "es" ? "Elige tu ticket" : "Choose your ticket"}
              </p>

              {ev.tickets.map((ticket, i) => (
                <div
                  key={i}
                  className="p-5 space-y-3 border"
                  style={{
                    backgroundColor: "#F9F4F1",
                    borderColor:     ticket.forMembers ? "rgba(84,19,43,0.4)" : "rgba(146,129,120,0.2)",
                    borderRadius:    "2px",
                  }}
                >
                  {ticket.forMembers && (
                    <span
                      className="inline-block px-2 py-0.5 text-[9px] font-body font-semibold uppercase tracking-[0.15em]"
                      style={{ backgroundColor: "rgba(84,19,43,0.15)", color: "#54132B", borderRadius: "2px" }}
                    >
                      {lang === "es" ? "Solo miembros" : "Members only"}
                    </span>
                  )}
                  <div className="flex items-center justify-between">
                    <p className="font-body font-semibold text-sm" style={{ color: "#000000" }}>{ticket.type}</p>
                    <p
                      className="font-display"
                      style={{ fontSize: "22px", fontWeight: 300, color: "#000000" }}
                    >
                      {ticket.price}
                    </p>
                  </div>
                  <p className="text-xs font-body leading-relaxed" style={{ color: "#928178" }}>{ticket.desc}</p>
                  {/* Link to Stripe Checkout — placeholder */}
                  <a
                    href="#"
                    className="btn-primary block w-full text-center py-3 text-sm font-body font-medium tracking-[0.06em]"
                    style={{ backgroundColor: "#54132B", color: "#F9F4F1", borderRadius: "2px" }}
                    onClick={(e) => e.preventDefault()}
                  >
                    {lang === "es" ? "Reservar lugar →" : "Reserve spot →"}
                  </a>
                </div>
              ))}

              <p className="text-xs font-body text-center" style={{ color: "#928178" }}>
                {lang === "es"
                  ? "Pago seguro con Stripe. Recibes confirmación por correo."
                  : "Secure payment with Stripe. Confirmation by email."}
              </p>

              <div
                className="pt-4 border-t text-center space-y-1"
                style={{ borderColor: "rgba(146,129,120,0.2)" }}
              >
                <p className="text-xs font-body" style={{ color: "#928178" }}>
                  {lang === "es" ? "¿No eres miembro aún?" : "Not a member yet?"}
                </p>
                <Link
                  href="/membresia"
                  className="text-xs font-body font-semibold"
                  style={{ color: "#54132B" }}
                >
                  {lang === "es" ? "Conoce el Círculo Vuelve a Ti →" : "Learn about the Circle →"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Back link */}
      <section className="py-10 px-6">
        <div className="max-w-[1100px] mx-auto">
          <Link
            href="/conferencias"
            className="text-xs font-body font-semibold uppercase tracking-[0.15em] flex items-center gap-2"
            style={{ color: "#928178" }}
          >
            <span>←</span>
            {lang === "es" ? "Ver todos los eventos" : "View all events"}
          </Link>
        </div>
      </section>
    </div>
  );
}
