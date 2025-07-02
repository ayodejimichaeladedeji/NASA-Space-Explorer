import axios from 'axios';
import CustomError from './customError.js';

class HttpClient{
    constructor(baseURL, headers = {}){
        this.baseURL = baseURL;
        this.client = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        });
    }

    async get(path, params = {}){
        try{
            console.log(`[GET] ${this.baseURL}${path}?${new URLSearchParams(params.params).toString()}`);
            const response = await this.client.get(path, params);
            return response.data;
        }
        catch(error){
            this.handleError(error);
        }
    }

    handleError(error){
        const status = error.response?.status;
        const errorMessage = error.response?.data?.message || error.message;
        const message = error.response?.data?.message || error.response?.data?.msg;
        throw new CustomError("HttpClientError", message, status, errorMessage);
    }
}

export default HttpClient;