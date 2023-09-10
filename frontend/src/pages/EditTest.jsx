import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditTest = () => {
  const [testData, setTestData] = useState({
    title: '',
    owner: '',
    description: '',
    questions: [],
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/tests/${id}`)
      .then((response) => {
        setTestData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Please check the console', { variant: 'error' });
        console.error('Error fetching test:', error);
      });
  }, [id]);

  const handleEditTest = () => {
    setLoading(true);
    axios
      .put(`http://localhost:5555/tests/${id}`, testData)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Test Edited successfully', { variant: 'success' });
        navigate('/home');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Please check the console', { variant: 'error' });
        console.error('Error editing test:', error);
      });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...testData.questions];
    updatedQuestions[index][field] = value;
    setTestData({
      ...testData,
      questions: updatedQuestions,
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...testData.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setTestData({
      ...testData,
      questions: updatedQuestions,
    });
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...testData.questions];
    updatedQuestions[questionIndex].options.push('');
    setTestData({
      ...testData,
      questions: updatedQuestions,
    });
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...testData.questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setTestData({
      ...testData,
      questions: updatedQuestions,
    });
  };

  const handleRemoveQuestion = (questionIndex) => {
    const updatedQuestions = [...testData.questions];
    updatedQuestions.splice(questionIndex, 1);
    setTestData({
      ...testData,
      questions: updatedQuestions,
    });
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      text: '',
      options: [],
      answer: '',
    };
    setTestData({
      ...testData,
      questions: [...testData.questions, newQuestion],
    });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Test</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={testData.title}
            onChange={(e) => setTestData({ ...testData, title: e.target.value })}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={testData.owner}
            onChange={(e) => setTestData({ ...testData, owner: e.target.value })}
            className='border-2 border-gray-500 px-4 py-2  w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Description</label>
          <input
            type='text'
            value={testData.description}
            onChange={(e) => setTestData({ ...testData, description: e.target.value })}
            className='border-2 border-gray-500 px-4 py-2  w-full'
          />
        </div>
        {testData.questions.map((question, index) => (
          <div key={index} className='border p-4 my-4 rounded-lg'>
            <label className='text-xl text-gray-500'>Question {index + 1}</label>
            <textarea
              rows={Math.max(2, Math.ceil(question.text.length / 50))} // Встановлюємо кількість рядків на основі кількості символів
              value={question.text}
              onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full mt-2'
            />
            <label className='text-xl text-gray-500 mt-4'>Options</label>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className='flex my-2'>
                <input
                  type='text'
                  value={option}
                  onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                  className='border-2 border-gray-500 px-4 py-2 w-full'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveOption(index, optionIndex)}
                  className='bg-red-500 text-white px-2 ml-2'
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type='button'
              onClick={() => handleAddOption(index)}
              className='bg-green-500 text-white px-2 mt-2'
            >
              Add Option
            </button>
            <label className='text-xl text-gray-500 mt-4'>Answer</label>
            <input
              type='text'
              value={question.answer}
              onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full mt-2'
            />
            <button
              type='button'
              onClick={() => handleRemoveQuestion(index)}
              className='bg-red-500 text-white px-2 mt-4'
            >
              Remove Question
            </button>
          </div>
        ))}
        <button
          type='button'
          onClick={handleAddQuestion}
          className='bg-green-500 text-white px-2 mt-4'
        >
          Add Question
        </button>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditTest}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditTest;
