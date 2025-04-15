import express from 'express';
import session from 'express-session';
import path from 'path';
import routes from './routes';
import prisma from "../prisma/client";

const app = express();

// Session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Make cart available to all views
app.use((req, res, next) => {
    res.locals.cart = req.session.cart || [];
    next();
});

// Routes
app.use('/', routes);

// Error handling
app.use((req, res) => {
    res.status(404).render('404');
});

app.use((err: any, req: express.Request, res: express.Response) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Prisma disconnect on shutdown
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit();
});
