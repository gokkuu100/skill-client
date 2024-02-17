import React, { useState, useEffect } from 'react';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [assessmentTitle, setAssessmentTitle] = useState([])

  const [selectedAnswers, setSelectedAnswers] = useState({})

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/questions/2'); 
        const data = await response.json();
        setQuestions(data.questions);
        setAssessmentTitle(data.assessmentTitle)

      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []); 

  const handleAnswerSelection = (questionId, selectedOption) => {
    setSelectedAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: selectedOption }));
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch ('http://localhost:5000/api/answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: 1,
          assessmentId: 2,
          answers: Object.values(selectedAnswers)
        })
      })
      const data = await response.json()
      console.log(data);
    } catch (e) {
      console.log("Error submitting", e);
    }
  }

  return (
    <div>
      <div className="w-full p-4 bg-gray-800 flex-none hidden md:block">
        <h1 className='text-white'>ASSESSMENTS</h1>
      </div>

      <div className="max-w-5xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">{assessmentTitle} Questions</h1>
      {questions.map((question) => (
          <div key={question.id} className="mb-4 p-4 border rounded-md w-[50]">
            <p className="font-semibold mb-[1rem] text-left">{question.title}</p>
            <div className="grid grid-cols-2 gap-4">
              {['choice1', 'choice2', 'choice3', 'choice4'].map((choice) => (
                <label key={choice} className="flex items-center">
                  <input
                    type="radio"
                    name={`question_${question.id}`}
                    value={question[choice]} // Use the actual value of the choice
                    onChange={() => handleAnswerSelection(question.id, question[choice])}
                  />
                  <span className="ml-2">{question[choice]}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          onClick={handleSubmit}
        >
          Submit Answers
        </button>
      </div>
    </div>
  );
};

export default Questions;
