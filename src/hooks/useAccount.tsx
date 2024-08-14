import { useCallback, useEffect, useState } from "react";
import axiosWithHandlerAccessToken from "./axios/axiosInterceptor";
import axios, { AxiosResponse } from "axios";

export function useAccount() {

    const [data, setData] = useState<any>(null);
    const [userSearchData, setUserSearchData] = useState<any>(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(false);


    const url = process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL

    const getProfile = useCallback(
        async () => {
            setIsPending(true);
            setError(false);
            try {
                if (!url) {
                    throw new Error('url is not defined');
                }
                const response = await axios.get(url + 'accounts/me',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                        }
                    });
                setData(response.data.results);
                console.log(response.data.results.name);
                console.log(name);
                setIsPending(false);
                return true;
            } catch (error) {
                setError(true);
                setIsPending(false);
                return false;
            }
        }, [url]);

    const getUserSearch = useCallback(
        async (name: string) => {
            setIsPending(true);
            setError(false);
            try {
                if (!url) {
                    throw new Error('url is not defined');
                }
                const response = await axios.get(url + 'accounts/find/' + name,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                        }
                    });
                setUserSearchData(response.data.results);
                setIsPending(false);
                return true;
            } catch (error) {
                setError(true);
                setIsPending(false);
                return false;
            }
        }, [url]);

    return {
        data, userSearchData, isPending, error, getProfile, getUserSearch
    }
}