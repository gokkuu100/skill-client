import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MentorGrades() {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/allgrades/1');
        setGrades(response.data.gradeDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Mentor Grades</h1>
      <table className="min-w-full border border-gray-300">
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
