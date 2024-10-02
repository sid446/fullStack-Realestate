import React from 'react';
import { useSelector } from 'react-redux';

export default function Home() {
  const user = useSelector((state) => state.user.currentUser);
  console.log('user', user)

  // Check if user data exists
  if (!user) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Profile Page
          </h1>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 font-semibold">Username:</p>
              <p className="text-gray-900">{user.username}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Email:</p>
              <p className="text-gray-900">{user.email}</p> {/* Display user email */}
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Account Created At:</p>
              <p className="text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
