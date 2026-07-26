// Visual theme catalog. `shiki` is the real Shiki theme id used for
// highlighting; `c` holds the token colors used for mini-previews,
// history thumbnails and the plain-text fallback while Shiki loads.
export const THEMES = [
  {
    id: "github-dark",
    shiki: "github-dark",
    label: "GitHub Dark",
    bg: "#0D1117",
    c: { kw: "#FF7B72", str: "#A5D6FF", fn: "#D2A8FF", cmt: "#8B949E", txt: "#C9D1D9", num: "#79C0FF", pn: "#8B949E" },
  },
  {
    id: "dracula",
    shiki: "dracula",
    label: "Dracula",
    bg: "#282A36",
    c: { kw: "#FF79C6", str: "#F1FA8C", fn: "#50FA7B", cmt: "#6272A4", txt: "#F8F8F2", num: "#BD93F9", pn: "#F8F8F2" },
  },
  {
    id: "tokyo-night",
    shiki: "tokyo-night",
    label: "Tokyo Night",
    bg: "#1A1B26",
    c: { kw: "#BB9AF7", str: "#9ECE6A", fn: "#7AA2F7", cmt: "#565F89", txt: "#A9B1D6", num: "#FF9E64", pn: "#89DDFF" },
  },
  {
    id: "one-dark",
    shiki: "one-dark-pro",
    label: "One Dark",
    bg: "#282C34",
    c: { kw: "#C678DD", str: "#98C379", fn: "#61AFEF", cmt: "#5C6370", txt: "#ABB2BF", num: "#D19A66", pn: "#ABB2BF" },
  },
  {
    id: "nord",
    shiki: "nord",
    label: "Nord",
    bg: "#2E3440",
    c: { kw: "#81A1C1", str: "#A3BE8C", fn: "#88C0D0", cmt: "#616E88", txt: "#D8DEE9", num: "#B48EAD", pn: "#ECEFF4" },
  },
  {
    id: "monokai",
    shiki: "monokai",
    label: "Monokai",
    bg: "#272822",
    c: { kw: "#F92672", str: "#E6DB74", fn: "#A6E22E", cmt: "#75715E", txt: "#F8F8F2", num: "#AE81FF", pn: "#F92672" },
  },
  {
    id: "synthwave",
    shiki: "synthwave-84",
    label: "Synthwave",
    bg: "#241B2F",
    c: { kw: "#FF7EDB", str: "#72F1B8", fn: "#36F9F6", cmt: "#848BBD", txt: "#F0EFF1", num: "#FEDE5D", pn: "#F0EFF1" },
  },
  {
    id: "gruvbox",
    shiki: "gruvbox-dark-medium",
    label: "Gruvbox",
    bg: "#282828",
    c: { kw: "#FB4934", str: "#B8BB26", fn: "#8EC07C", cmt: "#928374", txt: "#EBDBB2", num: "#D3869B", pn: "#EBDBB2" },
  },
  {
    id: "catppuccin",
    shiki: "catppuccin-mocha",
    label: "Catppuccin",
    bg: "#1E1E2E",
    c: { kw: "#CBA6F7", str: "#A6E3A1", fn: "#89B4FA", cmt: "#6C7086", txt: "#CDD6F4", num: "#FAB387", pn: "#94E2D5" },
  },
  {
    id: "github-light",
    shiki: "github-light",
    label: "GitHub Light",
    bg: "#FFFFFF",
    c: { kw: "#CF222E", str: "#0A3069", fn: "#8250DF", cmt: "#6E7781", txt: "#24292F", num: "#0550AE", pn: "#57606A" },
  },
];

export const getTheme = (id) => THEMES.find((t) => t.id === id) || THEMES[0];
