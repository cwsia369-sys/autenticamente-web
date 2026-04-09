import Link from "next/link";

function EyebrowLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.3em] font-body font-semibold" style={{ color: "#54132B" }}>
      {children}
    </p>
  );
}

const cards = [
  {
    title: "Mis Compras",
    desc: "Accede a tus ebooks, workbooks y masterclasses adquiridos.",
    href: "/dashboard/mis-compras",
    count: "—",
  },
  {
    title: "Sesiones",
    desc: "Meditaciones guiadas y grabaciones de sesiones.",
    href: "/dashboard/sesiones",
    count: "—",
  },
  {
    title: "ESENCIA",
    desc: "Contenido exclusivo de tu membresía activa.",
    href: "/dashboard/esencia",
    count: "Activa",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-12 max-w-3xl">
      <div className="space-y-3 mb-16">
        <EyebrowLabel>Área privada</EyebrowLabel>
        <h1
          className="font-display"
          style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300, color: "#000000" }}
        >
          Bienvenida de vuelta
        </h1>
        <p className="font-body" style={{ color: "#928178" }}>
          Aquí habita tu proceso interior.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="p-8 space-y-3 border group transition-colors"
            style={{
              backgroundColor: "#F4E7E9",
              borderColor: "rgba(146,129,120,0.25)",
              borderRadius: "2px",
            }}
          >
            <div className="flex items-start justify-between">
              <h3 className="font-body font-semibold text-sm uppercase tracking-[0.12em]" style={{ color: "#000000" }}>
                {c.title}
              </h3>
              <span className="text-xs font-body" style={{ color: "#54132B" }}>{c.count}</span>
            </div>
            <p className="text-sm font-body leading-relaxed" style={{ color: "#928178" }}>
              {c.desc}
            </p>
            <span className="inline-block text-xs font-body uppercase tracking-[0.12em] border-b pb-0.5 transition-colors" style={{ color: "#54132B", borderColor: "#54132B" }}>
              Ver →
            </span>
          </Link>
        ))}
      </div>

      <div
        className="mt-12 p-8 border-l-2"
        style={{ borderColor: "#54132B", backgroundColor: "#F4E7E9" }}
      >
        <p className="font-display italic text-xl" style={{ color: "#000000", fontWeight: 300 }}>
          "El trabajo interior no es un destino. Es una forma de habitar la vida."
        </p>
        <p className="mt-3 text-xs font-body uppercase tracking-[0.15em]" style={{ color: "#928178" }}>
          — Dra. Liset Valencia Medina
        </p>
      </div>
    </div>
  );
}
