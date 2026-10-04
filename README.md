# ¡Hola! Spanish Flash Cards 🎈

A mobile-first flashcard app for toddlers, with two games:

- **¡Hola! Spanish** — learn Spanish words by category (Animals, Food, Colors, Shapes),
  with native-quality audio.
- **Sight Words** — learn to read English words by category (Animals, Food, Things, Colors).

Built as a fully static site — no backend, no build step, no tracking.

## Audio

All word audio is **pre-generated with ElevenLabs** (`eleven_multilingual_v2`;
Amelia for Spanish, Bella for English) and shipped as static mp3 files in `audio/`.
No API key is ever exposed to the client. If an audio file is missing, the app
falls back to the browser's `speechSynthesis`.

To regenerate audio after editing word lists in `app.js`:

```bash
# requires the `elevenlabs` CLI, authenticated
node extract-words.js   # writes wordlist.txt from app.js
./genaudio.sh           # fills audio/ (skips existing files)
```

## Features

- Toddler-scale tap targets (≥48px), single-column layout, safe-area aware
- Star counter with persistence (localStorage)
- Category completion celebration
- Fully static: no backend, no build step, no tracking

## Deploy

Static site — deploy the repo root to Vercel with no build command and no
framework preset.
