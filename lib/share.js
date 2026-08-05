// Snap state <-> shareable URL. State is serialized as JSON -> UTF-8 ->
// base64url and carried in the ?snap= query param.
import { LANGUAGES } from "@/lib/constants/languages";
import { THEMES } from "@/lib/constants/themes";
import { BACKGROUNDS } from "@/lib/constants/backgrounds";
import { FONTS } from "@/lib/constants/fonts";
import { MAX_CODE_LENGTH } from "@/lib/constants/limits";

const oneOf = (ids) => (v) => (ids.includes(v) ? v : undefined);
const catalogId = (list) => oneOf(list.map((item) => item.id));
const clampedInt = (min, max) => (v) =>
  typeof v === "number" && Number.isFinite(v) ? Math.min(max, Math.max(min, Math.round(v))) : undefined;

// ?snap= is a public, unauthenticated surface — anything in the payload
// can be hand-crafted. Each sanitizer returns the value to apply, or
// undefined to drop the field and keep the editor default. Numeric ranges
// mirror the control panel sliders.
const SANITIZERS = {
  code: (v) => (typeof v === "string" ? v.slice(0, MAX_CODE_LENGTH) : undefined),
  language: catalogId(LANGUAGES),
  theme: catalogId(THEMES),
  background: oneOf([...BACKGROUNDS.map((b) => b.id), "custom"]),
  customColor: (v) => (typeof v === "string" && /^#[0-9a-fA-F]{3,8}$/.test(v) ? v : undefined),
  font: catalogId(FONTS),
  fontSize: clampedInt(11, 24),
  padding: clampedInt(16, 96),
  radius: clampedInt(0, 28),
  windowStyle: oneOf(["mac", "windows", "none"]),
  shadow: (v) => (typeof v === "boolean" ? v : undefined),
};

const FIELDS = Object.keys(SANITIZERS);

export const encodeSnap = (state) => {
  const payload = {};
  for (const field of FIELDS) payload[field] = state[field];
  const json = JSON.stringify(payload);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
};

export const decodeSnap = (encoded) => {
  try {
    const base64 = encoded.replaceAll("-", "+").replaceAll("_", "/");
    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
    const parsed = JSON.parse(new TextDecoder().decode(bytes));
    const state = {};
    for (const field of FIELDS) {
      const value = SANITIZERS[field](parsed[field]);
      if (value !== undefined) state[field] = value;
    }
    return state;
  } catch {
    return null;
  }
};

export const buildShareUrl = (state) =>
  `${window.location.origin}/?snap=${encodeSnap(state)}`;
