# For Manasa — Birthday Experience

A responsive, cinematic birthday microsite built with React, Vite, TypeScript, Tailwind CSS v4, Framer Motion, and Lucide icons.

## Run locally

```bash
npm install
npm run dev
```

## Customize it

All personal content is centralized in `src/config.ts`:
- Name, nickname, age, sender name
- Opening and birthday messages
- Personal letter and closing message
- Memory captions and image paths
- Compliment cards
- Optional background music path
- Theme accents

### Add your photographs

Put your images in `public/photos/` and name them `memory-1.jpg` through `memory-6.jpg`, or change the `src` paths in `src/config.ts`. The gallery has graceful visual placeholders until images are added. Use compressed JPG/WebP images for faster loading.

### Add music

Place an audio file in `public/music/` and set `music: '/music/your-song.mp3'` in `src/config.ts`. The player only appears when a music path is configured, and audio starts only after the visitor presses play.

## Production build

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`.

## Deploy

### Vercel

Import the project, use `npm run build` as the build command and `dist` as the output directory. `vercel.json` includes an SPA rewrite.

### Netlify

Import the project. `netlify.toml` configures the build command, publish directory, and SPA fallback.

## Notes

- No backend, API keys, or environment variables are required.
- The design respects `prefers-reduced-motion` and includes keyboard-accessible buttons and an Escape-to-close photo lightbox.
- Replace all sample text and gallery paths in `src/config.ts` before sharing publicly.
