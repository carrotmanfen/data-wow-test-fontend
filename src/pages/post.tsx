// pages/posts.tsx
import AppBar from '@/components/appBar';
import React, { useEffect } from 'react';
import { usePost } from '@/hooks/usePost';

const Posts: React.FC = () => {
    const { data, isPending, error, getAllFollowingPost } = usePost();

    useEffect(() => {
        if (data.length === 0) {
            getAllFollowingPost();
        }
      }, [data, getAllFollowingPost]);

  return (
    <div className="flex flex-col w-screen h-screen items-center min-h-screen">
        <AppBar />
      <h1 className="mb-4 text-3xl font-bold mt-8">Posts</h1>
      {data!=null?<ul className="bg-white border rounded-lg shadow-md w-1/3">
        {data.map((post:any) => (
          <li key={post._id} className="flex flex-col justify-between p-4 border-b last:border-b-0 w-full">
            <p className="text-lg font-semibold">{post.text}</p>
            <p className="text-sm ">Posted by: {post.postBy}</p>
            <p className="text-sm ">Date: {new Date(post.date).toLocaleString()}</p>

            {post.comments.length > 0 && (
              <div className="mt-4">
                <h4 className="text-md font-bold">Comments:</h4>
                <ul className="mt-2 space-y-2">
                  {post.comments.map((comment:any) => (
                    <li key={comment._id} className="p-3 bg-gray-100 rounded-lg">
                      <p className="text-sm ">{comment.text}</p>
                      <p className="text-xs ">Commented by: {comment.commentBy}</p>
                      <p className="text-xs ">{new Date(comment.date).toLocaleString()}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className='flex flex-row w-full'>
                <input type="text" placeholder="Add comment" className="mt-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-hoverPrimary focus:border-hoverPrimary" />
                <button className='mt-4 ml-2 px-3 py-2 text-white bg-primary rounded-lg hover:bg-hoverPrimary focus:outline-none focus:ring-2 focus:ring-hoverPrimary focus:ring-offset-2'>Add</button>
            </div>
          </li>
        ))}
      </ul>:<p>Loading...</p>}
    </div>
  );
};

export default Posts;
