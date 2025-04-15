import { Request, Response } from 'express';

export function getHomePage(req: Request, res: Response): void {
    // Optionally pass data into your template through the second parameter
    res.render('index', { title: 'My Express App', message: 'Hello from Pug!' });
}
