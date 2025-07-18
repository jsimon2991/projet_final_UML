import axios from 'axios'
import { token } from './user'
const api = axios.create({ baseURL: 'http://localhost:4000/api' })
api.interceptors.request.use(config => {
  if (token.value) config.headers.Authorization = `Bearer ${token.value}`
  return config
})
export default api
