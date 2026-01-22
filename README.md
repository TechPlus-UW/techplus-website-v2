# Tech+ UW Portal

The Tech+ UW Portal is the main landing site for current/prospective members and sponsors to learn about Tech+. Moreover, this portal also enables mentors and mentees to update their profiles and potentially maintain mentor-mentee relationships.

### Requirements

Ensure you have the following installed:
```
node@v22
pnpm@9.0.0
```

To install pnpm:
```sh
npm install -g pnpm
```

Or using corepack (recommended):
```sh
corepack enable
corepack prepare pnpm@9.0.0 --activate
```

## Setup

1. Clone the repo to your local machine
```sh
git clone https://github.com/TechPlus-UW/techplus-website-v2.git
```

2. Install dependencies
```sh
pnpm install
```

3. Set up Supabase:
   - Create a Supabase project at https://supabase.com
   - Run the migration file `supabase/migrations/001_create_profiles_table.sql` in your Supabase SQL editor
   - Copy your Supabase URL and anon key

4. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_FLAGSMITH_ENV_KEY=your_flagsmith_key
```

## Running the application locally

Start your local development server with:
```sh
pnpm dev:web
```

This will open up a browser window on http://localhost:3000.

## Project Overview

This is a Next.js 15 application built with:
- **Framework**: Next.js 15 (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Material-UI (MUI) v6
- **State Management**: Redux Toolkit
- **Backend**: Supabase (Authentication & Database)
- **Package Manager**: pnpm
- **Build System**: Turbo

The project is divided into various subcomponents located in the `components/` folder representing different parts of the website.

### Project Structure

```
techplus-website-v2/
├── app/                    # Next.js App Router pages
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   └── reset-password/   # Password reset page
├── components/            # React components (TypeScript)
├── constants/            # TypeScript constants
├── lib/                  # Utilities, store, supabase, services
│   ├── repositories/     # Data access layer
│   ├── services/         # Business logic layer
│   ├── store/            # Redux store
│   └── supabase/         # Supabase client
├── supabase/
│   └── migrations/       # Database migrations
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

### Architecture

The project follows a layered architecture:

1. **Repositories** (`lib/repositories/`): Handle direct database/API interactions
2. **Services** (`lib/services/`): Contain business logic and orchestrate repository calls
3. **Components**: UI components that use services for data operations

## Available Scripts

### `pnpm dev:web`

Runs the app in development mode with Turbo.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `pnpm build`

Builds the app for production using Turbo. The build output will be in the `.next` folder.

### `pnpm start`

Starts the production server.

### `pnpm lint`

Runs ESLint to check for code quality issues.

### `pnpm type-check`

Runs TypeScript compiler to check for type errors.

### `pnpm turbo`

Runs Turbo commands directly.

## Database Setup

### Supabase Tables

The application uses the following Supabase tables:

- **profiles**: Stores user profile information
  - `id` (UUID, references auth.users)
  - `email` (TEXT)
  - `first_name` (TEXT)
  - `last_name` (TEXT)
  - `created_at` (TIMESTAMP)
  - `updated_at` (TIMESTAMP)

To set up the database, run the migration file in your Supabase SQL editor:
```sql
-- See supabase/migrations/001_create_profiles_table.sql
```

## Technology Stack

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React version
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI v6** - React component library
- **Redux Toolkit** - State management
- **Supabase** - Backend as a service (Auth & Database)
- **Turbo** - Build system and task runner
- **pnpm** - Fast, disk space efficient package manager

## Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Material-UI Documentation](https://mui.com)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [Supabase Documentation](https://supabase.com/docs)
- [Turbo Documentation](https://turbo.build/repo/docs)
