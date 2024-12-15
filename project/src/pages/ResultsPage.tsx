import React, { useMemo, useState } from 'react';
import { Trophy, Wrench, ChevronDown, ChevronUp, Check, X, Download } from 'lucide-react';
import { diagnosticData } from '../data';
import CheckModal from '../components/CheckModal';
import { useNavigate } from 'react-router-dom';
import { generateCSV, downloadCSV } from '../utils/csvExport';

interface ResultsPageProps {
  categoryRankings: Record<string, string[]>;
  selectedChecks: Record<string, string[]>;
}

interface ToolAnalysis {
  tool: string;
  score: number;
  categoryScores: Record<string, {
    included: string[];
    notIncluded: string[];
  }>;
}

export default function ResultsPage({ categoryRankings, selectedChecks }: ResultsPageProps) {
  const navigate = useNavigate();
  const [selectedCheck, setSelectedCheck] = useState<any>(null);
  const [expandedTools, setExpandedTools] = useState<Record<string, boolean>>({});

  const toolAnalysis = useMemo(() => {
    const analysis: ToolAnalysis[] = [];
    const allTools = new Set<string>();

    diagnosticData.categories.forEach(category => {
      category.checks.forEach(check => {
        check.tools.forEach(tool => allTools.add(tool));
      });
    });

    allTools.forEach(tool => {
      const toolData: ToolAnalysis = {
        tool,
        score: 0,
        categoryScores: {}
      };

      diagnosticData.categories.forEach(category => {
        const categoryChecks = categoryRankings[category.name] || [];
        toolData.categoryScores[category.name] = {
          included: [],
          notIncluded: []
        };

        categoryChecks.forEach((checkName, index) => {
          if (!selectedChecks[category.name].includes(checkName)) return;
          
          const check = category.checks.find(c => c.name === checkName);
          if (check) {
            if (check.tools.includes(tool)) {
              toolData.score += categoryChecks.length - index;
              toolData.categoryScores[category.name].included.push(checkName);
            } else {
              toolData.categoryScores[category.name].notIncluded.push(checkName);
            }
          }
        });
      });

      analysis.push(toolData);
    });

    return analysis.sort((a, b) => b.score - a.score).slice(0, 3);
  }, [categoryRankings, selectedChecks]);

  const totalSelectedChecks = useMemo(() => {
    return Object.values(selectedChecks).reduce((sum, checks) => sum + checks.length, 0);
  }, [selectedChecks]);

  const toggleToolExpansion = (tool: string) => {
    setExpandedTools(prev => ({
      ...prev,
      [tool]: !prev[tool]
    }));
  };

  const handleExportCSV = () => {
    const csvContent = generateCSV(toolAnalysis, selectedChecks);
    downloadCSV(csvContent, 'diagnostic-tool-recommendations.csv');
  };

  return (
    <div className="space-y-8">
      <div className="neon-border-container shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Trophy className="w-8 h-8 text-yellow-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Top Recommended Tools</h2>
          </div>
          <button
            onClick={handleExportCSV}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export as CSV
          </button>
        </div>

        <div className="space-y-8">
          {toolAnalysis.map((toolData, index) => {
            const totalIncludedChecks = Object.values(toolData.categoryScores).reduce(
              (sum, scores) => sum + scores.included.length, 0
            );

            return (
              <div key={toolData.tool} className="neon-border-container border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <Wrench className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">#{index + 1}</span>
                      <button
                        onClick={() => navigate(`/tool/${encodeURIComponent(toolData.tool)}`)}
                        className="block text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors"
                      >
                        {toolData.tool}
                      </button>
                      <span className="text-sm text-gray-600">
                        Covers {totalIncludedChecks} of {totalSelectedChecks} selected checks
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleToolExpansion(toolData.tool)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    {expandedTools[toolData.tool] ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>

                {expandedTools[toolData.tool] && (
                  <div className="mt-4 space-y-4">
                    {Object.entries(toolData.categoryScores).map(([category, scores]) => {
                      const selectedCount = selectedChecks[category].length;
                      if (selectedCount === 0) return null;

                      return (
                        <div key={category}>
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-gray-700">{category}</h4>
                            <span className="text-sm text-gray-600">
                              {scores.included.length}/{selectedCount} checks
                            </span>
                          </div>
                          <div className="space-y-2">
                            {selectedChecks[category].map(checkName => {
                              const isIncluded = scores.included.includes(checkName);
                              return (
                                <button
                                  key={checkName}
                                  onClick={() => {
                                    const check = diagnosticData.categories
                                      .find(c => c.name === category)
                                      ?.checks.find(c => c.name === checkName);
                                    if (check) setSelectedCheck(check);
                                  }}
                                  className="flex items-start gap-2 w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                  {isIncluded ? (
                                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                  ) : (
                                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                  )}
                                  <span className="text-sm text-gray-700">{checkName}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {selectedCheck && (
        <CheckModal
          check={selectedCheck}
          onClose={() => setSelectedCheck(null)}
        />
      )}
    </div>
  );
}