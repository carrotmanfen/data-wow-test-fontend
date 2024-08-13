import React from 'react';


const Modal: React.FC<{ isFollowing: boolean, title: string, data: any, onClose: any, unFollow:any }> = ({ isFollowing, title, data, onClose, unFollow }) => {
    console.log(data);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md h-100 p-6 bg-white border rounded-lg shadow-md overflow-hidden">
                <h3 className="mb-4 text-xl font-bold text-center">{title}</h3>
                <div className="h-64 overflow-y-auto">
                    <ul className="mb-4">
                        {data.map((name: string, index: number) => (
                            <li key={index} className="py-2">
                                <div className='flex flex-row justify-between px-3'>
                                    {name}
                                {isFollowing&&<button onClick={()=>unFollow(name)} className='text-md font-semibold text-blue-600 hover:underline'>Unfollow</button>}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <button
                    onClick={onClose}
                    className="w-full px-4 py-2 mt-4 text-white bg-primary rounded-lg hover:bg-hoverPrimary focus:outline-none focus:ring-2 focus:ring-hoverPrimary focus:ring-offset-2"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;