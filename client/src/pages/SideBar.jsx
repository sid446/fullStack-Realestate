import React from 'react';
import { useSelector } from 'react-redux'; // Import useSelector
import userg from "../assets/images/google.png"; // Import your avatar image

function SideBar() {
    const user = useSelector((state) => state.user.currentUser);

    return (
        <div className='bg-[] w-[15vw] h-[94vh]  flex flex-col items-center gap-2 p-5'>
            <img
                src={userg} // Ensure you have this image imported correctly
                alt="Avatar"
                className="w-[7rem] h-[7rem] rounded-full"
            />
            <p className='text-2xl text-black font-semibold'>{user?.username || "Username"}</p>

            <div className='mt-8'>
                <div className='hover:bg-zinc-200 p-2 text-pretty text-center border-2 border-b-0'>
                    <p className='text-black w-[15vw] font-semibold'>My Orders</p>
                </div>
                <div className='hover:bg-zinc-200 p-2 text-pretty text-center border-2'>
                    <p className='text-black w-[15vw] font-semibold'>My Address</p>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
