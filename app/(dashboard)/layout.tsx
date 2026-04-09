"use client";
import Image from "next/image";
import Link from "next/link";

const sideLinks = [
  { label: "Inicio", href: "/dashboard" },
  { label: "Mis Compras", href: "/dashboard/mis-compras" },
  { label: "Sesiones", href: "/dashboard/sesiones" },
  { label: "ESENCIA", href: "/dashboard/esencia" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F9F4F1" }}>
      {/* Sidebar */}
      <aside
        className="w-64 shrink-0 border-r flex flex-col py-10 px-8"
        style={{ backgroundColor: "#F4E7E9", borderColor: "rgba(146,129,120,0.3)" }}
      >
        <Link href="/" className="flex items-center mb-12" aria-label="AuténticaMente — inicio">
          <Image
            src="/logos/am-wordmark-black.svg"
            alt="AuténticaMente®"
            width={150}
            height={53}
            style={{ height: "24px", width: "auto", opacity: 0.7 }}
          />
        </Link>

        <nav className="space-y-1 flex-1">
          {sideLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block px-4 py-3 text-sm font-body tracking-wide transition-colors"
              style={{ color: "#928178", borderRadius: "2px" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(84,19,43,0.1)";
                e.currentTarget.style.color = "#54132B";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#928178";
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t" style={{ borderColor: "rgba(146,129,120,0.3)" }}>
          <Link
            href="/"
            className="text-xs font-body uppercase tracking-[0.15em] transition-colors"
            style={{ color: "#928178" }}
          >
            ← Volver al sitio
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
