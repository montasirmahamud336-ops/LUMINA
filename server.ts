import http from 'http';
import dotenv from 'dotenv';
import { createApp } from './server/app';
import { setupWebSockets } from './server/shared/websocket';

dotenv.config();

async function start() {
  const app = await createApp();
  const server = http.createServer(app);
  const PORT = 3000;

  // Initialize WebSockets
  setupWebSockets(server);

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Premium SaaS Backend running on http://localhost:${PORT}`);
    console.log(`📡 WebSockets enabled`);
  });
}

start().catch(err => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
