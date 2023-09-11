import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

import TestsCard from '../components/home/TestCard.jsx';
import { UserContext } from '../components/user/UserContext';

const Home = () => {

  const navigate = useNavigate();
  
  const handleRegisterClick = () => {
    navigate('/registration'); 
  }

  const handleAuthClick = () => {
    navigate('/auth'); 
  }

  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://web-test-ffhg.vercel.app/')
      .then((response) => {
        setTests(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

 

  
  return (
    
    // <div className='p-4'>
    //   <div className='flex justify-center items-center gap-x-4'>
    //     <button
    //       className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
    //       onClick={handleRegisterClick}
    //     >
    //       Sign in
    //     </button>
        
    //     <button
    //       className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
    //       onClick={handleAuthClick}
    //     >
    //       Log in
    //     </button>
    //   </div>
    //   <div className='flex justify-between items-center'>
    //     <h1 className='text-3xl my-8'>Tests List</h1>
    //     {/* <Link to='/tests/create'>
    //       <MdOutlineAddBox className='text-red-800 text-4xl' />
    //     </Link> */}
    //   </div>
      
    //   {loading ? (
    //     <Spinner />
    //   ) : <TestsCard tests={tests} /> }
    // </div>
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center mb-4">
          Welcome to Recruitment Assessment System
        </h2>
        <p className="text-gray-600 text-center mb-6">
          A web-based system for conducting recruitment assessments. Create tests, manage questions, authorize users, and view assessment results.
        </p>
        <p className="text-green-600 text-center mb-6">
          To get started, register or log in
        </p>
        
        <div className="flex justify-center space-x-4">
          <Link
            to="/auth"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Log In
          </Link>
          <Link
            to="/registration"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Sign Up
          </Link>
          {/* <Link
            to="/create-test"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Create Test
          </Link> */}
        </div>
      </div>
    </div>
  );
 
};

export default Home;
