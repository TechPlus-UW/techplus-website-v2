-- Create role enum type
CREATE TYPE user_role AS ENUM ('default', 'mentor', 'mentee', 'admin');

-- Add role column to profiles table with default value
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS role user_role NOT NULL DEFAULT 'default';

-- Create index on role for faster queries
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
