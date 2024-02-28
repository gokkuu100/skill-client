import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MentorGrades() {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('id')
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/allgrades/${userId}`);
        setGrades(response.data.gradeDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
        <div className="w-full p-[1rem] bg-gray-800 flex-none hidden md:block mb-[2rem]">
            <h1 className='text-white'>STUDENT GRADES</h1>
        </div>

      <table className="w-[90%] ml-[2rem] border border-gray-300">
        <thead>
          <tr className="bg-[#EA501A]">
            <th className="py-2 px-4 border-b text-white">Student Name</th>
            <th className="py-2 px-4 border-b text-white">Assessment Title</th>
            <th className="py-2 px-4 border-b text-white">Grade</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade, index) => (
            <tr key={index} className=''>
              <td className="py-2 px-4 border-b">{grade.studentName}</td>
              <td className="py-2 px-4 border-b">{grade.assessmentTitle}</td>
              <td className={`py-2 px-4 border-b ${parseInt(grade.grade, 10) > 70 ? 'text-green-500' : 'text-red-500'}`}>
                {grade.grade}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MentorGrades;
