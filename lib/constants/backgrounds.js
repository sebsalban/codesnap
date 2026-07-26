export const BACKGROUNDS = [
  { id: "indigo", label: "Indigo → Violet", css: "linear-gradient(135deg,#4F46E5 0%,#7C3AED 100%)" },
  { id: "sunset", label: "Sunset", css: "linear-gradient(135deg,#F97316 0%,#EC4899 100%)" },
  { id: "night", label: "Night", css: "#000000" },
  { id: "daylight", label: "Daylight", css: "linear-gradient(135deg,#BFDBFE 0%,#FFFFFF 100%)" },
  { id: "candy", label: "Candy", css: "linear-gradient(135deg,#F472B6 0%,#8B5CF6 100%)" },
  { id: "lagoon", label: "Lagoon", css: "linear-gradient(135deg,#22D3EE 0%,#3B82F6 100%)" },
  { id: "forest", label: "Forest", css: "linear-gradient(135deg,#065F46 0%,#10B981 100%)" },
  { id: "graphite", label: "Graphite", css: "linear-gradient(160deg,#1E1E2E 0%,#0A0A0F 100%)" },
];

// Resolves the CSS background for the current snap state, including the
// custom color-picker option (background === "custom").
export const getBackgroundCss = (backgroundId, customColor) => {
  if (backgroundId === "custom") return customColor || "#F472B6";
  const bg = BACKGROUNDS.find((b) => b.id === backgroundId) || BACKGROUNDS[0];
  return bg.css;
};
