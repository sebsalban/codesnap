"use client";

import { useEffect, useState } from "react";
import { useSnap } from "@/hooks/useSnap";
import { useExport } from "@/hooks/useExport";
import { getTheme } from "@/lib/constants/themes";
import SnapPreview from "@/components/preview/SnapPreview";
import PresetsBar from "@/components/preview/PresetsBar";

const inlineButton = {
  border: "1px solid var(--border)",
  background: "var(--bg-surface)",
  color: "var(--text-primary)",
  fontFamily: "var(--font-body)",
  fontSize: 13,
  padding: "8px 14px",
  borderRadius: 8,
  cursor: "pointer",
  transition: "border-color 200ms var(--ease)",
};

export default function PreviewArea() {
  const snap = useSnap();
  const theme = getTheme(snap.theme);
  const { exportPng, exportSvg } = useExport();
  const [size, setSize] = useState(null);

  // Real output size (at 3x) shown under the snap.
  useEffect(() => {
    const node = snap.previewRef.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.target.getBoundingClientRect();
      setSize({ w: Math.round(width * 3), h: Math.round(height * 3) });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [snap.previewRef]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--bg-base)",
        backgroundImage: "radial-gradient(#1E1E2E 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 56px",
          minHeight: 0,
          overflow: "auto",
        }}
      >
        <div style={{ margin: "auto" }}>
          <SnapPreview />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 24,
              padding: "0 4px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: 13,
                color: "var(--text-secondary)",
                fontFamily: "var(--font-fira-code), monospace",
              }}
            >
              <span>{size ? `${size.w} × ${size.h} px · 3x` : ""}</span>
              <span style={{ width: 1, height: 12, background: "var(--border)" }} />
              <span>{theme.label}</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={exportPng}
                style={inlineButton}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent-border)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                PNG
              </button>
              <button
                onClick={exportSvg}
                style={inlineButton}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent-border)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                SVG
              </button>
            </div>
          </div>
        </div>
      </div>

      <PresetsBar />
    </div>
  );
}
