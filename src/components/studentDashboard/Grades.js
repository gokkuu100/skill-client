import React, { useEffect, useState } from 'react'

function Grades() {
    const [gradeData, setGradeData] = useState([])

    // Get grades data
    useEffect(() => {
        fetch(`http://localhost:5000/api/grades/1`)
        .then((res) => res.json())
        .then((data) => setGradeData(data.assessmentDetails))
        .catch((error) => console.error(error))
    }, [])

  return (
    <div>
        <div className="w-full p-4 bg-gray-800 flex-none hidden md:block">
            <h1 className='text-white'>GRADES</h1>
        </div>
        <div>
            <table className='w-[30rem] ml-[10rem] overflow-x-auto table-auto divide-y divide-gray-200 border border-gray-300'>
                <thead>
                    <tr className='bg-gray-200'>
                        <th className="px-6 py-3 text-center font-bold leading-4 tracking-widest uppercase">Assessment</th>
                        <th className="px-6 py-3 text-center font-bold leading-4 tracking-widest uppercase">Grade</th>
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