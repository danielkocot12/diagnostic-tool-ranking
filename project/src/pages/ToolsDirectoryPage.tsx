import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrench, Search } from 'lucide-react';
import { diagnosticData } from '../data';

export default function ToolsDirectoryPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const allTools = useMemo(() => {
    const toolsSet = new Set<string>();
    diagnosticData.categories.forEach(category => {
      category.checks.forEach(check => {
        check.tools.forEach(tool => toolsSet.add(tool));
      });
    });
    return Array.from(toolsSet).sort((a, b) => a.localeCompare(b));
  }, []);

  const filteredTools = useMemo(() => {
    return allTools.filter(tool =>
      tool.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allTools, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="neon-border-container shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Tools Directory</h1>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map(tool => (
            <button
              key={tool}
              onClick={() => navigate(`/tool/${encodeURIComponent(tool)}`)}
              className="group p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-all hover:shadow-lg text-left"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Wrench className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {tool}
                  </h3>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No tools found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}