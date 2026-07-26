-- CodeSnap — snap history (authenticated users only).
-- Run this in the Supabase SQL editor.

CREATE TABLE snaps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  code TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'javascript',
  theme TEXT NOT NULL DEFAULT 'github-dark',
  background TEXT NOT NULL DEFAULT 'indigo',
  custom_color TEXT,
  font TEXT NOT NULL DEFAULT 'fira',
  font_size INTEGER DEFAULT 15,
  padding INTEGER DEFAULT 48,
  border_radius INTEGER DEFAULT 12,
  shadow BOOLEAN DEFAULT TRUE,
  window_style TEXT DEFAULT 'mac',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE snaps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own snaps" ON snaps
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
