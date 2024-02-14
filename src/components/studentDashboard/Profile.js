import React, { useEffect, useState } from 'react'

function Profile() {
    const [profile, setProfile] = useState("")
    useEffect(() => {
        fetch()
        .then(response => response.json())
        .then((data) => {
            setProfile({ name: data.name, email: data.email })
        })
        .catch((error) => console.error("Error fetching profile:", error))
    }, [])

  return (
    <div className='flex flex-col w-full'>
        <div className="w-full p-[1rem] bg-gray-800 flex-none hidden md:block">
            <h1 className='text-white'>USER PROFILE</h1>
        </div>
        <div className='flex mt-[2rem]'>
            <img src='profile-svgrepo-com.svg' alt='user-profile' className='h-[10rem]'></img>
            <div className='text-left'>
                <h2 className='font-bold text-xl pt-[2rem]'>{profile.name}SHEILA KUGO</h2>
                <h2 className='text-xl'>Junior Software Developer</h2>
                <h3>{profile.email}sheila@gmail.com</h3>
            </div>
        </div>
        <div>
            <h1>SKILLS</h1>
            <ul className='pt-[2rem]'>
                <li>HTML/CSS</li>
                <li>JavaScript</li>
                <li>TypeScript</li>
                <li>NodeJS</li>
                <li>ExpressJS</li>
                <li>Python</li>
                <li>Java</li>
            </ul>
        </div>
        <div className='mt-[2rem]'>
            <h2>STATS</h2>
        </div>
    </div>
  )
}

export default Profile