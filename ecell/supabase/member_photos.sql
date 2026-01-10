-- Member Photos Table (Supabase)
-- Run this in Supabase SQL Editor

CREATE TABLE member_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  photo_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Allow public access (members upload their own photos)
ALTER TABLE member_photos DISABLE ROW LEVEL SECURITY;

-- Create index for fast email lookups
CREATE INDEX idx_member_photos_email ON member_photos(email);
