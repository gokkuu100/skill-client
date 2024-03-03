import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NotAuthorized from '../NotAuthorized';

function SendInvites() {
  const [assessments, setAssessments] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const userId = localStorage.getItem('id')

  useEffect(() => {
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    axios.get(`http://localhost:5000/api/assessments/${userId}`,
    {headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'}}
    )
      .then(response => setAssessments(response.data.assessments))
      .catch(error => console.error('Error fetching assessments:', error));

    // Fetch all students
    axios.get('http://localhost:5000/api/students',
    {headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'}}
    )
      .then(response => setStudents(response.data.students))
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  const handleSendInvite = async () => {
    if (!selectedAssessment || selectedStudents.length === 0) {
      console.error('Please select assessment and students');
      return;
    }

    try {
      // Replace 'mentorId' with the actual mentor ID
      const mentorId = userId;
      
      // Send invite to selected students
      const response = await axios.post('http://localhost:5000/api/sendInvite', {
        mentorId,
        studentIds: selectedStudents,
        assessmentId: selectedAssessment,
      },
      {headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'}}
      );

      console.log('Invites sent:', response.data.invites);
      setModalOpen(false);
    } catch (error) {
      console.error('Error sending invites:', error);
    }
  };

  if (!isAuthorized) {
    return <NotAuthorized />;
  }

  return (
    <div className="">
        <div className="w-full p-4 bg-gray-800 flex items-center">
          <img src="/icons8-left-arrow-64.png" className="h-[2rem] cursor-pointer" alt="left-arrow" onClick={() => navigate(-1)} />
          <h1 className="text-white ml-[55rem]">SEND INVITES</h1>
        </div>
      <table className="w-[90%] ml-[2rem] bg-white border border-gray-300 mt-[2rem]">
        <thead>
          <tr className='bg-[#EA501A] text-white '>
            <th className="py-2 px-4 border-b">Assessment Title</th>
            <th className="py-2 px-4 border-b">Send Invite</th>
          </tr>
        </thead>
        <tbody>
          {assessments.map(assessment => (
            <tr key={assessment.id}>
              <td className="py-2 px-4 border-b">{assessment.title}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-blue-500 text-white py-1 px-2 rounded"
                  onClick={() => {
                    setSelectedAssessment(assessment.id);
                    setModalOpen(true);
                  }}
                >
                  Send Invite
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for selecting students */}
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-2">Select Students to Invite</h2>
            <ul className="list-inside list-disc">
              {students.map(student => (
                <li key={student.id} className="mb-2">
                  <input
                    type="checkbox"
                    value={student.id}
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => {
                      setSelectedStudents(prevSelected => {
                        if (prevSelected.includes(student.id)) {
                          return prevSelected.filter(id => id !== student.id);
                        } else {
                          return [...prevSelected, student.id];
                        }
                      });
                    }}
                  />
                  <span className="ml-2">{student.name}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white py-1 px-2 mr-2 rounded"
                onClick={handleSendInvite}
              >
                Send Invite
              </button>
              <button
                className="bg-gray-300 text-gray-800 py-1 px-2 rounded"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SendInvites;
