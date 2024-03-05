import React, { useEffect, useState } from 'react'

function Profile() {
    const [profile, setProfile] = useState("")
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('id')

    useEffect(() => {
        fetch(`http://localhost:5000/api/studentInfo/${userId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        .then(response => response.json())
        .then((data) => {
            setProfile(data)
        })
        .catch((error) => console.error("Error fetching profile:", error))
    }, [])

    return (
        <div className="flex flex-col w-full">
            <div className="w-full p-[1rem] bg-gray-800 flex-none hidden md:block">
                <h1 className="text-white">USER PROFILE</h1>
            </div>
            <div className="flex mt-[2rem] justify-center items-center">
                <img src="profile-svgrepo-com.svg" alt="user-profile" className="h-[10rem] mr-[5rem]" />
                {profile && (
                    <div className="text-left">
                        <h2 className="font-bold text-xl pt-[2rem]">{profile.name}</h2>
                        <h2 className="text-xl">{profile.occupation}</h2>
                        <h3>{profile.email}</h3>
                        {profile.skills && (
                            <div className="mt-2">
                                <h4 className="font-semibold">Skills:</h4>
                                <ul className="list-disc pl-5">
                                    {profile.skills.map((skill, index) => (
                                        <li key={index} className="text-sm">
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile