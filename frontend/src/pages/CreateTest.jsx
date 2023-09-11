import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateTests = () => {
  const [formData, setFormData] = useState({
    title: '',
    owner: '',
    description: '',
    questions: []
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      text: '',
      options: [],
      answer: '',
    };
    setFormData({
      ...formData,
      questions: [...formData.questions, newQuestion],
    });
  };

  const handleSaveTest = () => {
   const data = {
  title: formData.title,
  description: formData.description,
  owner: formData.owner,
  questions: formData.questions.map(question => ({
    text: question.text,
    options: question.options,
    answer: question.answer,
  })),
};

    setLoading(true);
    axios
      .post('https://web-test-cskj.vercel.app/tests/test', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Test Created successfully', { variant: 'success' });
        navigate('/home');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };
  

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index][field] = value;
    setFormData({
      ...formData,
      questions: updatedQuestions,
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setFormData({
      ...formData,
      questions: updatedQuestions,
    });
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options.push('');
    setFormData({
      ...formData,
      questions: updatedQuestions,
    });
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setFormData({
      ...formData,
      questions: updatedQuestions,
    });
  };

  const handleRemoveQuestion = (questionIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions.splice(questionIndex, 1);
    setFormData({
      ...formData,
      questions: updatedQuestions,
    });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Test</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Description</label>
          <textarea
                rows={Math.max(2, Math.ceil(formData.description.length / 50))}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={formData.owner}
            onChange={(e) => handleInputChange('owner', e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>

        {/* Додавання питань і відповідей */}
        {formData.questions.map((question, index) => (
          <div key={index}>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Question</label>
              <textarea
                rows={Math.max(2, Math.ceil(question.text.length / 50))} 
                value={question.text}
                onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Options</label>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className='flex my-2'>
                  <input
                    type='text'
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(index, optionIndex, e.target.value)
                    }
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
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Answer</label>
              <input
                type='text'
                value={question.answer}
                onChange={(e) =>
                  handleQuestionChange(index, 'answer', e.target.value)
                }
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
            </div>
            <button
              type='button'
              onClick={() => handleRemoveQuestion(index)}
              className='bg-red-500 text-white px-2 mt-2'
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
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveTest}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateTests;
