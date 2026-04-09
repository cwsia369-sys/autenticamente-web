import Link from "next/link";

function EyebrowLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.3em] font-body font-semibold" style={{ color: "#54132B" }}>
      {children}
    </p>
  );
}

const features = [
  { title: "Meditaciones diarias", desc: "Nuevas prácticas cada semana para tu proceso somático." },
  { title: "Micro-cursos", desc: "Módulos breves y profundos sobre identidad, emoción y presencia." },
  { title: "Journaling guiado", desc: "Prompts semanales para acompañar tu escritura interior." },
  { title: "Sesiones en vivo", desc: "Llamadas grupales semanales de integración con Liset." },
  { title: "Comunidad privada", desc: "Espacio sagrado de mujeres en proceso de transformación." },
  { title: "Biblioteca en crecimiento", desc: "Acceso a todo el contenido histórico de la plataforma." },
];

export default function EsenciaPage() {
  return (
    <div className="p-12 max-w-3xl">
      <div className="space-y-3 mb-12">
        <EyebrowLabel>Membresía</EyebrowLabel>
        <h1 className="font-display" style={{ fontSize: "clamp(24px, 3vw, 48px)", fontWeight: 300, color: "#000000" }}>
          ESENCIA
        </h1>
        <p className="font-display italic text-lg" style={{ color: "#928178", fontWeight: 300 }}>
          Plataforma digital de autosanación guiada.
        </p>
      </div>

      {/* Membership CTA */}
      <div
        className="p-10 space-y-6 mb-10 border-l-2"
        style={{ borderColor: "#54132B", backgroundColor: "#F4E7E9", borderRadius: "2px" }}
      >
        <div>
          <p className="font-display text-4xl" style={{ color: "#000000", fontWeight: 300 }}>$49</p>
          <p className="text-sm font-body" style={{ color: "#928178" }}>por mes · cancela cuando quieras</p>
        </div>
        <p className="font-body text-sm leading-relaxed" style={{ color: "#000000", opacity: 0.85 }}>
          Una compañera digital diaria que te ofrece prácticas somáticas guiadas, herramientas
          de journaling y una comunidad de mujeres en proceso de transformación consciente.
        </p>
        <Link
          href="/contacto"
          className="inline-block px-8 py-4 text-sm font-body font-medium tracking-[0.08em] transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#54132B", color: "#F9F4F1", borderRadius: "2px" }}
        >
          Activar membresía ESENCIA
        </Link>
      </div>

      {/* Features */}
      <div className="grid sm:grid-cols-2 gap-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="p-6 space-y-2 border"
            style={{
              borderColor: "rgba(146,129,120,0.25)",
              borderRadius: "2px",
              backgroundColor: "#F9F4F1",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="w-3 h-px" style={{ backgroundColor: "#54132B", display: "inline-block" }} />
              <h4 className="text-sm font-body font-semibold uppercase tracking-[0.1em]" style={{ color: "#000000" }}>
                {f.title}
              </h4>
            </div>
            <p className="text-sm font-body leading-relaxed" style={{ color: "#928178" }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
