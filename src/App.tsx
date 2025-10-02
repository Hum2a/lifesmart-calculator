import React from 'react';
import logo from './logo.svg';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <header className="text-center">
          <img src={logo} className="h-16 w-16 mx-auto mb-4 animate-spin" alt="logo" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            LifeSmart Calculator
          </h1>
          <p className="text-gray-600 mb-6">
            Your calculator tool is ready for development!
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Environment Setup Complete:</strong>
            </p>
            <ul className="text-sm text-blue-700 mt-2 space-y-1">
              <li>✅ TypeScript configured</li>
              <li>✅ Tailwind CSS installed</li>
              <li>✅ Development environment ready</li>
            </ul>
          </div>
        </header>
      </div>
    </div>
  );
};

export default App;
