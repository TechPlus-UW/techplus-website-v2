# Supabase Database Setup

This directory contains database migrations for the Tech+ UW Portal.

## Running Migrations

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `migrations/001_create_profiles_table.sql`
4. Run the SQL script

## Migration Files

### 001_create_profiles_table.sql

Creates the `profiles` table with the following structure:
- `id` (UUID): Primary key, references `auth.users(id)`
- `email` (TEXT): User's email address
- `first_name` (TEXT): User's first name
- `last_name` (TEXT): User's last name
- `created_at` (TIMESTAMP): Record creation timestamp
- `updated_at` (TIMESTAMP): Record update timestamp

The migration also:
- Enables Row Level Security (RLS)
- Creates policies for users to view and update their own profiles
- Creates a trigger to automatically update `updated_at` on record changes

### 002_create_profile_on_signup_trigger.sql

Creates a database trigger that automatically creates a profile when a new user signs up. This ensures profile creation happens server-side, avoiding RLS issues. Updated to include the default role.

### 003_add_role_to_profiles.sql

Adds a `role` column to the profiles table with an enum type (`user_role`) containing: `default`, `mentor`, `mentee`, `admin`. Default value is `default`.

### 004_create_mentor_applications_table.sql

Creates the `mentor_applications` table to store mentor application data including:
- User and profile references
- Program, year of study, company, role, experience
- Bio, availability, communication preferences
- Application status (pending, approved, rejected)

### 005_create_mentee_applications_table.sql

Creates the `mentee_applications` table to store mentee application data including:
- User and profile references
- Program, year of study
- Career goals, areas of interest
- Preferred mentor characteristics
- Availability, communication preferences
- Application status (pending, approved, rejected)

### 006_create_events_table.sql

Creates the `events` table to store event data including:
- Title, description, start/end times
- Location, event type (workshop, social, mentorship, coffee_chat, other)
- Registration information (required, link, max attendees)
- Creator reference and timestamps

### 007_add_admin_policies.sql

Adds Row Level Security policies for admin users:
- **Admins can view all profiles**: Admins can SELECT any profile
- **Admins can update any profile**: Admins can UPDATE any profile (including role changes)

## Row Level Security Policies

### Profiles Table
- **Users can view own profile**: Users can only SELECT their own profile
- **Users can update own profile**: Users can only UPDATE their own profile
- **Users can insert own profile**: Users can insert their own profile during signup
- **Admins can view all profiles**: Admins can SELECT any profile (added in migration 007)
- **Admins can update any profile**: Admins can UPDATE any profile (added in migration 007)

### Application Tables
- **Users can view own application**: Users can only SELECT their own applications
- **Users can insert own application**: Users can insert their own applications
- **Users can update own application**: Users can update their own applications

## Important Notes

⚠️ **Never use the service role key in the browser!** Always use the `anon` key (NEXT_PUBLIC_SUPABASE_ANON_KEY) for client-side code. The service role key bypasses all RLS policies and should only be used in server-side code or API routes.

### Application Tables
- **Users can view own application**: Users can only SELECT their own applications
- **Users can insert own application**: Users can insert their own applications
- **Users can update own application**: Users can update their own applications

### Events Table
- **Anyone can view events**: Public read access to all events
- **Authenticated users can create events**: Any logged-in user can create events
- **Event creators can update/delete**: Only the creator can modify their events

## Migration Order

Run migrations in this order:
1. `001_create_profiles_table.sql`
2. `002_create_profile_on_signup_trigger.sql`
3. `003_add_role_to_profiles.sql`
4. `004_create_mentor_applications_table.sql`
5. `005_create_mentee_applications_table.sql`
6. `006_create_events_table.sql`
7. `007_add_admin_policies.sql`