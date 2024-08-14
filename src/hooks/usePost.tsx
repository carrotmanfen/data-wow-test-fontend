import { useCallback, useEffect, useState } from "react";
import axiosWithHandlerAccessToken from "./axios/axiosInterceptor";
import axios, { AxiosResponse } from "axios";

interface CreatePostParams {
    text: string;
}

interface EditPostParams {
    postId:string;
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

        const findPost = useCallback(
            async (name:string) => {
                setIsPending(true);
                setError(false);
                try {
                    if (!url) {
                        throw new Error('url is not defined');
                    }
                    const response = await axios.get(url + 'posts/' + name,
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
        
        const deletePost = useCallback(
            async (postId: string) => {
                setIsPending(true);
                setError(false);
                try {
                    if (!url) {
                        throw new Error('url is not defined');
                    }
                    const response = await axios.delete(url + 'posts/deletePost/' + postId,
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

        const editPost = useCallback(
            async (editPostParam:EditPostParams) => {
                setIsPending(true);
                setError(false);
                try {
                    if (!url) {
                        throw new Error('url is not defined');
                    }
                    const response = await axios.patch(url + 'posts/editPost/' + editPostParam.postId,
                        {
                            text: editPostParam.text,
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

        const commentPost = useCallback(
            async (postId:string, text:string) => {
                setIsPending(true);
                setError(false);
                try {
                    if (!url) {
                        throw new Error('url is not defined');
                    }
                    const response = await axios.patch(url + 'posts/comment/' + postId,
                        {
                            text: text,
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
        
        const deleteComment = useCallback(
            async (postId:string, commentId:string) => {
                setIsPending(true);
                setError(false);
                try {
                    if (!url) {
                        throw new Error('url is not defined');
                    }
                    const response = await axios.patch(url + 'posts/deleteComment/' + postId ,
                        {
                            comment_id: commentId,
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
        data, isPending, error,getAllFollowingPost, getMyPost, myData, addPost, deletePost, editPost, commentPost, deleteComment, findPost
    }
}