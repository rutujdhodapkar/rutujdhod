# Rutuj Dhodapkar — Portfolio

React/Vite portfolio for Vercel.

## Development

```bash
npm install
npm run dev
```

## Admin analytics setup

The private dashboard is available at `/admin`. Add these Vercel environment variables before using it:

- `ADMIN_DASHBOARD_KEY`: a long random password for the dashboard
- `FIREBASE_DATABASE_URL`: `https://freelancing-ffae0-default-rtdb.firebaseio.com`
- `FIREBASE_DATABASE_TOKEN`: optional Firebase database token if the database read rules require one

The visitor logger stores only an anonymous visitor ID, timestamp, broad device category, browser family, screen class, and language. A browser is counted at most once every 10 minutes.
