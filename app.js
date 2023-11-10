import express, { json } from 'express';
import cors from 'cors';
import logger from 'morgan';
import authRouter from './routes/api/auth-router.js';
import profileSetingsRouter from './routes/api/profile-settings-router.js';

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(json());
app.use(express.static('public'));

app.use('/api/users', authRouter);
app.use('/api/profileSettings', profileSetingsRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'Server error' } = err;
    res.status(status).json({ message })
});

export default app;