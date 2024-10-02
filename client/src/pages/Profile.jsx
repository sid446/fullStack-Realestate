import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {
    const user = useSelector((state) => state.user.currentUser);

    if (!user) {
        return <div className="text-center mt-20">Please log in to view your profile.</div>;
    }

    return (
        <div className="bg-[#DEF2F1] text-gray-700    w-[85vw]  h-[94vh] flex flex-col justify-center items-center font-sans">
          <div className="bg-[#3AAFA9] shadow-lg rounded-lg w-[66vw]  p-8 py-10 flex flex-col gap-4 justify-center items-center border-gray-200">
            <h1 className="font-bold text-3xl mb-6 text-[#17242A] ">Personal Information</h1>

            {/* Personal Information Box */}
           
                <div className="flex w-full justify-between mb-4">
                    <div>
                        <p className="font-bold text-sm text-[#17242A]  py-2">User Name</p> 
                        <div className="shadow-md border rounded-lg flex  items-center px-2 bg-white w-[30vw] h-[3rem] transition-all duration-300 hover:bg-zinc-200 hover:shadow-lg">
                            <p>{user.username}</p>
                        </div>
                    </div>
                    <div>
                        <p className="font-bold text-sm text-[#17242A]  py-2  ">Date of Birth</p> 
                        <div className="shadow-md border rounded-lg flex  items-center px-2 bg-white w-[30vw] h-[3rem] transition-all duration-300 hover:bg-zinc-200 hover:shadow-lg">
                            <p>{user.dob}</p>
                        </div>
                    </div>
                </div>

                <div className="flex w-full justify-between mb-4">
                    <div>
                        <p className="font-bold text-sm text-[#17242A]  py-2">First Name</p> 
                        <div className="shadow-md border rounded-lg flex  items-center px-2 bg-white w-[30vw] h-[3rem] transition-all duration-300 hover:bg-zinc-200 hover:shadow-lg">
                            <p>{user.firstName}</p>
                        </div>
                    </div>
                    <div>
                        <p className="font-bold text-sm text-[#17242A]  py-2">Last Name</p> 
                        <div className="shadow-md border rounded-lg flex  items-center px-2 bg-white w-[30vw] h-[3rem] transition-all duration-300 hover:bg-zinc-200 hover:shadow-lg">
                            <p>{user.lastName}</p>
                        </div>
                    </div>
                </div>

                <div className="flex w-full justify-between mb-4">
                    <div>
                        <p className="font-bold text-sm text-[#17242A]  py-2">Email</p> 
                        <div className="shadow-md border rounded-lg flex  items-center px-2 bg-white w-[30vw] h-[3rem] transition-all duration-300 hover:bg-zinc-200 hover:shadow-lg">
                            <p>{user.email}</p>
                        </div>
                    </div>
                    <div>
                        <p className="font-bold text-sm text-[#17242A]  py-2">Contact Number</p> 
                        <div className="shadow-md border rounded-lg flex  items-center px-2 bg-white w-[30vw] h-[3rem] transition-all duration-300 hover:bg-zinc-200 hover:shadow-lg">
                            <p>{user.mobile}</p>
                        </div>
                    </div>
                </div>
           

            {/* Edit Button */}
            <Link 
                to="/update" 
                className="relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-white border-2 border-white rounded-full hover:text-[#17242A]  group hover:bg-gray-50 transition-all duration-300 ease-out"
            >
                <span className="absolute left-0 block w-full h-0 transition-all bg-white  opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                </span>
                <span className="relative">Edit</span>
            </Link>
            </div >
        </div>
    );
};

export default Profile;
