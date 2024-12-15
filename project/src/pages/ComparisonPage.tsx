import React, { useState, useMemo } from 'react';
import { Search, X, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { diagnosticData } from '../data';
import { useNavigate } from 'react-router-dom';

export default function ComparisonPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const allTools = useMemo(() => {
    const tools = new Set<string>();
    diagnosticData.categories.forEach(category => {
      category.checks.forEach(check => {
        check.tools.forEach(tool => tools.add(tool));
      });
    });
    return Array.from(tools);
  }, []);

  const filteredTools = useMemo(() => {
    return allTools.filter(tool =>
      tool.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allTools, searchTerm]);

  const toolAnalysis = useMemo(() => {
    const analysis: Record<string, Record<string, string[]>> = {};
    
    selectedTools.forEach(tool => {
      analysis[tool] = {};
      diagnosticData.categories.forEach(category => {
        analysis[tool][category.name] = category.checks
          .filter(check => check.tools.includes(tool))
          .map(check => check.name);
      });
    });

    return analysis;
  }, [selectedTools]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const toggleTool = (tool: string) => {
    setSelectedTools(prev => {
      if (prev.includes(tool)) {
        return prev.filter(t => t !== tool);
      }
      if (prev.length < 3) {
        return [...prev, tool];
      }
      return prev;
    });
  };

  return (
    <div className="space-y-6">
      <div className="neon-border-container shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Select Tools to Compare (Max 3)
        </h2>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map(tool => (
            <button
              key={tool}
              onClick={() => toggleTool(tool)}
              className={`p-4 rounded-lg border transition-all ${
                selectedTools.includes(tool)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              disabled={selectedTools.length >= 3 && !selectedTools.includes(tool)}
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-800 font-medium">{tool}</span>
                {selectedTools.includes(tool) && (
                  <Check className="w-5 h-5 text-blue-500" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedTools.length > 0 && (
        <div className="neon-border-container shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Comparison Results</h2>
          
          {diagnosticData.categories.map(category => (
            <div key={category.name} className="mb-6 last:mb-0">
              <button
                onClick={() => toggleCategory(category.name)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {category.name}
                </h3>
                {expandedCategories[category.name] ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {expandedCategories[category.name] && (
                <div className="mt-4 space-y-4">
                  {category.checks.map(check => (
                    <div key={check.name} className="pl-4">
                      <h4 className="font-medium text-gray-800 mb-2">
                        {check.name}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTools.map(tool => (
                          <div
                            key={tool}
                            className={`px-3 py-1 rounded-full text-sm ${
                              toolAnalysis[tool][category.name].includes(check.name)
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {tool}
                            {toolAnalysis[tool][category.name].includes(check.name) ? (
                              <Check className="inline-block w-4 h-4 ml-1" />
                            ) : (
                              <X className="inline-block w-4 h-4 ml-1" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}