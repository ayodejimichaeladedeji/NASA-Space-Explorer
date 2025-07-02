import MarsRoversService from "./marsRovers.service.js";

const marsRoversService = new MarsRoversService();

export async function getRovers(req, res) {
  const rovers = await marsRoversService.getRovers();
  res.json(rovers);
}

export async function getActiveRovers(req, res) {
  const rovers = await marsRoversService.getActiveRovers();
  res.json(rovers);
}

export async function getManifest(req, res, next) {
  try {
    const { roverName } = req.params;
    const data = await marsRoversService.getManifest(roverName);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function getPhotosBySol(req, res, next) {
  try {
    const { roverName } = req.params;
    const { sol, camera, page } = req.query;
    const data = await marsRoversService.getPhotosBySol(
      roverName,
      sol,
      camera,
      page
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
}


export async function getPhotosByEarthDate(req, res, next){
  try {
    const { roverName } = req.params;
    const { earth_date, camera, page } = req.query;
    const data = await marsRoversService.getPhotosByEarthDate(roverName, earth_date, camera, page);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function getLatestPhotos(req, res, next){
  try {
    const { roverName } = req.params;
    const data = await marsRoversService.getLatestPhotos(roverName);
    res.json(data);
  } catch (error) {
    next(error);
  }
}