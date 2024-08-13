import axios from 'axios';

const createAxiosInstance = (refreshToken:any) => {
    const instance = axios.create();

    instance.interceptors.request.use(
        (config) => {
            // Add any request configuration here if needed
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const newAccessToken = await refreshToken();
                    console.log('newAccessToken', newAccessToken);
                    instance.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
                    originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
                    return instance(originalRequest);
                } catch (refreshError) {
                    // Prevent retry loop by not retrying on token refresh failure
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );

    return instance;
};

const axiosWithHandlerAccessToken = async (refreshToken:any, config:any) => {
    const axiosInstance = createAxiosInstance(refreshToken);
    try {
        const response = await axiosInstance(config);
        return response;
    } catch (error) {
        throw error;
    }
};

export default axiosWithHandlerAccessToken;