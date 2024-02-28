import React, { useState } from 'react';

function CreateAssessment() {
  const userId = localStorage.getItem('id')
  const [assessmentData, setAssessmentData] = useState({
    title: '',
    description: '',
    mentorId: userId,
  });

  const [questions, setQuestions] = useState([
    {
      title: '',
      choice1: '',
      choice2: '',
      choice3: '',
      choice4: '',
      correctChoice: '',
    },
  ]);

  const handleAssessmentChange = (e) => {
    setAssessmentData({ ...assessmentData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (e, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [e.target.name]: e.target.value };
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { title: '', choice1: '', choice2: '', choice3: '', choice4: '', correctChoice: '' },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Submit Assessment
      const assessmentResponse = await fetch('http://localhost:5000/api/assessments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assessmentData),
      });
  
      if (assessmentResponse.ok) {
        const newAssessment = await assessmentResponse.json();
        console.log('New Assessment:', newAssessment);
  
        // Submit Questions
        const questionsResponse = await fetch(
          `http://localhost:5000/api/questions/${assessmentData.mentorId}/${newAssessment.id}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ questions, mentorId: assessmentData.mentorId }),
          }
        );
  
        if (questionsResponse.ok) {
          const newQuestions = await questionsResponse.json();
          console.log('New Questions:', newQuestions);
        } else {
          console.error('Failed to create questions');
        }
      } else {
        console.error('Failed to create assessment');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="w-full p-4 bg-gray-800 flex-none hidden md:block">
        <h1 className="text-white">CREATE ASSESSMENT</h1>
      </div>
      <form onSubmit={handleSubmit} className="mx-10 my-4 text-center">
        {/* Assessment Section */}
        <div className="mb-4">
          <h2 className="font-bold text-[#EA501A] text-2xl">CREATE ASSESSMENT</h2>
          <label className="">Title</label>
          <input
            type="text"
            name="title"
            className="border ml-[1rem] p-2 w-[15rem]"
            onChange={handleAssessmentChange}
          /><br />
          <label className="">Description</label>
          <textarea
            name="description"
            className="border ml-[1rem] mt-[1rem] p-2 w-[15rem]"
            onChange={handleAssessmentChange}
          />
        </div>

        {/* Questions Section */}
        <h2 className="font-bold text-2xl text-center mb-4 text-[#EA501A]">Create Questions</h2>
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <label className="">Question title</label>
            <input
              type="text"
              name="title"
              value={question.title}
              onChange={(e) => handleQuestionChange(e, index)}
              className="border p-2 ml-[1rem] w-[25rem]"
            /><br />
            <label className="mt-2">Choice1:</label>
            <input
              type="text"
              name="choice1"
              value={question.choice1}
              onChange={(e) => handleQuestionChange(e, index)}
              className="border p-2 ml-[1rem] w-[15rem]"
            /><br />
            <label className="mt-2">Choice2:</label>
            <input
              type="text"
              name="choice2"
              value={question.choice2}
              onChange={(e) => handleQuestionChange(e, index)}
              className="border p-2 ml-[1rem] w-[15rem]"
            /><br />
            <label className="mt-2">Choice3:</label>
            <input
              type="text"
              name="choice3"
              value={question.choice3}
              onChange={(e) => handleQuestionChange(e, index)}
              className="border p-2 ml-[1rem] w-[15rem]"
            /><br />
            <label className="mt-2">Choice4:</label>
            <input
              type="text"
              name="choice4"
              value={question.choice4}
              onChange={(e) => handleQuestionChange(e, index)}
              className="border p-2 ml-[1rem] w-[15rem]"
            /><br />
            <label className="mt-2">CorrectAnswer:</label>
            <input
              type="text"
              name="correctChoice"
              value={question.correctChoice}
              onChange={(e) => handleQuestionChange(e, index)}
              className="border p-2 ml-[1rem] w-[15rem]"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Another Question
        </button><br />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
        >
          Submit Assessment and Questions
        </button>
      </form>
    </div>
  );
}

export default CreateAssessment;
