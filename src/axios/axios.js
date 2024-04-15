
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore()


const instance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers:{
    'Content-Type': 'application/json',
  }
});

// Function to make a POST request
const postData = async (url, data) => {

  try {
    const response = await instance.post(url, data);
    return response.data;
  } catch (error) {
    throw new Error(`Error posting data to ${url}: ${error.message}`);
  }
};

const patchData = async (url, data) => {
  const customHeaders = userStore.token ? {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${userStore.token}`,
  } : {
    'Content-Type': 'application/json',
  }

  try {
    const response = await instance.patch(url, data, {
      headers: customHeaders
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error posting data to ${url}: ${error.message}`);
  }
};

const getData = async (url) => {

  try {
    const customHeaders = userStore.token ? {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userStore.token}`,
    } : {
      'Content-Type': 'application/json',
    }
  
    console.log(customHeaders);

    await axios.get('http://localhost:8000/sanctum/csrf-cookie')

    const response = await instance.get(url, {
      headers: customHeaders,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error posting data to ${url}: ${error.message}`);
  }
};

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { instance, postData, getData, patchData };