import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import {navlinks} from '../constants';
const Layout = ({ children }) => {
  const [isActive, setIsActive] = useState('dashboard');

  return (
    <div className='flex flex-row'>
      <div className='sm:flex hidden mr-10 relative'>
        <Sidebar isActive={isActive} setIsActive={setIsActive} navlinks={navlinks}/>
      </div>
      <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
        <Navbar isActive={isActive} setIsActive={setIsActive} navlinks={navlinks}/>
        {children}
      </div>
    </div>
  );
};


export default Layout;