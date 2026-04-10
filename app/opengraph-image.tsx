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
          width: "1200px",
          height: "630px",
          display: "flex",
          backgroundColor: "#0A0A0A",
        }}
      >
        {/* Background glow layer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            background: "radial-gradient(ellipse 900px 500px at 600px 380px, rgba(84,19,43,0.55) 0%, transparent 70%)",
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
            display: "flex",
            backgroundColor: "rgba(84,19,43,0.55)",
          }}
        />

        {/* Watermark A — top right, no transform */}
        <div
          style={{
            position: "absolute",
            right: -80,
            top: -80,
            display: "flex",
            fontSize: 600,
            fontFamily: "serif",
            fontWeight: 300,
            color: "rgba(84,19,43,0.06)",
            lineHeight: 1,
          }}
        >
          A
        </div>

        {/* Main content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "72px 100px 72px 116px",
          }}
        >
          {/* Top — eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                backgroundColor: "#54132B",
                display: "flex",
              }}
            />
            <div style={{
              fontFamily: "sans-serif",
              fontSize: 12,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(249,244,241,0.35)",
              display: "flex",
            }}>
              autenticamente.com
            </div>
          </div>

          {/* Center — main text */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{
              fontFamily: "serif",
              fontSize: 17,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#54132B",
              display: "flex",
            }}>
              AUTÉNTICAMENTE®
            </div>

            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}>
              <div style={{
                fontFamily: "serif",
                fontSize: 72,
                fontWeight: 300,
                lineHeight: 1.1,
                color: "#F9F4F1",
                display: "flex",
              }}>
                Reconecta contigo.
              </div>
              <div style={{
                fontFamily: "serif",
                fontSize: 72,
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1.1,
                color: "#7A2040",
                display: "flex",
              }}>
                Activa tu poder.
              </div>
            </div>

            <div style={{
              fontFamily: "sans-serif",
              fontSize: 18,
              lineHeight: 1.5,
              color: "rgba(249,244,241,0.42)",
              display: "flex",
              maxWidth: 560,
            }}>
              Plataforma de desarrollo humano — conferencias, podcast, devocionales y recursos. Por Dra. Liset Valencia.
            </div>
          </div>

          {/* Bottom — tags */}
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ fontFamily: "sans-serif", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(249,244,241,0.28)", display: "flex" }}>Conferencias</div>
            <div style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: "rgba(146,129,120,0.4)", display: "flex" }} />
            <div style={{ fontFamily: "sans-serif", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(249,244,241,0.28)", display: "flex" }}>Podcast</div>
            <div style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: "rgba(146,129,120,0.4)", display: "flex" }} />
            <div style={{ fontFamily: "sans-serif", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(249,244,241,0.28)", display: "flex" }}>Devocionales</div>
            <div style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: "rgba(146,129,120,0.4)", display: "flex" }} />
            <div style={{ fontFamily: "sans-serif", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(249,244,241,0.28)", display: "flex" }}>Biblioteca</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
