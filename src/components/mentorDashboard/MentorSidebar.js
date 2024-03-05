import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateAssessment from './CreateAssessment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faFile, faMessage, faStar, faUser } from '@fortawesome/free-regular-svg-icons';
import './mentor.css'

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
              <img src='/menu-svgrepo-com (1).svg' alt='menu' className='h-6 w-6'></img>
            </div>
          </div>
          <div className='svg'>
            <img src='/profile-round-1342-svgrepo-com.svg' alt='profile' className='h-[8rem] bg-white rounded ml-[3rem]'></img>
            <h2 className='mr-[3rem] mt-[1rem]'>Prince Hope</h2>
          </div>
          <ul className='mt-[2rem] mb-[3rem] divide-y divide-gray-700/50'>
            <li className='py-4 pr-4 hover:bg-gray-600'><Link to="/profile"><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> DASHBOARD</Link></li>
            <li className='py-4 pr-4 hover:bg-gray-600'><Link to="/create"><FontAwesomeIcon icon={faFile}></FontAwesomeIcon> CREATE ASSESSMENT</Link></li>
            <li className='py-4 pr-4 hover:bg-gray-600'><Link to="/mentor/invites"><FontAwesomeIcon icon={faMessage}></FontAwesomeIcon> INVITES</Link></li>
            <li className='py-4 pr-4 hover:bg-gray-600'><Link to="/mentor/grades"><FontAwesomeIcon icon={faStar}></FontAwesomeIcon> GRADES</Link></li>
            <li className='py-4 pr-4 hover:bg-gray-600'><Link to="/mentor/stats"><FontAwesomeIcon icon={faChartBar}></FontAwesomeIcon> STATISTICS</Link></li>
          </ul>
          <h2 className='mt-[30rem] py-4 pl-9 pr-4 hover:bg-gray-600'>LOGOUT</h2>
        </div>
        <div className='remaining-side w-full text-white'>
          <h2 className='font-bold text-3xl mt-[2rem]'>WECOME TO SKILLCODE</h2>
        </div>
      </div>
    </div>
  );
}

export default MentorSidebar;
