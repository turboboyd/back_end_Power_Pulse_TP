import mongoose from 'mongoose';
import 'dotenv/config';
import app from './app.js';

const { PORT = 3000, DB_HOST } = process.env;

mongoose.connect(DB_HOST)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Database connection successful`)
        })
    })
    .catch(err => {
        console.log(err.message);
        process.exit(1);
    })