import { useCallback, useEffect, useState } from "react";
import axiosWithHandlerAccessToken from "./axios/axiosInterceptor";
import axios, { AxiosResponse } from "axios";

interface CreatePostParams {
    text: string;
}

export function usePost() {

    const [data, setData] = useState<any>([]);
    const [myData, setMyData] = useState<any>([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(false);
    const url = process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL

        const getMyPost = useCallback(
            async () => {
                setIsPending(true);
                setError(false);
                try {
                    if (!url) {
                        throw new Error('url is not defined');
                    }
                    const response = await axios.get(url + 'posts/me',
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                            }
                        });
                    setMyData(response.data.results);
                    setIsPending(false);
                    return true;
                } catch (error) {
                    setError(true);
                    setIsPending(false);
                    return false;
                }
            }, [url]);

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

        const addPost = useCallback(
            async (createPostParams: CreatePostParams) => {
                setIsPending(true);
                setError(false);
                try {
                    if (!url) {
                        throw new Error('url is not defined');
                    }
                    const response = await axios.post(url + 'posts/createPost',
                        {
                            text: createPostParams.text,
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
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




    return {
        data, isPending, error,getAllFollowingPost, getMyPost, myData, addPost
    }
}