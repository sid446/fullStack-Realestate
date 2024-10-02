import React, { useState } from 'react';
import userg from "../assets/images/google.png";
import { useDispatch,useSelector } from 'react-redux';
import { updateUserStart,updateUserFailure,updateUserSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function About() {
  const dispatch = useDispatch(); // Move useDispatch to the top
  const user = useSelector((state) => state.user.currentUser);

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState('male');
  const [country, setCountry] = useState('+1');
  const navigate = useNavigate();

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value, // Set the changing input's value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true at the beginning
    dispatch(updateUserStart()); // Call dispatch at the top

    try {
      const res = await fetch('/api/auth/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send the form data
      });

      const data = await res.json();
      console.log(data);
      if (!data.success) {
        dispatch(updateUserFailure(data.message)); // Call dispatch here
        setLoading(false); // Stop loading
        setError(data.message);
        return;
      }
      dispatch(updateUserSuccess(data.user)); // Call dispatch here
      setLoading(false); // Stop loading
      setError(null); // Clear any previous errors
      navigate('/about');
    } catch (error) {
      dispatch(updateUserFailure(error.message)); // Call dispatch here
      setLoading(false); // Stop loading
      setError(error.message);
    }
  };










  return (
    <> 
      
        {/* Sidebar */}
       
        <form onSubmit={handleSubmit}>
        {/* Main Content */}
        <div className="h-[100vh] w-[85vw] flex items-center justify-center bg-[#DEF2F1]">
          <div className="bg-[#3AAFA9] p-8 rounded-lg shadow-lg w-full max-w-lg">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">Personal Information</h1>
              
            </div>

            {/* First Name and Last Name */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label  className="block text-black">First name</label>
                <input onChange={handleChange}
                  type="text"
                  id='firstName'
                  placeholder={user.firstName ? user.firstName:"First Name"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-black">Last name</label>
                <input
                onChange={handleChange}
                  type="text"
                  id='lastName'
                  placeholder={user.lastName ? user.lastName:"Last Name"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-black">Email</label>
              <input
                type="email"
                placeholder={user.email}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Phone and DOB */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-black">Phone</label>
                <div className="flex">
                  <select
                    value={country}
                    onChange={handleCountryChange}
                    className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="+31">NL</option>
                    <option value="+1">USA</option>
                    <option value="+91">IND</option>
                    {/* Add more countries here */}
                  </select>
                  <input
                  onChange={handleChange}
                    type="tel"
                    id='mobile'
                    placeholder={user.mobile? user.mobile:"123 456"}
                    className="w-full px-4 py-2 border-t border-b border-r border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-black">Date of Birth</label>
                <input
                id='dob'
                onChange={handleChange}
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="flex justify-center mb-4">
              <button
                className={`w-32 py-2  rounded-l-md ${gender === 'male' ? 'bg-[#17242A] text-white' : 'bg-white'}`}
                onClick={() => setGender('male')}
              >
                Male
              </button>
              <button
                className={`w-32 py-2  rounded-r-md ${gender === 'female' ? 'bg-[#17242A] text-white' : 'bg-white'}`}
                onClick={() => setGender('female')}
              >
                Female
              </button>
            </div>

            {/* Save/Cancel Buttons */}
            <div className="flex justify-between mt-6">
              <button className="px-6 py-2 bg-[#17242A] text-white rounded-md">Save</button>
              <Link to="/about" className="px-6 py-2 bg-gray-200 rounded-md">Cancel</Link>
            </div>

            {/* Footer Note */}
            <div className="h-6"> 
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative w-[20rem] mb-5" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
        </div> 
          </div>
        </div>
        </form>
      
    </>
  );
}
