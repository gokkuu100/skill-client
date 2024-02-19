import React, { useState } from 'react';

function CreateAssessment() {
  const [assessmentData, setAssessmentData] = useState({
    title: '',
    description: '',
    mentorId: 1,
  });

  const [questions, setQuestions] = useState([
    {
      questTitle: '',
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
      { questTitle: '', choice1: '', choice2: '', choice3: '', choice4: '', correctChoice: '' },
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
        for (const question of questions) {
          const questionsResponse = await fetch(
            `http://localhost:5000/api/questions/${assessmentData.mentorId}/11`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ ...question, mentorId: assessmentData.mentorId }),
            }
          );

          if (questionsResponse.ok) {
            const newQuestion = await questionsResponse.json();
            console.log('New Question:', newQuestion);
          } else {
            console.error('Failed to create questions');
          }
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
      <form onSubmit={handleSubmit} id="assessment-form">
        {/* Assessment Section */}
        <label>Title</label>
        <input type="text" name="title" onChange={handleAssessmentChange} />
        <br />
        <label>Description</label>
        <input type="textarea" name="description" onChange={handleAssessmentChange} />
        <br />

        {/* Questions Section */}
        <h2>Create Questions</h2>
        {questions.map((question, index) => (
          <div key={index}>
            <label>Question title</label>
            <input
              type="text"
              name="questTitle"
              value={question.questTitle}
              onChange={(e) => handleQuestionChange(e, index)}
            />
            <br />
            <label>Choice1: </label>
            <input
              type="text"
              name="choice1"
              value={question.choice1}
              onChange={(e) => handleQuestionChange(e, index)}
            />
            <br />
            <label>Choice2: </label>
            <input
              type="text"
              name="choice2"
              value={question.choice2}
              onChange={(e) => handleQuestionChange(e, index)}
            />
            <br />
            <label>Choice3: </label>
            <input
              type="text"
              name="choice3"
              value={question.choice3}
              onChange={(e) => handleQuestionChange(e, index)}
            />
            <br />
            <label>Choice4: </label>
            <input
              type="text"
              name="choice4"
              value={question.choice4}
              onChange={(e) => handleQuestionChange(e, index)}
            />
            <br />
            <label>CorrectAnswer: </label>
            <input
              type="text"
              name="correctChoice"
              value={question.correctChoice}
              onChange={(e) => handleQuestionChange(e, index)}
            />
            <br />
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion}>
          Add Another Question
        </button>
        <br />
        <button type="submit">Submit Assessment and Questions</button>
      </form>
    </div>
  );
}

export default CreateAssessment;
