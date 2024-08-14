
import AppBar from '@/components/appBar';
import React, { useEffect, useState } from 'react';
import { usePost } from '@/hooks/usePost';
import { useRecoilState } from 'recoil';
import { nameState } from '@/atoms/userRecoil';
import { useAccount } from '@/hooks/useAccount';

const AccountPage: React.FC = () => {
    const { data, isPending, error, findPost, commentPost, deleteComment } = usePost();
    const { data: userData, getProfile } = useAccount();
    const [name, setName] = useRecoilState(nameState);

    const [commentText, setCommentText] = useState<{ [key: string]: string }>({});

    const [searchName, setSearchName] = useState('');

    const handleCommentChange = (postId: string, value: string) => {
        setCommentText(prevState => ({ ...prevState, [postId]: value }));
    }

    const handleAddComment = async (postId: string) => {
        const text = commentText[postId];
        if (text) {
            await commentPost(postId, text);
            setCommentText(prevState => ({ ...prevState, [postId]: '' }));
            await findPost(searchName);
        }
    }

    const handleDeleteComment = async (postId: string, commentId: string) => {
        await deleteComment(postId, commentId);
        await findPost(searchName);
    }

    useEffect(() => {
        if (userData === null) {
            getProfile();
        } else {
            setName(userData.name);
            console.log(name);
        }
    }, [userData]);

    useEffect(() => {
        if (data.length === 0) {
            const searchParams = new URLSearchParams(window.location.search);
            const search = searchParams.get('search');
            setSearchName(search || '');
            console.log(search);
            findPost(search||'');
        }
    }, [data, findPost]);

    return (
        <div className="flex flex-col w-screen h-screen items-center min-h-screen">
            <AppBar />
            <h1 className="mb-4 text-3xl font-bold mt-8">Posts of {searchName}</h1>
            {data != null ? <ul className="bg-white border rounded-lg shadow-md w-1/3">
                {data.map((post: any) => (
                    <li key={post._id} className="flex flex-col justify-between p-4 border-b last:border-b-0 w-full">
                        <p className="text-lg font-semibold">{post.text}</p>
                        <p className="text-sm ">Posted by: {post.postBy}</p>
                        <p className="text-sm ">Date: {new Date(post.date).toLocaleString()}</p>

                        {post.comments.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-md font-bold">Comments:</h4>
                                <ul className="mt-2 space-y-2">
                                    {post.comments.map((comment: any) => (
                                        <li key={comment._id} className="p-3 bg-gray-100 rounded-lg border">
                                            <div className='flex flex-row justify-between'>
                                                <p className="text-sm break-all">{comment.text}</p>
                                                {name == comment.commentBy ? <button className="p-1 text-white text-sm bg-primaryRed rounded-lg hover:bg-hoverRed focus:outline-none focus:ring-2 focus:ring-hoverRed focus:ring-offset-2"
                                                    onClick={() => { handleDeleteComment(post._id, comment._id) }}>Delete Comment</button> : null}
                                            </div>
                                            <p className="text-xs ">Commented by: {comment.commentBy}</p>
                                            <p className="text-xs ">{new Date(comment.date).toLocaleString()}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className='flex flex-row w-full'>
                            <input type="text" placeholder="Add comment" className="mt-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-hoverPrimary focus:border-hoverPrimary" onChange={(e) => handleCommentChange(post._id, e.target.value)} value={commentText[post._id] || ''} />
                            <button className='mt-4 ml-2 px-3 py-2 text-white bg-primary rounded-lg hover:bg-hoverPrimary focus:outline-none focus:ring-2 focus:ring-hoverPrimary focus:ring-offset-2' onClick={() => { handleAddComment(post._id) }}>Add</button>
                        </div>
                    </li>
                ))}
            </ul> : <p>Loading...</p>}
        </div>
    );
};

export default AccountPage;
