import express from 'express';
import { getApodController } from './apod.controller.js';

const router = express.Router();

router.get('/', getApodController);

export default router; 