import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Grades() {
    const [gradeData, setGradeData] = useState([])
    const navigate = useNavigate()

    // Get grades data
    useEffect(() => {
        fetch(`http://localhost:5000/api/grades/1`)
        .then((res) => res.json())
        .then((data) => setGradeData(data.assessmentDetails))
        .catch((error) => console.error(error))
    }, [])

  return (
    <div>
        <div className="w-full p-4 bg-gray-800 flex items-center">
            <img src="icons8-left-arrow-64.png" className="h-[2rem] cursor-pointer" alt="left-arrow" onClick={() => navigate(-1)} />
            <h1 className="text-white ml-[55rem]">GRADES</h1>
        </div>
        <div>
            <table className='w-[90%] ml-[2rem] mt-[2rem] overflow-x-auto table-auto divide-y divide-gray-200 border border-gray-300'>
                <thead>
                    <tr className='bg-[#EA501A]'>
                        <th className="px-6 py-3 text-center font-bold leading-4 tracking-widest uppercase text-white">Assessment</th>
                        <th className="px-6 py-3 text-center font-bold leading-4 tracking-widest uppercase text-white">Grade</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                    {gradeData.map((grade, index) => (
                        <tr key={index}>
                            <td className="px-6 py-3 text-center font-semibold">{grade.assessmentName}</td>
                            <td className="px-6 py-3 text-center font-semibold">{grade.grade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Grades