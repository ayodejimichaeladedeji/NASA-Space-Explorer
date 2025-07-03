import express from 'express';
import { generateSpaceFactsController } from './gemini.controller.js';

const router = express.Router();

router.get('/random_facts', generateSpaceFactsController);


export default router; 