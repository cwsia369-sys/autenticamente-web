import { ImageResponse } from "next/og";

export const size        = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#54132B",
          width:       "100%",
          height:      "100%",
          display:     "flex",
          alignItems:  "center",
          justifyContent: "center",
        }}
      >
        {/* Isotipo AM — onda simplificada sobre fondo burgundy */}
        <svg
          viewBox="0 0 156 100"
          width="52"
          height="33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 80 C20 80 28 20 50 20 C72 20 68 68 80 68 C88 68 92 44 100 32 C108 20 114 44 118 56 C122 68 130 72 140 56 L152 68"
            stroke="#F4E7E9"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
