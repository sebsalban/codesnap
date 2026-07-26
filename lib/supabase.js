import { createBrowserClient } from "@supabase/ssr";

let client = null;

export const isSupabaseConfigured = () =>
  Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

// Returns the shared browser client, or null when env vars are missing so
// the app can run without Supabase (editor, export and sharing still work).
export const getSupabase = () => {
  if (!isSupabaseConfigured()) return null;
  if (!client) {
    client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }
  return client;
};
