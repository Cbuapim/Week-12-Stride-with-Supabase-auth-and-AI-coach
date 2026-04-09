# Stride Running Club — React + Supabase + Claude AI

A React/Vite rebuild of the Stride Running Club website with **Supabase Authentication**, **Supabase Database** (personal run log), and an **AI Running Coach** powered by the Claude API.

---

## What This Project Does

This app extends the original Stride static site with three real backend features:

1. **Supabase Auth** — Email/password sign up and sign in. Protected routes redirect unauthenticated users to `/login`.
2. **Supabase Database** — Each logged-in member has a personal run log. Runs are stored in a `runs` table with Row Level Security so users can only see their own data.
3. **Claude AI Coach** — A chat interface in the dashboard that calls the Anthropic API. The AI receives the user's run history as context and gives personalized coaching advice.

This satisfies the **Complete Tier** requirement: two Supabase services (Auth + Database) combined with a second API (Claude/Anthropic).

---

## Tech Stack

- **React 18** + **Vite 5**
- **React Router v6** — client-side routing with protected routes
- **Supabase JS v2** — auth and database
- **Anthropic Claude API** — AI coach (claude-sonnet-4)
- **CSS custom properties** — no UI framework, all custom styles

---

## Setup Instructions

### 1. Clone and install

```bash
git clone <your-repo-url>
cd stride-react
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click **New Project** and fill in the details
3. Once the project is ready, go to **Settings → API**
4. Copy your **Project URL** and **anon public** key

### 3. Create the runs table

In your Supabase dashboard, go to **SQL Editor** and run this:

```sql
-- Create the runs table
create table runs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  run_date date not null,
  distance_miles numeric(5, 2) not null,
  run_type text not null default 'Easy',
  notes text,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table runs enable row level security;

-- Policy: users can only read their own runs
create policy "Users can view own runs"
  on runs for select
  using (auth.uid() = user_id);

-- Policy: users can only insert their own runs
create policy "Users can insert own runs"
  on runs for insert
  with check (auth.uid() = user_id);

-- Policy: users can only delete their own runs
create policy "Users can delete own runs"
  on runs for delete
  using (auth.uid() = user_id);
```

### 4. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your values:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

> **Note on the Claude API key:** The AI Coach calls the Anthropic API directly from the browser. In this academic demo the API key is handled by the claude.ai proxy environment. For a production app, you would move this call to a backend/edge function and store the key server-side.

### 5. Run locally

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

### 6. Build for production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── lib/
│   ├── supabase.js        # Supabase client (reads from .env)
│   ├── AuthContext.jsx    # Auth state provider + hooks
│   └── useReveal.js       # Scroll-triggered reveal animation hook
├── components/
│   ├── Navbar.jsx         # Auth-aware navigation
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Runs.jsx
│   ├── Gallery.jsx
│   ├── Contact.jsx
│   ├── Login.jsx          # Sign in / Sign up (single page)
│   └── Dashboard.jsx      # Protected — run log + AI coach
├── App.jsx                # Routes + ProtectedRoute wrapper
├── main.jsx               # Entry point
└── index.css              # All styles (CSS variables, no framework)
```

---

## Features Walkthrough

### Authentication (`/login`)
- Single page handles both sign in and sign up via a toggle
- Supabase handles password hashing and JWT sessions
- On sign up, Supabase sends a confirmation email (configurable in Supabase dashboard)
- Auth state persists across page refreshes via localStorage
- Navbar updates dynamically: shows **Member Login** when logged out, **My Dashboard** + **Sign Out** when logged in

### Protected Route
In `App.jsx`, the `<ProtectedRoute>` wrapper checks `useAuth()`. If no user session exists, it redirects to `/login` using React Router's `<Navigate>`.

### Run Log (`/dashboard`)
- Fetches all runs for the current user from Supabase on mount
- Row Level Security ensures the query only returns the logged-in user's rows — not enforced just in JS, enforced at the database level
- Add a run: date, distance, type (Easy / Tempo / Long Run / Speed Work / Recovery / Race), optional notes
- Delete a run with the × button
- Stats bar (total runs, total miles, average distance, longest run) recalculates live

### AI Running Coach
- Calls `POST /v1/messages` on the Anthropic API
- System prompt includes the user's last 10 runs as context
- Four quick-start question buttons for common coaching queries
- Type any question and press Enter or click Ask
- Keeps responses under 120 words — concise and actionable

---

## Deployment

This app deploys to any static host (Netlify, Vercel, GitHub Pages).

**Netlify (recommended):**
1. Push to GitHub
2. Connect repo in Netlify dashboard
3. Set build command: `npm run build`, publish dir: `dist`
4. Add environment variables in **Site Settings → Environment Variables**

---

## Author

Chan Buapim — UCF Digital Media & Communications  
DIG4503 — Week 12 Assignment
