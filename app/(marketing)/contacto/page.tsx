"use client";
import { useState } from "react";
import { useLang } from "@/app/providers/LangProvider";

function EyebrowLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.3em] font-body font-semibold" style={{ color: "#54132B" }}>
      {children}
    </p>
  );
}

export default function ContactoPage() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: connect to backend/email service
    setSent(true);
  }

  return (
    <div style={{ backgroundColor: "#F9F4F1", color: "#000000" }}>
      <section className="px-6 py-24 lg:py-32" style={{ backgroundColor: "#F4E7E9" }}>
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-16 items-start">

          {/* Info */}
          <div className="space-y-8">
            <div className="space-y-3">
              <EyebrowLabel>{t("contacto.label")}</EyebrowLabel>
              <h1
                className="font-display leading-[1.05]"
                style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 300, color: "#000000" }}
              >
                {t("contacto.title")}
              </h1>
              <p className="text-lg font-body font-light leading-relaxed" style={{ color: "#928178" }}>
                {t("contacto.desc")}
              </p>
            </div>

            <div
              className="p-8 space-y-3 border-l-2"
              style={{ borderColor: "#54132B", backgroundColor: "#F9F4F1" }}
            >
              <p className="font-display italic text-xl" style={{ color: "#000000", fontWeight: 300 }}>
                {t("contacto.quote")}
              </p>
              <p className="text-xs font-body uppercase tracking-[0.15em]" style={{ color: "#928178" }}>
                {t("contacto.quote_by")}
              </p>
            </div>
          </div>

          {/* Form */}
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { id: "nombre",  label: t("contacto.nombre"),  type: "text",  placeholder: t("contacto.nombre_ph") },
                { id: "email",   label: t("contacto.email"),   type: "email", placeholder: t("contacto.email_ph")  },
              ].map((f) => (
                <div key={f.id} className="space-y-2">
                  <label className="text-xs font-body uppercase tracking-[0.15em]" style={{ color: "#000000" }}>
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    required
                    placeholder={f.placeholder}
                    value={form[f.id as "nombre" | "email"]}
                    onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                    className="w-full px-5 py-3.5 text-sm font-body border bg-transparent outline-none transition-colors"
                    style={{
                      borderColor:  "rgba(146,129,120,0.4)",
                      color:        "#000000",
                      borderRadius: "2px",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#54132B")}
                    onBlur={(e)  => (e.target.style.borderColor = "rgba(146,129,120,0.4)")}
                  />
                </div>
              ))}
              <div className="space-y-2">
                <label className="text-xs font-body uppercase tracking-[0.15em]" style={{ color: "#000000" }}>
                  {t("contacto.mensaje")}
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder={t("contacto.mensaje_ph")}
                  value={form.mensaje}
                  onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                  className="w-full px-5 py-3.5 text-sm font-body border bg-transparent outline-none resize-none transition-colors"
                  style={{
                    borderColor:  "rgba(146,129,120,0.4)",
                    color:        "#000000",
                    borderRadius: "2px",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#54132B")}
                  onBlur={(e)  => (e.target.style.borderColor = "rgba(146,129,120,0.4)")}
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 text-sm font-body font-medium tracking-[0.08em] uppercase transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#54132B", color: "#F9F4F1", borderRadius: "2px" }}
              >
                {t("contacto.send")}
              </button>
            </form>
          ) : (
            <div
              className="p-12 text-center space-y-4 border"
              style={{ borderColor: "rgba(146,129,120,0.3)", borderRadius: "2px", backgroundColor: "#F9F4F1" }}
            >
              <div className="w-12 h-px mx-auto" style={{ backgroundColor: "#54132B" }} />
              <h3 className="font-display text-2xl" style={{ color: "#000000", fontWeight: 300 }}>
                {t("contacto.sent_title")}
              </h3>
              <p className="font-body text-sm" style={{ color: "#928178" }}>
                {t("contacto.sent_desc")}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
