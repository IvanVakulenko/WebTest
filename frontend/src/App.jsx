
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HomeLogin from './pages/HomeLogin';

import CreateTest from './pages/CreateTest';
import ShowTest from './pages/ShowTest';
import EditTest from './pages/EditTest';
import DeleteTest from './pages/DeleteTest';

import Registration from './components/user/Registration';
import Login from './components/user/Login';
import NavBar from './components/NavBar';



import { UserProvider } from './components/user/UserContext';


// axios.defaults.baseURL = 'http://localhost:5555';
// axios.defaults.withCredentials = true;

const App = () => {
  return (
      
      
      <>
      
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home/' element={<HomeLogin />} />
          <Route path='/registration' element={<Registration />} /> 
          <Route path='/tests/create' element={<CreateTest />} />
          <Route path='/tests/details/:id' element={<ShowTest />} />
          <Route path='/tests/edit/:id' element={<EditTest />} />
          <Route path='/tests/delete/:id' element={<DeleteTest />} />
          <Route path='/auth' element={<Login/>} /> 
        </Routes>
      
      </>
   
     
    
  );
};

export default App;
