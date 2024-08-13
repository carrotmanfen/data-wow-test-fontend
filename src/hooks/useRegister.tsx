import { useCallback, useEffect, useState } from "react";
import axiosWithHandlerAccessToken from "./axios/axiosInterceptor";
import axios, { AxiosResponse } from "axios";


interface RegisterPrams {
    username: string;
    password: string;
    name: string;
}

export function useRegister() {

    const [data, setData] = useState<any>(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(false);
    const url = process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL

    const register = useCallback(
        async (registerPrams:RegisterPrams) => {
            setIsPending(true);
            setError(false);
            try {
                if (!url) {
                    throw new Error('url is not defined');
                }
                const response = await axios.post(url + 'accounts/register',
                    {username: registerPrams.username, password: registerPrams.password, name: registerPrams.name},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                setIsPending(false);
                return true;
            } catch (error) {
                setError(true);
                setIsPending(false);
                return false;
            }
        }, [url]);

// const refreshToken = useCallback(
//     async () => {
//         setIsPending(true);
//         setError(false);
//         try {
//             if (!url) {
//                 throw new Error('url is not defined');
//             }
//             const refreshToken = localStorage.getItem('refresh_token');
//             const accessToken = localStorage.getItem('access_token');
//             const response:AxiosResponse<LoginResponse> = await axios.post(url + '/authentication-admin-service/admin/authentication/refresh-token',
//                 {
//                     'refreshToken': refreshToken
//                 },
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         // 'Authorization': 'Bearer ' + accessToken 
//                         'Authorization': encodeBasicAuth(usernameEgat, passwordEgat)
//                     }
//                 });
//                 console.log('refreshToken');
//             setData(response.data.results);
//             setIsPending(false);
//             console.log('response.data.results.access_token', response.data.results.access_token);
//             return response.data.results.access_token;
//         } catch (error) {
            
//             setError(true);
//             setIsPending(false);
//             console.log('error', error);
//         }
//     }, [url]);

return {
    data,
    isPending,
    error,
    register
    // refreshToken
};
}