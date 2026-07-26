"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { decodeSnap } from "@/lib/share";

const DEFAULT_CODE = `const greeting = (name) => {
  const message = \`Hello, \${name}!\`;
  console.log(message);
  return message;
};`;

const INITIAL_STATE = {
  code: DEFAULT_CODE,
  language: "javascript",
  theme: "github-dark",
  background: "indigo",
  customColor: "#F472B6",
  font: "fira",
  fontSize: 15,
  padding: 48,
  radius: 12,
  windowStyle: "mac",
  shadow: true,
};

const SnapContext = createContext(null);

export function SnapProvider({ children }) {
  const [state, setState] = useState(INITIAL_STATE);
  // The exportable preview node registers itself here so the export
  // buttons in the control panel can reach it from any page.
  const previewRef = useRef(null);

  const update = useCallback((patch) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);

  // Restore shared state from ?snap= on first load. Runs after hydration
  // (a lazy useState initializer would mismatch the server-rendered HTML),
  // and asynchronously so the effect body itself doesn't set state.
  useEffect(() => {
    const encoded = new URLSearchParams(window.location.search).get("snap");
    if (!encoded) return;
    const decoded = decodeSnap(encoded);
    if (!decoded) return;
    const restore = setTimeout(() => setState((prev) => ({ ...prev, ...decoded })), 0);
    return () => clearTimeout(restore);
  }, []);

  const applyPreset = useCallback(
    (preset) =>
      update({
        theme: preset.theme,
        background: preset.background,
        windowStyle: preset.windowStyle,
        font: preset.font,
      }),
    [update]
  );

  // Loads a saved snap row (from Supabase) into the editor.
  const loadSnap = useCallback(
    (row) =>
      update({
        code: row.code,
        language: row.language,
        theme: row.theme,
        background: row.background,
        customColor: row.custom_color || INITIAL_STATE.customColor,
        font: row.font,
        fontSize: row.font_size ?? INITIAL_STATE.fontSize,
        padding: row.padding ?? INITIAL_STATE.padding,
        radius: row.border_radius ?? INITIAL_STATE.radius,
        shadow: row.shadow ?? INITIAL_STATE.shadow,
        windowStyle: row.window_style || INITIAL_STATE.windowStyle,
      }),
    [update]
  );

  return (
    <SnapContext.Provider value={{ ...state, update, applyPreset, loadSnap, previewRef }}>
      {children}
    </SnapContext.Provider>
  );
}

export const useSnap = () => {
  const ctx = useContext(SnapContext);
  if (!ctx) throw new Error("useSnap must be used within SnapProvider");
  return ctx;
};
