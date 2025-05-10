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

/**
 * Download a video with specific format
 * @param {string} url - Video URL to download
 * @param {string} format - Format ID to download (optional)
 * @returns {Promise<Object>} - Download information including download URL
 */
export const downloadVideo = (url, format = 'best') => API.post('/api/download', { url, format });

/**
 * Get full download URL for a file
 * @param {string} relativePath - Relative path returned from the download endpoint
 * @returns {string} - Full URL to download the file
 */
export const getDownloadUrl = (relativePath) => {
  // Remove leading slash if present
  const path = relativePath.startsWith('/') ? relativePath.substring(1) : relativePath;
  return `${import.meta.env.VITE_BACKEND_URL}/${path}`;
};

/**
 * Check if a URL is valid for processing
 * @param {string} url - URL to validate
 * @returns {boolean} - Whether the URL is valid
 */
export const isValidVideoUrl = (url) => {
  if (!url) return false;
  
  try {
    // Create URL object to validate
    const urlObj = new URL(url);
    
    // Check if it's from a supported domain
    const supportedDomains = [
      'youtube.com', 
      'youtu.be', 
      'vimeo.com', 
      'dailymotion.com',
      'facebook.com',
      'twitch.tv',
      'twitter.com',
      'instagram.com'
    ];
    
    return supportedDomains.some(domain => urlObj.hostname.includes(domain));
  } catch (error) {
    return false;
  }
};
