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
        {/* Grid lines */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.08 }}
        >
          {[0,1,2,3,4,5,6,7,8,9,10,11,12].map((i) => (
            <line
              key={`v${i}`}
              x1={`${(i / 12) * 100}%`} y1="0"
              x2={`${(i / 12) * 100}%`} y2="100%"
              stroke="#928178" strokeWidth="0.8"
            />
          ))}
          {[0,1,2,3,4,5,6].map((i) => (
            <line
              key={`h${i}`}
              x1="0" y1={`${(i / 6) * 100}%`}
              x2="100%" y2={`${(i / 6) * 100}%`}
              stroke="#928178" strokeWidth="0.8"
            />
          ))}
        </svg>

        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(84,19,43,0.45) 0%, transparent 70%)",
          }}
        />

        {/* Left accent line */}
        <div
          style={{
            position: "absolute",
            left: 72,
            top: 0,
            bottom: 0,
            width: 1,
            backgroundColor: "rgba(84,19,43,0.5)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "72px 96px 72px 112px",
          }}
        >
          {/* Top — eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#54132B" }} />
            <span style={{
              fontFamily: "sans-serif",
              fontSize: 13,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(249,244,241,0.4)",
            }}>
              autenticamente.com
            </span>
          </div>

          {/* Middle — main content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {/* Wordmark */}
            <div style={{
              fontFamily: "serif",
              fontSize: 20,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#54132B",
            }}>
              AUTÉNTICAMENTE®
            </div>

            {/* Headline */}
            <div style={{
              fontFamily: "serif",
              fontSize: 72,
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#F9F4F1",
            }}>
              Reconecta contigo.<br />
              <span style={{ color: "#54132B", fontStyle: "italic" }}>
                Activa tu poder interno.
              </span>
            </div>

            {/* Tagline */}
            <div style={{
              fontFamily: "sans-serif",
              fontSize: 18,
              lineHeight: 1.6,
              color: "rgba(249,244,241,0.5)",
              maxWidth: 640,
            }}>
              Plataforma de desarrollo humano con conferencias, podcast, devocionales y recursos — por Dra. Liset Valencia
            </div>
          </div>

          {/* Bottom — meta */}
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {["Conferencias", "Podcast", "Devocionales", "Biblioteca"].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {i > 0 && (
                  <div style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: "rgba(146,129,120,0.4)" }} />
                )}
                <span style={{
                  fontFamily: "sans-serif",
                  fontSize: 12,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(249,244,241,0.35)",
                }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right decorative element — large watermark */}
        <div style={{
          position: "absolute",
          right: -40,
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "serif",
          fontSize: 420,
          fontWeight: 300,
          color: "rgba(84,19,43,0.06)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}>
          A
        </div>
      </div>
    ),
    { ...size }
  );
}
