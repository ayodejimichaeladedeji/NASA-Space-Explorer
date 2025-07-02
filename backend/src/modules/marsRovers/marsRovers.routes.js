import express from 'express';

import { getRovers, getActiveRovers, getManifest, getPhotosBySol, getPhotosByEarthDate, getLatestPhotos } from './marsRovers.controller.js';

const router = express.Router();

router.get('/rovers', getRovers);
router.get('/rovers/active', getActiveRovers);
router.get('/manifest/:roverName', getManifest);
router.get('/photos/sol/:roverName', getPhotosBySol);
router.get('/photos/earthDate/:roverName', getPhotosByEarthDate);
router.get('/photos/latest/:roverName', getLatestPhotos);

export default router; 