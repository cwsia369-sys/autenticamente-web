"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/app/providers/LangProvider";

type Profile = "sobreviviente" | "complaciente" | "controladora" | "desconectada";

/* ── Bilingual questions ─────────────────────────────────────────── */
const questionsES = [
  {
    q: "Cuando enfrentas un cambio inesperado en tu rutina, ¿cuál es tu reacción inmediata?",
    options: [
      { text: "Me pongo alerta y busco protegerme.",                        profile: "sobreviviente" as Profile },
      { text: "Pienso en cómo esto afectará a los demás.",                  profile: "complaciente"  as Profile },
      { text: "Intento planificar cada detalle del nuevo escenario.",       profile: "controladora"  as Profile },
      { text: "Me siento indiferente o no noto la diferencia.",             profile: "desconectada"  as Profile },
    ],
  },
  {
    q: "¿Cómo describes tu relación con tus propias emociones?",
    options: [
      { text: "Las siento muy intensamente, a veces me abruman.",          profile: "sobreviviente" as Profile },
      { text: "Las pospongo para no afectar a quienes me rodean.",         profile: "complaciente"  as Profile },
      { text: "Prefiero analizarlas antes de sentirlas.",                  profile: "controladora"  as Profile },
      { text: "A veces no sé qué siento exactamente.",                     profile: "desconectada"  as Profile },
    ],
  },
  {
    q: "En tus relaciones cercanas, ¿qué patrón reconoces más en ti?",
    options: [
      { text: "Desconfío fácilmente y me cuesta abrirme.",                 profile: "sobreviviente" as Profile },
      { text: "Siempre estoy disponible para los demás, aunque yo sufra.", profile: "complaciente"  as Profile },
      { text: "Necesito que todo esté organizado y bajo control.",         profile: "controladora"  as Profile },
      { text: "Me cuesta conectar profundamente con otros.",               profile: "desconectada"  as Profile },
    ],
  },
  {
    q: "Cuando alguien te hace daño, ¿cómo sueles responder?",
    options: [
      { text: "Entro en modo defensa o ataque.",                           profile: "sobreviviente" as Profile },
      { text: "Disculpo su comportamiento y continúo.",                    profile: "complaciente"  as Profile },
      { text: "Busco entender racionalmente qué ocurrió.",                 profile: "controladora"  as Profile },
      { text: "Me desconecto emocionalmente de la situación.",             profile: "desconectada"  as Profile },
    ],
  },
  {
    q: "¿Qué frase resuena más contigo en este momento?",
    options: [
      { text: "Vivo constantemente en alerta, esperando lo peor.",        profile: "sobreviviente" as Profile },
      { text: "Me resulta difícil poner mis necesidades primero.",         profile: "complaciente"  as Profile },
      { text: "Necesito tener todo bajo control para sentirme segura.",    profile: "controladora"  as Profile },
      { text: "Me siento desconectada de mi propia vida.",                 profile: "desconectada"  as Profile },
    ],
  },
];

const questionsEN = [
  {
    q: "When you face an unexpected change in your routine, what is your immediate reaction?",
    options: [
      { text: "I become alert and look for ways to protect myself.",       profile: "sobreviviente" as Profile },
      { text: "I think about how this will affect others.",                profile: "complaciente"  as Profile },
      { text: "I try to plan every detail of the new scenario.",           profile: "controladora"  as Profile },
      { text: "I feel indifferent or don't notice the difference.",        profile: "desconectada"  as Profile },
    ],
  },
  {
    q: "How would you describe your relationship with your own emotions?",
    options: [
      { text: "I feel them very intensely — they sometimes overwhelm me.", profile: "sobreviviente" as Profile },
      { text: "I postpone them so as not to affect those around me.",      profile: "complaciente"  as Profile },
      { text: "I prefer to analyze them before feeling them.",             profile: "controladora"  as Profile },
      { text: "Sometimes I don't know exactly what I'm feeling.",          profile: "desconectada"  as Profile },
    ],
  },
  {
    q: "In your close relationships, which pattern do you recognize most in yourself?",
    options: [
      { text: "I distrust easily and find it hard to open up.",            profile: "sobreviviente" as Profile },
      { text: "I'm always available for others, even when I suffer.",      profile: "complaciente"  as Profile },
      { text: "I need everything to be organized and under control.",      profile: "controladora"  as Profile },
      { text: "I find it hard to connect deeply with others.",             profile: "desconectada"  as Profile },
    ],
  },
  {
    q: "When someone hurts you, how do you usually respond?",
    options: [
      { text: "I go into defense or attack mode.",                         profile: "sobreviviente" as Profile },
      { text: "I excuse their behavior and move on.",                      profile: "complaciente"  as Profile },
      { text: "I try to rationally understand what happened.",             profile: "controladora"  as Profile },
      { text: "I emotionally disconnect from the situation.",              profile: "desconectada"  as Profile },
    ],
  },
  {
    q: "Which phrase resonates most with you right now?",
    options: [
      { text: "I constantly live on alert, expecting the worst.",          profile: "sobreviviente" as Profile },
      { text: "I find it difficult to put my needs first.",                profile: "complaciente"  as Profile },
      { text: "I need to have everything under control to feel safe.",     profile: "controladora"  as Profile },
      { text: "I feel disconnected from my own life.",                     profile: "desconectada"  as Profile },
    ],
  },
];

/* ── Profiles ──────────────────────────────────────────────────────── */
const profilesES: Record<Profile, { title: string; label: string; desc: string; program: string; href: string; color: string; initial: string }> = {
  sobreviviente: {
    title: "La Sobreviviente",
    label: "Modo alerta constante y defensa",
    desc: "Has aprendido a sobrevivir en entornos que no se sentían seguros. Tu sistema nervioso trabaja sin descanso para protegerte, pero ese estado de alerta constante te está agotando. Es hora de aprender que puedes estar segura sin estar en guardia permanente.",
    program: "Programa Volver a Ti",
    href: "/metodo#volver-a-ti",
    color: "#54132B",
    initial: "S",
  },
  complaciente: {
    title: "La Complaciente",
    label: "Prioriza siempre las necesidades ajenas",
    desc: "Has construido tu valor sobre la base de ser útil para los demás. Cuidas, das, apoyas... pero hay una voz dentro de ti que aún no ha sido escuchada. Tu sanación comienza cuando aprendes que tus necesidades importan tanto como las de quienes amas.",
    program: "Programa Auténticamente",
    href: "/metodo#autenticamente",
    color: "#425546",
    initial: "C",
  },
  controladora: {
    title: "La Controladora",
    label: "Busca orden absoluto y seguridad",
    desc: "El control es tu forma de manejar la incertidumbre y el miedo. Has construido estructuras perfectas para no sentir el caos interior. Tu transformación comienza cuando descubres que la seguridad real no viene del control, sino de la confianza en ti misma.",
    program: "Retiro RAÍZ",
    href: "/metodo#raiz",
    color: "#928178",
    initial: "C",
  },
  desconectada: {
    title: "La Desconectada",
    label: "Distante emocionalmente de sí misma",
    desc: "Has aprendido a sobrevivir desconectándote. Es un mecanismo inteligente que te protegió cuando no había otra opción. Hoy, el trabajo es volver a casa — a tu cuerpo, a tus emociones, a tu presencia. Eres más de lo que sientes en este momento.",
    program: "Plataforma ESENCIA",
    href: "/dashboard/esencia",
    color: "#2A1E1A",
    initial: "D",
  },
};

const profilesEN: Record<Profile, { title: string; label: string; desc: string; program: string; href: string; color: string; initial: string }> = {
  sobreviviente: {
    title: "The Survivor",
    label: "Constant alert mode and defense",
    desc: "You have learned to survive in environments that did not feel safe. Your nervous system works tirelessly to protect you, but that constant state of alert is exhausting you. It is time to learn that you can be safe without being permanently on guard.",
    program: "Return to Yourself Program",
    href: "/metodo#volver-a-ti",
    color: "#54132B",
    initial: "S",
  },
  complaciente: {
    title: "The Pleaser",
    label: "Always prioritizes others' needs",
    desc: "You have built your worth on being useful to others. You care, give, support — but there is a voice inside you that has not yet been heard. Your healing begins when you learn that your needs matter as much as those of the people you love.",
    program: "Auténticamente Program",
    href: "/metodo#autenticamente",
    color: "#425546",
    initial: "C",
  },
  controladora: {
    title: "The Controller",
    label: "Seeks absolute order and security",
    desc: "Control is your way of managing uncertainty and fear. You have built perfect structures to avoid feeling the inner chaos. Your transformation begins when you discover that real security does not come from control, but from trust in yourself.",
    program: "RAÍZ Retreat",
    href: "/metodo#raiz",
    color: "#928178",
    initial: "C",
  },
  desconectada: {
    title: "The Disconnected",
    label: "Emotionally distant from herself",
    desc: "You have learned to survive by disconnecting. It is an intelligent mechanism that protected you when there was no other option. Today, the work is to return home — to your body, your emotions, your presence. You are more than what you feel in this moment.",
    program: "ESENCIA Platform",
    href: "/dashboard/esencia",
    color: "#2A1E1A",
    initial: "D",
  },
};

/* ── Profile numbers for display ──────────────────────────────────── */
const profileOrder: Profile[] = ["sobreviviente", "complaciente", "controladora", "desconectada"];

export default function TestPage() {
  const { lang, t } = useLang();

  const questions = lang === "es" ? questionsES : questionsEN;
  const profiles  = lang === "es" ? profilesES  : profilesEN;

  const [step,    setStep]    = useState<"intro" | "quiz" | "result">("intro");
  const [current, setCurrent] = useState(0);
  const [scores,  setScores]  = useState<Record<Profile, number>>({
    sobreviviente: 0, complaciente: 0, controladora: 0, desconectada: 0,
  });
  const [selected, setSelected] = useState<number | null>(null);

  function handleAnswer(profile: Profile, idx: number) {
    setSelected(idx);
    setTimeout(() => {
      const next = { ...scores, [profile]: scores[profile] + 1 };
      setScores(next);
      setSelected(null);
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        setStep("result");
      }
    }, 380);
  }

  function getResult(): Profile {
    return (Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]) as Profile;
  }

  function resetTest() {
    setStep("intro");
    setCurrent(0);
    setSelected(null);
    setScores({ sobreviviente: 0, complaciente: 0, controladora: 0, desconectada: 0 });
  }

  const progress = step === "quiz" ? (current / questions.length) * 100 : step === "result" ? 100 : 0;
  const qNum = String(current + 1).padStart(2, "0");

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes revealResult {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1);    }
        }
        @keyframes progressFill {
          from { width: 0%; }
        }
        .test-opt-btn:hover .opt-letter {
          background-color: #54132B !important;
          color: #fff !important;
        }

        /* ── Mandala hover effects ── */
        @keyframes mandala-spin {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes node-pulse {
          0%, 100% { r: 7;  opacity: 0.85; }
          50%       { r: 9;  opacity: 1;    }
        }
        @keyframes ring-breathe {
          0%, 100% { stroke-opacity: 0.04; }
          50%       { stroke-opacity: 0.12; }
        }
        .mandala-wrap {
          transition: filter 0.5s ease;
          filter: drop-shadow(0 0 0px rgba(255,255,255,0));
          cursor: crosshair;
        }
        .mandala-wrap:hover {
          filter:
            drop-shadow(0 0 28px rgba(255,255,255,0.09))
            drop-shadow(0 0 8px  rgba(84,19,43,0.35));
        }
        .mandala-wrap:hover .mandala-ticks {
          animation: mandala-spin 40s linear infinite;
          transform-origin: 200px 200px;
          transform-box: fill-box;
        }
        .mandala-wrap:hover .mandala-outer-ring {
          animation: ring-breathe 3s ease-in-out infinite;
        }
        .mandala-wrap:hover .mandala-node-dot {
          animation: node-pulse 2.2s ease-in-out infinite;
        }
        .mandala-center-label {
          transition: opacity 0.3s ease;
          opacity: 0.18;
        }
        .mandala-wrap:hover .mandala-center-label {
          opacity: 0.45;
        }
        /* Each node label brightens on wrap hover */
        .mandala-wrap:hover .mandala-node-label {
          fill-opacity: 1 !important;
        }
      `}</style>

      {/* ══════════ INTRO ══════════ */}
      {step === "intro" && (
        <section
          className="min-h-screen flex items-center px-6 py-20"
          style={{ backgroundColor: "#0A0A0A", position: "relative", overflow: "hidden" }}
        >
          {/* GeoLayer dark */}
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0 }} preserveAspectRatio="xMidYMid slice">
              <rect x="5%" y="6%" width="90%" height="88%" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
              <rect x="14%" y="16%" width="72%" height="68%" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8"/>
              <rect x="5%" y="6%" width="18%" height="20%" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
              <rect x="77%" y="74%" width="18%" height="20%" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
              <line x1="5%" y1="6%" x2="5%" y2="94%" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
              <line x1="95%" y1="6%" x2="95%" y2="94%" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
            </svg>
          </div>

          <div
            className="max-w-[1100px] mx-auto w-full grid lg:grid-cols-[1fr_420px] gap-16 xl:gap-24 items-center"
            style={{ position: "relative", zIndex: 1, animation: "fadeSlideUp 0.7s ease" }}
          >
            {/* LEFT */}
            <div className="space-y-10">
              {/* Eyebrow */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "#54132B" }} />
                <span
                  className="font-body uppercase tracking-[0.3em]"
                  style={{ fontSize: "10.5px", fontWeight: 700, color: "#54132B" }}
                >
                  {t("test.label")}
                </span>
              </div>

              {/* H1 */}
              <div>
                <h1
                  className="font-display"
                  style={{
                    fontSize: "clamp(42px, 6vw, 78px)",
                    fontWeight: 300,
                    lineHeight: 1.0,
                    color: "#FFFFFF",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t("test.title")}
                </h1>
                <p
                  className="font-body mt-5 max-w-[520px]"
                  style={{ fontSize: "clamp(15px, 1.5vw, 17px)", lineHeight: 1.75, color: "rgba(255,255,255,0.45)" }}
                >
                  {t("test.desc")}
                </p>
              </div>

              {/* 4 Profiles */}
              <div>
                <p
                  className="font-body uppercase tracking-[0.24em] mb-5"
                  style={{ fontSize: "9.5px", fontWeight: 700, color: "rgba(255,255,255,0.25)" }}
                >
                  {t("test.profiles.label")}
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {profileOrder.map((key, i) => {
                    const p = profiles[key];
                    return (
                      <div
                        key={key}
                        style={{
                          padding: "14px 16px",
                          borderLeft: `2px solid ${p.color}`,
                          backgroundColor: "rgba(255,255,255,0.03)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                          <span
                            className="font-body"
                            style={{ fontSize: "9px", fontWeight: 700, color: p.color, letterSpacing: "0.2em", opacity: 0.7 }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className="font-body"
                            style={{ fontSize: "12px", fontWeight: 700, color: "#FFFFFF" }}
                          >
                            {p.title}
                          </span>
                        </div>
                        <p
                          className="font-body"
                          style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}
                        >
                          {p.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
                <button
                  onClick={() => setStep("quiz")}
                  className="font-body font-medium tracking-[0.08em]"
                  style={{
                    padding: "16px 40px",
                    backgroundColor: "#54132B",
                    color: "#F9F4F1",
                    border: "none",
                    borderRadius: "2px",
                    fontSize: "13px",
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  {t("test.start")}
                </button>
                <p className="font-body" style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>
                  {t("test.privacy")}
                </p>
              </div>
            </div>

            {/* RIGHT — Mandala / radar SVG */}
            <div className="hidden lg:flex justify-center items-center mandala-wrap" style={{ position: "relative" }}>
              {/* viewBox expanded to give room for labels on all sides */}
              <svg width="420" height="420" viewBox="-80 -50 560 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer rings — center (200,200) */}
                <circle cx="200" cy="200" r="170" stroke="rgba(255,255,255,0.04)" strokeWidth="1" className="mandala-outer-ring"/>
                <circle cx="200" cy="200" r="138" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8"/>
                <circle cx="200" cy="200" r="105" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8"/>
                <circle cx="200" cy="200" r="72"  stroke="#54132B" strokeWidth="0.8" strokeOpacity="0.3"/>
                <circle cx="200" cy="200" r="42"  stroke="#54132B" strokeWidth="0.8" strokeOpacity="0.2"/>
                <circle cx="200" cy="200" r="16"  fill="#54132B" fillOpacity="0.12"/>
                <circle cx="200" cy="200" r="5"   fill="#54132B" fillOpacity="0.75"/>

                {/* Cross lines */}
                <line x1="30"  y1="200" x2="370" y2="200" stroke="rgba(255,255,255,0.05)" strokeWidth="0.6"/>
                <line x1="200" y1="30"  x2="200" y2="370" stroke="rgba(255,255,255,0.05)" strokeWidth="0.6"/>
                <line x1="80"  y1="80"  x2="320" y2="320" stroke="rgba(255,255,255,0.04)" strokeWidth="0.6"/>
                <line x1="320" y1="80"  x2="80"  y2="320" stroke="rgba(255,255,255,0.04)" strokeWidth="0.6"/>

                {/* 4 profile nodes — manually placed, radius 138 */}
                {/* TOP — Sobreviviente */}
                <g>
                  <line x1="200" y1="200" x2="200" y2="62" stroke="#54132B" strokeWidth="0.7" strokeOpacity="0.5"/>
                  <circle cx="200" cy="62" r="7"  fill="#54132B" fillOpacity="0.85" className="mandala-node-dot"/>
                  <circle cx="200" cy="62" r="14" stroke="#54132B" strokeWidth="0.9" strokeOpacity="0.35" fill="none"/>
                  <text x="200" y="28" textAnchor="middle" fill="#54132B" fillOpacity="0.9" fontSize="8.5" fontFamily="var(--font-am-body)" letterSpacing="0.22em" fontWeight="600" className="mandala-node-label">
                    {(lang === "es" ? "Sobreviviente" : "Survivor").toUpperCase()}
                  </text>
                  <line x1="155" y1="33" x2="245" y2="33" stroke="#54132B" strokeOpacity="0.25" strokeWidth="0.6"/>
                </g>

                {/* RIGHT — Complaciente */}
                <g>
                  <line x1="200" y1="200" x2="338" y2="200" stroke="#425546" strokeWidth="0.7" strokeOpacity="0.5"/>
                  <circle cx="338" cy="200" r="7"  fill="#425546" fillOpacity="0.85" className="mandala-node-dot"/>
                  <circle cx="338" cy="200" r="14" stroke="#425546" strokeWidth="0.9" strokeOpacity="0.35" fill="none"/>
                  <text x="360" y="196" textAnchor="start" fill="#425546" fillOpacity="0.9" fontSize="8.5" fontFamily="var(--font-am-body)" letterSpacing="0.22em" fontWeight="600" className="mandala-node-label">
                    {(lang === "es" ? "Complaciente" : "Pleaser").toUpperCase()}
                  </text>
                  <text x="360" y="209" textAnchor="start" fill="#425546" fillOpacity="0.25" fontSize="7" fontFamily="var(--font-am-body)" letterSpacing="0.12em">
                    02
                  </text>
                </g>

                {/* BOTTOM — Controladora */}
                <g>
                  <line x1="200" y1="200" x2="200" y2="338" stroke="#928178" strokeWidth="0.7" strokeOpacity="0.5"/>
                  <circle cx="200" cy="338" r="7"  fill="#928178" fillOpacity="0.85" className="mandala-node-dot"/>
                  <circle cx="200" cy="338" r="14" stroke="#928178" strokeWidth="0.9" strokeOpacity="0.35" fill="none"/>
                  <line x1="155" y1="364" x2="245" y2="364" stroke="#928178" strokeOpacity="0.25" strokeWidth="0.6"/>
                  <text x="200" y="380" textAnchor="middle" fill="#928178" fillOpacity="0.9" fontSize="8.5" fontFamily="var(--font-am-body)" letterSpacing="0.22em" fontWeight="600" className="mandala-node-label">
                    {(lang === "es" ? "Controladora" : "Controller").toUpperCase()}
                  </text>
                </g>

                {/* LEFT — Desconectada */}
                <g>
                  <line x1="200" y1="200" x2="62" y2="200" stroke="#C7A99A" strokeWidth="0.7" strokeOpacity="0.5"/>
                  <circle cx="62" cy="200" r="7"  fill="#C7A99A" fillOpacity="0.85" className="mandala-node-dot"/>
                  <circle cx="62" cy="200" r="14" stroke="#C7A99A" strokeWidth="0.9" strokeOpacity="0.35" fill="none"/>
                  <text x="40" y="196" textAnchor="end" fill="#C7A99A" fillOpacity="0.9" fontSize="8.5" fontFamily="var(--font-am-body)" letterSpacing="0.22em" fontWeight="600" className="mandala-node-label">
                    {(lang === "es" ? "Desconectada" : "Disconnected").toUpperCase()}
                  </text>
                  <text x="40" y="209" textAnchor="end" fill="#C7A99A" fillOpacity="0.25" fontSize="7" fontFamily="var(--font-am-body)" letterSpacing="0.12em">
                    04
                  </text>
                </g>

                {/* Tick marks — spinning group on hover */}
                <g className="mandala-ticks">
                  {Array.from({ length: 36 }).map((_, i) => {
                    const a = (i * 10 * Math.PI) / 180;
                    const r1 = 165;
                    const r2 = i % 3 === 0 ? 155 : 161;
                    const rx = (v: number) => Math.round(v * 1000) / 1000;
                    return (
                      <line
                        key={i}
                        x1={rx(200 + r1 * Math.cos(a))}
                        y1={rx(200 + r1 * Math.sin(a))}
                        x2={rx(200 + r2 * Math.cos(a))}
                        y2={rx(200 + r2 * Math.sin(a))}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="0.8"
                      />
                    );
                  })}
                </g>

                {/* Center label */}
                <text x="200" y="204" textAnchor="middle" fill="rgba(255,255,255,0.18)" fontSize="10" fontFamily="var(--font-am-body)" fontStyle="italic" letterSpacing="0.16em" className="mandala-center-label">
                  {lang === "es" ? "tu perfil" : "your profile"}
                </text>
              </svg>
            </div>
          </div>
        </section>
      )}

      {/* ══════════ QUIZ ══════════ */}
      {step === "quiz" && (
        <section
          className="min-h-screen flex flex-col px-6 py-0"
          style={{ backgroundColor: "#0A0A0A", position: "relative", overflow: "hidden" }}
        >
          {/* GeoLayer */}
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0 }} preserveAspectRatio="xMidYMid slice">
              <rect x="5%" y="6%" width="90%" height="88%" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
              <line x1="5%" y1="6%" x2="5%" y2="94%" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
              <line x1="95%" y1="6%" x2="95%" y2="94%" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
            </svg>
          </div>

          {/* Progress bar — top */}
          <div style={{ position: "relative", zIndex: 2, paddingTop: "0" }}>
            <div style={{ height: "2px", width: "100%", backgroundColor: "rgba(255,255,255,0.07)" }}>
              <div
                style={{
                  height: "2px",
                  width: `${progress}%`,
                  backgroundColor: "#54132B",
                  transition: "width 0.5s ease",
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div
            className="flex-1 flex items-center"
            style={{ position: "relative", zIndex: 1 }}
          >
            <div
              className="max-w-[720px] mx-auto w-full py-16"
              style={{ animation: "fadeSlideUp 0.45s ease" }}
              key={current}
            >
              {/* Question meta */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "48px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span
                    className="font-display"
                    style={{ fontSize: "clamp(48px, 8vw, 88px)", fontWeight: 300, color: "rgba(255,255,255,0.05)", lineHeight: 1, letterSpacing: "-0.04em", userSelect: "none" }}
                  >
                    {qNum}
                  </span>
                  <div>
                    <p className="font-body" style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                      {t("test.pregunta")} {current + 1} {t("test.question_of")} {questions.length}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "5px" }}>
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: i === current ? "20px" : "6px",
                        height: "3px",
                        borderRadius: "2px",
                        backgroundColor: i < current ? "#54132B" : i === current ? "#54132B" : "rgba(255,255,255,0.12)",
                        transition: "all 0.3s ease",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Question */}
              <h2
                className="font-display mb-10"
                style={{
                  fontSize: "clamp(22px, 3.2vw, 36px)",
                  fontWeight: 300,
                  color: "#FFFFFF",
                  lineHeight: 1.35,
                  letterSpacing: "-0.01em",
                }}
              >
                {questions[current].q}
              </h2>

              {/* Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {questions[current].options.map((opt, idx) => {
                  const letters = ["A", "B", "C", "D"];
                  const isSelected = selected === idx;
                  return (
                    <button
                      key={opt.text}
                      className="test-opt-btn"
                      onClick={() => handleAnswer(opt.profile, idx)}
                      disabled={selected !== null}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        width: "100%",
                        textAlign: "left",
                        padding: "18px 20px",
                        backgroundColor: isSelected ? "rgba(84,19,43,0.15)" : "rgba(255,255,255,0.03)",
                        border: isSelected ? "1px solid rgba(84,19,43,0.6)" : "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "3px",
                        cursor: selected !== null ? "default" : "pointer",
                        transition: "all 0.22s ease",
                        fontFamily: "var(--font-am-body)",
                      }}
                      onMouseEnter={e => {
                        if (selected !== null) return;
                        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                      }}
                      onMouseLeave={e => {
                        if (selected !== null) return;
                        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                      }}
                    >
                      {/* Letter badge */}
                      <span
                        className="opt-letter"
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "2px",
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.05em",
                          backgroundColor: isSelected ? "#54132B" : "rgba(255,255,255,0.07)",
                          color: isSelected ? "#fff" : "rgba(255,255,255,0.4)",
                          transition: "all 0.22s ease",
                        }}
                      >
                        {letters[idx]}
                      </span>
                      <span style={{ fontSize: "clamp(13px, 1.4vw, 15px)", color: "#FFFFFF", lineHeight: 1.55, opacity: isSelected ? 1 : 0.75 }}>
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════ RESULT ══════════ */}
      {step === "result" && (() => {
        const resultKey = getResult();
        const result    = profiles[resultKey];
        const bg        = result.color;
        return (
          <section
            className="min-h-screen flex items-center px-6 py-20"
            style={{ backgroundColor: bg, position: "relative", overflow: "hidden" }}
          >
            {/* GeoLayer dark */}
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0 }} preserveAspectRatio="xMidYMid slice">
                <rect x="5%" y="6%" width="90%" height="88%" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                <rect x="14%" y="16%" width="72%" height="68%" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8"/>
                <line x1="5%" y1="6%" x2="5%" y2="94%" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                <line x1="95%" y1="6%" x2="95%" y2="94%" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
              </svg>
            </div>

            {/* Giant watermark initial */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: "-60px",
                right: "-20px",
                fontSize: "clamp(200px, 35vw, 420px)",
                fontFamily: "var(--font-am-display)",
                fontStyle: "italic",
                fontWeight: 700,
                color: "#FFFFFF",
                opacity: 0.04,
                lineHeight: 1,
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              {result.initial}
            </div>

            <div
              className="max-w-[720px] mx-auto w-full"
              style={{ position: "relative", zIndex: 1, animation: "revealResult 0.6s ease" }}
            >
              {/* Eyebrow */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
                <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "rgba(255,255,255,0.4)" }} />
                <span
                  className="font-body uppercase tracking-[0.3em]"
                  style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.5)" }}
                >
                  {t("test.result.label")}
                </span>
              </div>

              {/* Profile name */}
              <h2
                className="font-display mb-2"
                style={{
                  fontSize: "clamp(36px, 7vw, 80px)",
                  fontWeight: 300,
                  color: "#FFFFFF",
                  lineHeight: 1.0,
                  letterSpacing: "-0.02em",
                }}
              >
                {result.title}
              </h2>

              {/* Label */}
              <p
                className="font-body mb-8"
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {result.label}
              </p>

              {/* Divider */}
              <div style={{ width: "48px", height: "1px", backgroundColor: "rgba(255,255,255,0.3)", marginBottom: "32px" }} />

              {/* Description */}
              <p
                className="font-body mb-12"
                style={{
                  fontSize: "clamp(15px, 1.7vw, 18px)",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.82)",
                }}
              >
                {result.desc}
              </p>

              {/* Recommendation card */}
              <div
                style={{
                  padding: "28px 32px",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderLeft: "2px solid rgba(255,255,255,0.35)",
                  marginBottom: "32px",
                }}
              >
                <p
                  className="font-body uppercase tracking-[0.2em] mb-3"
                  style={{ fontSize: "9.5px", fontWeight: 700, color: "rgba(255,255,255,0.45)" }}
                >
                  {t("test.result.rec_label")}
                </p>
                <p
                  className="font-display mb-2"
                  style={{ fontSize: "clamp(18px, 2.5vw, 26px)", fontWeight: 300, color: "#FFFFFF" }}
                >
                  {result.program}
                </p>
                <p
                  className="font-body mb-6"
                  style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}
                >
                  {t("test.result.rec_desc")}
                </p>
                <Link
                  href={result.href}
                  className="font-body font-medium tracking-[0.08em]"
                  style={{
                    display: "inline-block",
                    padding: "13px 32px",
                    backgroundColor: "#FFFFFF",
                    color: bg,
                    borderRadius: "2px",
                    fontSize: "13px",
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  {t("test.result.know_prog")}
                </Link>
              </div>

              {/* Retry */}
              <button
                onClick={resetTest}
                className="font-body uppercase tracking-[0.18em] transition-opacity"
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.35)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
              >
                {t("test.result.retry")}
              </button>
            </div>
          </section>
        );
      })()}
    </>
  );
}
