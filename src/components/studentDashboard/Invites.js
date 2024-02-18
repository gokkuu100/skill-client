import React, { useEffect, useState } from 'react';

function Invites() {
    const [data, setData] = useState([]);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzA4MjQ0OTE1LCJleHAiOjE3MDgyNDg1MTV9.KuiEDSdw808_Sz2b15y0E85uP3db7TcUX5LXAJ1p1xY"; // Replace with your actual token

    useEffect(() => {
        fetch("http://localhost:5000/api/notifications/1", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            method: "GET"
        })
            .then((res) => res.json())
            .then((data) => setData(data.assessmentDetails))
            .catch((error) => console.error("Error fetching data", error));
    }, []);

    const handleResponse = async (inviteId, userResponse) => {
        try {
            const responseObj = { response: userResponse };
            const response = await fetch(`http://localhost:5000/api/acceptInvitation/${inviteId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(responseObj)
            });

            if (response.ok) {
                console.log(`Invite response recorded successfully for inviteID ${inviteId}`);
            } else {
                console.error("Failed to record invite response");
            }
        } catch (error) {
            console.error("Error recording invite response", error);
        }
    };

    return (
        <div>
            <div className="w-full p-4 bg-gray-800 flex-none hidden md:block">
                <h1 className='text-white'>INVITES</h1>
            </div>
            <div className="mt-4 ml-[6rem]">
                <table className='w-[60%] overflow-x-auto table-auto divide-y divide-gray-200 border border-gray-300'>
                    <thead className=''>
                        <tr className='bg-gray-200'>
                            <th className="px-6 py-3 text-center font-bold leading-4 tracking-widest uppercase">Assessment Name</th>
                            <th className="px-6 py-3 text-center font-bold leading-4 tracking-widest uppercase">Mentor</th>
                            <th className="px-6 py-3 text-center font-bold leading-4 tracking-widest uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {data.map((invitation, index) => (
                            <tr key={index} className='cursor-pointer'>
                                <td className="px-6 py-3 text-center font-semibold">{invitation.title}</td>
                                <td className="px-6 py-3 text-center font-semibold">{invitation.mentorName}</td>
                                <td className="px-6 py-3 flex justify-center items-center space-x-2">
                                    <button
                                        className='border border-green-500 text-green-500 px-3 py-1 rounded-full hover:bg-green-500 hover:text-white'
                                        onClick={() => handleResponse(invitation.inviteId, 'accept')}
                                    >Accept</button>
                                    <button
                                        className='border border-red-500 text-red-500 px-3 py-1 rounded-full hover:bg-red-500 hover:text-white'
                                        onClick={() => handleResponse(invitation.inviteId, 'decline')}
                                    >Decline</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Invites;
