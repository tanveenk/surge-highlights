# SFU Surge Take-Home Challenge — Highlights

A fully responsive Highlights web application built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **TypeScript** based on the SFU Surge design specifications.

---

## Features

- **Dynamic Data Retrieval**: Fetches reviews asynchronously from the Surge API (`/api/getreviews/[UUID]`) with streaming server-side rendering and loading skeletons.
- **Image Integration via Openverse**: Automatically queries the Openverse API by highlight title to dynamically fetch and display relevant photography for each card, with in-memory caching and fallback handling.
- **Responsive Masonry Layout**:
  - **Mobile (`375px`)**: 1 column
  - **Tablet (`788px`)**: 2 columns
  - **Desktop (`1280px`)**: 3 columns (max-width `1280px`)
  - Smooth multi-column layout with `break-inside-avoid` to prevent awkward card breaks.
- **Interactive Review Creation**:
  - Floating Action Button (FAB) `Create +` pinned to the bottom-right corner.
  - Accessible modal dialog supporting backdrop dismissal, `Escape` key close, and keyboard navigation.
  - Submits new highlights via `POST` (`/api/postreview/[UUID]`) and instantly reflects the newly created highlight at the top of the grid.
- **Design Accuracy**: Adheres closely to the Figma specifications for typography, colors, padding, card elevation, and button interaction states.

---

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (Turbopack, App Router, Partial Prerendering)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Type Safety**: TypeScript 5
- **Icons & Fonts**: Geist Font Family

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/tanveenk/surge-highlights.git
cd surge-highlights
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory (or copy from `.env.example`):

```bash
cp .env.example .env.local
```

Ensure your `NEXT_PUBLIC_UUID` is set:

```env
NEXT_PUBLIC_UUID=revenant
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

- `npm run dev`: Starts the Next.js development server on port 3000.
- `npm run build`: Compiles and builds the production application.
- `npm run start`: Runs the built production application.
- `npm run lint`: Runs ESLint checks.

---

## Deploy to Vercel

The repository is pre-configured for seamless deployment to [Vercel](https://vercel.com):

1. Import this repository into Vercel.
2. In the project settings, add the Environment Variable:
   - `NEXT_PUBLIC_UUID` = your assigned UUID (e.g. `revenant`)
3. Deploy!
