import HttpClient from "../../utils/httpClient.js";

class ApodService {
  constructor() {
    this.nasaClient = new HttpClient(process.env.NASA_BASE_API);
  }

  async getApod(date, start_date, end_date) {
    const params = {
      api_key: process.env.NASA_API_KEY,
    };

    if (start_date && end_date) {
      params.start_date = start_date;
      params.end_date = end_date;
    }

    if (date) {
      params.date = date;
    }

    return await this.nasaClient.get("/planetary/apod", { params });
  }
}

export default ApodService;