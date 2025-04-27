import React from 'react';
import {BackButton} from '../../screen/index';

const NotFound = () => {

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Heading */}
        <h1 className="text-8xl md:text-9xl font-bold text-white mb-2">404</h1>
        
        {/* Divider Line */}
        <div className="w-16 h-0.5 bg-gray-400 mx-auto my-4"></div>
        
        {/* Title */}
        <h2 className="text-xl md:text-2xl font-medium text-gray-300 mb-4">
          Page Not Found
        </h2>
        
        {/* Description */}
        <p className="text-gray-400 mb-8 text-sm md:text-base">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        
       <BackButton/>
      </div>
    </div>
  );
};

export default NotFound;