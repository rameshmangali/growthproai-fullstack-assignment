import React from 'react';
import { BusinessProvider } from './context/BusinessContext';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <BusinessProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Local Business Dashboard
          </h1>
          <Dashboard />
        </div>
      </div>
    </BusinessProvider>
  );
}

export default App;