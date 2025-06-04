import {Request, Response} from 'express';
import {authService} from '../services/auth.service';

export const showRegisterForm = (req: Request, res: Response) => {
    res.render('register');
};

export const register = async (req: Request, res: Response) => {
    const {email, password, password2} = req.body;
    if (password !== password2) {
        return res.render('register', {error: 'Passwords do not match'});
    }

    try {
        await authService.register(req, email, password);
        res.redirect('/login');
    } catch (err: any) {
        res.render('register', {error: err.message});
    }
};
