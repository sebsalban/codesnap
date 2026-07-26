"use client";

import { useSnap } from "@/hooks/useSnap";
import { PRESETS } from "@/lib/constants/presets";
import { getTheme } from "@/lib/constants/themes";
import { getBackgroundCss } from "@/lib/constants/backgrounds";

export default function PresetsBar() {
  const snap = useSnap();

  return (
    <div style={{ borderTop: "1px solid var(--border)", background: "var(--bg-base)", padding: "18px 56px 22px" }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          color: "var(--text-secondary)",
          marginBottom: 12,
        }}
      >
        Presets
      </div>
      <div style={{ display: "flex", gap: 14 }}>
        {PRESETS.map((preset) => {
          const theme = getTheme(preset.theme);
          const active = preset.theme === snap.theme && preset.background === snap.background;
          const line = (width, color) => ({ height: 3, width, borderRadius: 2, background: color });
          return (
            <div
              key={preset.id}
              onClick={() => snap.applyPreset(preset)}
              style={{
                flex: 1,
                cursor: "pointer",
                border: active ? "2px solid var(--accent)" : "2px solid var(--border)",
                borderRadius: 12,
                padding: 10,
                background: "var(--bg-surface)",
                transition: "border-color 200ms var(--ease)",
              }}
            >
              <div style={{ background: getBackgroundCss(preset.background), borderRadius: 8, padding: 12 }}>
                <div
                  style={{
                    background: theme.bg,
                    borderRadius: 5,
                    padding: "8px 10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                  }}
                >
                  <div style={line("52%", theme.c.kw)} />
                  <div style={line("76%", theme.c.str)} />
                  <div style={line("38%", theme.c.fn)} />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                <span style={{ fontSize: 13, color: "var(--text-primary)" }}>{preset.name}</span>
                <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>{preset.sub}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
