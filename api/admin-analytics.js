const DEFAULT_DATABASE_URL = 'https://freelancing-ffae0-default-rtdb.firebaseio.com';

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  const expectedKey = process.env.ADMIN_DASHBOARD_KEY;
  if (!expectedKey) return response.status(503).json({ error: 'Admin dashboard is not configured.' });
  if (request.headers['x-admin-key'] !== expectedKey) return response.status(401).json({ error: 'Invalid admin access key.' });

  const databaseUrl = process.env.FIREBASE_DATABASE_URL || DEFAULT_DATABASE_URL;
  const token = process.env.FIREBASE_DATABASE_TOKEN;
  const query = token ? `?auth=${encodeURIComponent(token)}` : '';

  try {
    const firebaseResponse = await fetch(`${databaseUrl}/portfolioAnalytics/visits.json${query}`);
    if (!firebaseResponse.ok) return response.status(502).json({ error: 'Analytics store unavailable.' });
    const visits = await firebaseResponse.json();
    return response.status(200).json({ visits: visits || {} });
  } catch {
    return response.status(500).json({ error: 'Unable to load analytics.' });
  }
}
