import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-semibold">Testing App</div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/auth" className="text-white hover:underline">
              Log in
            </Link>
          </li>
          <li>
            <Link to="/registration" className="text-white hover:underline">
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
