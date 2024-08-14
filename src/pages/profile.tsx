import React, { useEffect, useState } from 'react';
import { useAccount } from '@/hooks/useAccount';
import Modal from '@/components/profile/modal';
import AppBar from '@/components/appBar';
import { useFollow } from '@/hooks/useFollow';
import { useDeleteAccount } from '@/hooks/useDeleteAccount';
import { useRecoilState } from 'recoil';
import { nameState } from '@/atoms/userRecoil';

const Profile: React.FC = () => {

    const { data, isPending, error, getProfile } = useAccount();

    const [name, setName] = useRecoilState(nameState);
    const { unFollow } = useFollow();
    const { deleteAccount } = useDeleteAccount();

    const [isFollowingModalOpen, setFollowingModalOpen] = useState(false);

    const openFollowingModal = () => setFollowingModalOpen(true);
    const closeFollowingModal = () => setFollowingModalOpen(false);

    const [isFollowerModalOpen, setFollowerModalOpen] = useState(false);

    const openFollowerModal = () => setFollowerModalOpen(true);
    const closeFollowerModal = () => setFollowerModalOpen(false);

    const handleUnFollow = async (name: string) => {
        await unFollow(name);
        await getProfile();
    }

    const handleDeleteAccount = async () => {
        const isDelete = await deleteAccount();
        if(isDelete){
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
        }
    }

    useEffect(() => {
        if (data === null) {
            getProfile();
        }else{
            setName(data.name);
            console.log(name);
        }
    }, [data]);

    return (
        <div className="flex flex-col w-screen h-screen items-center  min-h-screen">
            <AppBar />
            {data != null ? <div className="w-full max-w-lg p-6 bg-white border rounded-lg shadow-md mt-8">
                <h2 className="mb-4 text-2xl font-bold text-center text-gray-900">Profile</h2>
                <div className="mb-4">
                    <p className="text-sm font-medium">Username</p>
                    <p className="text-lg font-semibold">{data.username}</p>
                </div>
                <div className="mb-4">
                    <p className="text-sm font-medium ">Name</p>
                    <p className="text-lg font-semibold ">{data.name}</p>
                </div>
                <div className="mb-4">
                    <p className="text-sm font-medium ">Following</p>
                    <div className='flex flex-row w-full justify-between items-start'>
                        <p className="text-lg font-semibold ">{data.following.length}</p>
                        <button
                            onClick={openFollowingModal}
                            className="text-lg font-semibold text-blue-600 hover:underline"
                        >
                            {"see more"}
                        </button>
                    </div>
                </div>
                <div className="mb-4">
                    <p className="text-sm font-medium ">Followers</p>
                    <div className='flex flex-row w-full justify-between items-start'>
                        <p className="text-lg font-semibold ">{data.followers.length}</p>
                        <button
                            onClick={openFollowerModal}
                            className="text-lg font-semibold text-blue-600 hover:underline"
                        >
                            {"see more"}
                        </button>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button
                        onClick={() => {handleDeleteAccount()}}
                        className="text-lg font-semibold text-primaryRed hover:underline mt-8"
                    >
                        {"delete account"}
                    </button>
                </div>
            </div> : <div>Loading...</div>}
            {isFollowingModalOpen && (
                <Modal isFollowing={true} title="Following" data={data.following} onClose={closeFollowingModal} unFollow={handleUnFollow} />
            )}
            {isFollowerModalOpen && (
                <Modal isFollowing={false} title="Followers" data={data.followers} onClose={closeFollowerModal} unFollow={handleUnFollow} />
            )}
        </div>
    );
};

export default Profile;
