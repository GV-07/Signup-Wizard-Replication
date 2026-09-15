// SignupWizard.jsx
import React from 'react';
import { useWizard } from './WizardContext';
import StepOneEmail from './StepOneEmail';
import StepTwoDetails from './StepTwoDetails';
import StepThreeTerms from './StepThreeTerms';
import StepFourSuccess from './StepFourSuccess';

const SignupWizard = () => {
  const { currentStep } = useWizard();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOneEmail />;
      case 2:
        return <StepTwoDetails />;
      case 3:
        return <StepThreeTerms />;
      case 4:
        return <StepFourSuccess />;
      default:
        return <StepOneEmail />;
    }
  };

  // Do not show the step indicator on the final success screen
  const showProgress = currentStep < 4;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-poppins p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">
        
        {/* Progress Indicator */}
        {showProgress && (
          <div className="mb-6">
            <div className="text-sm text-gray-500 font-semibold mb-2">
              Step {currentStep} of 3
            </div>
            {/* Optional: A simple progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Render the current form step */}
        {renderStep()}
        
      </div>
    </div>
  );
};

export default SignupWizard;