import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector
import Home from './pages/Home.jsx';
import SignIn from './pages/SignIn.jsx';
import Update from './pages/UpdateUser.jsx';
import SignUp from './pages/SignUp.jsx';
import Profile from './pages/Profile.jsx';
import Header from './components/Header.jsx';
import './whole.css';
import SideBar from './pages/SideBar.jsx';

export default function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div className="h-screen overflow-y-scroll no-scrollbar">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/about" 
            element={
              user?.firstName 
                ?<div className='flex'><SideBar /><Profile/></div> 
                :<div className='flex'><SideBar /><Update /></div>
            } 
          />
          <Route 
            path="/update" 
            element={
            <div className='flex'><SideBar /><Update /></div>
            } 
          />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}
