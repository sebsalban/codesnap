"use client";

import ControlPanel from "@/components/editor/ControlPanel";

// Two-column shell shared by the editor and history screens: fixed 380px
// control panel on the left, screen content on the right.
export default function AppShell({ children }) {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "var(--bg-base)",
        color: "var(--text-primary)",
      }}
    >
      <ControlPanel />
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>{children}</div>
    </div>
  );
}
