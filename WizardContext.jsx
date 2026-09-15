// WizardContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { useToast } from './ToastContext';

const WizardContext = createContext();

export const useWizard = () => useContext(WizardContext);

export const WizardProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    age: '',
    pronouns: '',
    state: '',
    city: '',
  });

  // Import the toast function from our custom ToastContext
  const { showToast } = useToast();

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  // Simulating submission loading state and network reliability
  const simulateSubmit = async (callback) => {
    setIsLoading(true);
    
    // Simulate a 1.5-second network delay
    await new Promise((resolve) => setTimeout(resolve, 1500)); 
    
    // Simulate a random network failure (30% chance to fail) to demonstrate error handling
    const isSuccess = Math.random() > 0.3; 

    setIsLoading(false);

    if (isSuccess) {
      callback(); // Proceed to the next step
    } else {
      // Trigger the global error alert
      showToast('Network error: Failed to submit. Please try again.', 'error');
    }
  };

  return (
    <WizardContext.Provider value={{ 
      currentStep, 
      formData, 
      updateFormData, 
      nextStep, 
      prevStep, 
      isLoading, 
      simulateSubmit 
    }}>
      {children}
    </WizardContext.Provider>
  );
};