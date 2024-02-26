import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';


function MentorSidebar() {
    return (
    <div className='flex h-screen text-white'>
        <div className="w-64 bg-gray-800 flex-none hidden md:block">
            <h1 className='m-[2rem] font-bold text-xl text-[#EA501A]'>SKILLCODE</h1>
            <div className='svg'>
                <img src='/profile-user-svgrepo-com.svg' alt='profile' className='h-[8rem] bg-white rounded ml-[4rem]'></img>
            </div>
            <ul className='mt-[3.75rem] mb-[3rem] divide-y divide-gray-700/50'>
                <li className='py-4 pl-9 pr-4 hover:bg-gray-600'><Link to="/profile"> DASHBOARD</Link></li>
                <li className='py-4 pl-9 pr-4 hover:bg-gray-600'><Link to="/create"> CREATE ASSESSMENT</Link></li>
                <li className='py-4 pl-9 pr-4 hover:bg-gray-600'><Link to="/mentor/invites"> INVITES</Link></li>
                <li className='py-4 pl-9 pr-4 hover:bg-gray-600'><Link to="/mentor/grades"> GRADES</Link></li>

            </ul>
            <h2 className='mt-[30rem] py-4 pl-9 pr-4 hover:bg-gray-600'>LOGOUT</h2>
        </div>
        <div className='w-full text-black'>

        </div>
    </div>
  )
}

export default MentorSidebar