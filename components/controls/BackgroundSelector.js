"use client";

import { useSnap } from "@/hooks/useSnap";
import { BACKGROUNDS } from "@/lib/constants/backgrounds";

export default function BackgroundSelector() {
  const { background, customColor, update } = useSnap();
  const customActive = background === "custom";

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      {BACKGROUNDS.map((bg) => {
        const active = bg.id === background;
        return (
          <div
            key={bg.id}
            title={bg.label}
            onClick={() => update({ background: bg.id })}
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: bg.css,
              cursor: "pointer",
              boxShadow: active ? "0 0 0 2px #F1F5F9" : "0 0 0 1px var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              color: "#fff",
              textShadow: "0 1px 3px rgba(0,0,0,.6)",
              transition: "box-shadow 200ms var(--ease)",
            }}
          >
            {active ? "✓" : ""}
          </div>
        );
      })}

      {/* Custom color — the hidden input opens the native picker. */}
      <label
        title="Custom color"
        style={{
          position: "relative",
          width: 40,
          height: 40,
          borderRadius: 8,
          border: customActive ? "none" : "1px dashed var(--border)",
          background: customActive ? customColor : "transparent",
          boxShadow: customActive ? "0 0 0 2px #F1F5F9" : "none",
          color: customActive ? "#fff" : "var(--text-secondary)",
          textShadow: customActive ? "0 1px 3px rgba(0,0,0,.6)" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: customActive ? 13 : 16,
          cursor: "pointer",
          boxSizing: "border-box",
          transition: "box-shadow 200ms var(--ease)",
        }}
      >
        {customActive ? "✓" : "+"}
        <input
          type="color"
          value={customColor}
          onChange={(e) => update({ background: "custom", customColor: e.target.value })}
          style={{ position: "absolute", inset: 0, opacity: 0, width: "100%", height: "100%", cursor: "pointer" }}
        />
      </label>
    </div>
  );
}
