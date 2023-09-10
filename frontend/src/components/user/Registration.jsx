import { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import BackButton from '../BackButton';
import Spinner from '../Spinner';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegistrateUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    setLoading(true);
    try {
      await axios.post('http://localhost:5555/users/registration', {
        name,
        email,
        password
      });
      setLoading(false);
      enqueueSnackbar('User Created successfully', { variant: 'success' });
      navigate(`/home/${name}`);
    } catch (error) {
      setLoading(false);
      enqueueSnackbar('Error', { variant: 'error' });
      console.log(error);
    }
  };

  // відправка даних на реєстрацію

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <BackButton />
        <h2 className="text-2xl font-semibold mb-4">Registration</h2>
        <form onSubmit={handleRegistrateUser}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
