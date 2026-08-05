"use client";

import { Check, Download, LoaderCircle } from "lucide-react";

const LABELS = {
  idle: { text: "Download PNG", Icon: Download, bg: "var(--accent)", anim: "none" },
  loading: { text: "Rendering…", Icon: LoaderCircle, bg: "var(--accent)", anim: "csSpin 900ms linear infinite" },
  done: { text: "Saved to downloads", Icon: Check, bg: "var(--success)", anim: "none" },
};

export default function ExportButton({ status, onClick }) {
  const { text, Icon, bg, anim } = LABELS[status] || LABELS.idle;

  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        border: "none",
        cursor: "pointer",
        fontFamily: "var(--font-body)",
        fontSize: 15,
        fontWeight: 600,
        color: "#fff",
        background: bg,
        borderRadius: 6,
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        transition: "background 200ms var(--ease)",
      }}
      onMouseEnter={(e) => {
        if (status === "idle") e.currentTarget.style.background = "var(--accent-hover)";
      }}
      onMouseLeave={(e) => {
        if (status === "idle") e.currentTarget.style.background = "var(--accent)";
      }}
    >
      <Icon size={16} aria-hidden style={{ animation: anim, flexShrink: 0 }} />
      {text}
    </button>
  );
}
