"use client";

import { useSnap } from "@/hooks/useSnap";

export default function WindowStylePicker() {
  const { windowStyle, update } = useSnap();

  const card = (id) => ({
    cursor: "pointer",
    background: "var(--bg-surface)",
    border: windowStyle === id ? "2px solid var(--accent)" : "1px solid var(--border)",
    // Keep the box the same size whether the border is 1px or 2px.
    padding: windowStyle === id ? 9 : 10,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
    transition: "border-color 200ms var(--ease)",
  });

  const dot = (color) => ({ width: 7, height: 7, borderRadius: 999, background: color });

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
      <div onClick={() => update({ windowStyle: "mac" })} style={card("mac")}>
        <div style={{ display: "flex", gap: 4, alignSelf: "flex-start" }}>
          <div style={dot("#FF5F57")} />
          <div style={dot("#FEBC2E")} />
          <div style={dot("#28C840")} />
        </div>
        <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>Mac</div>
      </div>

      <div onClick={() => update({ windowStyle: "win" })} style={card("win")}>
        <div style={{ display: "flex", gap: 4, alignSelf: "flex-end" }}>
          <div style={{ width: 7, height: 7, background: "#94A3B8" }} />
          <div style={{ width: 7, height: 7, background: "#94A3B8" }} />
          <div style={{ width: 7, height: 7, background: "#94A3B8" }} />
        </div>
        <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>Windows</div>
      </div>

      <div onClick={() => update({ windowStyle: "none" })} style={card("none")}>
        <div style={{ height: 7, width: 22, borderRadius: 2, background: "var(--border)" }} />
        <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>None</div>
      </div>
    </div>
  );
}
