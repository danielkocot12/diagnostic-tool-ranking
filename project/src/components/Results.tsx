import React from 'react';
import { DiagnosticCheck } from '../types';
import { Trophy, Wrench, AlertTriangle } from 'lucide-react';

interface ResultsProps {
  rankedChecks: DiagnosticCheck[];
  rankings: Record<string, number>;
}

export default function Results({ rankedChecks, rankings }: ResultsProps) {
  const getTopTools = () => {
    const toolCount: Record<string, number> = {};
    
    rankedChecks
      .filter(check => rankings[check.name] > 0)
      .sort((a, b) => (rankings[b.name] || 0) - (rankings[a.name] || 0))
      .slice(0, 5)
      .forEach(check => {
        check.tools.forEach(tool => {
          toolCount[tool] = (toolCount[tool] || 0) + (rankings[check.name] || 0);
        });
      });

    return Object.entries(toolCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([tool]) => tool);
  };

  const topTools = getTopTools();

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center mb-6">
        <Trophy className="w-8 h-8 text-yellow-500 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Recommended Tools</h2>
      </div>

      <div className="space-y-6">
        {topTools.map((tool, index) => (
          <div key={tool} className="flex items-center p-4 bg-gray-50 rounded-lg">
            <Wrench className="w-6 h-6 text-blue-600 mr-4" />
            <div>
              <span className="text-sm text-gray-500">#{index + 1}</span>
              <h3 className="text-lg font-semibold text-gray-800">{tool}</h3>
            </div>
          </div>
        ))}

        {topTools.length === 0 && (
          <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-yellow-500 mr-4" />
            <p className="text-gray-700">
              Please rank some diagnostic checks to get tool recommendations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}