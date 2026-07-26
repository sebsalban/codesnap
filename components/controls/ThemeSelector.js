"use client";

import { useSnap } from "@/hooks/useSnap";
import { THEMES } from "@/lib/constants/themes";

export default function ThemeSelector() {
  const { theme: activeId, update } = useSnap();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 12,
        maxHeight: 250,
        overflowY: "auto",
        paddingRight: 4,
      }}
    >
      {THEMES.map((theme) => {
        const active = theme.id === activeId;
        const line = (width, color) => ({ height: 4, width, borderRadius: 2, background: color });
        return (
          <div key={theme.id} onClick={() => update({ theme: theme.id })} style={{ cursor: "pointer" }}>
            <div
              style={{
                height: 50,
                borderRadius: 8,
                border: active ? "2px solid var(--accent)" : "2px solid var(--border)",
                background: theme.bg,
                padding: "10px 12px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                gap: 6,
                justifyContent: "center",
                transition: "border-color 200ms var(--ease)",
              }}
            >
              <div style={line("56%", theme.c.kw)} />
              <div style={line("78%", theme.c.str)} />
              <div style={line("40%", theme.c.fn)} />
            </div>
            <div style={{ fontSize: 11, marginTop: 6, color: active ? "var(--text-primary)" : "var(--text-secondary)" }}>
              {theme.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
