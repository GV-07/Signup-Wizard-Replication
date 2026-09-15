// App.jsx
import React from 'react';
import { ToastProvider } from './ToastContext';
import { WizardProvider } from './WizardContext';
import SignupWizard from './SignupWizard';

const App = () => {
  return (
    <ToastProvider>
      <WizardProvider>
        <SignupWizard />
      </WizardProvider>
    </ToastProvider>
  );
};

export default App;