"use client";

import { useSnap } from "@/hooks/useSnap";
import { useHighlighter } from "@/hooks/useHighlighter";
import { getTheme } from "@/lib/constants/themes";
import { getFont } from "@/lib/constants/fonts";

function EmptyPlaceholder() {
  const bar = (width, opacity) => ({
    height: 9,
    width,
    borderRadius: 3,
    background: `rgba(148,163,184,${opacity})`,
  });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 420, padding: "8px 0" }}>
      <div style={bar("62%", 0.16)} />
      <div style={bar("84%", 0.12)} />
      <div style={bar("46%", 0.16)} />
      <div style={bar("70%", 0.1)} />
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 13,
          color: "rgba(148,163,184,.7)",
          whiteSpace: "normal",
          marginTop: 6,
        }}
      >
        Paste your code on the left to see it come alive.
      </div>
    </div>
  );
}

export default function CodeBlock() {
  const { code, language, theme: themeId, font, fontSize } = useSnap();
  const theme = getTheme(themeId);
  const html = useHighlighter(code, language, themeId);
  const empty = code.trim().length === 0;

  return (
    <div
      style={{
        padding: `${Math.round(fontSize * 1.5)}px ${Math.round(fontSize * 1.7)}px ${Math.round(fontSize * 1.7)}px`,
        fontFamily: getFont(font).family,
        fontSize,
        lineHeight: 1.75,
        width: "max-content",
        minWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      {empty ? (
        <EmptyPlaceholder />
      ) : html ? (
        <div className="cs-code" dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        // Plain fallback while Shiki loads for the first time.
        <pre
          style={{
            margin: 0,
            color: theme.c.txt,
            fontFamily: "inherit",
            fontSize: "inherit",
            lineHeight: "inherit",
            whiteSpace: "pre",
          }}
        >
          {code}
        </pre>
      )}
    </div>
  );
}
