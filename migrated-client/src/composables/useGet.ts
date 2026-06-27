import { apiStatusStore } from '@/store/apiStatusStore';
import axios from 'axios';

interface UseGetOptions<T> {
  endpoint: string;
  successFunc?: (data: T) => void;  
  withError: boolean;
}

export async function useGet<T>({ endpoint, successFunc, withError }: UseGetOptions<T>): Promise<T | null> {
  const apiStore = apiStatusStore();
  let data: T | null = null; 

  console.log("use get called");

  try {
    apiStore.setLoading(true); 

    const response = await axios.get<T>(`https://sofii-vsly-pkta.onrender.com/api/sofii${endpoint}`, {
      withCredentials: true 
    }); 
    data = response.data; 

    console.log("Data:", data);

    if (data && successFunc) {
      successFunc(data); 
    }
  } catch (e) {
    console.error("ERROR:", e);
    if (withError) {
      apiStore.setError("Something went wrong...");
    }
  } finally {
    apiStore.setLoading(false); 
  }

  return data;
}
