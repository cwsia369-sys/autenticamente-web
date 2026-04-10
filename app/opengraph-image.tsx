import { ImageResponse } from "next/og";

export const runtime     = "edge";
export const alt         = "AUTÉNTICAMENTE® — Reconecta contigo y activa tu poder interno";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0A0A0A",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial glow — burgundy center */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 80% 70% at 50% 60%, rgba(84,19,43,0.5) 0%, transparent 65%)",
            display: "flex",
          }}
        />

        {/* Left accent bar */}
        <div
          style={{
            position: "absolute",
            left: 72,
            top: 0,
            bottom: 0,
            width: 1,
            backgroundColor: "rgba(84,19,43,0.6)",
            display: "flex",
          }}
        />

        {/* Top line */}
        <div
          style={{
            position: "absolute",
            top: 72,
            left: 0,
            right: 0,
            height: 1,
            backgroundColor: "rgba(146,129,120,0.12)",
            display: "flex",
          }}
        />

        {/* Bottom line */}
        <div
          style={{
            position: "absolute",
            bottom: 72,
            left: 0,
            right: 0,
            height: 1,
            backgroundColor: "rgba(146,129,120,0.12)",
            display: "flex",
          }}
        />

        {/* Large A watermark */}
        <div
          style={{
            position: "absolute",
            right: -60,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 520,
            fontFamily: "serif",
            fontWeight: 300,
            color: "rgba(84,19,43,0.07)",
            lineHeight: 1,
            display: "flex",
          }}
        >
          A
        </div>

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "72px 100px 72px 116px",
          }}
        >
          {/* Top — domain */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#54132B", display: "flex" }} />
            <span style={{
              fontFamily: "sans-serif",
              fontSize: 12,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(249,244,241,0.35)",
            }}>
              autenticamente.com
            </span>
          </div>

          {/* Middle */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Brand */}
            <div style={{
              fontFamily: "serif",
              fontSize: 18,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#54132B",
            }}>
              AUTÉNTICAMENTE®
            </div>

            {/* Headline */}
            <div style={{
              fontFamily: "serif",
              fontSize: 68,
              fontWeight: 300,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "#F9F4F1",
              display: "flex",
              flexDirection: "column",
            }}>
              <span>Reconecta contigo.</span>
              <span style={{ color: "#7A2040", fontStyle: "italic" }}>Activa tu poder interno.</span>
            </div>

            {/* Tagline */}
            <div style={{
              fontFamily: "sans-serif",
              fontSize: 17,
              lineHeight: 1.55,
              color: "rgba(249,244,241,0.45)",
              maxWidth: 580,
            }}>
              Plataforma de desarrollo humano — conferencias, podcast, devocionales y recursos. Por Dra. Liset Valencia.
            </div>
          </div>

          {/* Bottom — categories */}
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <span style={{ fontFamily: "sans-serif", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(249,244,241,0.3)" }}>Conferencias</span>
            <div style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: "rgba(146,129,120,0.35)", display: "flex" }} />
            <span style={{ fontFamily: "sans-serif", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(249,244,241,0.3)" }}>Podcast</span>
            <div style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: "rgba(146,129,120,0.35)", display: "flex" }} />
            <span style={{ fontFamily: "sans-serif", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(249,244,241,0.3)" }}>Devocionales</span>
            <div style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: "rgba(146,129,120,0.35)", display: "flex" }} />
            <span style={{ fontFamily: "sans-serif", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(249,244,241,0.3)" }}>Biblioteca</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
