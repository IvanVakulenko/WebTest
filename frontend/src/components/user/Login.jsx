import { useContext, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import BackButton from '../BackButton';
import Spinner from '../Spinner';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Очищаємо помилки при зміні значення поля вводу
    setErrors({ ...errors, [name]: '' });
  };

  const handleAuthUser = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5555/users/auth', {
        email,
        password,
      });
      setLoading(false);
      if (response.status === 200) {
        enqueueSnackbar('User logged in successfully', { variant: 'success' });
        navigate(`/home/${response.data.name}`);
      } else {
        enqueueSnackbar('Authentication failed. Please check your email and password.', { variant: 'error' });
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.errors) {
        // Встановлюємо помилки з сервера
        setErrors(error.response.data.errors);
      } else {
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <BackButton />
        <h2 className="text-2xl font-semibold mb-4">Log in</h2>
        <form onSubmit={handleAuthUser}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 mt-1 ${errors.email ? 'border-red-500' : ''}`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 mt-1 ${errors.password ? 'border-red-500' : ''}`}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
