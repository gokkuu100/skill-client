import React, { useEffect, useState } from 'react'
import Profile from './Profile'
import { Link, useNavigate } from 'react-router-dom'
import Assessment from './Assessment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import Invites from './Invites';
import Grades from './Grades';
import NotAuthorized from '../NotAuthorized';
import Logout from '../Logout';


function Sidebar() {
  const navigate = useNavigate()
  const [inviteCount, setInviteCount] = useState(0)
  
  return (
    <div className='flex h-screen text-white'>
        <div className="w-64 bg-gray-800 flex-none hidden md:block">
            <h1 className='m-[2rem] font-bold text-xl text-[#EA501A]'>SKILLCODE</h1>
            <ul className='mt-[3.75rem] mb-[3rem] divide-y divide-gray-700/50'>
              <li className='py-4 pl-9 pr-4 hover:bg-gray-600'><Link to="/profile"><FontAwesomeIcon icon={faUser} /> PROFILE</Link></li>
              <li className='py-4 pl-9 pr-4 hover:bg-gray-600'><Link to='/assessment'>ASSESSMENTS</Link></li>
              <li className='py-4 pl-9 pr-4 hover:bg-gray-600'><Link to='/grades'>GRADES</Link></li>
              <li className='py-4 pl-9 pr-4 hover:bg-gray-600'><Link to='/invites'>INVITES {inviteCount > 0 && <span className='bg-red-500 text-white rounded-full px-2'>{inviteCount}</span>}</Link></li>
              <li className='py-4 pl-9 pr-4 hover:bg-gray-600'>TRIAL ASSESSMENT</li>
              <li className='py-4 pl-9 pr-4 hover:bg-gray-600'>CODILITY PRACTISE</li>
            </ul>
            <Logout />
        </div>
    </div>
  )
}

export default Sidebar