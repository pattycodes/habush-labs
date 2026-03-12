import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "HABUSH LABS — App & Marketing Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
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
          backgroundColor: "#0a0a0a",
        }}
      >
        <div style={{ fontSize: "80px", fontWeight: 700, color: "#c8c8c8", fontFamily: "monospace" }}>
          HABUSH LABS
        </div>
        <div style={{ fontSize: "22px", color: "#C4581A", fontFamily: "monospace", marginTop: "16px" }}>
          APP {"&"} MARKETING STUDIO
        </div>
      </div>
    ),
    { ...size }
  );
}
