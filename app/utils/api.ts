import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { Platform } from 'react-native';

// Change this to your server URL
// For local development, use your computer's IP address or localhost
// For Android emulator: http://10.0.2.2:3000
// For iOS simulator: http://localhost:3000
// For physical device: http://YOUR_IP_ADDRESS:3000
const getApiUrl = () => {
  if (__DEV__) {
    // Android emulator uses 10.0.2.2 to access localhost
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:3000/api';
    }
    // iOS simulator can use localhost
    // For physical devices, replace with your computer's IP address
    // Example: return 'http://192.168.1.100:3000/api';
    return 'http://192.168.68.104:3000/api';
  }
  return 'http://192.168.68.104:3000/api';
};

const API_URL = getApiUrl();

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get token from storage
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    return token;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

// Save token to storage
export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('authToken', token);
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

// Remove token from storage
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

// Request interceptor to add token to headers
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const fullUrl = `${config.baseURL}${config.url}`;
    console.log('=== API Request ===');
    console.log('Full URL:', fullUrl);
    console.log('Method:', config.method?.toUpperCase());
    console.log('Platform:', Platform.OS);
    console.log('Base URL:', config.baseURL);
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);
    return response;
  },
  (error: AxiosError) => {
    console.error('API Request Error:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('API URL being used:', API_URL);
    console.error('Platform:', Platform.OS);
    
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const data: any = error.response.data;
      const errorMessage = data?.message || data?.error || `Server error: ${status}`;
      console.error('API Error Response:', data);
      return Promise.reject(new Error(errorMessage));
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received. Request details:', {
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        method: error.config?.method,
      });
      
      let errorMessage = 'Cannot connect to server.\n\n';
      errorMessage += `Platform: ${Platform.OS}\n`;
      errorMessage += `API URL: ${API_URL}\n\n`;
      errorMessage += 'Please check:\n';
      errorMessage += '1. Is the server running? (cd server && npm run dev)\n';
      errorMessage += '2. Is MongoDB running?\n';
      
      if (Platform.OS === 'android') {
        errorMessage += '3. For Android emulator, using http://10.0.2.2:3000/api\n';
      } else if (Platform.OS === 'ios') {
        errorMessage += '3. For iOS simulator, using http://localhost:3000/api\n';
        errorMessage += '4. For physical device, update API_URL with your computer IP\n';
      }
      
      return Promise.reject(new Error(errorMessage));
    } else {
      // Something else happened
      console.error('Error setting up request:', error.message);
      return Promise.reject(new Error(error.message || 'Network request failed. Please try again.'));
    }
  }
);

// Auth API calls
export const authAPI = {
  signup: async (name: string, email: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/signup', {
        name,
        email,
        password,
      });
      
      const data = response.data;
      
      if (data.success && data.data?.token) {
        await saveToken(data.data.token);
      }
      
      return data;
    } catch (error: any) {
      throw error;
    }
  },

  login: async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });
      
      const data = response.data;
      
      if (data.success && data.data?.token) {
        await saveToken(data.data.token);
      }
      
      return data;
    } catch (error: any) {
      throw error;
    }
  },

  getMe: async () => {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  logout: async () => {
    await removeToken();
  },
};

