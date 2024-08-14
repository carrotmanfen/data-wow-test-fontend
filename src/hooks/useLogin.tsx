import { useCallback, useEffect, useState } from "react";
import axiosWithHandlerAccessToken from "./axios/axiosInterceptor";
import axios, { AxiosResponse } from "axios";

interface LoginPrams {
    username: string;
    password: string;
}


export function useLogin() {

    const [data, setData] = useState<any>(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(false);
    const url = process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL

    const login = useCallback(
        async (loginParams:LoginPrams) => {
            setIsPending(true);
            setError(false);
            try {
                if (!url) {
                    throw new Error('url is not defined');
                }
                const response = await axios.post(url + 'auth/login',
                    {username: loginParams.username, password: loginParams.password},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                setData(response.data.results);
                if(response.data.results.access_token){
                    localStorage.setItem('access_token', response.data.results.access_token);
                }
                if(response.data.results.refresh_token){
                    localStorage.setItem('refresh_token', response.data.results.refresh_token);
                }
                setIsPending(false);
                return true;
            } catch (error) {
                setError(true);
                setIsPending(false);
                return false;
            }
        }, [url]);


    return {
        data,
        isPending,
        error,
        login,
        
    };
}