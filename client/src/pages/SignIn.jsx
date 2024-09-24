import React from 'react';
import backgroundSignUp from '../assets/images/bgs.jpg';
import { Link } from 'react-router-dom';
import google from '../assets/images/google.png'

export default function SignIn() {
  return (
    <div
  className=" flex flex-col justify-center items-center h-[92.5vh] w-full bg-cover bg-center" style={{ backgroundImage: `url(${backgroundSignUp})` }} aria-label="Signup Background">

   <div className=' flex flex-col gap-6 justify-center items-center  h-[35rem] w-[30rem] bg-slate-100 bg-opacity-50'>
    <h1 className='font-semibold text-5xl  text-white '>Sign In</h1>
    <form className='flex flex-col gap-5' action="">
    
    <input className='rounded-full bg-transparent border-2 border-white text-white placeholder-white focus:outline-none placeholder:text-lg  p-3 w-[20rem]' id='email' type="text" placeholder='email' />
    
    
    <input className='rounded-full  bg-transparent border-2 border-white text-white placeholder-white focus:outline-none placeholder:text-lg   p-3 w-[20rem]' id='password' type="text" placeholder='Password' />
    
    <button className='w-[20rem]   rounded-full h-[3rem] hover:scale-105 transform transition-transform duration-200  ease-in-out hover:bg-zinc-700 hover:text-lg hover:text-white  font-semibold bg-white'>Sign In</button>
   <button className='w-[20rem] p-2  border-2 rounded-full h-[3rem] hover:scale-105 transform  transition-transform duration-200  ease-in-out hover:bg-zinc-400 hover:text-lg hover:text-black  font-semibold bg-white'>
    <span className='flex flex-row gap-12 items-center '>
      <img className='w-7 h-7 items-center' src={google} title="google icons" alt="" />
      Sign In with google
    </span>
    </button>
    </form>

    
   <div className='text-black flex font-semibold gap-2'>
    <h4>Don't have account ?</h4>
    <Link to='/sign-up' className="text-white " >Sign Up</Link>
   </div>
   </div>
   
   
  </div>
  
  );
}

