import axios, { AxiosInstance } from 'axios';

class ApiService {
  private apiClient: AxiosInstance;

  constructor(baseURL: string) {
    this.apiClient = axios.create({
      baseURL,
      timeout: 5000,
    });
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await this.apiClient.get(endpoint, {
        withCredentials: true 
    });

    return response.data;
  }

  async post<T>(endpoint: string, data: T) {
    const response = await this.apiClient.post(endpoint, data, {
        withCredentials: true 
    });
    return response.data;
  }
}

export const apiService = new ApiService('https://sofii-vsly-pkta.onrender.com/api/sofii');
