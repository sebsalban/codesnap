import { THEMES } from "@/lib/constants/themes";
import { LANGUAGES } from "@/lib/constants/languages";

let highlighterPromise = null;

// Singleton, loaded lazily on the client. Shiki is heavy, so both the
// library and the highlighter instance are created on first use only.
export const getHighlighter = () => {
  if (!highlighterPromise) {
    highlighterPromise = import("shiki").then(({ createHighlighter }) =>
      createHighlighter({
        themes: THEMES.map((t) => t.shiki),
        langs: LANGUAGES.map((l) => l.id),
      })
    );
  }
  return highlighterPromise;
};

export const highlight = async (code, language, shikiTheme) => {
  const h = await getHighlighter();
  return h.codeToHtml(code, { lang: language, theme: shikiTheme });
};
