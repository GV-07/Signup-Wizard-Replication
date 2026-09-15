// ToastContext.jsx
import React, { createContext, useState, useContext } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: '', type: 'error', isVisible: false });

  const showToast = (message, type = 'error') => {
    setToast({ message, type, isVisible: true });
    // Auto-hide the toast after 3 seconds
    setTimeout(() => setToast((prev) => ({ ...prev, isVisible: false })), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Global Toast UI */}
      {toast.isVisible && (
        <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white font-medium transition-opacity z-50 ${
          toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'
        }`}>
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};