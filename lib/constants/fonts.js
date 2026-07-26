// Monospace fonts available for the snap. Families point at the CSS
// variables registered by next/font in app/layout.js, so the exported
// image uses self-hosted fonts (no cross-origin fetch issues).
export const FONTS = [
  { id: "fira", label: "Fira Code", family: "var(--font-fira-code), monospace" },
  { id: "jetbrains", label: "JetBrains Mono", family: "var(--font-jetbrains-mono), monospace" },
  { id: "plex", label: "IBM Plex Mono", family: "var(--font-plex-mono), monospace" },
  { id: "source", label: "Source Code Pro", family: "var(--font-source-code-pro), monospace" },
  { id: "space", label: "Space Mono", family: "var(--font-space-mono), monospace" },
];

export const getFont = (id) => FONTS.find((f) => f.id === id) || FONTS[0];
