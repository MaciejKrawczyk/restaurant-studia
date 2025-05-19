import { Request, Response } from 'express';
import { authService } from '../services/auth.service';

export const showLoginForm = (req: Request, res: Response) => {
  res.render('login');
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    await authService.login(req, email, password);
    res.redirect('/p12/cart');
  } catch (err: any) {
    res.render('login', { error: err.message });
  }
};
