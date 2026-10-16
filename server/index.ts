import 'dotenv/config';
import path from 'node:path';
import express from 'express';
import { createApp } from './app.ts';
import { Store } from './store.ts';

const store = new Store(path.resolve(process.env.DATA_FILE || 'data/platform.json'));
await store.ready;
const app = createApp(store);
if (process.env.NODE_ENV === 'production' || process.argv.includes('--production')) {
  app.use(express.static(path.resolve('dist')));
  app.get('*', (_req,res) => res.sendFile(path.resolve('dist/index.html')));
} else {
  const { createServer } = await import('vite');
  const vite = await createServer({ server: { middlewareMode: true }, appType: 'spa' });
  app.use(vite.middlewares);
}
const port = Number(process.env.PORT || 3000);
// Render and other container hosts require binding to all interfaces.
// Local development still remains available at http://localhost:<port>.
app.listen(port, process.env.HOST || '0.0.0.0', () => console.log(`EduCareer: http://localhost:${port}`));
