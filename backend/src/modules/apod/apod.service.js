import HttpClient from "../../utils/httpClient.js";
import { withCache } from "../../utils/cacheWrapper.js";

class ApodService {
  constructor() {
    this.nasaClient = new HttpClient(process.env.NASA_BASE_API);
  }

  async getApod(date, start_date, end_date) {
    let ttl = 43200;
    const cacheKey = this._buildCacheKey(date, start_date, end_date);

    return await withCache(cacheKey, ttl, async () => {
      const params = {
        api_key: process.env.NASA_API_KEY,
      };
      
      if (start_date && end_date) {
        params.start_date = start_date;
        params.end_date = end_date;
        ttl = 86400;
      }

      if (date) {
        params.date = date;
      }

      return await this.nasaClient.get("/planetary/apod", { params });
    });
  }

  _buildCacheKey(date, start_date, end_date) {
    if (start_date && end_date) {
      return `apod_range:${start_date}:${end_date}`;
    }

    if (date) {
      return `apod_single:${date}`;
    }

    return `apod_latest`;
  }
}

export default ApodService;
