"use client";

import { useState } from "react";
import { Bookmark, Check } from "lucide-react";
import { useSnap } from "@/hooks/useSnap";
import { useUser } from "@/hooks/useUser";
import AuthModal from "@/components/ui/AuthModal";
import Dialog, { DialogButton } from "@/components/ui/Dialog";

export default function SaveButton() {
  const snap = useSnap();
  const { user, supabase } = useUser();
  const [authOpen, setAuthOpen] = useState(false);
  const [titleOpen, setTitleOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | saving | saved

  const openSaveDialog = () => {
    if (!supabase || !user) {
      setAuthOpen(true);
      return;
    }
    if (status !== "idle") return;
    setTitle("");
    setError(null);
    setTitleOpen(true);
  };

  const save = async () => {
    if (status === "saving") return;
    setStatus("saving");
    setError(null);
    const { error: saveError } = await supabase.from("snaps").insert({
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
    if (saveError) {
      console.error("Save failed", saveError);
      setError(`Could not save snap: ${saveError.message}`);
      setStatus("idle");
      return;
    }
    setTitleOpen(false);
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 1800);
  };

  return (
    <>
      <button
        onClick={openSaveDialog}
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
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          transition: "color 200ms var(--ease)",
        }}
        onMouseEnter={(e) => {
          if (status === "idle") e.currentTarget.style.color = "var(--text-primary)";
        }}
        onMouseLeave={(e) => {
          if (status === "idle") e.currentTarget.style.color = "var(--text-secondary)";
        }}
      >
        {status === "saved" ? <Check size={15} aria-hidden /> : <Bookmark size={15} aria-hidden />}
        {status === "saving" ? "Saving…" : status === "saved" ? "Saved" : "Save snap"}
      </button>

      <Dialog
        open={titleOpen}
        onClose={() => status !== "saving" && setTitleOpen(false)}
        title="Save this snap"
        body="Give it a name so it's easy to find in your history (optional)."
        error={error}
      >
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
          }}
          placeholder="Untitled snap"
          maxLength={120}
          style={{
            width: "100%",
            boxSizing: "border-box",
            marginTop: 18,
            background: "var(--bg-base)",
            border: "1px solid var(--border)",
            borderRadius: 6,
            padding: "11px 12px",
            color: "var(--text-primary)",
            fontFamily: "var(--font-body)",
            fontSize: 14,
            outline: "none",
            transition: "border-color 200ms var(--ease)",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent-border)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        />
        <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
          <DialogButton variant="ghost" disabled={status === "saving"} onClick={() => setTitleOpen(false)}>
            Cancel
          </DialogButton>
          <DialogButton variant="primary" disabled={status === "saving"} onClick={save}>
            {status === "saving" ? "Saving…" : "Save snap"}
          </DialogButton>
        </div>
      </Dialog>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
