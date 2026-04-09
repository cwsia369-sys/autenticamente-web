function EyebrowLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.3em] font-body font-semibold" style={{ color: "#54132B" }}>
      {children}
    </p>
  );
}

export default function MisComprasPage() {
  return (
    <div className="p-12 max-w-3xl">
      <div className="space-y-3 mb-12">
        <EyebrowLabel>Dashboard</EyebrowLabel>
        <h1 className="font-display" style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 300, color: "#000000" }}>
          Mis Compras
        </h1>
      </div>

      <div
        className="py-24 text-center space-y-4 border"
        style={{ borderColor: "rgba(146,129,120,0.25)", borderRadius: "2px", color: "#928178" }}
      >
        <p className="font-display text-2xl italic" style={{ fontWeight: 300, color: "#000000" }}>
          Aún no tienes compras registradas.
        </p>
        <p className="font-body text-sm">
          Explora nuestra biblioteca digital y encuentra recursos para tu proceso.
        </p>
        <a
          href="/biblioteca"
          className="inline-block mt-4 px-8 py-3 text-sm font-body font-medium tracking-[0.08em] transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#54132B", color: "#F9F4F1", borderRadius: "2px" }}
        >
          Ir a la Biblioteca
        </a>
      </div>
    </div>
  );
}
