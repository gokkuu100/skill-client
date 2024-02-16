import React from 'react'
import Profile from './Profile'
import { Link } from 'react-router-dom'
import Assessment from './Assessment'

function Sidebar() {
  return (
    <div className='flex h-screen text-white'>
        <div className="w-64 bg-gray-800 flex-none hidden md:block">
            <h1 className='m-[2rem] font-bold text-xl text-[#EA501A]'>SKILLCODE</h1>
            <ul className='mt-[3.75rem] mb-[3rem] divide-y divide-gray-700/50'>
                <li className='py-4 pl-9 pr-4 hover:bg-gray-600'><Link to="/profile">Profile</Link></li>
                <li className='py-4 pl-9 pr-4 hover:bg-gray-600'>Assessments</li>
                <li className='py-4 pl-9 pr-4 hover:bg-gray-600'>Grades</li>
                <li className='py-4 pl-9 pr-4 hover:bg-gray-600'>Invites</li>
            </ul>
            <h2 className='mt-[30rem] py-4 pl-9 pr-4 hover:bg-gray-600'>LOGOUT</h2>
        </div>
        <div className='w-full text-black'>
        <Assessment />
        </div>
    </div>
  )
}

export default Sidebar