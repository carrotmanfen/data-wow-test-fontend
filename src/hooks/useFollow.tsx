import { useCallback, useEffect, useState } from "react";
import axiosWithHandlerAccessToken from "./axios/axiosInterceptor";
import axios, { AxiosResponse } from "axios";

export function useFollow() {

    const [data, setData] = useState<any>(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(false);
    const url = process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL

        const getProfileAll = useCallback(
            async () => {
                setIsPending(true);
                setError(false);
                try {
                    if (!url) {
                        throw new Error('url is not defined');
                    }
                    const response = await axios.get(url + 'accounts/all',
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                            }
                        });
                    setData(response.data.results);
                    setIsPending(false);
                    return true;
                } catch (error) {
                    setError(true);
                    setIsPending(false);
                    return false;
                }
            }, [url]);


        const follow = useCallback(
            async(name:string) => {
                setIsPending(true);
                setError(false);
                try {
                    if (!url) {
                        throw new Error('url is not defined');
                    }
                    const response = await axios.patch(url + 'accounts/follow/'+name,
                        {name: name},
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                            }
                        });
                    console.log(response.data.results);
                    setIsPending(false);
                    return true;
                } catch (error) {
                    setError(true);
                    setIsPending(false);
                    return false;
                }
            }, [url]);

    const unFollow = useCallback(
        async(name:string) => {
            setIsPending(true);
            setError(false);
            try {
                if (!url) {
                    throw new Error('url is not defined');
                }
                const response = await axios.patch(url + 'accounts/unfollow/'+name,
                    {name: name},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                        }
                    });
                console.log(response.data.results);
                setIsPending(false);
                return true;
            } catch (error) {
                setError(true);
                setIsPending(false);
                return false;
            }
        }, [url]);

    return {
        data, isPending, error, getProfileAll, follow, unFollow
    }
}