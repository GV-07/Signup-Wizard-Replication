// StepTwoDetails.jsx
import React, { useState, useEffect } from 'react';
import { useWizard } from './WizardContext';

// Mock data for cross-field dependency
const locationData = {
  California: ['Los Angeles', 'San Francisco', 'San Diego'],
  Texas: ['Austin', 'Houston', 'Dallas'],
  NewYork: ['New York City', 'Buffalo', 'Rochester']
};

const StepTwoDetails = () => {
  const { formData, updateFormData, nextStep, prevStep, isLoading, simulateSubmit } = useWizard();
  const [errors, setErrors] = useState({});
  const [availableCities, setAvailableCities] = useState([]);

  // Cross-field logic: Update available cities when state changes
  useEffect(() => {
    if (formData.state) {
      setAvailableCities(locationData[formData.state] || []);
      // Reset city if the new state doesn't have the currently selected city
      if (!locationData[formData.state]?.includes(formData.city)) {
        updateFormData({ city: '' });
      }
    } else {
      setAvailableCities([]);
    }
  }, [formData.state]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    
    // Age constraints: numeric only, >= 18
    if (!formData.age) {
      newErrors.age = 'Age is required.';
    } else if (isNaN(formData.age)) {
      newErrors.age = 'Age must be a number.';
    } else if (parseInt(formData.age, 10) < 18) {
      newErrors.age = 'You must be at least 18 years old.';
    }

    if (!formData.state) newErrors.state = 'Please select a state.';
    if (!formData.city) newErrors.city = 'Please select a city.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      simulateSubmit(nextStep);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">About You</h2>
      <p className="text-gray-600">Tell us a bit more about yourself.</p>

      {/* Name Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input 
          type="text" 
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* Age & Pronouns Row */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input 
            type="text" 
            maxLength="3"
            value={formData.age}
            // Prevent non-numeric typing
            onChange={(e) => updateFormData({ age: e.target.value.replace(/\D/g, '') })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none"
          />
          {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Pronouns (Opt)</label>
          <input 
            type="text" 
            value={formData.pronouns}
            onChange={(e) => updateFormData({ pronouns: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none"
            placeholder="e.g., they/them"
          />
        </div>
      </div>

      {/* State Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
        <select 
          value={formData.state}
          onChange={(e) => updateFormData({ state: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none bg-white"
        >
          <option value="">Select a state</option>
          {Object.keys(locationData).map(state => (
            <option key={state} value={state}>{state.replace(/([A-Z])/g, ' $1').trim()}</option>
          ))}
        </select>
        {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
      </div>

      {/* City Selection (Dependent on State) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
        <select 
          value={formData.city}
          onChange={(e) => updateFormData({ city: e.target.value })}
          disabled={!formData.state}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none bg-white disabled:bg-gray-100"
        >
          <option value="">Select a city</option>
          {availableCities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-3 pt-4">
        <button 
          onClick={prevStep}
          disabled={isLoading}
          className="w-1/3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Back
        </button>
        <button 
          onClick={handleNext}
          disabled={isLoading}
          className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex justify-center items-center"
        >
          {isLoading ? (
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
          ) : (
            'Continue'
          )}
        </button>
      </div>
    </div>
  );
};

export default StepTwoDetails;