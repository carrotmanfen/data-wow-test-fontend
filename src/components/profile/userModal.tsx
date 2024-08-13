import React from 'react';

const UserModal: React.FC<{ name: string, following: number, followers:number, onClose: any }> = ({ name, following,followers, onClose }) => {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md h-54 p-6 bg-white border rounded-lg shadow-md overflow-hidden">
                <h3 className="mb-4 text-xl font-bold text-center">{name}</h3>
                <div className="h-16 overflow-y-auto">
                    <p>following: {following}</p>
                    <p>followers: {followers}</p>
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

export default UserModal;