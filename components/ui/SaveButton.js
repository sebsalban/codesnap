"use client";

import { useState } from "react";
import { useSnap } from "@/hooks/useSnap";
import { useUser } from "@/hooks/useUser";
import AuthModal from "@/components/ui/AuthModal";

export default function SaveButton() {
  const snap = useSnap();
  const { user, supabase } = useUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | saving | saved

  const save = async () => {
    if (!supabase || !user) {
      setModalOpen(true);
      return;
    }
    if (status !== "idle") return;
    const title = window.prompt("Name this snap (optional)");
    if (title === null) return; // cancelled
    setStatus("saving");
    const { error } = await supabase.from("snaps").insert({
      user_id: user.id,
      title: title.trim() || null,
      code: snap.code,
      language: snap.language,
      theme: snap.theme,
      background: snap.background,
      custom_color: snap.customColor,
      font: snap.font,
      font_size: snap.fontSize,
      padding: snap.padding,
      border_radius: snap.radius,
      shadow: snap.shadow,
      window_style: snap.windowStyle,
    });
    if (error) {
      console.error("Save failed", error);
      window.alert(`Could not save snap: ${error.message}`);
      setStatus("idle");
      return;
    }
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 1800);
  };

  const label = status === "saving" ? "Saving…" : status === "saved" ? "Saved ✓" : "⌗ Save snap";

  return (
    <>
      <button
        onClick={save}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontFamily: "var(--font-body)",
          fontSize: 15,
          fontWeight: 500,
          color: status === "saved" ? "var(--success)" : "var(--text-secondary)",
          padding: "12px 16px",
          borderRadius: 6,
          whiteSpace: "nowrap",
          transition: "color 200ms var(--ease)",
        }}
        onMouseEnter={(e) => {
          if (status === "idle") e.currentTarget.style.color = "var(--text-primary)";
        }}
        onMouseLeave={(e) => {
          if (status === "idle") e.currentTarget.style.color = "var(--text-secondary)";
        }}
      >
        {label}
      </button>
      <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
