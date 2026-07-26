"use client";

export default function Slider({ label, value, min, max, step = 1, onChange, unit = "px" }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
        <span>{label}</span>
        <span style={{ fontFamily: "var(--font-fira-code), monospace", color: "var(--text-secondary)" }}>
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%" }}
      />
    </div>
  );
}
