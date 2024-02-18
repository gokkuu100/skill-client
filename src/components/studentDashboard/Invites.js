import React, { useEffect, useState } from 'react'

function Invites() {
    const [data, setData] = useState([])
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzA4MjQwOTAyLCJleHAiOjE3MDgyNDQ1MDJ9.n-yjYg46ZBrYoK8k8ZubKGzOxUMoPlMAFgmkSAcFDeI"

    useEffect(() => {
        fetch("http://localhost:5000/api/notifications/1",{
            headers: {
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}`
            }, 
            method:"GET" 
        })
        .then((res) => res.json())
        .then((data) => setData(data.assessmentDetails))
        .catch((error) => console.error("Error fetching data", error))
    }, [])

    const handleResponse = async (inviteId, userResponse ) => {
        try {
            const responseObj = { response: userResponse }
            const response = await fetch(`http://localhost:5000/api/acceptInvitation/4`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(responseObj)
            })
            if (response.ok) {
                console.log(`Invite response recorded successfully for inviteID ${inviteId}`);
            } else {
                console.error("Failed to record invite response");
            }
        } catch (error) {
            console.error("Error recording invite response", error);
        }
    }

  return (
    <div>
        <div className="w-full p-4 bg-gray-800 flex-none hidden md:block">
            <h1 className='text-white'>INVITES</h1>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider uppercase border-b-2 border-gray-700">AssessmentName</th>
                        <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider uppercase border-b-2 border-gray-700">Mentor</th>
                        <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider uppercase border-b-2 border-gray-700">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((invitation, index) => (
                        <tr key={index} className='cursor-pointer'>
                            <td class="border px-2 py-1 text-center font-semibold">{invitation.title}</td>
                            <td class="border px-2 py-1 text-center font-semibold">{invitation.mentorName}</td>
                            <td class="border px-2 py-1 font-semibold">
                                <button 
                                className='border border-black mr-[1rem]'
                                onClick={() => handleResponse(invitation.inviteId, 'accept')}
                                >Accept</button>
                                <button 
                                className='border border-black'
                                onClick={() => handleResponse(invitation.inviteId, 'decline')}
                                >Decline</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Invites