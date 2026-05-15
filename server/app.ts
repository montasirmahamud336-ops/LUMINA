import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { authenticate, authorize } from './shared/middleware/auth';
import * as authController from './modules/auth/auth.controller';
import * as requestController from './modules/requests/requests.controller';
import * as settingsController from './modules/settings/settings.controller';
import servicesRouter from './modules/services/services.controller';
import { createServer as createViteServer } from "vite";

export async function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  // Health Check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', environment: process.env.NODE_ENV || 'development' });
  });

  // API Routes
  const api = express.Router();

  // Auth
  api.post('/auth/register', authController.register);
  api.post('/auth/login', authController.login);
  api.post('/auth/google', authController.googleAuth);
  api.post('/auth/logout', authController.logout);

  // Requests
  api.post('/requests', authenticate, requestController.createRequest);
  api.get('/requests/my', authenticate, requestController.getMyRequests);
  api.get('/requests/all', authenticate, authorize(['ADMIN']), requestController.getAllRequests);
  api.patch('/requests/:id', authenticate, authorize(['ADMIN']), requestController.updateRequestStatus);

  // Global Settings
  api.get('/settings/global', settingsController.getGlobalSettings);
  api.patch('/settings/global', authenticate, authorize(['ADMIN']), settingsController.updateGlobalSettings);

  // Services
  api.use('/services', servicesRouter);

  app.use('/api', api);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  return app;
}
