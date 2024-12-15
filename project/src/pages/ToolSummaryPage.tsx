import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, Wrench } from 'lucide-react';
import { diagnosticData } from '../data';

export default function ToolSummaryPage() {
  const { toolName } = useParams();
  const navigate = useNavigate();
  const decodedToolName = decodeURIComponent(toolName || '');

  const toolAnalysis = React.useMemo(() => {
    const analysis = {
      includedChecks: new Map<string, Set<string>>(),
      totalChecks: new Map<string, number>(),
    };

    diagnosticData.categories.forEach(category => {
      analysis.totalChecks.set(category.name, category.checks.length);
      analysis.includedChecks.set(category.name, new Set());

      category.checks.forEach(check => {
        if (check.tools.includes(decodedToolName)) {
          analysis.includedChecks.get(category.name)?.add(check.name);
        }
      });
    });

    return analysis;
  }, [decodedToolName]);

  if (!decodedToolName) {
    return <div>Tool not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to recommendations
      </button>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-100 rounded-full">
            <Wrench className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">{decodedToolName}</h1>
        </div>

        <div className="space-y-8">
          {diagnosticData.categories.map(category => {
            const includedChecks = toolAnalysis.includedChecks.get(category.name) || new Set();
            const totalChecks = toolAnalysis.totalChecks.get(category.name) || 0;
            
            return (
              <div key={category.name} className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {category.name}
                  </h2>
                  <span className="text-sm font-medium text-gray-600">
                    {includedChecks.size}/{totalChecks} checks
                  </span>
                </div>

                <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{ width: `${(includedChecks.size / totalChecks) * 100}%` }}
                  />
                </div>

                <div className="space-y-2">
                  {category.checks.map(check => (
                    <div
                      key={check.name}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50"
                    >
                      {includedChecks.has(check.name) ? (
                        <Check className="w-5 h-5 text-green-500 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mt-0.5" />
                      )}
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {check.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {check.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}