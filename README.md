# Rehann — Video Editor Portfolio

A premium, cinematic, fully animated portfolio website for a freelance video editor, built with React (Vite), Tailwind CSS, Framer Motion and React Router.

## Features

- Cinematic dark theme with violet/cyan neon accents
- Custom cursor with glow, timeline-style scroll progress bar, loading screen
- Fully functional Albums + Videos CRUD (create, edit, delete, search, sort) backed by `localStorage`
- Video preview supporting MP4, YouTube embed and Vimeo embed links
- Animated stats, skill progress bars, testimonials slider, FAQ accordion, working-process timeline
- Contact form with project type / budget fields
- Fully responsive (mobile, tablet, desktop), accessible focus states, reduced-motion support
- Custom 404 page, SEO meta tags

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Deploy

### Vercel
Push to a Git repo and import into Vercel — no configuration needed (`vercel.json` handles SPA routing). Or:

```bash
npm i -g vercel
vercel --prod
```

### Netlify
Drag-and-drop the `dist/` folder after `npm run build`, or connect the repo. `public/_redirects` handles SPA routing.

## Editing content

- Update your name, bio, contact info and socials in `src/components/Hero.jsx`, `Contact.jsx`, and `Footer.jsx`.
- Seed portfolio albums/videos in `src/context/AlbumContext.jsx` (`seedAlbums`). Once the app runs, all changes are also editable live and persist in the browser's localStorage.
