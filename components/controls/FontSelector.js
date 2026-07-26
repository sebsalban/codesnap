"use client";

import { useEffect, useRef, useState } from "react";
import { useSnap } from "@/hooks/useSnap";
import { FONTS, getFont } from "@/lib/constants/fonts";

export default function FontSelector() {
  const { font, update } = useSnap();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const active = getFont(font);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <div ref={rootRef} style={{ position: "relative" }}>
      <div
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          padding: "9px 12px",
          cursor: "pointer",
        }}
      >
        <span style={{ fontSize: 13, fontFamily: active.family }}>{active.label}</span>
        <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>▾</span>
      </div>

      {open && (
        <div
          style={{
            position: "absolute",
            zIndex: 20,
            top: 44,
            left: 0,
            right: 0,
            background: "var(--bg-surface)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 12px 32px rgba(0,0,0,.6)",
          }}
        >
          {FONTS.map((f, i) => (
            <div
              key={f.id}
              onClick={() => {
                update({ font: f.id });
                setOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 12px",
                cursor: "pointer",
                fontSize: 13,
                color: f.id === font ? "var(--accent)" : "var(--text-primary)",
                borderBottom: i < FONTS.length - 1 ? "1px solid var(--border)" : "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(244,114,182,.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ fontFamily: f.family }}>{f.label}</span>
              <span style={{ fontFamily: f.family, color: "var(--text-secondary)" }}>Aa</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
