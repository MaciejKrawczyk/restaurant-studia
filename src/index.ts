import express, { Application } from 'express';
import path from 'path';
import routes from './routes';

const app: Application = express();

// Set Pug as the templating engine
app.set('view engine', 'pug');
// Set the location of Pug template files
app.set('views', path.join(__dirname, 'views'));

// Parse incoming JSON
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
