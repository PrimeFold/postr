import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const api = axios.create({
    baseURL: BASE_URL
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const response = await axios.post(`${BASE_URL}/refresh`, {}, {
                    withCredentials: true
                })

                const newToken = response.data.token
                localStorage.setItem('accessToken', newToken)
                originalRequest.headers.Authorization = `Bearer ${newToken}`

                return api(originalRequest)
            } catch (refreshError) {
                localStorage.removeItem('accessToken')
                window.location.href = '/login'
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)

export default api
