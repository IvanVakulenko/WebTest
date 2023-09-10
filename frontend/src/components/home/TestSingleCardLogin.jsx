import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import TestModal from './TestModal';


const TestSingleCardLogin = ({ test }) => {
  const [showModal, setShowModal] = useState(false);

    return (
      
      <div className='border-2 border-gray-500 rounded-xl px-4 py-2 m-3 relative hover:shadow-xl'>
        <h4 className='my-2 text-gray-500'>{test._id}</h4>
        <div className='flex justify-start items-center gap-x-2'>
          <PiBookOpenTextLight className='text-red-300 text-2xl' />
          <h2 className='my-1'>{test.title}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <BiUserCircle className='text-red-300 text-2xl' />
          <h2 className='my-1'>{test.owner}</h2>
        </div>
        
        <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
        <Link to='/tests/create'>
          <MdOutlineAddBox className=' text-green-800 text-2xl' />
          </Link>
          <BiShow
            className='text-3xl text-blue-800 hover:text-black cursor-pointer'
            onClick={() => setShowModal(true)}
          />
          
          <Link to={`/tests/details/${test._id}`}>
            <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
          </Link>
          <Link to={`/tests/edit/${test._id}`}>
            <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
          </Link>
          <Link to={`/tests/delete/${test._id}`}>
            <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
          </Link>
        </div>
        {showModal && (
          <TestModal test={test} onClose={() => setShowModal(false)} />
        )}
      </div>
    );
}
  
    
// };

export default TestSingleCardLogin;
