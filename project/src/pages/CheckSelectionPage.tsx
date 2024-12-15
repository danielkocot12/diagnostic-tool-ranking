import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { diagnosticData } from '../data';
import { useNavigate } from 'react-router-dom';

interface CheckSelectionPageProps {
  onComplete: (selectedChecks: Record<string, string[]>) => void;
}

export default function CheckSelectionPage({ onComplete }: CheckSelectionPageProps) {
  const navigate = useNavigate();
  const [selectedChecks, setSelectedChecks] = useState<Record<string, string[]>>(
    Object.fromEntries(diagnosticData.categories.map(category => [category.name, []]))
  );

  const handleCheckToggle = (categoryName: string, checkName: string) => {
    setSelectedChecks(prev => ({
      ...prev,
      [categoryName]: prev[categoryName].includes(checkName)
        ? prev[categoryName].filter(name => name !== checkName)
        : [...prev[categoryName], checkName]
    }));
  };

  const handleContinue = () => {
    onComplete(selectedChecks);
    navigate('/ranking');
  };

  const totalSelectedChecks = Object.values(selectedChecks).reduce(
    (sum, checks) => sum + checks.length, 0
  );

  return (
    <div className="space-y-8">
      <div className="neon-border-container shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Diagnostic Checks</h2>
        <p className="text-gray-600">
          Choose the diagnostic checks that are most important to you. These will be ranked in the next step.
        </p>
        <div className="mt-4 text-sm text-gray-500">
          Selected: {totalSelectedChecks} checks
        </div>
      </div>

      {diagnosticData.categories.map(category => (
        <div key={category.name} className="neon-border-container shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {category.name}
            <span className="ml-2 text-sm text-gray-500">
              ({selectedChecks[category.name].length} selected)
            </span>
          </h3>
          <div className="space-y-3">
            {category.checks.map(check => (
              <label
                key={check.name}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedChecks[category.name].includes(check.name)}
                  onChange={() => handleCheckToggle(category.name, check.name)}
                  className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <div>
                  <div className="font-medium text-gray-800">{check.name}</div>
                  <div className="text-sm text-gray-600">{check.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-end mt-8">
        <button
          onClick={handleContinue}
          disabled={totalSelectedChecks === 0}
          className="group relative flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg overflow-hidden transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
        >
          <span className="relative z-10">Continue to Ranking</span>
          <ArrowRight className="relative z-10 ml-2 w-5 h-5" />
          <div className="absolute inset-0 bg-blue-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
        </button>
      </div>
    </div>
  );
}