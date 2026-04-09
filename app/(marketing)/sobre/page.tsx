"use client";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/app/providers/LangProvider";

/* ─────────────────────────────────────────────
   BRAND TOKENS — Liset Valencia (manual de marca)
   bg:        #E6E4D8  Plaster of Paris
   sandstone: #DACFBB
   brown:     #928178  Faded Brown (acento)
   ivory:     #978F83
   black:     #000000
   white:     #FFFFFF
   font-display: Bellefair
   font-body:    DM Sans (Creato Display placeholder)
───────────────────────────────────────────── */

const LV = {
  bg:        "#E6E4D8",
  sand:      "#DACFBB",
  brown:     "#928178",
  ivory:     "#978F83",
  black:     "#000000",
  white:     "#FFFFFF",
  darkBg:    "#1A1714",
};

/* ── Sub-components ─────────────────────────── */

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className="text-[10px] uppercase tracking-[0.35em] font-medium"
      style={{
        fontFamily: "var(--font-lv-body)",
        color: light ? "rgba(255,255,255,0.5)" : LV.brown,
      }}
    >
      {children}
    </p>
  );
}

function HRule({ light = false }: { light?: boolean }) {
  return (
    <div
      className="w-12 h-px"
      style={{ backgroundColor: light ? "rgba(255,255,255,0.25)" : LV.brown, opacity: light ? 1 : 0.45 }}
    />
  );
}

/* ── Credencial pill ────────────────────────── */
function CredPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center px-4 py-1.5 text-[11px] tracking-[0.14em] uppercase"
      style={{
        fontFamily: "var(--font-lv-body)",
        border: `1px solid ${LV.brown}55`,
        color: LV.brown,
        backgroundColor: "transparent",
      }}
    >
      {children}
    </span>
  );
}

/* ── Stat block ─────────────────────────────── */
function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center space-y-1">
      <p
        className="leading-none"
        style={{
          fontFamily: "var(--font-lv-display)",
          fontSize: "clamp(36px, 4vw, 52px)",
          fontWeight: 400,
          color: LV.black,
          letterSpacing: "-0.02em",
        }}
      >
        {number}
      </p>
      <p
        className="text-[10px] uppercase tracking-[0.22em]"
        style={{ fontFamily: "var(--font-lv-body)", color: LV.brown }}
      >
        {label}
      </p>
    </div>
  );
}

/* ── Valor card ─────────────────────────────── */
function ValorCard({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div
      className="group relative p-8 flex flex-col gap-4 transition-shadow duration-300"
      style={{
        backgroundColor: LV.white,
        border: `1px solid ${LV.sand}`,
      }}
    >
      {/* number watermark */}
      <span
        className="absolute top-4 right-5 opacity-10"
        style={{
          fontFamily: "var(--font-lv-display)",
          fontSize: "64px",
          lineHeight: 1,
          color: LV.brown,
          userSelect: "none",
        }}
      >
        {number}
      </span>
      <div className="w-6 h-px" style={{ backgroundColor: LV.brown }} />
      <h4
        style={{
          fontFamily: "var(--font-lv-display)",
          fontSize: "20px",
          fontWeight: 400,
          color: LV.black,
          letterSpacing: "0.01em",
        }}
      >
        {title}
      </h4>
      <p
        className="text-sm leading-relaxed"
        style={{ fontFamily: "var(--font-lv-body)", color: LV.ivory }}
      >
        {desc}
      </p>
    </div>
  );
}

/* ── Dimension card ─────────────────────────── */
function DimensionCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div
      className="flex gap-6 p-8"
      style={{ backgroundColor: LV.sand, border: `1px solid ${LV.brown}22` }}
    >
      <div
        className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-lg"
        style={{ color: LV.brown }}
      >
        {icon}
      </div>
      <div className="space-y-2">
        <h4
          style={{
            fontFamily: "var(--font-lv-display)",
            fontSize: "17px",
            fontWeight: 400,
            color: LV.black,
          }}
        >
          {title}
        </h4>
        <p
          className="text-sm leading-relaxed"
          style={{ fontFamily: "var(--font-lv-body)", color: LV.ivory }}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════ */
export default function SobrePage() {
  const { lang } = useLang();
  const es = lang === "es";

  /* ── Valores ─── */
  const valores = es
    ? [
        { n: "01", title: "Conciencia",      desc: "Vivir con presencia plena en cada acto de nuestra existencia. El primer paso de todo proceso real." },
        { n: "02", title: "Verdad",           desc: "Honestidad radical con una misma como base de toda sanación. Sin verdad no hay transformación." },
        { n: "03", title: "Compasión Firme",  desc: "Amor incondicional hacia una misma sin perder el compromiso con el cambio y el crecimiento." },
      ]
    : [
        { n: "01", title: "Consciousness",    desc: "Living with full presence in every act of our existence. The first step of any real process." },
        { n: "02", title: "Truth",            desc: "Radical honesty with oneself as the foundation of all healing. Without truth there is no transformation." },
        { n: "03", title: "Firm Compassion",  desc: "Unconditional love for oneself without losing commitment to change and growth." },
      ];

  /* ── Dimensiones ─── */
  const dimensiones = es
    ? [
        { icon: "◈", title: "Psicología Clínica",   desc: "Abordaje terapéutico basado en la evidencia. Herramientas cognitivas y sistémicas para la gestión emocional y conductual profunda." },
        { icon: "◇", title: "Espiritualidad",        desc: "Un camino hacia la trascendencia, el propósito de vida y la conexión con lo sagrado que habita en lo cotidiano." },
        { icon: "◉", title: "Neurociencia Aplicada", desc: "Comprensión del funcionamiento cerebral para integrar cambios duraderos. El cuerpo como aliado del proceso." },
        { icon: "◌", title: "Enfoque Sistémico",     desc: "Los patrones relacionales que llevamos del pasado dan forma al presente. Los reconocemos para transformarlos." },
      ]
    : [
        { icon: "◈", title: "Clinical Psychology",    desc: "Evidence-based therapeutic approach. Cognitive and systemic tools for deep emotional and behavioral management." },
        { icon: "◇", title: "Spirituality",           desc: "A path toward transcendence, life purpose, and connection with the sacred that dwells in the everyday." },
        { icon: "◉", title: "Applied Neuroscience",   desc: "Understanding brain function to integrate lasting change. The body as an ally in the process." },
        { icon: "◌", title: "Systemic Approach",      desc: "Relational patterns we carry from the past shape the present. We recognize them to transform them." },
      ];

  return (
    <div style={{ backgroundColor: LV.bg, color: LV.black }}>

      {/* ══ 1. HERO ════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: LV.bg, minHeight: "92vh" }}
      >
        {/* Background texture lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
          style={{ opacity: 0.18 }}
        >
          {Array.from({ length: 14 }).map((_, i) => (
            <line
              key={i}
              x1={`${(i / 13) * 100}%`} y1="0"
              x2={`${(i / 13) * 100}%`} y2="100%"
              stroke={LV.brown} strokeWidth="0.5"
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1="0" y1={`${(i / 9) * 100}%`}
              x2="100%" y2={`${(i / 9) * 100}%`}
              stroke={LV.brown} strokeWidth="0.5"
            />
          ))}
        </svg>

        <div className="relative max-w-[1100px] mx-auto px-6 grid lg:grid-cols-[1fr_480px] gap-0 min-h-[92vh] items-stretch">

          {/* Left — Text */}
          <div className="flex flex-col justify-center py-24 pr-0 lg:pr-16 space-y-10">

            {/* LV Logo */}
            <div>
              <Image
                src="/logos/lv-wordmark-descriptor-black.svg"
                alt="Liset Valencia"
                width={220}
                height={56}
                style={{ height: "44px", width: "auto", opacity: 0.85 }}
              />
            </div>

            {/* Eyebrow */}
            <div className="space-y-4">
              <Eyebrow>{es ? "Psicóloga Clínica · Conferenciante · Guía de Propósito" : "Clinical Psychologist · Speaker · Purpose Guide"}</Eyebrow>

              <h1
                style={{
                  fontFamily: "var(--font-lv-display)",
                  fontSize: "clamp(42px, 5.5vw, 78px)",
                  fontWeight: 400,
                  color: LV.black,
                  lineHeight: 1.04,
                  letterSpacing: "-0.015em",
                }}
              >
                Dra. Liset<br />
                <span style={{ color: LV.brown }}>Valencia</span><br />
                Medina
              </h1>

              <p
                className="text-base leading-[1.75] max-w-[460px]"
                style={{ fontFamily: "var(--font-lv-body)", color: LV.ivory }}
              >
                {es
                  ? "Acompaño procesos de despertar y sanación profunda a través de la integración del ser. Mi misión es ayudar a las mujeres a reconectar con su conciencia para sanar desde lo más profundo."
                  : "I accompany processes of awakening and deep healing through the integration of the self. My mission is to help women reconnect with their consciousness to heal from the deepest place."}
              </p>
            </div>

            {/* Credential pills */}
            <div className="flex flex-wrap gap-2">
              <CredPill>{es ? "Doctora en Psicología" : "Doctor in Psychology"}</CredPill>
              <CredPill>{es ? "+15 años de práctica" : "+15 Years of Practice"}</CredPill>
              <CredPill>{es ? "Bilingüe ES / EN" : "Bilingual ES / EN"}</CredPill>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-8 py-4 text-[13px] tracking-[0.1em] uppercase transition-opacity hover:opacity-80"
                style={{
                  fontFamily: "var(--font-lv-body)",
                  fontWeight: 500,
                  backgroundColor: LV.black,
                  color: LV.white,
                }}
              >
                {es ? "Agendar consulta" : "Book a consultation"}
                <span style={{ fontSize: "16px" }}>→</span>
              </Link>
              <Link
                href="#historia"
                className="text-[12px] tracking-[0.1em] uppercase transition-opacity hover:opacity-60"
                style={{ fontFamily: "var(--font-lv-body)", color: LV.brown, textDecoration: "none" }}
              >
                {es ? "Conocer más ↓" : "Learn more ↓"}
              </Link>
            </div>
          </div>

          {/* Right — Photo */}
          <div className="hidden lg:block relative overflow-hidden" style={{ backgroundColor: LV.sand }}>
            <Image
              src="/liset-valencia.jpg"
              alt="Dra. Liset Valencia Medina"
              fill
              className="object-cover object-top photo-liset"
              priority
            />
            {/* Subtle brown overlay at bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
              style={{ background: `linear-gradient(to top, ${LV.sand}88, transparent)` }}
            />
          </div>
        </div>
      </section>

      {/* ══ 2. STATS BAR ════════════════════════════════════════ */}
      <section style={{ backgroundColor: LV.sand, borderTop: `1px solid ${LV.brown}22`, borderBottom: `1px solid ${LV.brown}22` }}>
        <div className="max-w-[1100px] mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <Stat number="15+" label={es ? "Años de práctica" : "Years of practice"} />
          <Stat number="3K+" label={es ? "Procesos acompañados" : "Processes guided"} />
          <Stat number="4"   label={es ? "Áreas de especialización" : "Areas of expertise"} />
          <Stat number="2"   label={es ? "Idiomas" : "Languages"} />
        </div>
      </section>

      {/* ══ 3. QUOTE ════════════════════════════════════════════ */}
      <section className="py-28 px-6" style={{ backgroundColor: LV.bg }}>
        <div className="max-w-[680px] mx-auto text-center space-y-8">
          <Image
            src="/logos/lv-wordmark-ivory.svg"
            alt=""
            width={48}
            height={48}
            aria-hidden="true"
            style={{ height: "32px", width: "auto", opacity: 0.35, margin: "0 auto" }}
          />
          <blockquote
            className="italic leading-[1.45]"
            style={{
              fontFamily: "var(--font-lv-display)",
              fontSize: "clamp(24px, 3.2vw, 38px)",
              fontWeight: 400,
              color: LV.black,
              letterSpacing: "0.01em",
            }}
          >
            {es
              ? '"Sanar no es olvidar lo que viviste. Es aprender a cargarlo de una manera diferente."'
              : '"Healing is not forgetting what you lived. It\'s learning to carry it in a different way."'}
          </blockquote>
          <p
            className="text-[11px] uppercase tracking-[0.28em]"
            style={{ fontFamily: "var(--font-lv-body)", color: LV.brown }}
          >
            — Dra. Liset Valencia
          </p>
        </div>
      </section>

      {/* ══ 4. HISTORIA ════════════════════════════════════════ */}
      <section id="historia" className="py-24 px-6" style={{ backgroundColor: LV.sand }}>
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Photo col */}
          <div className="relative">
            <div
              className="photo-liset-wrapper relative overflow-hidden"
              style={{ aspectRatio: "3/4", maxWidth: "480px" }}
            >
              <Image
                src="/liset-valencia-hero.jpg"
                alt="Dra. Liset Valencia Medina"
                fill
                className="object-cover object-top photo-liset"
              />
            </div>
            {/* Decorative frame offset */}
            <div
              className="absolute -bottom-4 -right-4 w-full h-full -z-10 hidden lg:block"
              style={{
                maxWidth: "480px",
                border: `1px solid ${LV.brown}40`,
              }}
            />
            {/* Caption */}
            <p
              className="mt-4 text-[10px] uppercase tracking-[0.25em]"
              style={{ fontFamily: "var(--font-lv-body)", color: LV.ivory }}
            >
              {es ? "© Fotografía oficial · Liset Valencia" : "© Official photography · Liset Valencia"}
            </p>
          </div>

          {/* Text col */}
          <div className="space-y-10 lg:pt-8">
            <div className="space-y-4">
              <Eyebrow>{es ? "Historia" : "Story"}</Eyebrow>
              <HRule />
              <h2
                style={{
                  fontFamily: "var(--font-lv-display)",
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 400,
                  color: LV.black,
                  lineHeight: 1.2,
                  letterSpacing: "0.005em",
                }}
              >
                {es ? "Un camino nacido\nde lo vivido" : "A path born\nfrom experience"}
              </h2>
            </div>

            <div
              className="space-y-5 text-[15px] leading-[1.8]"
              style={{ fontFamily: "var(--font-lv-body)", color: LV.ivory }}
            >
              <p>
                {es
                  ? "Llegué a la psicología no solo por vocación académica, sino porque entendí desde adentro lo que significa necesitar acompañamiento real. Mi formación me dio las herramientas. Mi propio proceso me dio la humanidad."
                  : "I came to psychology not only through academic vocation, but because I understood from within what it means to need real support. My training gave me tools. My own process gave me humanity."}
              </p>
              <p>
                {es
                  ? "Durante más de quince años he acompañado a mujeres en procesos de sanación emocional, construcción de identidad y claridad de propósito. He aprendido que cada historia es única, y que el mejor mapa para sanar lo dibuja la propia persona."
                  : "For more than fifteen years I have accompanied women through processes of emotional healing, identity building, and clarity of purpose. I've learned that every story is unique, and that the best map for healing is drawn by the person themselves."}
              </p>
              <p>
                {es
                  ? "AuténticaMente nació de esta convicción: que el desarrollo humano profundo debe ser accesible, honesto y cercano. Una plataforma que extiende el trabajo del consultorio hacia una comunidad que crece junta."
                  : "AuténticaMente was born from this conviction: that deep human development must be accessible, honest, and close. A platform that extends the work of the office into a community that grows together."}
              </p>
            </div>

            {/* Inline credential block */}
            <div
              className="border-l-2 pl-6 py-2 space-y-1"
              style={{ borderColor: LV.brown }}
            >
              <p
                className="text-[11px] uppercase tracking-[0.22em]"
                style={{ fontFamily: "var(--font-lv-body)", color: LV.brown }}
              >
                {es ? "Formación" : "Education"}
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-lv-body)", color: LV.black, opacity: 0.8 }}
              >
                {es
                  ? "Doctora en Psicología Clínica · Especialización en Psicología Sistémica · Certificación en Neurociencia Aplicada"
                  : "Doctor in Clinical Psychology · Specialization in Systemic Psychology · Certification in Applied Neuroscience"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. VALORES ══════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: LV.bg }}>
        <div className="max-w-[1100px] mx-auto space-y-14">
          <div className="space-y-4">
            <Eyebrow>{es ? "Valores" : "Values"}</Eyebrow>
            <HRule />
            <h2
              style={{
                fontFamily: "var(--font-lv-display)",
                fontSize: "clamp(26px, 3.2vw, 40px)",
                fontWeight: 400,
                color: LV.black,
              }}
            >
              {es ? "Lo que guía el trabajo" : "What guides the work"}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {valores.map((v) => (
              <ValorCard key={v.n} number={v.n} title={v.title} desc={v.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. DIMENSIONES / METODOLOGÍA ══════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: LV.sand }}>
        <div className="max-w-[1100px] mx-auto space-y-14">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-4">
              <Eyebrow>{es ? "Metodología" : "Methodology"}</Eyebrow>
              <HRule />
              <h2
                style={{
                  fontFamily: "var(--font-lv-display)",
                  fontSize: "clamp(26px, 3.2vw, 40px)",
                  fontWeight: 400,
                  color: LV.black,
                  lineHeight: 1.2,
                }}
              >
                {es ? "Un abordaje que\nintegra el ser completo" : "An approach that\nintegrates the whole self"}
              </h2>
              <p
                className="text-sm leading-[1.8]"
                style={{ fontFamily: "var(--font-lv-body)", color: LV.ivory, maxWidth: "420px" }}
              >
                {es
                  ? "No existe un único camino hacia la sanación. Por eso el trabajo integra perspectivas distintas que se complementan para acompañar a cada persona desde donde está."
                  : "There is no single path to healing. That's why the work integrates different perspectives that complement each other to accompany each person from where they are."}
              </p>
            </div>

            <div className="grid gap-3">
              {dimensiones.map((d) => (
                <DimensionCard key={d.title} icon={d.icon} title={d.title} desc={d.desc} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 7. SEPARADOR CON LOGO ══════════════════════════════ */}
      <section
        className="py-20 px-6 flex flex-col items-center gap-6 text-center"
        style={{ backgroundColor: LV.bg }}
      >
        <div
          className="w-full max-w-[1100px] mx-auto h-px"
          style={{ backgroundColor: `${LV.brown}30` }}
        />
        <Image
          src="/logos/lv-wordmark-black.svg"
          alt="Liset Valencia"
          width={180}
          height={40}
          style={{ height: "30px", width: "auto", opacity: 0.18 }}
        />
        <p
          className="text-[11px] uppercase tracking-[0.28em]"
          style={{ fontFamily: "var(--font-lv-body)", color: LV.ivory }}
        >
          Liset Valencia Medina · {es ? "Psicóloga Clínica" : "Clinical Psychologist"}
        </p>
        <div
          className="w-full max-w-[1100px] mx-auto h-px"
          style={{ backgroundColor: `${LV.brown}30` }}
        />
      </section>

      {/* ══ 8. CTA FINAL ════════════════════════════════════════ */}
      <section
        className="py-32 px-6"
        style={{ backgroundColor: LV.darkBg }}
      >
        {/* Subtle grid */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
          style={{ position: "absolute", opacity: 0.04 }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={i}
              x1={`${(i / 19) * 100}%`} y1="0"
              x2={`${(i / 19) * 100}%`} y2="100%"
              stroke={LV.brown} strokeWidth="0.6"
            />
          ))}
        </svg>

        <div className="relative max-w-[680px] mx-auto text-center space-y-10">
          <div className="space-y-3">
            <Eyebrow light>{es ? "¿Lista para comenzar?" : "Ready to begin?"}</Eyebrow>
            <h2
              className="italic"
              style={{
                fontFamily: "var(--font-lv-display)",
                fontSize: "clamp(28px, 4vw, 50px)",
                fontWeight: 400,
                color: LV.white,
                lineHeight: 1.2,
                letterSpacing: "0.01em",
              }}
            >
              {es
                ? "Tu proceso importa.\nEmpieza cuando estés lista."
                : "Your process matters.\nBegin when you are ready."}
            </h2>
          </div>

          <p
            className="text-sm leading-[1.8]"
            style={{ fontFamily: "var(--font-lv-body)", color: "rgba(255,255,255,0.45)" }}
          >
            {es
              ? "Las citas se confirman con pago anticipado. Los cupos son limitados para garantizar la calidad del acompañamiento."
              : "Appointments are confirmed with advance payment. Spots are limited to ensure quality of support."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-3 px-10 py-4 text-[13px] tracking-[0.1em] uppercase transition-opacity hover:opacity-75"
              style={{
                fontFamily: "var(--font-lv-body)",
                fontWeight: 500,
                backgroundColor: LV.white,
                color: LV.black,
              }}
            >
              {es ? "Agendar mi consulta" : "Book my consultation"}
              <span>→</span>
            </Link>
            <Link
              href="https://autenticamente.com"
              className="text-[12px] tracking-[0.1em] uppercase transition-opacity hover:opacity-60"
              style={{
                fontFamily: "var(--font-lv-body)",
                color: `${LV.brown}`,
                textDecoration: "none",
              }}
            >
              {es ? "Explorar AuténticaMente →" : "Explore AuténticaMente →"}
            </Link>
          </div>

          {/* Disclaimer */}
          <p
            className="text-[11px] leading-relaxed"
            style={{ fontFamily: "var(--font-lv-body)", color: "rgba(255,255,255,0.2)" }}
          >
            {es
              ? "Este espacio no es de atención en crisis. Si vives una situación de emergencia emocional, contacta a una línea de atención inmediata en tu país."
              : "This space is not for crisis care. If you are experiencing an emotional emergency, contact an immediate support line in your country."}
          </p>
        </div>
      </section>

    </div>
  );
}
