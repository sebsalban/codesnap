"use client";

import { AnimatePresence, motion } from "framer-motion";

// Small in-app dialog (same overlay/card pattern as AuthModal). Replaces
// the native window.prompt/confirm/alert flows so save/delete keep the
// app's look instead of dropping to browser chrome.

const VARIANTS = {
  primary: { background: "var(--accent)", color: "#fff", border: "none" },
  danger: { background: "var(--danger)", color: "#fff", border: "none" },
  ghost: {
    background: "transparent",
    color: "var(--text-secondary)",
    border: "1px solid var(--border)",
  },
};

export function DialogButton({ variant = "primary", disabled, children, ...props }) {
  return (
    <button
      disabled={disabled}
      {...props}
      style={{
        flex: 1,
        fontFamily: "var(--font-body)",
        fontSize: 14,
        fontWeight: 600,
        padding: "11px 18px",
        borderRadius: 6,
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.6 : 1,
        transition: "opacity 200ms var(--ease), filter 200ms var(--ease)",
        ...VARIANTS[variant],
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.filter = "brightness(1.1)";
      }}
      onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
    >
      {children}
    </button>
  );
}

export default function Dialog({ open, onClose, title, body, error, children }) {
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
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 400,
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: 28,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: "-0.3px",
                lineHeight: 1.2,
              }}
            >
              {title}
            </div>
            {body && (
              <div style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 8, lineHeight: 1.6 }}>
                {body}
              </div>
            )}
            {children}
            {error && (
              <div style={{ fontSize: 13, color: "var(--danger)", marginTop: 12, lineHeight: 1.5 }}>{error}</div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
