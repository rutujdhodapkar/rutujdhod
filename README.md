# Rutuj Dhodapkar — Portfolio

React/Vite portfolio for Vercel.

## Development

```bash
npm install
npm run dev
```

## Admin analytics

The dashboard is available at `/admin`. It reads the visitor collection from the configured Firebase Realtime Database URL.

The visitor logger stores only an anonymous visitor ID, timestamp, broad device category, browser family, screen class, and language. A browser is counted at most once every 10 minutes.

For a truly private dashboard, configure Firebase Authentication and database read rules before production use. The current dashboard is intended for the provided database while its read endpoint remains available.
