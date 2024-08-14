import React, { useState } from 'react';
import { useRouter } from 'next/router';


const AppBar: React.FC = () => {

    const router = useRouter();
    const path = router.asPath;

    const handleGoToPost = () => {
        window.location.href = '/post';
    }

    const handleGoToMyPost = () => {
        window.location.href = '/myPost';
    }

    const handleGoToFollow = () => {
        window.location.href = '/follow';
    }

    const handleGoToProfile = () => {
        window.location.href = '/profile';
    }

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
    }

    return (
        <nav className="bg-primary text-white w-full">
            <div className="container flex h-f items-center justify-between px-4 mx-auto">

                <div className="text-xl font-bold py-4 ">Data Wow Assignment (Social Media)</div>
                <div className='flex flex-row gap-8 h-full'>

                    <div onClick={handleGoToPost}
                        className={`text-xl h-full font-bold py-4 px-2 hover:text-hoverPrimary cursor-pointer ${path == "/post" ? 'bg-white text-black' : ''}`}
                    >Following Post</div>

                    <div onClick={handleGoToMyPost}
                        className={`text-xl h-full font-bold py-4 px-2 hover:text-hoverPrimary cursor-pointer ${path == "/myPost" ? 'bg-white text-black' : ''}`}
                    >My Post</div>

                    <div onClick={handleGoToFollow}
                        className={`text-xl h-full font-bold py-4 px-2 hover:text-hoverPrimary cursor-pointer ${path == "/follow" ? 'bg-white text-black' : ''}`}>Follow More</div>

                    <div onClick={handleGoToProfile}
                        className={`text-xl h-full font-bold py-4 px-2 hover:text-hoverPrimary cursor-pointer ${path == "/profile" ? 'bg-white text-black' : ''}`}>Profile</div>

                    <div onClick={handleLogout}
                        className={`text-xl h-full font-bold py-4 px-2 hover:text-primaryRed cursor-pointer `}>Logout</div>
                </div>

            </div>
        </nav>
    );
};

export default AppBar;