import axios from 'axios';

/**
 * Main API configuration with axios
 */
const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
});

/**
 * Fetch video information from a URL
 * @param {string} url - Video URL to extract information from
 * @returns {Promise<Object>} - Video metadata and available formats
 */
export const fetchInfo = (url) => API.post('/api/parse', { url });
