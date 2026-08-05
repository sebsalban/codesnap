"use client";

import { useEffect, useRef, useState } from "react";
import { useSnap } from "@/hooks/useSnap";
import { getFont } from "@/lib/constants/fonts";
import { CODE_WARN_LENGTH, MAX_CODE_LENGTH } from "@/lib/constants/limits";

const PLACEHOLDER = `const greeting = (name) => {
  const message = \`Hello, \${name}!\`;
  console.log(message);
  return message;
};`;

export default function CodeEditor() {
  const { code, font, update } = useSnap();
  const [focus, setFocus] = useState(false);
  const ref = useRef(null);

  // Auto-grow with the content.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(el.scrollHeight, 132)}px`;
  }, [code]);

  const handleKeyDown = (e) => {
    if (e.key !== "Tab") return;
    e.preventDefault();
    const el = e.target;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const next = `${code.substring(0, start)}  ${code.substring(end)}`;
    if (next.length > MAX_CODE_LENGTH) return; // maxLength only covers typing/paste
    update({ code: next });
    requestAnimationFrame(() => {
      el.selectionStart = el.selectionEnd = start + 2;
    });
  };

  return (
    <>
    <textarea
      ref={ref}
      value={code}
      onChange={(e) => update({ code: e.target.value })}
      onKeyDown={handleKeyDown}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      spellCheck={false}
      maxLength={MAX_CODE_LENGTH}
      placeholder={PLACEHOLDER}
      style={{
        width: "100%",
        boxSizing: "border-box",
        minHeight: 132,
        resize: "vertical",
        border: focus ? "1px solid var(--accent-border)" : "1px solid transparent",
        background: "var(--bg-surface)",
        borderRadius: 8,
        padding: 14,
        color: "var(--text-primary)",
        fontFamily: getFont(font).family,
        fontSize: 12.5,
        lineHeight: 1.7,
        outline: "none",
        transition: "border-color 200ms var(--ease)",
      }}
    />
    {code.length >= CODE_WARN_LENGTH && (
      <div style={{ fontSize: 12, color: "var(--warning)", marginTop: 6, lineHeight: 1.5 }}>
        Long snippets slow down highlighting and export —{" "}
        {code.length.toLocaleString()} / {MAX_CODE_LENGTH.toLocaleString()} characters.
      </div>
    )}
    </>
  );
}
