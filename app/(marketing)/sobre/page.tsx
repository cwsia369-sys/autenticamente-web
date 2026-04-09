"use client";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/app/providers/LangProvider";

function EyebrowLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.3em] font-body font-semibold" style={{ color: "#54132B" }}>
      {children}
    </p>
  );
}

const valoresES = [
  { title: "Conciencia",       desc: "Vivir con presencia plena en cada acto de nuestra existencia." },
  { title: "Verdad",           desc: "Honestidad radical con una misma como base de toda sanación." },
  { title: "Compasión Firme",  desc: "Amor incondicional hacia una misma sin perder el compromiso con el cambio." },
];

const valoresEN = [
  { title: "Consciousness",    desc: "Living with full presence in every act of our existence." },
  { title: "Truth",            desc: "Radical honesty with oneself as the foundation of all healing." },
  { title: "Firm Compassion",  desc: "Unconditional love for oneself without losing commitment to change." },
];

const dimensionesES = [
  {
    title: "Psicología Clínica",
    desc: "Abordaje terapéutico basado en la evidencia, herramientas cognitivas y sistémicas para la gestión emocional y conductual.",
  },
  {
    title: "Espiritualidad",
    desc: "Un camino hacia la trascendencia, el propósito de vida y la conexión con lo sagrado que habita en lo cotidiano.",
  },
];

const dimensionesEN = [
  {
    title: "Clinical Psychology",
    desc: "Evidence-based therapeutic approach, cognitive and systemic tools for emotional and behavioral management.",
  },
  {
    title: "Spirituality",
    desc: "A path toward transcendence, life purpose, and connection with the sacred that dwells in the everyday.",
  },
];

export default function SobrePage() {
  const { lang, t } = useLang();
  const valores     = lang === "es" ? valoresES     : valoresEN;
  const dimensiones = lang === "es" ? dimensionesES : dimensionesEN;

  return (
    <div style={{ backgroundColor: "#F9F4F1", color: "#000000" }}>

      {/* ── HERO ── */}
      <section className="px-6 py-24 lg:py-32" style={{ backgroundColor: "#F4E7E9" }}>
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <EyebrowLabel>{t("sobre.label")}</EyebrowLabel>
            <h1
              className="font-display leading-[1.05] tracking-[0.02em]"
              style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300, color: "#000000" }}
            >
              Dra. Liset Valencia Medina
            </h1>
            <p className="text-xl font-display italic font-light" style={{ color: "#928178" }}>
              {t("sobre.subtitle")}
            </p>
            <p className="font-body leading-relaxed text-lg" style={{ color: "#000000", opacity: 0.8 }}>
              {t("sobre.desc")}
            </p>
            <Link
              href="/contacto"
              className="inline-block px-8 py-4 text-sm font-body font-medium tracking-[0.08em] transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#54132B", color: "#F9F4F1", borderRadius: "2px" }}
            >
              {t("sobre.cta")}
            </Link>
          </div>
          <div className="relative flex justify-center">
            <div
              className="photo-liset-wrapper relative overflow-hidden"
              style={{
                width: "min(520px, 100%)",
                aspectRatio: "4/5",
                borderRadius: "20px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
              }}
            >
              <Image
                src="/liset-valencia.jpg"
                alt="Dra. Liset Valencia Medina"
                fill
                className="object-cover photo-liset"
                priority
              />
            </div>
            <div
              className="absolute -bottom-6 -right-6 w-24 h-24 border rounded-full opacity-30"
              style={{ borderColor: "#54132B", borderWidth: "0.8px" }}
            />
          </div>
        </div>
      </section>

      {/* ── MISIÓN ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <EyebrowLabel>{t("sobre.mision.label")}</EyebrowLabel>
          <blockquote
            className="font-display italic leading-relaxed"
            style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 300, color: "#000000" }}
          >
            {t("sobre.mision.quote")}
          </blockquote>
          <div className="w-16 h-px mx-auto" style={{ backgroundColor: "#54132B" }} />
        </div>
      </section>

      {/* ── HISTORIA ── */}
      <section className="py-24 px-6" style={{ backgroundColor: "#F4E7E9" }}>
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <EyebrowLabel>{t("sobre.historia.label")}</EyebrowLabel>
            <h2
              className="font-display mt-3 mb-8"
              style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, color: "#000000" }}
            >
              {t("sobre.historia.title")}
            </h2>
            <div className="space-y-6 font-body leading-relaxed" style={{ color: "#000000", opacity: 0.85 }}>
              <p>{t("sobre.historia.p1")}</p>
              <p>{t("sobre.historia.p2")}</p>
              <p>{t("sobre.historia.p3")}</p>
            </div>
          </div>

          {/* Valores */}
          <div className="space-y-4">
            <EyebrowLabel>{t("sobre.valores.label")}</EyebrowLabel>
            {valores.map((v) => (
              <div
                key={v.title}
                className="p-8 space-y-2 border-l-2"
                style={{ borderColor: "#54132B", backgroundColor: "#F9F4F1" }}
              >
                <h4 className="font-body font-semibold uppercase tracking-[0.12em] text-sm" style={{ color: "#000000" }}>
                  {v.title}
                </h4>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#928178" }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISIÓN Y METODOLOGÍA ── */}
      <section className="py-24 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16 space-y-3">
            <EyebrowLabel>{t("sobre.vision.label")}</EyebrowLabel>
            <h2
              className="font-display tracking-[0.04em]"
              style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, color: "#000000" }}
            >
              {t("sobre.vision.title")}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {dimensiones.map((d) => (
              <div
                key={d.title}
                className="p-12 space-y-4 border"
                style={{
                  backgroundColor: "#F4E7E9",
                  borderColor: "rgba(146,129,120,0.2)",
                  borderRadius: "2px",
                }}
              >
                <h3 className="font-display text-2xl" style={{ color: "#000000", fontWeight: 400 }}>
                  {d.title}
                </h3>
                <p className="font-body leading-relaxed" style={{ color: "#928178" }}>
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6" style={{ backgroundColor: "#F4E7E9" }}>
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2
            className="font-display italic"
            style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 300, color: "#000000" }}
          >
            {t("sobre.final.title")}
          </h2>
          <p className="font-body font-light" style={{ color: "#928178" }}>
            {t("sobre.final.desc")}
          </p>
          <Link
            href="/contacto"
            className="inline-block px-10 py-4 text-sm font-body font-medium tracking-[0.08em] transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#54132B", color: "#F9F4F1", borderRadius: "2px" }}
          >
            {t("sobre.final.cta")}
          </Link>
        </div>
      </section>
    </div>
  );
}
