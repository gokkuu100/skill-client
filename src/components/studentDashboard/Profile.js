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
        <div className='flex mt-[2rem] justify-center'>
            <img src='profile-svgrepo-com.svg' alt='user-profile' className='h-[10rem] mr-[5rem]'></img>
            <div className='text-left'>
                <h2 className='font-bold text-xl pt-[2rem]'>{profile.name}SHEILA KUGO</h2>
                <h2 className='text-xl'>Junior Software Developer</h2>
                <h3>{profile.email}sheila@gmail.com</h3>
            </div>
        </div>
        <div className='text-left ml-[4rem] w-[70%]'>
            <h1 className='font-bold mb-[1rem]'>SKILLS</h1>
            <ul className='border rounded flex content-around'>
                <li className='border p-[1rem] w-[15rem]'>HTML/CSS - Advanced</li>
                <li className='border p-[1rem] w-[15rem]'>JavaScript</li>
                <li className='border p-[1rem] w-[15rem]'>TypeScript</li>
                <li className='border p-[1rem] w-[15rem]'>NodeJS</li>
                <li className='border p-[1rem] w-[15rem]'>ExpressJS</li>
                <li className='border p-[1rem] w-[15rem]'>Python</li>
                <li className='border p-[1rem] w-[15rem]'>Java</li>
            </ul>
        </div>
        <div className='mt-[2rem]'>
            <h2 className='text-left ml-[4rem] font-bold'>STATS</h2>
            <table className="table-auto border-collapse w-[70%] ml-[4rem]">
                    <tbody>
                        <tr>
                            <td className="border p-[1rem]">Overall Grade:</td>
                            <td className="border p-[1rem]">B</td>
                        </tr>
                        <tr>
                            <td className="border p-[1rem]">Total Assessments Done:</td>
                            <td className="border p-[1rem]">8</td>
                        </tr>
                    </tbody>
                </table>
        </div>
    </div>
  )
}

export default Profile