"use client";

import { useSnap } from "@/hooks/useSnap";
import { LANGUAGES } from "@/lib/constants/languages";

export default function LanguageSelector() {
  const { language, update } = useSnap();

  return (
    <div style={{ position: "relative", flex: 1 }}>
      <select
        value={language}
        onChange={(e) => update({ language: e.target.value })}
        style={{
          width: "100%",
          appearance: "none",
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          padding: "9px 12px",
          color: "var(--text-primary)",
          fontFamily: "var(--font-body)",
          fontSize: 13,
          outline: "none",
          cursor: "pointer",
        }}
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.id} value={lang.id}>
            {lang.label}
          </option>
        ))}
      </select>
      <span
        style={{
          position: "absolute",
          right: 12,
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          fontSize: 11,
          color: "var(--text-secondary)",
        }}
      >
        ▾
      </span>
    </div>
  );
}
