"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/app/providers/LangProvider";

const WHATSAPP_NUMBER  = "573105312817";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hola, quiero información sobre Auténticamente y agendar una consulta."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

/* ── Inline icon components ─────────────────────────────────── */
function IconTest() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle cx="7.5" cy="7.5" r="6"   stroke="currentColor" strokeWidth="0.85" />
      <circle cx="7.5" cy="7.5" r="2.8" stroke="currentColor" strokeWidth="0.85" />
      <circle cx="7.5" cy="7.5" r="1"   fill="currentColor" />
    </svg>
  );
}
function IconList() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <rect x="2" y="3.5"  width="11" height="1"   rx="0.5" fill="currentColor" opacity="0.75" />
      <rect x="2" y="7"    width="7.5" height="1"  rx="0.5" fill="currentColor" opacity="0.55" />
      <rect x="2" y="10.5" width="9"  height="1"   rx="0.5" fill="currentColor" opacity="0.65" />
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <rect x="2" y="2.5" width="11" height="11" rx="1" stroke="currentColor" strokeWidth="0.85" />
      <line x1="5"  y1="2.5" x2="5"  y2="1"  stroke="currentColor" strokeWidth="0.85" />
      <line x1="10" y1="2.5" x2="10" y2="1"  stroke="currentColor" strokeWidth="0.85" />
      <line x1="2"  y1="6"   x2="13" y2="6"  stroke="currentColor" strokeWidth="0.85" opacity="0.5" />
    </svg>
  );
}
function IconWhatsApp() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path
        d="M7.5 1C3.91 1 1 3.91 1 7.5c0 1.15.31 2.24.86 3.17L1 14l3.41-.85A6.5 6.5 0 1 0 7.5 1Z"
        stroke="currentColor" strokeWidth="0.85" fill="none"
      />
      <path d="M5 6.2c.5 1 1.6 2 2.8 2.5" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────── */

export default function FloatingAssistant() {
  const [open,    setOpen]    = useState(false);
  const [visible, setVisible] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  const actions = [
    { key: "assistant.test",     href: WHATSAPP_URL, icon: <IconTest />,      external: false, internal: "/test",                highlight: false },
    { key: "assistant.programs", href: WHATSAPP_URL, icon: <IconList />,      external: false, internal: "/metodo#programas",    highlight: false },
    { key: "assistant.schedule", href: WHATSAPP_URL, icon: <IconCalendar />,  external: true,  internal: null,                   highlight: false },
    { key: "assistant.whatsapp", href: WHATSAPP_URL, icon: <IconWhatsApp />,  external: true,  internal: null,                   highlight: true  },
  ];

  return (
    <div
      className="fixed bottom-8 right-6 z-50 flex flex-col items-end gap-3"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}
    >

      {/* ── Panel ── */}
      <div
        style={{
          maxHeight:     open ? "520px" : "0",
          opacity:       open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          overflow:      "hidden",
          transition:    "max-height 0.48s cubic-bezier(0.4,0,0.2,1), opacity 0.32s ease",
        }}
      >
        <div
          className="w-[310px] border"
          style={{
            backgroundColor: "#F9F4F1",
            borderColor:     "rgba(146,129,120,0.32)",
            borderRadius:    "4px",
            boxShadow:       "0 24px 56px rgba(0,0,0,0.15), 0 6px 16px rgba(0,0,0,0.07)",
          }}
        >
          {/* Header */}
          <div
            className="px-5 py-4 border-b flex items-start gap-3.5"
            style={{ borderColor: "rgba(146,129,120,0.22)" }}
          >
            {/* Avatar */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#54132B" }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8.5" stroke="#F9F4F1" strokeWidth="0.7" />
                <circle cx="10" cy="10" r="4.5" stroke="#F9F4F1" strokeWidth="0.7" />
                <circle cx="10" cy="10" r="1.5" fill="#F9F4F1" />
              </svg>
            </div>
            <div className="pt-0.5">
              <p
                className="text-[10.5px] font-body font-semibold uppercase tracking-[0.13em] mb-1.5"
                style={{ color: "#000000" }}
              >
                {t("assistant.name")}
              </p>
              <p
                className="text-[13px] font-body leading-[1.65]"
                style={{ color: "#000000", opacity: 0.72 }}
              >
                {t("assistant.message")}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="p-4 space-y-2">
            {actions.map((action) => {
              const sharedStyle: React.CSSProperties = {
                backgroundColor: action.highlight ? "#54132B" : "transparent",
                borderColor:     action.highlight ? "#54132B" : "rgba(146,129,120,0.28)",
                color:           action.highlight ? "#F9F4F1" : "#000000",
                borderRadius:    "2px",
                fontSize:        "13px",
                fontFamily:      "var(--font-inter, Inter, sans-serif)",
                fontWeight:      500,
                letterSpacing:   "0.04em",
                textDecoration:  "none",
                display:         "flex",
                alignItems:      "center",
                gap:             "10px",
                width:           "100%",
                padding:         "11px 14px",
                transition:      "transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease",
              };

              if (!action.external && action.internal) {
                return (
                  <Link
                    key={action.key}
                    href={action.internal}
                    className="assistant-action border"
                    style={sharedStyle}
                    onClick={() => setOpen(false)}
                  >
                    <span style={{ opacity: 0.6 }}>{action.icon}</span>
                    {t(action.key)}
                  </Link>
                );
              }
              return (
                <a
                  key={action.key}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="assistant-action border"
                  style={sharedStyle}
                >
                  <span style={{ opacity: action.highlight ? 1 : 0.6 }}>{action.icon}</span>
                  {t(action.key)}
                </a>
              );
            })}
          </div>

          {/* Footer */}
          <div
            className="px-5 py-3 border-t"
            style={{ borderColor: "rgba(146,129,120,0.18)" }}
          >
            <p className="text-[10px] font-body tracking-[0.1em] uppercase" style={{ color: "#928178" }}>
              {t("assistant.footer")}
            </p>
          </div>
        </div>
      </div>

      {/* ── Bubble button ── */}
      <button
        onClick={() => setOpen(!open)}
        className="floating-bubble w-14 h-14 rounded-full flex items-center justify-center relative"
        aria-label={open ? "Cerrar asistente" : "Abrir asistente"}
        aria-expanded={open}
        style={{
          backgroundColor: "#54132B",
          boxShadow:        "0 8px 28px rgba(84,19,43,0.48), 0 2px 8px rgba(0,0,0,0.1)",
          border:           "none",
          cursor:           "pointer",
          transition:       "transform 0.32s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.32s ease",
        }}
      >
        {/* Chat icon */}
        <span
          style={{
            position:  "absolute",
            opacity:   open ? 0 : 1,
            transform: open ? "rotate(90deg) scale(0.4)" : "rotate(0deg) scale(1)",
            transition:"opacity 0.22s ease, transform 0.32s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M11 2.5C6.31 2.5 2.5 5.91 2.5 10.1c0 1.64.56 3.16 1.5 4.39L2.5 19.5l5.19-1.46A9.08 9.08 0 0 0 11 18.7c4.69 0 8.5-3.41 8.5-7.6S15.69 2.5 11 2.5Z"
              stroke="#F9F4F1" strokeWidth="1" fill="none"
            />
            <circle cx="8"  cy="10.1" r="1" fill="#F9F4F1" opacity="0.85" />
            <circle cx="11" cy="10.1" r="1" fill="#F9F4F1" opacity="0.85" />
            <circle cx="14" cy="10.1" r="1" fill="#F9F4F1" opacity="0.85" />
          </svg>
        </span>

        {/* Close icon */}
        <span
          style={{
            position:  "absolute",
            opacity:   open ? 1 : 0,
            transform: open ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.4)",
            transition:"opacity 0.22s ease, transform 0.32s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <line x1="2.5" y1="2.5" x2="14.5" y2="14.5" stroke="#F9F4F1" strokeWidth="1.3" strokeLinecap="round" />
            <line x1="14.5" y1="2.5" x2="2.5" y2="14.5" stroke="#F9F4F1" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </span>
      </button>
    </div>
  );
}
