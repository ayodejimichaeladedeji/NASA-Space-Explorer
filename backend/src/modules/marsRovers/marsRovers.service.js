import HttpClient from "../../utils/httpClient.js";

const rovers = ["curiosity", "opportunity", "spirit"];

class MarsRoversService {
  constructor() {
    this.nasaClient = new HttpClient(process.env.NASA_BASE_API);
  }

  async getRovers() {
    return await this.nasaClient.get(
      `/mars-photos/api/v1/rovers`,
      {
        params: {
          api_key: process.env.NASA_API_KEY,
        },
      }
    );
  }

  async getActiveRovers() {
    const rovers = await this.nasaClient.get(
      `/mars-photos/api/v1/rovers`,
      {
        params: {
          api_key: process.env.NASA_API_KEY,
        },
      }
    );

    return rovers.rovers.filter((rover) => rover.status === 'active');
  }

  async getManifest(roverName) {
    return await this.nasaClient.get(
      `/mars-photos/api/v1/manifests/${roverName}`,
      {
        params: {
          api_key: process.env.NASA_API_KEY,
        },
      }
    );
  }

  async getPhotosBySol(roverName, sol, camera, page = 1) {
    return await this.nasaClient.get(
      `/mars-photos/api/v1/rovers/${roverName}/photos`,
      {
        params: {
          sol: sol,
          page: page,
          camera: camera,
          api_key: process.env.NASA_API_KEY,
        },
      }
    );
  }

  async getPhotosByEarthDate(roverName, earth_date, camera, page = 1) {
    return await this.nasaClient.get(
      `/mars-photos/api/v1/rovers/${roverName}/photos`,
      {
        params: {
          page: page,
          camera: camera,
          earth_date: earth_date,
          api_key: process.env.NASA_API_KEY,
        },
      }
    );
  }

  async getLatestPhotos(roverName = rovers[0]) {
    return await this.nasaClient.get(
      `/mars-photos/api/v1/rovers/${roverName}/latest_photos`,
      {
        params: {
          api_key: process.env.NASA_API_KEY,
        },
      }
    );
  }
}

export default MarsRoversService;
