"use client";

import { useSnap } from "@/hooks/useSnap";
import { getTheme } from "@/lib/constants/themes";
import { getBackgroundCss } from "@/lib/constants/backgrounds";
import WindowFrame from "@/components/preview/WindowFrame";
import CodeBlock from "@/components/preview/CodeBlock";

// The exact DOM node exported as PNG/SVG: gradient background + padding
// wrapping the themed code frame.
export default function SnapPreview() {
  const { previewRef, theme: themeId, background, customColor, padding, radius, shadow, windowStyle } = useSnap();
  const theme = getTheme(themeId);

  return (
    <div
      ref={previewRef}
      style={{
        background: getBackgroundCss(background, customColor),
        padding,
        borderRadius: 16,
        transition: "background 400ms var(--ease)",
        boxShadow: shadow
          ? "0 40px 80px -20px rgba(0,0,0,.75), 0 0 0 1px rgba(255,255,255,.04)"
          : "0 0 0 1px rgba(255,255,255,.04)",
      }}
    >
      <div
        style={{
          background: theme.bg,
          borderRadius: radius,
          overflow: "hidden",
          transition: "background 300ms var(--ease)",
        }}
      >
        <WindowFrame windowStyle={windowStyle} glyphColor={theme.c.cmt} />
        <CodeBlock />
      </div>
    </div>
  );
}
