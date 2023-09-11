import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

// import TestsCard from '../components/home/TestCard.jsx';
// import { UserContext } from '../components/user/UserContext';
import TestsCardLogin from '../components/home/TestCardLogin';
import NavBar from '../components/NavBar';
import { enqueueSnackbar } from 'notistack';



const HomeLogin = () => {

  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const { name } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://web-test-ffhg.vercel.app/tests')
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
    
    <div className='p-4'>
        {/* <div className='flex justify-center items-center'>
          {name ? (
            <h1 className=' text-3xl my-8'>Hello, {name}!</h1>
          ) : (
            <p>You are not logged in.</p>
          )}
              
        </div> */}
      
      <div className='flex justify-center items-center gap-x-4'>
        <h1 className='text-3xl my-8'>It`s Your Tests Board</h1>
        <div className='flex justify-between items-center'>
       
      </div>
      </div>
      {loading ? (
        <Spinner />
      ) : <>
      <TestsCardLogin tests={tests} /> 
      </>
      }
      
    </div>
  );
 
};

export default HomeLogin;
