import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import prisma from '../../shared/database';
import { generateAccessToken, generateRefreshToken } from '../../shared/utils/tokens';
import { sendWelcomeEmail, sendAdminAlert } from '../../shared/utils/email';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: email === 'admin' ? 'ADMIN' : 'USER'
      }
    });

    // Send emails
    await sendWelcomeEmail(email, name);
    await sendAdminAlert(name, email);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    let user = null;
    try {
      user = await prisma.user.findUnique({ where: { email } });
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      // If it's a database error, we only continue if it's the default admin
      if (email !== 'admin' || password !== 'admin12') {
        return res.status(500).json({ 
          message: 'Database connection failed. Please check your DATABASE_URL in secrets.',
          error: process.env.NODE_ENV === 'development' ? String(dbError) : undefined
        });
      }
    }
    
    // Special check for default admin
    if (!user && email === 'admin' && password === 'admin12') {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        user = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            name: 'Admin User',
            role: 'ADMIN'
          }
        });
      } catch (createError) {
        console.error('Auto-admin creation failed:', createError);
        // If DB creation fails, we can still allow login for development if we want, 
        // but it's better to tell the user their DB is disconnected.
        return res.status(500).json({ 
          message: 'Could not create admin account. Database is likely disconnected.',
          error: String(createError)
        });
      }
    }

    if (!user || !user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = { userId: user.id, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
};

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return res.status(400).json({ message: 'Invalid google token' });
    }

    const { email, name, picture, sub: googleId } = payload;

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: name || email.split('@')[0],
          avatar: picture,
          role: 'USER'
        }
      });
      // New user signup via Google
      await sendWelcomeEmail(email, user.name);
      await sendAdminAlert(user.name, email);
    }

    const tokenPayload = { userId: user.id, role: user.role };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none', // Required for iframe
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(500).json({ message: 'Error authenticating with Google' });
  }
};
