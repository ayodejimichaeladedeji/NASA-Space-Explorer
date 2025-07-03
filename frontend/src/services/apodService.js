import axios from 'axios';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

export async function getApod({ date, start_date, end_date }) {
    const params = {};

    if (date) {
      params.date = date;
    } else if (start_date && end_date) {
      params.start_date = start_date;
      params.end_date = end_date;
    }

    const response = await httpClient.get('/apod', { params });
    return response.data;
}