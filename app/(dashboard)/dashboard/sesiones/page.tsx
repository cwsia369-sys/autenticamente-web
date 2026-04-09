function EyebrowLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.3em] font-body font-semibold" style={{ color: "#54132B" }}>
      {children}
    </p>
  );
}

const placeholderSessions = [
  { title: "Meditación de apertura", duration: "10 min", type: "Meditación", locked: false },
  { title: "Regulación somática básica", duration: "20 min", type: "Meditación", locked: true },
  { title: "Integración de sombras — Parte I", duration: "45 min", type: "Sesión grabada", locked: true },
];

export default function SesionesPage() {
  return (
    <div className="p-12 max-w-3xl">
      <div className="space-y-3 mb-12">
        <EyebrowLabel>Dashboard</EyebrowLabel>
        <h1 className="font-display" style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 300, color: "#000000" }}>
          Sesiones
        </h1>
      </div>

      <div className="space-y-4">
        {placeholderSessions.map((s) => (
          <div
            key={s.title}
            className="flex items-center justify-between p-8 border"
            style={{
              backgroundColor: s.locked ? "rgba(234,226,218,0.5)" : "#F4E7E9",
              borderColor: "rgba(146,129,120,0.25)",
              borderRadius: "2px",
              opacity: s.locked ? 0.6 : 1,
            }}
          >
            <div className="space-y-1">
              <p className="text-xs font-body uppercase tracking-[0.12em]" style={{ color: "#54132B" }}>{s.type}</p>
              <h3 className="font-display text-lg" style={{ color: "#000000", fontWeight: 300 }}>{s.title}</h3>
              <p className="text-xs font-body" style={{ color: "#928178" }}>{s.duration}</p>
            </div>
            <button
              className="px-5 py-2.5 text-xs font-body uppercase tracking-[0.1em] border transition-opacity disabled:cursor-not-allowed"
              style={{
                borderColor: s.locked ? "rgba(146,129,120,0.3)" : "#54132B",
                color: s.locked ? "#928178" : "#54132B",
                borderRadius: "2px",
              }}
              disabled={s.locked}
            >
              {s.locked ? "Bloqueado" : "Reproducir"}
            </button>
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs font-body" style={{ color: "#928178" }}>
        Las sesiones bloqueadas se desbloquean al adquirir un programa o membresía ESENCIA.
      </p>
    </div>
  );
}
