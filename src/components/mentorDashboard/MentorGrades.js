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
    <div>
      <h1>Mentor Grades</h1>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Assessment Title</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade, index) => (
            <tr key={index}>
              <td>{grade.studentName}</td>
              <td>{grade.assessmentTitle}</td>
              <td>{grade.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MentorGrades;
