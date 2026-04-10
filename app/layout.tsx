import type { Metadata } from "next";
import {
  Syne,
  Instrument_Sans,
  Mynerve,
  Bellefair,
  Playfair_Display,
  DM_Sans,
} from "next/font/google";
import "./globals.css";
import { LangProvider } from "./providers/LangProvider";

/* ──────────────────────────────────────────────────────────
   AUTÉNTICAMENTE — Tipografías
   Polymath Display → placeholder: Syne (variable, geométrica, moderna)
   Instrument Sans  → disponible en Google Fonts ✓
   Mynerve          → disponible en Google Fonts ✓
   ────────────────────────────────────────────────────────── */
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const mynerve = Mynerve({
  variable: "--font-mynerve",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

/* ──────────────────────────────────────────────────────────
   LISET VALENCIA — Tipografías
   Bellefair        → disponible en Google Fonts ✓
   Playfair Display → disponible en Google Fonts ✓
   Creato Display   → placeholder: DM Sans
   Mona Sans        → se carga desde layout de lisetvalencia.com
   ────────────────────────────────────────────────────────── */
const bellefair = Bellefair({
  variable: "--font-bellefair",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://autenticamente-web.vercel.app"),
  title: "AUTÉNTICAMENTE® — Reconecta contigo y activa tu poder interno",
  description:
    "Plataforma de desarrollo humano con conferencias, comunidad, recursos y experiencias para hombres y mujeres que quieren crecer con más conciencia, verdad y dirección. Por Dra. Liset Valencia.",
  keywords: [
    "autenticamente", "desarrollo humano", "crecimiento personal",
    "bienestar emocional", "conferencias transformacion", "Liset Valencia",
    "podcast psicología", "meditaciones", "ebooks autoconocimiento",
  ],
  openGraph: {
    title: "AUTÉNTICAMENTE® — Reconecta contigo y activa tu poder interno",
    description: "Plataforma de desarrollo humano para hombres y mujeres que quieren crecer con más conciencia, verdad y dirección.",
    type: "website",
    url: "https://autenticamente-web.vercel.app",
    siteName: "AUTÉNTICAMENTE®",
    locale: "es_ES",
    images: [
      {
        url: "/images/liset-valencia-hero.jpg",
        width: 1200,
        height: 630,
        alt: "AUTÉNTICAMENTE® — Dra. Liset Valencia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AUTÉNTICAMENTE® — Reconecta contigo y activa tu poder interno",
    description: "Plataforma de desarrollo humano para hombres y mujeres que quieren crecer con más conciencia, verdad y dirección.",
    images: ["/images/liset-valencia-hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`
          ${syne.variable}
          ${instrumentSans.variable}
          ${mynerve.variable}
          ${bellefair.variable}
          ${playfair.variable}
          ${dmSans.variable}
          antialiased
        `}
      >
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
