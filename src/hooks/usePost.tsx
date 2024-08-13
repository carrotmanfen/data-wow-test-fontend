import { useCallback, useEffect, useState } from "react";
import axiosWithHandlerAccessToken from "./axios/axiosInterceptor";
import axios, { AxiosResponse } from "axios";

export function usePost() {

    const [data, setData] = useState<any>([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(false);
    const url = process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL

        const getAllFollowingPost = useCallback(
            async () => {
                setIsPending(true);
                setError(false);
                try {
                    if (!url) {
                        throw new Error('url is not defined');
                    }
                    const response = await axios.get(url + 'posts/allFollowing',
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




    return {
        data, isPending, error,getAllFollowingPost
    }
}