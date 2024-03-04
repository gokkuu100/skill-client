import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NotAuthorized from '../NotAuthorized';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [assessmentTitle, setAssessmentTitle] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [remainingTime, setRemainingTime] = useState(600)
  const { assessmentId } = useParams();
  const [isAuthorized, setIsAuthorized] = useState(true);
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (!assessmentId) {
          console.log("error");
          return;
        }

        if (!token) {
          setIsAuthorized(false);
          return;
        }
        
        const response = await fetch(`http://localhost:5000/api/questions/${assessmentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); 
        const data = await response.json();
        setQuestions(data.questions);
        setAssessmentTitle(data.assessmentTitle)

        // timer
        const timer = setInterval(() => {
          setRemainingTime((prevTime) => Math.max(0, prevTime - 1));
        }, 1000);

        // timeout
        const submissionTimer = setTimeout(() => {
          console.log("Auto-submitting assessment...");
          handleSubmit();
        }, 600000);

        // clears timeout
        return () => {
          clearInterval(timer);
          clearTimeout(submissionTimer);
        };

      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [assessmentId]); 

  const handleAnswerSelection = (questionId, selectedOption) => {
    setSelectedAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: selectedOption }));
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch ('http://localhost:5000/api/answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
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
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  if (!isAuthorized) {
    return <NotAuthorized />;
  }

  return (
    <div>
      <div className="w-full p-4 bg-gray-800 flex items-center">
        <img src="/icons8-left-arrow-64.png" className="h-[2rem] cursor-pointer" alt="left-arrow" onClick={() => navigate(-1)} />
        <h1 className="text-white ml-[55rem]">QUESTIONS</h1>
      </div>

      <div className="max-w-5xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">{assessmentTitle} Questions</h1>
        <div className="mb-4 p-4 border rounded-md w-[50]">
          <p className="font-semibold mb-[1rem] text-left">Remaining Time: {formatTime(remainingTime)}</p>
        </div>
      {questions.map((question) => (
          <div key={question.id} className="mb-4 p-4 border rounded-md w-[50]">
            <p className="font-semibold mb-[1rem] text-left">{question.title}</p>
            <div className="grid grid-cols-2 gap-4">
              {['choice1', 'choice2', 'choice3', 'choice4'].map((choice) => (
                <label key={choice} className="flex items-center">
                  <input
                    type="radio"
                    name={`question_${question.id}`}
                    value={question[choice]}
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
