import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../Firebase/firebaseConfig';
import { toast } from 'react-toastify';
import { Link , useNavigate } from 'react-router-dom';

const Signup = () => {

  const navigate = useNavigate();
  
  const [formData,setFormData] = useState({
    name : "",
    email : "",
    password : "",
    confirmPassword : ""

  })

  // Authentication Signup
  const handleSignup = async (e) => {
    e.preventDefault()
    const { name , email, password , confirmPassword } = formData;

     // Check if any field is empty
     if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user;
      console.log(user);
      toast.success("Signup Success!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      toast.error(error.message)
    }
  }
  







  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-white p-4">
    <div className="border border-gray-300 rounded-2xl shadow-xl bg-white p-6 md:p-8 w-full max-w-[400px]">
      <div className="text-center mb-6">
        <h1 className="font-extrabold text-2xl md:text-3xl mb-2">Hi!</h1>
        <p className="text-gray-500 font-medium text-sm md:text-base">Create a new account</p>
      </div>
  
      {/* Form with proper spacing */}
      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        {/* Name */}
        <div className="space-y-1">
          <input
            type="text"
            value={formData.name}
            placeholder="Enter Name"
            onChange={(e)=>setFormData({...formData,name:e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm md:text-base"
          />
        </div>
  
        {/* Email */}
        <div className="space-y-1">
          <input
            type="email"
            value={formData.email} 
            placeholder="Enter Email"
            onChange={(e)=>setFormData({...formData,email:e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm md:text-base"
          />
        </div>
  
        {/* Password */}
        <div className="space-y-1">
          <input
            type="password"
            value={formData.password}
            placeholder="Enter Password"
            onChange={(e)=>setFormData({...formData,password:e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm md:text-base"
          />
        </div>
  
        {/* Confirm Password */}
        <div className="space-y-1">
          <input
            type="password"
            value={formData.confirmPassword} 
            placeholder="Confirm Password"
            onChange={(e)=>setFormData({...formData,confirmPassword:e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm md:text-base"
          />
        </div>
  
        {/* Signup Button */}
        <div className="mt-2">
          <button
            type="submit"
            className="w-full py-2 md:py-3 text-white bg-black rounded-md hover:bg-gray-800 transition duration-200 text-sm md:text-base"
          >
            Sign Up
          </button>
        </div>
  
        <div className="pt-2 border-t border-gray-200 mt-4">
          <p className="text-center text-xs md:text-sm">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </p>
        </div>
      </form>
    </div>
  </div>

  )
}

export default Signup










