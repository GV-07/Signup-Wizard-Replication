// StepOneEmail.jsx
import React, { useState } from 'react';
import { useWizard } from './WizardContext';

const StepOneEmail = () => {
  const { formData, updateFormData, nextStep, isLoading, simulateSubmit } = useWizard();
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e) => {
    const val = e.target.value;
    updateFormData({ email: val });
    
    // Real-time validation
    if (val.trim() === '') {
      setError('Email cannot be empty.');
    } else if (!validateEmail(val)) {
      setError('Please enter a valid email address.');
    } else {
      setError('');
    }
  };

  const handleNext = () => {
    if (validateEmail(formData.email)) {
      simulateSubmit(nextStep);
    } else {
      setError('A valid email is required to proceed.');
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Welcome!</h2>
      <p className="text-gray-600">Let's start with your email address.</p>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input 
          type="email" 
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none transition-colors ${
            error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
          }`}
          placeholder="name@example.com"
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>

      <button 
        onClick={handleNext}
        disabled={isLoading || !!error || formData.email === ''}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex justify-center items-center disabled:opacity-50"
      >
        {isLoading ? (
          <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
        ) : (
          'Continue'
        )}
      </button>
    </div>
  );
};

export default StepOneEmail;