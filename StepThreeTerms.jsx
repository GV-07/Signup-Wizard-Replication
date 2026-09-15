// StepThreeTerms.jsx
import React, { useState } from 'react';
import { useWizard } from './WizardContext';

const StepThreeTerms = () => {
  const { prevStep, nextStep, isLoading, simulateSubmit } = useWizard();
  const [accepted, setAccepted] = useState(false);

  const handleFinalSubmit = () => {
    if (accepted) {
      // Simulating the final API call that saves all form data
      simulateSubmit(nextStep);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Terms & Conditions</h2>
      <p className="text-gray-600 text-sm">
        Please read and accept our terms to complete your registration.
      </p>

      <div className="h-40 overflow-y-auto p-4 border rounded-lg bg-gray-50 text-sm text-gray-700">
        <p className="mb-2"><strong>1. Acceptance of Terms:</strong> By creating an account, you agree to our terms of service.</p>
        <p className="mb-2"><strong>2. Privacy Policy:</strong> We collect and process your data as outlined in our privacy policy.</p>
        <p><strong>3. User Conduct:</strong> You agree not to use the platform for any illegal activities.</p>
      </div>

      <div className="flex items-center space-x-2 mt-4">
        <input 
          type="checkbox" 
          id="terms"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="terms" className="text-sm text-gray-700">
          I agree to the Terms and Conditions
        </label>
      </div>

      <div className="flex space-x-3 pt-4">
        <button 
          onClick={prevStep}
          disabled={isLoading}
          className="w-1/3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Back
        </button>
        <button 
          onClick={handleFinalSubmit}
          disabled={isLoading || !accepted}
          className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex justify-center items-center disabled:opacity-50"
        >
          {isLoading ? (
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
          ) : (
            'Complete Signup'
          )}
        </button>
      </div>
    </div>
  );
};

export default StepThreeTerms;