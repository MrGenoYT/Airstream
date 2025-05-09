import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
})

export const fetchInfo = (url) => API.post('/api/parse', { url })
