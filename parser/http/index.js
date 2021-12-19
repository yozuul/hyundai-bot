import axios from 'axios'

const BASE_URL='http://localhost:3000'

const $bot = axios.create({
   withCredentials: true,
   baseURL: `${BASE_URL}`
})

export { $bot }