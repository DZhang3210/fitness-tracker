import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#6366f1",
          borderRadius: 8,
        }}
      >
        {/* Dumbbell */}
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {/* Left plate */}
          <div style={{ width: 7, height: 16, background: "white", borderRadius: 3, opacity: 0.95 }} />
          {/* Bar */}
          <div style={{ width: 10, height: 5, background: "white", opacity: 0.85 }} />
          {/* Right plate */}
          <div style={{ width: 7, height: 16, background: "white", borderRadius: 3, opacity: 0.95 }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
