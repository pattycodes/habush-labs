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
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* Orange accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "#C4581A",
          }}
        />

        {/* Subtle grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(196,88,26,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(196,88,26,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative" }}>
          {/* Label */}
          <div
            style={{
              fontSize: "14px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C4581A",
              fontFamily: "monospace",
            }}
          >
            &gt; HABUSH LABS
          </div>

          {/* Main wordmark */}
          <div
            style={{
              fontSize: "96px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "#c8c8c8",
              fontFamily: "monospace",
              lineHeight: 1,
            }}
          >
            APP &amp; MARKETING
            <br />
            <span style={{ color: "#484848" }}>STUDIO</span>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "48px",
              marginTop: "24px",
            }}
          >
            {[
              { value: "$5M+", label: "REVENUE GENERATED" },
              { value: "50M+", label: "VIEWS DRIVEN" },
              { value: "10+", label: "PRODUCTS LAUNCHED" },
            ].map((stat) => (
              <div key={stat.label} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "#C4581A",
                    fontFamily: "monospace",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#484848",
                    fontFamily: "monospace",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
