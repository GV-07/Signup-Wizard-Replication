// StepFourSuccess.jsx
import React from 'react';

const StepFourSuccess = () => {
  return (
    <div className="flex flex-col items-center text-center space-y-4 py-8">
      <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900">Profile Completed!</h2>
      <p className="text-gray-600">
        Your account has been successfully created. Welcome aboard!
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-6 text-blue-600 font-medium hover:underline"
      >
        Start Over
      </button>
    </div>
  );
};

export default StepFourSuccess;