"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { getTheme } from "@/lib/constants/themes";
import { getBackgroundCss } from "@/lib/constants/backgrounds";

// Static teaser combos shown inside the modal (mirrors the history grid).
const TEASERS = [
  { background: "indigo", theme: "github-dark" },
  { background: "sunset", theme: "dracula" },
  { background: "graphite", theme: "gruvbox" },
  { background: "daylight", theme: "github-light" },
  { background: "night", theme: "tokyo-night" },
  { background: "candy", theme: "catppuccin" },
];

export default function AuthModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            background: "rgba(10,10,15,.82)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 440,
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: 32,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 32,
                fontWeight: 600,
                letterSpacing: "-0.5px",
                lineHeight: 1.15,
              }}
            >
              Save your snaps.
            </div>
            <div style={{ fontSize: 18, color: "var(--text-secondary)", marginTop: 8 }}>Access them anywhere.</div>

            <div
              style={{
                marginTop: 24,
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: 14,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 8,
                background: "var(--bg-base)",
              }}
            >
              {TEASERS.map((t, i) => (
                <div
                  key={i}
                  style={{
                    height: 42,
                    borderRadius: 5,
                    background: getBackgroundCss(t.background),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: "70%", height: "60%", borderRadius: 3, background: getTheme(t.theme).bg }} />
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24 }}>
              <Link
                href="/register"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  textAlign: "center",
                  background: "var(--accent)",
                  color: "#fff",
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  fontWeight: 600,
                  padding: "13px 24px",
                  borderRadius: 6,
                  transition: "background 200ms var(--ease)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
              >
                Create free account
              </Link>
              <Link
                href="/login"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  textAlign: "center",
                  background: "transparent",
                  color: "var(--accent)",
                  border: "1px solid var(--accent)",
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  fontWeight: 500,
                  padding: "12px 24px",
                  borderRadius: 6,
                  transition: "background 200ms var(--ease)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-soft)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                Sign in
              </Link>
            </div>

            <div
              onClick={onClose}
              style={{
                textAlign: "center",
                fontSize: 13,
                color: "var(--text-secondary)",
                marginTop: 16,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              Maybe later
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
