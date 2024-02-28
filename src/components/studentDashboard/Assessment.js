import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotAuthorized from '../NotAuthorized';

function Assessment() {
  const [details, setDetails] = useState([])
  const [isAuthorized, setIsAuthorized] = useState(true); 
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('id');

    if (!token) {
      setIsAuthorized(false) 
      return;
    }

    fetch(`http://localhost:5000/api/student/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => response.json())
      .then((data) => {
        setDetails(data.assessmentDetails)
      })
      .catch((error) => console.error("Error fetching profile", error))
  }, [navigate])

  if (!isAuthorized) {
    return <NotAuthorized />;
  }

  const handleRowClick = (assessment) => {
    if (assessment.isCompleted) {
      const shouldRedo = window.confirm("This assessment was already done. Do you want to redo you assessment?")
      if (shouldRedo) {
        navigate(`/questions/${assessment.id}`)
      }
    } else {
      const shouldProceed = window.confirm("Click 'Ok' to do the assessment")
      if (shouldProceed) {
        navigate(`/questions/${assessment.id}`)
      }
    }
  }

  return (
    <div className='flex flex-col w-full'>
      <div className="w-full p-4 bg-gray-800 flex-none hidden md:block">
        <h1 className='text-white'>ASSESSMENTS</h1>
      </div>
      <h3>Select on an assessment to attempt if not yet done</h3>
      <div className='tables overflow-x-auto flex mt-[2rem]'>
        <table id="assessments" className="ml-[2rem] bg-white border shadow-lg w-[90%] table-auto">
          <thead>
            <tr className='bg-[#EA501A] text-white font-bold'>
              <th className='p-4 text-center font-bold uppercase tracking-widest'>Title</th>
              <th className='p-4 text-center font-bold uppercase tracking-widest'>Number of questions</th>
              <th className='p-4 text-center font-bold uppercase tracking-widest'>Description</th>
              <th className='p-4 text-center font-bold uppercase tracking-widest'>Completed</th>
              <th className='p-4 text-center font-bold uppercase tracking-widest'>Mentor</th>
            </tr>
          </thead>
          <tbody>
            {details.map((assessment, index) => (
              <tr key={index} onClick={() => handleRowClick(assessment)} className='hover:bg-gray-300 cursor-pointer'>
              <td className='p-4 border'>{assessment.title}</td>
              <td className='p-4 text-center border'>{assessment.totalQuestions}</td>
              <td className='p-4 border'>{assessment.description}</td>
              <td className={`p-4 text-center border ${assessment.isCompleted ? 'text-green-500' : 'text-red-500'}`}>
                  {assessment.isCompleted ? 'Yes' : 'No'}
                </td>
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
