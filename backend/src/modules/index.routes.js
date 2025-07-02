import express from 'express';
import apodRoutes from './apod/apod.routes.js'
import marsRoversRoutes from './marsRovers/marsRovers.routes.js'
import GeminiRoutes from './gemini/gemini.routes.js';

const router = express.Router();

router.use('/apod', apodRoutes);
router.use('/gemini', GeminiRoutes);
router.use('/mars_rovers', marsRoversRoutes);

export default router; 