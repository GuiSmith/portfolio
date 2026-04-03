# Portfolio (React + Vite)

This is a single-page developer portfolio for Guilherme Smith Dansiguer Rodrigues.

It’s designed to be clean, fast, and easy to maintain, showcasing:

- A short professional overview (from `src/data/cv.json`)
- Experience and education sections
- A projects area that pulls public repositories directly from GitHub (no backend)
- Dark/light theme toggle and PT-BR/EN-US language toggle

## Setup

```bash
npm install
npm run dev
```

## Notes

- Edit `portfolio.config.json` to change the GitHub username, defaults (theme/language), and cache TTL.
- The projects section fetches public repo data directly from `api.github.com` in the browser (no backend).
