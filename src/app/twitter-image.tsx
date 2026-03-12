import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "HABUSH LABS — App & Marketing Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050505",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle radial glow */}
        <div
          style={{
            position: "absolute",
            width: "800px",
            height: "800px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(196,88,26,0.1) 0%, rgba(196,88,26,0.03) 40%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background:
              "linear-gradient(90deg, transparent, #C4581A, #7A2E2E, transparent)",
          }}
        />

        {/* Main text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: "80px",
              fontWeight: 700,
              color: "#c8c8c8",
              letterSpacing: "-2px",
              fontFamily: "monospace",
            }}
          >
            HABUSH LABS
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#484848",
              letterSpacing: "8px",
              fontFamily: "monospace",
            }}
          >
            APP & MARKETING STUDIO
          </div>
        </div>

        {/* Bottom accent dot row */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#C4581A",
            }}
          />
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#7A2E2E",
            }}
          />
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#C4581A",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
