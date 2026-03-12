import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "HABUSH LABS — App & Marketing Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "14px", color: "#C4581A", fontFamily: "monospace" }}>
            {">"} HABUSH LABS
          </div>
          <div style={{ fontSize: "96px", fontWeight: 700, color: "#c8c8c8", fontFamily: "monospace", lineHeight: 1 }}>
            APP {"&"} MARKETING
          </div>
          <div style={{ fontSize: "96px", fontWeight: 700, color: "#484848", fontFamily: "monospace", lineHeight: 1 }}>
            STUDIO
          </div>
          <div style={{ display: "flex", gap: "48px", marginTop: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "#C4581A", fontFamily: "monospace" }}>$5M+</div>
              <div style={{ fontSize: "12px", color: "#484848", fontFamily: "monospace" }}>REVENUE GENERATED</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "#C4581A", fontFamily: "monospace" }}>50M+</div>
              <div style={{ fontSize: "12px", color: "#484848", fontFamily: "monospace" }}>VIEWS DRIVEN</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "#C4581A", fontFamily: "monospace" }}>10+</div>
              <div style={{ fontSize: "12px", color: "#484848", fontFamily: "monospace" }}>PRODUCTS LAUNCHED</div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
