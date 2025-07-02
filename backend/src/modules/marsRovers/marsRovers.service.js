// import HttpClient from "../../utils/httpClient.js";

// class MarsRoversService {
//   constructor() {
//     this.nasaClient = new HttpClient(process.env.NASA_BASE_API);
//   }

//   async getRovers() {
//     return await this.nasaClient.get(
//       `/mars-photos/api/v1/rovers`,
//       {
//         params: {
//           api_key: process.env.NASA_API_KEY,
//         },
//       }
//     );
//   }

//   async getActiveRovers() {
//     const rovers = await this.nasaClient.get(
//       `/mars-photos/api/v1/rovers`,
//       {
//         params: {
//           api_key: process.env.NASA_API_KEY,
//         },
//       }
//     );

//     return rovers.rovers.filter((rover) => rover.status === 'active');
//   }

//   async getManifest(roverName) {
//     return await this.nasaClient.get(
//       `/mars-photos/api/v1/manifests/${roverName}`,
//       {
//         params: {
//           api_key: process.env.NASA_API_KEY,
//         },
//       }
//     );
//   }

//   async getPhotosBySol(roverName, sol, camera, page = 1) {
//     return await this.nasaClient.get(
//       `/mars-photos/api/v1/rovers/${roverName}/photos`,
//       {
//         params: {
//           sol: sol,
//           page: page,
//           camera: camera,
//           api_key: process.env.NASA_API_KEY,
//         },
//       }
//     );
//   }

//   async getPhotosByEarthDate(roverName, earth_date, camera, page = 1) {
//     return await this.nasaClient.get(
//       `/mars-photos/api/v1/rovers/${roverName}/photos`,
//       {
//         params: {
//           page: page,
//           camera: camera,
//           earth_date: earth_date,
//           api_key: process.env.NASA_API_KEY,
//         },
//       }
//     );
//   }

//   async getLatestPhotos(roverName = rovers[0]) {
//     return await this.nasaClient.get(
//       `/mars-photos/api/v1/rovers/${roverName}/latest_photos`,
//       {
//         params: {
//           api_key: process.env.NASA_API_KEY,
//         },
//       }
//     );
//   }
// }

// export default MarsRoversService;

import HttpClient from "../../utils/httpClient.js";
import { withCache } from "../../utils/cacheWrapper.js";

const rovers = ["curiosity", "opportunity", "spirit"];

class MarsRoversService {
  constructor() {
    this.nasaClient = new HttpClient(process.env.NASA_BASE_API);
  }

  getRovers() {
    const ttl = 43200;
    const cacheKey = `rovers_all`;
    return withCache(cacheKey, ttl, () =>
      this.nasaClient.get(`/mars-photos/api/v1/rovers`, {
        params: { api_key: process.env.NASA_API_KEY },
      })
    );
  }

  async getActiveRovers() {
    const ttl = 43200;
    const cacheKey = `rovers_active`;
    const data = await withCache(cacheKey,ttl, () =>
      this.nasaClient.get(`/mars-photos/api/v1/rovers`, {
        params: { api_key: process.env.NASA_API_KEY },
      })
    );
    return data.rovers.filter((rover) => rover.status === "active");
  }

  getManifest(roverName) {
    const ttl = 43200;
    const cacheKey = `manifest_${roverName}`;
    return withCache(cacheKey, ttl, () =>
      this.nasaClient.get(`/mars-photos/api/v1/manifests/${roverName}`, {
        params: { api_key: process.env.NASA_API_KEY },
      })
    );
  }

  getPhotosBySol(roverName, sol, camera, page = 1) {
    const ttl = 43200;
    const cacheKey = `photos_sol_${roverName}_${sol}_${camera}_${page}`;
    return withCache(cacheKey, ttl, () =>
      this.nasaClient.get(
        `/mars-photos/api/v1/rovers/${roverName}/photos`,
        {
          params: {
            sol,
            page,
            camera,
            api_key: process.env.NASA_API_KEY,
          },
        }
      )
    );
  }

  getPhotosByEarthDate(roverName, earth_date, camera, page = 1) {
    const ttl = 43200;
    const cacheKey = `photos_earthDate_${roverName}_${earth_date}_${camera}_${page}`;
    return withCache(cacheKey, ttl, () =>
      this.nasaClient.get(
        `/mars-photos/api/v1/rovers/${roverName}/photos`,
        {
          params: {
            page,
            camera,
            earth_date,
            api_key: process.env.NASA_API_KEY,
          },
        }
      )
    );
  }

  getLatestPhotos(roverName = rovers[0]) {
    const ttl = 43200;
    const cacheKey = `photos_latest_${roverName}`;
    return withCache(cacheKey, ttl, () =>
      this.nasaClient.get(
        `/mars-photos/api/v1/rovers/${roverName}/latest_photos`,
        {
          params: { api_key: process.env.NASA_API_KEY },
        }
      )
    );
  }
}

export default MarsRoversService;
