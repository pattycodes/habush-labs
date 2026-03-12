import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "HABUSH LABS — App & Marketing Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
          {/* Label */}
          <div style={{ fontSize: "14px", color: "#C4581A", fontFamily: "monospace" }}>
            {">"} HABUSH LABS
          </div>

          {/* Line 1 */}
          <div
            style={{
              fontSize: "96px",
              fontWeight: 700,
              color: "#c8c8c8",
              fontFamily: "monospace",
              lineHeight: 1,
            }}
          >
            APP {"&"} MARKETING
          </div>

          {/* Line 2 */}
          <div
            style={{
              fontSize: "96px",
              fontWeight: 700,
              color: "#484848",
              fontFamily: "monospace",
              lineHeight: 1,
              marginTop: "-8px",
            }}
          >
            STUDIO
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "48px", marginTop: "16px" }}>
            {[
              { value: "$5M+", label: "REVENUE GENERATED" },
              { value: "50M+", label: "VIEWS DRIVEN" },
              { value: "10+", label: "PRODUCTS LAUNCHED" },
            ].map((stat) => (
              <div key={stat.label} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "#C4581A", fontFamily: "monospace" }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "12px", color: "#484848", fontFamily: "monospace" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
