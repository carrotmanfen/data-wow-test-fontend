import AppBar from '@/components/appBar';
import UserModal from '@/components/profile/userModal';
import { useFollow } from '@/hooks/useFollow';
import { useAccount } from '@/hooks/useAccount';
import React, { useEffect, useState } from 'react';

const Follow: React.FC = () => {
    const { data, isPending, error, getProfileAll, follow } = useFollow();
    const { userSearchData, isPending: isPendingSearch, error: errorSearch, getUserSearch } = useAccount();

    const [detailModalOpen, setDetailModalOpen] = useState(false);
    

    const openDetailModal = () => setDetailModalOpen(true);
    const closeDetailModal = () => setDetailModalOpen(false);


    const handleFollow = async (name: string) => {
        await follow(name);
        await getProfileAll();
    }

    const handleSearch = async (name: string) => {
        await getUserSearch(name);
        console.log(userSearchData);
        openDetailModal();
    }

    const handleSeeProfile = async () => {
        window.location.href = '/profile?search=' + userSearchData.name;
    }

    useEffect(() => {
        if (data == null) {
            getProfileAll();
        }
    }, [data, getProfileAll]);

    return (
        <div className="flex flex-col w-screen h-screen items-center min-h-screen">
            <AppBar />
            <h1 className="mb-4 text-3xl font-bold mt-8">User List</h1>
            {data != null ?
                <ul className="bg-white border rounded-lg shadow-md w-1/3">
                    {data.map((user: any) => (
                        <li key={user._id} className="flex flex-row justify-between p-4 border-b last:border-b-0">
                            <div className="text-lg font-semibold cursor-pointer hover:underline"
                                onClick={() => {handleSearch(user.name)}}
                            >{user.name}</div>
                            <button className='text-lg font-semibold text-blue-600 hover:underline' onClick={() => handleFollow(user.name)}>Follow</button>
                        </li>
                    ))}
                </ul>
                : <p>Loading...</p>}
            {detailModalOpen&&userSearchData&&<UserModal name={userSearchData.name} following={userSearchData.following.length} followers={userSearchData.followers.length} onClose={closeDetailModal} seeProfile={handleSeeProfile}/>}
        </div>
    );
};

export default Follow;