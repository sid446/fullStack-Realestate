import React, { useState, useRef, useEffect } from 'react';
import search from "../assets/images/search.png";
import addUser from "../assets/images/add-user.png"
import login from "../assets/images/log-in.png"
import { Link } from 'react-router-dom';

export default function Header() {
  const [searchOn, setSearchOn] = useState(false);
  const formRef = useRef(null);
  const middleDivRef = useRef(null);
  const searchRef=useRef(null);

  function handleSearchClick() {
    setSearchOn(!searchOn);
  }

  function handleClickOutside(event) {
    
    // If click is outside both the middle div and the search form
    if (
      formRef.current && !formRef.current.contains(event.target) &&
      middleDivRef.current && !middleDivRef.current.contains(event.target) &&
      searchRef.current && !searchRef.current.contains(event.target)

    ) {
        console.log('event.target', event.target)
        console.log('middleDivRef.current',middleDivRef.current)
      setSearchOn(false);
    }
  }
  // Handle closing the search bar when clicking outside
  useEffect(() => {


    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className='bg-slate-200 shadow-md'>
        <div className='flex flex-wrap justify-between items-center mx-auto p-3'>
          {/* Empty div for centering */}
          <div className='flex-1'></div>

          <div ref={middleDivRef} className='flex justify-center items-center flex-1'>
            <h1 className='font-bold text-sm sm:text-xl'>
              <span className='text-slate-500 text-2xl'>B</span>
              <span className='text-slate-700'>&</span>
              <span className='text-slate-500 text-2xl'>B</span>
            </h1>
          </div>

          <div className='flex justify-end items-center flex-1'>
          <ul className="flex ">
            <Link to='/sign-in'>
              <img src={login} className='w-5 h-5 cursor-pointer mx-5 ' alt="" />
            </Link>
            
          </ul>

            <img ref={searchRef}
              className='w-5 h-5 cursor-pointer '
              onClick={handleSearchClick}
              src={search}
              alt="Search"
            />
          </div>
        </div>
      </header>

      <form
        ref={formRef}
        className='bg-slate-400 transition-all duration-300 ease-in-out flex justify-center items-center overflow-hidden'
        style={{ height: searchOn ? "3rem" : "0px" }}
      >
        <input
          type="text"
          style={{ visibility: searchOn ? "visible" : "hidden" }}
          className="w-[20rem] p-1.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-50 h-[70%]"
          placeholder="Search...."
        />
      </form>
    </>
  );
}
          