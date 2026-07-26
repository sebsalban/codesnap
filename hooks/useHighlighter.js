"use client";

import { useEffect, useState } from "react";
import { highlight } from "@/lib/shiki";
import { getTheme } from "@/lib/constants/themes";

// Highlights with a 300ms debounce so typing doesn't re-tokenize every
// keystroke. Returns the last successful HTML so theme/code changes
// cross-fade instead of flashing empty.
export function useHighlighter(code, language, themeId) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    let cancelled = false;
    const empty = !code.trim();
    const timer = setTimeout(async () => {
      if (empty) {
        if (!cancelled) setHtml("");
        return;
      }
      try {
        const out = await highlight(code, language, getTheme(themeId).shiki);
        if (!cancelled) setHtml(out);
      } catch {
        if (!cancelled) setHtml("");
      }
    }, empty ? 0 : 300);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [code, language, themeId]);

  return html;
}
