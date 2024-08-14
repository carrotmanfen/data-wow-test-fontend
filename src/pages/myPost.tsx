import AppBar from '@/components/appBar';
import React, { useEffect, useState } from 'react';
import { usePost } from '@/hooks/usePost';
import MyPostAddModal from '@/components/myPost/myPostAddModal';
import MyPostEditModal from '@/components/myPost/myPostEditModal';
import { useRecoilState } from 'recoil';
import { nameState } from '@/atoms/userRecoil';
import { useAccount } from '@/hooks/useAccount';

const MyPosts: React.FC = () => {
    const { isPending, error, getMyPost, myData, addPost, deletePost, editPost, commentPost, deleteComment } = usePost();
    const { data, getProfile } = useAccount();
    const [name, setName]= useRecoilState(nameState);

    const [isAddPostModalOpen, setAddPostModalOpen] = useState(false);

    const openAddPostModal = () => setAddPostModalOpen(true);
    const closeAddPostModal = () => setAddPostModalOpen(false);

    const [isEditPostModalOpen, setEditPostModalOpen] = useState(false);

    const openEditPostModal = () => setEditPostModalOpen(true);
    const closeEditPostModal = () => setEditPostModalOpen(false);

    const [editPostOldText, setEditPostOldText] = useState("");
    const [editPostOldId, setEditPostOldId] = useState("");

    const [commentText, setCommentText] = useState<{ [key: string]: string }>({});

    const handleCommentChange = (postId: string, value: string) => {
        setCommentText(prevState => ({ ...prevState, [postId]: value }));
    }

    const handleAddComment = async (postId: string) => {
        const text = commentText[postId];
        if (text) {
            await commentPost(postId, text);
            setCommentText(prevState => ({ ...prevState, [postId]: '' })); 
            await getMyPost();
        }
    }

    const handleAddPost = async (text: string) => {
        await addPost({ text });
        await getMyPost();
    }

    const handleDeletePost = async (postId: string) => {
        await deletePost(postId);
        await getMyPost();
    }

    const handleEditPostOpen = async (postId: string, text: string) => {
        openEditPostModal();
        setEditPostOldText(text);
        setEditPostOldId(postId);
    }

    const handleEditPost = async (postId: string, text: string) => {
        await editPost({ postId, text });
        await getMyPost();
    }

    const handleDeleteComment = async (postId: string, commentId: string) => {
        await deleteComment(postId, commentId);
        await getMyPost();
    }

    useEffect(() => {
        if (data === null) {
            getProfile();
        }else{
            setName(data.name);
            console.log(name);
        }
    }, [data]);

    useEffect(() => {
        if (myData.length === 0) {
            getMyPost();
        }
    }, [myData, getMyPost]);

    return (
        <div className="flex flex-col w-screen h-screen items-center min-h-screen">
            <AppBar />
            <h1 className="mb-4 text-3xl font-bold mt-8">My Posts</h1>
            <button onClick={openAddPostModal} className='px-3 py-2 text-white bg-primary rounded-lg hover:bg-hoverPrimary focus:outline-none focus:ring-2 focus:ring-hoverPrimary focus:ring-offset-2 mb-8'>Add Post</button>
            {myData != null ? <ul className="bg-white border rounded-lg shadow-md w-1/3">
                {myData.map((post: any) => (
                    <li key={post._id} className="flex flex-col justify-between p-4 border-b last:border-b-0 w-full">

                        <div className='flex flex-row justify-between'>
                            <p className="text-lg font-semibold break-all">{post.text}</p>

                            <button className="ml-auto px-3 py-2 text-white bg-primaryRed rounded-lg hover:bg-hoverRed focus:outline-none focus:ring-2 focus:ring-hoverRed focus:ring-offset-2"
                                onClick={() => { handleDeletePost(post._id) }}>Delete</button>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <p className="text-sm ">Posted by: {post.postBy}</p>
                            <button className="ml-auto px-3 py-2 text-white bg-primary rounded-lg hover:bg-hoverPrimary focus:outline-none focus:ring-2 focus:ring-hoverPrimary focus:ring-offset-2"
                                onClick={() => { handleEditPostOpen(post._id, post.text) }}>Edit</button>
                        </div>
                        <p className="text-sm ">Date: {new Date(post.date).toLocaleString()}</p>

                        {post.comments.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-md font-bold">Comments:</h4>
                                <ul className="mt-2 space-y-2">
                                    {post.comments.map((comment: any) => (
                                        <li key={comment._id} className="p-3 bg-gray-100 rounded-lg border">
                                            <div className='flex flex-row justify-between'>
                                                <p className="text-sm break-all">{comment.text}</p>
                                                {name==comment.commentBy?<button className="p-1 text-white text-sm bg-primaryRed rounded-lg hover:bg-hoverRed focus:outline-none focus:ring-2 focus:ring-hoverRed focus:ring-offset-2"
                                                    onClick={() => {handleDeleteComment(post._id, comment._id)}}>Delete Comment</button> : null}
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
            {isAddPostModalOpen && (
                <MyPostAddModal onClose={closeAddPostModal} addPost={handleAddPost} />
            )}
            {isEditPostModalOpen && (
                <MyPostEditModal onClose={closeEditPostModal} editPost={handleEditPost} oldText={editPostOldText} oldId={editPostOldId} />
            )}
        </div>
    );
};

export default MyPosts;
