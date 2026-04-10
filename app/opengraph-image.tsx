import { ImageResponse } from "next/og";

export const runtime     = "edge";
export const alt         = "AUTÉNTICAMENTE®";
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
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0A0A0A",
          padding: "80px 100px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "16px",
            color: "#54132B",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "32px",
            fontFamily: "sans-serif",
          }}
        >
          AUTÉNTICAMENTE®
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0px",
          }}
        >
          <div
            style={{
              fontSize: "80px",
              fontFamily: "serif",
              fontWeight: 300,
              color: "#F9F4F1",
              lineHeight: "1.05",
              display: "flex",
            }}
          >
            Reconecta contigo.
          </div>
          <div
            style={{
              fontSize: "80px",
              fontFamily: "serif",
              fontWeight: 300,
              color: "#7A2040",
              lineHeight: "1.05",
              display: "flex",
              fontStyle: "italic",
            }}
          >
            Activa tu poder.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "18px",
            color: "rgba(249,244,241,0.45)",
            fontFamily: "sans-serif",
            marginTop: "36px",
            maxWidth: "600px",
            lineHeight: "1.5",
          }}
        >
          Plataforma de desarrollo humano por Dra. Liset Valencia
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "13px",
            color: "rgba(249,244,241,0.25)",
            fontFamily: "sans-serif",
            marginTop: "48px",
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}
        >
          autenticamente.com
        </div>
      </div>
    ),
    { ...size }
  );
}
