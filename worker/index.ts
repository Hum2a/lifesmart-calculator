import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

// Configure CORS to allow requests from any origin
app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// Catch-all for 404
app.notFound((c) => {
  return c.text('Not Found', 404);
});

export default app;