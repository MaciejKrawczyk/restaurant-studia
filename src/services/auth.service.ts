import { Request } from 'express';
import prisma from '../../prisma/client';
import bcrypt from 'bcrypt';

export interface SessionUser {
  userId: number;
  email: string;
}

export class AuthService {

  async register(req: Request, email: string, password: string): Promise<SessionUser> {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new Error('This e-mail is already taken');
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hash,
      },
      select: {
        id: true,
        email: true,
      },
    });

    req.session.userId = user.id;

    return { userId: user.id, email: user.email };
  }


  async login(req: Request, email: string, password: string): Promise<SessionUser> {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true },
    });
    if (!user) {
      throw new Error('Incorrect email or password');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Incorrect email or password');
    }

    req.session.userId = user.id;
    return { userId: user.id, email: user.email };
  }

  logout(req: Request) {
    req.session.destroy(err => {
      if (err) console.error('Error while destroying session:', err);
    });
  }

  getCurrentUser(req: Request): SessionUser | null {
    if (!req.session.userId) return null;
    return { userId: req.session.userId, email: (req.session as any).email };
  }
}

export const authService = new AuthService();
