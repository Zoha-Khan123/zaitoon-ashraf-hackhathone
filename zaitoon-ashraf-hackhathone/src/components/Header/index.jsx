import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { auth } from '../../Firebase/firebaseConfig';
import { signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout Successful");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header className="bg-black text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/dashboard" className="text-xl font-bold">
          Task Manager
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/add" 
            className="px-3 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Add Task
          </Link>
          <Link 
            to="/dashboard" 
            className="px-3 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded hover:bg-gray-800 text-red-400 hover:text-red-300 transition-colors"
          >
            Logout
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Mobile Navigation */}
        <div className={`fixed top-0 right-0 h-full w-80 bg-black z-50 transform ${toggle ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-end mb-8">
              <button 
                onClick={() => setToggle(false)}
                className="text-white focus:outline-none"
              >
                <FaTimes size={24} />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-6">
              <Link 
                to="/add" 
                className="px-3 py-2 rounded hover:bg-gray-800 transition-colors"
                onClick={() => setToggle(false)}
              >
                Add Task
              </Link>
              <Link 
                to="/dashboard" 
                className="px-3 py-2 rounded hover:bg-gray-800 transition-colors"
                onClick={() => setToggle(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setToggle(false);
                }}
                className="px-3 py-2 rounded hover:bg-slate-800 text-red-400 hover:text-red-300 transition-colors text-left"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;