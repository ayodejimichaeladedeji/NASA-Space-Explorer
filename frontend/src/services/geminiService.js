import axios from 'axios';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

export async function getRandomFacts(){
    const response = await httpClient.get('/gemini/random_facts');
    return response.data;
}