import React, { useState } from 'react';
import backgroundSignUp from '../assets/images/bgs.jpg';
import { Link, useNavigate } from 'react-router-dom';
import google from '../assets/images/google.png';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';

export default function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data); // Debugging line to check the response structure

      // Check for API response and handle success/failure
      if (!data.success) {
        dispatch(signInFailure(data.message));
        return;
      }

      // Ensure you're dispatching the correct user object
      dispatch(signInSuccess(data.user)); // Assuming data.user contains the user object
      navigate('/'); // Navigate after successful sign-in
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-[92.5vh] w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundSignUp})` }}
      aria-label="Signup Background"
    >
      <div className="flex flex-col gap-6 justify-center items-center h-[35rem] w-[30rem] bg-slate-100 bg-opacity-50">
        <h1 className="font-semibold text-5xl text-white">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            className="rounded-full bg-transparent border-2 border-white text-white placeholder-white focus:outline-none placeholder:text-lg p-3 w-[20rem]"
            id="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="rounded-full bg-transparent border-2 border-white text-white placeholder-white focus:outline-none placeholder:text-lg p-3 w-[20rem]"
            id="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            disabled={loading}
            className="w-[20rem] rounded-full h-[3rem] hover:scale-105 transform transition-transform duration-200 ease-in-out hover:bg-zinc-700 hover:text-lg hover:text-white font-semibold bg-white"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <button className="w-[20rem] p-2 border-2 rounded-full h-[3rem] hover:scale-105 transform transition-transform duration-200 ease-in-out hover:bg-zinc-400 hover:text-lg hover:text-black font-semibold bg-white">
          <span className="flex flex-row gap-12 items-center">
            <img
              className="w-7 h-7 items-center"
              src={google}
              alt="Google sign-in"
            />
            Sign In with Google
          </span>
        </button>

        <div className="text-black flex font-semibold gap-2">
          <h4>Don't have an account?</h4>
          <Link to="/sign-up" className="text-white">
            Sign Up
          </Link>
        </div>
        <div className="h-6">
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative w-[20rem] mb-5"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
