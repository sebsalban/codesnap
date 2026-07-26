// Snap state <-> shareable URL. State is serialized as JSON -> UTF-8 ->
// base64url and carried in the ?snap= query param.
const FIELDS = [
  "code",
  "language",
  "theme",
  "background",
  "customColor",
  "font",
  "fontSize",
  "padding",
  "radius",
  "windowStyle",
  "shadow",
];

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
      if (parsed[field] !== undefined) state[field] = parsed[field];
    }
    return state;
  } catch {
    return null;
  }
};

export const buildShareUrl = (state) =>
  `${window.location.origin}/?snap=${encodeSnap(state)}`;
