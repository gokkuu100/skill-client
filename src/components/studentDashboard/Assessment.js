import React, { useEffect, useState } from 'react';

function Assessment() {
  const [details, setDetails] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/student/1')
      .then(response => response.json())
      .then((data) => {
        setDetails(data.assessmentDetails)
      })
      .catch((error) => console.error("Error fetching profile", error))
  }, [])

  return (
    <div className='flex flex-col w-full'>
      <div className="w-full p-4 bg-gray-800 flex-none hidden md:block">
        <h1 className='text-white'>ASSESSMENTS</h1>
      </div>
      <div className='tables overflow-x-auto flex mt-[7rem] ml-[5rem]'>
        <table id="assessments" className="ml-[10rem] bg-white border border-gray-300 shadow-lg w-[60%] table-auto">
          <thead>
            <tr className='bg-gray-200'>
              <th className='p-4 text-center font-bold uppercase tracking-widest border'>Title</th>
              <th className='p-4 text-center font-bold uppercase tracking-widest border'>Number of questions</th>
              <th className='p-4 text-center font-bold uppercase tracking-widest border'>Description</th>
              <th className='p-4 text-center font-bold uppercase tracking-widest border'>Completed</th>
              <th className='p-4 text-center font-bold uppercase tracking-widest border'>Mentor</th>
            </tr>
          </thead>
          <tbody>
            {details.map((assessment, index) => (
              <tr key={index} className='border'>
              <td className='p-4 border'>{assessment.title}</td>
              <td className='p-4 text-center border'>{assessment.totalQuestions}</td>
              <td className='p-4 border'>{assessment.description}</td>
              <td className='p-4 text-center border'>{assessment.isCompleted ? 'Yes' : 'No'}</td>
              <td className='p-4 border'>{assessment.mentor}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Assessment;
