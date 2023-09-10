import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { MdOutlineAddBox } from 'react-icons/md';

const ShowTest = () => {
  const [test, setTest] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5555/tests/${id}`)
      .then((response) => {
        setTest(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching test:', error);
        setLoading(false);
      });
  }, [id]);

  const handleSelectAnswer = (questionIndex, answer) => {
    if (!selectedAnswers[questionIndex]) {
      setSelectedAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionIndex]: answer,
      }));
    }
  };

  const isAnswerCorrect = (questionIndex) => {
    const selectedAnswer = selectedAnswers[questionIndex];
    return selectedAnswer === test.questions[questionIndex].answer;
  };

  const countCorrectAnswers = () => {
    let correctCount = 0;
    test.questions.forEach((question, index) => {
      if (isAnswerCorrect(index)) {
        correctCount++;
      }
    });
    return correctCount;
  };

  const handleFinishTest = () => {
    setShowResults(true);
  };

  const handleRefreshTest = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  return (
    <div className='p-4'>
      {/* <BackButton /> */}
      <h1 className='text-3xl my-4'>Show Test</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          {test ? (
            <>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Id</span>
                <span className='text-xl mr-4 text-gray-500'>{test._id}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Title</span>
                <span className='text-xl mr-4 text-gray-500'>{test.title}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Author</span>
                <span className='text-xl mr-4 text-sky-500'>{test.owner}</span>
              </div>
              <div className='my-4'>
                <span className='text-gray-500'>{test.description}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'></span>
                <ul>
                  {test.questions.map((question, index) => (
                    <li key={index}>
                      <strong>Question {index + 1}:</strong> {question.text}
                      <ul>
                        {question.options.map((option, optionIndex) => (
                          <li
                            key={optionIndex}
                            onClick={() => handleSelectAnswer(index, option)}
                            className={`cursor-pointer ${
                              selectedAnswers[index] === option ? 'text-yellow-500' : ''
                            }`}
                          >
                            <span>{optionIndex + 1}: </span>
                            {option}
                          </li>
                        ))}
                      </ul>
                      {showResults && (
                        <strong className={`${isAnswerCorrect(index) ? 'text-green-500' : 'text-red-500'}`}>
                          {isAnswerCorrect(index) ? 'Correct' : 'Incorrect'}
                        </strong>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              {!showResults && (
                <button
                  onClick={handleFinishTest}
                  className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300'
                >
                  Finish Test
                </button>
              )}
              {showResults && (
                <div className='my-4'>
                  <span className='text-xl mr-4 text-gray-500'>Correct Answers</span>
                  <span>{countCorrectAnswers()} out of {test.questions.length}</span>
                  <button
                    onClick={handleRefreshTest}
                    className='bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300 ml-4'
                  >
                    Refresh
                  </button>
                </div>
              )}
            </>
          ) : (
            <p>No test data found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowTest;
