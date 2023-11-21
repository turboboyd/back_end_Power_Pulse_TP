import express, { json } from 'express';
import cors from 'cors';
import logger from 'morgan';
import authRouter from './routes/api/auth-router.js';
import profileSetingsRouter from './routes/api/profile-settings-router.js';
import exercisesRouter from './routes/api/exercises.js';
import productsRouter from './routes/api/products.js';
import diaryRouter from './routes/api/diary.js';
import statisticsRouter from './routes/api/statistics-router.js';
import swaggerUi from 'swagger-ui-express';
import * as fs from 'fs'

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
const swaggerRawDocument = fs.readFileSync('./swagger.json', 'utf8');
const swaggerDocument = JSON.parse(swaggerRawDocument);

app.use(logger(formatsLogger));
app.use(cors());
app.use(json());
app.use(express.static('public'));

app.use('/api/users', authRouter);
app.use('/api/profileSettings', profileSetingsRouter);
app.use('/api/exercises', exercisesRouter);
app.use('/api/products', productsRouter);
app.use('/api/diary', diaryRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'Server error' } = err;
    res.status(status).json({ message })
});

export default app;