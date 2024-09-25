import React, { useState } from 'react';
import backgroundSignUp from '../assets/images/bgs.jpg';
import { Link, useNavigate } from 'react-router-dom';
import google from '../assets/images/google.png';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value, // Set the changing input's value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!data.success) {
        setLoading(false);
        setError(data.message); // Display error message from ApiError
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in'); // If everything is fine, navigate to sign-in
    } catch (error) {
      setLoading(false);
      setError(error.message); // Display general error message
    }
  };

  console.log(formData);

  return (
    <div
      className="flex flex-col justify-center items-center h-[92.5vh] w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundSignUp})` }}
      aria-label="Signup Background"
    >
      <div className="flex flex-col gap-4 justify-center items-center h-[35rem] w-[30rem] bg-slate-100 bg-opacity-50 p-6 rounded-lg">
        <h1 className="font-semibold text-5xl text-white">Sign Up</h1>

       
       

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            className="rounded-full bg-transparent border-2 border-white text-white placeholder-white focus:outline-none placeholder:text-lg p-3 w-[20rem]"
            id="username"
            type="text"
            placeholder="Username"
            onChange={handleChange}
          />

          <input
            className="rounded-full bg-transparent border-2 border-white text-white placeholder-white focus:outline-none placeholder:text-lg p-3 w-[20rem]"
            id="email"
            type="text"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            className="rounded-full bg-transparent border-2 border-white text-white placeholder-white focus:outline-none placeholder:text-lg p-3 w-[20rem]"
            id="password"
            type="password" // Fixed to password input
            placeholder="Password"
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className="w-[20rem] rounded-full h-[3rem] hover:scale-105 transform transition-transform duration-200 ease-in-out hover:bg-zinc-700 hover:text-lg hover:text-white font-semibold bg-white"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          <button className="w-[20rem] p-2 border-2 rounded-full h-[3rem] hover:scale-105 transform transition-transform duration-200 ease-in-out hover:bg-zinc-400 hover:text-lg hover:text-black font-semibold bg-white">
            <span className="flex flex-row gap-12 items-center">
              <img className="w-7 h-7 items-center" src={google} title="Google icon" alt="" />
              Sign Up with Google
            </span>
          </button>
        </form>
        <div className="text-black flex font-semibold gap-2 mt-4">
          <h4>Already have an account?</h4>
          <Link to="/sign-in" className="text-white">
            Sign In
          </Link>
        </div>
        <div className="h-6"> 
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative w-[20rem] mb-5" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
