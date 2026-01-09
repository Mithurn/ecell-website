-- E-Cell Recruitments Database Schema
-- Run this in Supabase SQL Editor (supabase.com → SQL Editor)

-- Create the recruitments table
CREATE TABLE recruitments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  registration_number TEXT NOT NULL,
  college TEXT NOT NULL,
  year TEXT NOT NULL,
  domain TEXT NOT NULL,
  resume_url TEXT,
  idea_title TEXT,
  idea_description TEXT,
  team_members TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disable Row Level Security (allows public form submissions)
ALTER TABLE recruitments DISABLE ROW LEVEL SECURITY;

-- Create storage bucket for resumes (run this separately if needed)
-- Go to Supabase Dashboard → Storage → New Bucket → Name: "resumes" → Public: checked
