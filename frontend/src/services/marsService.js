import axios from 'axios';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

export async function getActiveRovers(){
    const response = await httpClient.get('/mars_rovers/rovers/active');
    return response.data;
}

export async function getLatestPhotosFromAMarsRover (roverName){
    const response = await httpClient.get(`/mars_rovers/photos/latest/${roverName}`);
    return response.data;
}

export async function getRoversManifest (roverName){
    const response = await httpClient.get(`/mars_rovers/manifest/${roverName}`);
    return response.data;
}

export async function getPhotosByEarthDate({ roverName, earth_date, camera }){
  const params = {};
  if(earth_date) params.earth_date = earth_date;
  if(camera) params.camera = camera;

  const response = await httpClient.get(`/mars_rovers/photos/earthDate/${roverName}`, { params })
  return response.data;
}

export async function getPhotosBySol({ roverName, sol, camera }){
  const params = {};
  if(sol) params.sol = sol;
  if(camera) params.camera = camera;

  const response = await httpClient.get(`/mars_rovers/photos/sol/${roverName}`, { params })
  return response.data;
}
