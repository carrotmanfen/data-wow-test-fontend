import React,{useState} from 'react';

const MyPostAddModal: React.FC<{  onClose: any, addPost:any }> = ({  onClose, addPost }) => {
    const [text, setText] = useState("");
    const handleAddPost = async () => {
        await addPost(text);
        onClose();
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md h-100 p-6 bg-white border rounded-lg shadow-md overflow-hidden">
                <h3 className="mb-4 text-xl font-bold text-center">{"Add Post"}</h3>
                <form className="flex flex-col space-y-4">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="p-2 border rounded-lg focus:outline-none focus:ring-hoverPrimary focus:border-hoverPrimary"
                        placeholder="Write your post here"
                    ></textarea>
                </form>
                

                <button
                    onClick={handleAddPost}
                    className="w-full px-4 py-2 mt-4 text-white bg-primary rounded-lg hover:bg-hoverPrimary focus:outline-none focus:ring-2 focus:ring-hoverPrimary focus:ring-offset-2"
                >
                    Add Post
                </button>

                <button
                    onClick={onClose}
                    className="w-full px-4 py-2 mt-4 text-white bg-primaryRed rounded-lg hover:bg-hoverRed focus:outline-none focus:ring-2 focus:ring-hoverRed focus:ring-offset-2"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default MyPostAddModal;