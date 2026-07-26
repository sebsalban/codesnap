"use client";

export default function WindowFrame({ windowStyle, glyphColor }) {
  if (windowStyle === "mac") {
    return (
      <div style={{ display: "flex", gap: 8, padding: "14px 16px" }}>
        <div style={{ width: 12, height: 12, borderRadius: 999, background: "#FF5F57" }} />
        <div style={{ width: 12, height: 12, borderRadius: 999, background: "#FEBC2E" }} />
        <div style={{ width: 12, height: 12, borderRadius: 999, background: "#28C840" }} />
      </div>
    );
  }

  if (windowStyle === "win") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", justifyContent: "flex-end" }}>
        <div style={{ width: 11, height: 2, background: glyphColor }} />
        <div style={{ width: 9, height: 9, border: `1.5px solid ${glyphColor}`, boxSizing: "border-box" }} />
        <div style={{ color: glyphColor, fontSize: 11, lineHeight: "9px" }}>✕</div>
      </div>
    );
  }

  return null;
}
