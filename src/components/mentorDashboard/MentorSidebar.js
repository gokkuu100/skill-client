import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateAssessment from './CreateAssessment';

function MentorSidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <div className={`flex h-screen text-white ${isSidebarOpen ? 'translate-x-0' : 'translate-x-[-198px]'} transition-transform`}>
        <div className="w-[20rem] bg-gray-800 transform md:transform-none md:block">
          <div className='flex items-center justify-between p-4'>
            <div>
              <h1 className='font-bold text-xl text-[#EA501A]'>
                <span className="pr-2">SKILLCODE</span>
              </h1>
            </div>
            <div className='cursor-pointer' onClick={toggleSidebar}>
              <img src='/menu-svgrepo-com.svg' alt='menu' className='h-6 w-6'></img>
            </div>
          </div>
          <div className='svg'>
            <img src='/profile-user-svgrepo-com.svg' alt='profile' className='h-[8rem] bg-white rounded ml-[3rem]'></img>
          </div>
          <ul className='mt-[3.75rem] mb-[3rem] divide-y divide-gray-700/50'>
            <li className='py-4 pr-4 hover:bg-gray-600'><Link to="/profile"> DASHBOARD</Link></li>
            <li className='py-4 pr-4 hover:bg-gray-600'><Link to="/create"> CREATE ASSESSMENT</Link></li>
            <li className='py-4 pr-4 hover:bg-gray-600'><Link to="/mentor/invites"> INVITES</Link></li>
            <li className='py-4 pr-4 hover:bg-gray-600'><Link to="/mentor/grades"> GRADES</Link></li>
            <li className='py-4 pr-4 hover:bg-gray-600'><Link to="/mentor/stats"> STATISTICS</Link></li>
          </ul>
          <h2 className='mt-[30rem] py-4 pl-9 pr-4 hover:bg-gray-600'>LOGOUT</h2>
        </div>
        <div className='remaining-side w-full'>
         <CreateAssessment />
        </div>
      </div>
    </div>
  );
}

export default MentorSidebar;
