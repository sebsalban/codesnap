"use client";

const LABELS = {
  idle: { text: "Download PNG", icon: "↓", bg: "var(--accent)", anim: "none" },
  loading: { text: "Rendering…", icon: "◌", bg: "var(--accent)", anim: "csPulse 900ms infinite" },
  done: { text: "Saved to downloads", icon: "✓", bg: "var(--success)", anim: "none" },
};

export default function ExportButton({ status, onClick }) {
  const { text, icon, bg, anim } = LABELS[status] || LABELS.idle;

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
      <span style={{ animation: anim }}>{icon}</span>
      {text}
    </button>
  );
}
