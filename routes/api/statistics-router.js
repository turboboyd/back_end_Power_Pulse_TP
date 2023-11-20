import express from 'express';
import statistics from '../../controllers/statistics-controller.js';

const statisticsRouter = express.Router();

statisticsRouter.get('/', statistics.getStatistics);

export default statisticsRouter;