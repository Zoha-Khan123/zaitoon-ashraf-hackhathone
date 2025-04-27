import React from 'react'
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();
  return (
    <div>
         {/* Home Button */}
         <button
          onClick={() => navigate('/')}
          className="px-6 py-2 border border-white text-white 
                   hover:bg-white hover:text-black transition duration-200"
        >
          Return to Home
        </button>
    </div>
  )
}

export default BackButton