# 🚀 LUMINA ENTERPRISE SaaS - PRODUCTION INFRASTRUCTURE

Welcome to the **Lumina Enterprise SaaS Platform**. This documentation outlines the entire system architecture, setup procedures, and deployment strategies required to maintain this production-grade application.

---

## 🏛 ARCHITECTURE OVERVIEW

### Core Technical Stack
- **Frontend**: React 19 + Vite (High-Performance SPA)
- **Styling**: Tailwind CSS 4.0 (Utility-First Design)
- **Animations**: Framer Motion (Premium UI/UX)
- **Backend**: Node.js + Express (Enterprise Modular Architecture)
- **Database**: PostgreSQL (Relational Integrity)
- **ORM**: Prisma (Migration-Ready & Type-Safe)
- **Real-Time**: Socket.io (Bi-directional WebSockets)
- **Auth**: JWT (Stateless Authentication with Refresh Token rotation)
- **Storage**: Cloudinary / AWS S3 Abstraction Layer

### System Design
Lumina follows a **Strict Modular Architecture** to ensure scalability and maintainability:
1. **API Layer**: Express Router & Controllers
2. **Service Layer**: Business Logic Isolation
3. **Repository Layer**: Database Abstraction (Prisma)
4. **Middleware Layer**: Security, Auth, and Request Validation

---

## 🛠 SOFTWARE REQUIREMENTS

Ensure the following are installed on your machine:
- **Node.js** (v20.x or higher)
- **PostgreSQL** (v15 or higher)
- **Git**
- **VS Code** (Recommended)

### Recommended VS Code Extensions
- Prisma
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter

---

## ⚡️ QUICK START: LOCAL SETUP

### 1. Clone & Identify Signal
```bash
git clone <repository-url>
cd lumina-saas
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
# DATABASE
DATABASE_URL="postgresql://user:password@localhost:5432/lumina_db"

# AUTHENTICATION
JWT_SECRET="your-premium-access-secret"
JWT_REFRESH_SECRET="your-premium-refresh-secret"

# CLOUD INFRASTRUCTURE
CLOUDINARY_URL="cloudinary://api_key:api_secret@cloud_name"

# NODE CONFIG
NODE_ENV="development"
PORT=3000
```

### 3. Database Initialization
```bash
# Install dependencies
npm install

# Initialize Prisma & Migrations
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Launch System
```bash
# Start Backend & Frontend Dev Server
npm run dev
```

---

## 🚢 DEPLOYMENT: VPS & CLOUD

### 1. VPS Setup (Ubuntu/Linux)
1. **Install Nginx & SSL**:
```bash
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx
```

2. **Reverse Proxy Configuration**:
Edit `/etc/nginx/sites-available/lumina`:
```nginx
server {
    server_name yourdomain.com;
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. **Process Management (PM2)**:
```bash
npm run build
pm2 start dist/server.cjs --name "lumina-server"
```

---

## 🔄 DATABASE MIGRATION & SUPABASE GUIDE

### Using Supabase (Recommended)
1. Create a project at [Supabase](https://supabase.com).
2. Go to **Project Settings > Database** and copy the **Connection String** (Transaction mode is recommended for serverless/VPS).
3. In the Lumina platform, go to **Settings > Secrets/Env** and add:
   `DATABASE_URL="your-supabase-connection-string"`
4. Run the initialization signal:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

### VPS to Supabase
1. Export data: `pg_dump -U user -h vps_host db_name > backup.sql`.
2. Import data: `psql -h supabase_host -U postgres -d postgres -f backup.sql`.

---

## 🛰 TROUBLESHOOTING

### Common Errors

**Q: Prisma 'Can't reach database'?**
- Verify PostgreSQL is running: `sudo service postgresql status`.
- Check `DATABASE_URL` credentials.

**Q: WebSocket Connection Failed?**
- Ensure port 3000 is open in firewall.
- Check Nginx `Upgrade` and `Connection` headers configuration.

**Q: JWT 'Unauthorized' after refresh?**
- Check if `refreshToken` cookie is being sent (ensure `SameSite` isn't blocking it).
- Verify `JWT_SECRET` matches across sessions.

---

## 👷 MAINTAINER GUIDE

1. **Keep Prisma Schema Clean**: Always use `npx prisma format`.
2. **Update Dependencies**: Use `npm update` but always verify `package.json` version ranges.
3. **Security Audits**: Periodically run `npm audit`.

---
*Created by Lumina Senior Architecture Team*
