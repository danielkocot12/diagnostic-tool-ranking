import React from 'react';
import { X } from 'lucide-react';
import { DiagnosticCheck } from '../types';
import { useNavigate } from 'react-router-dom';

interface CheckModalProps {
  check: DiagnosticCheck;
  onClose: () => void;
}

export default function CheckModal({ check, onClose }: CheckModalProps) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{check.name}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-4">{check.description}</p>
        
        <h4 className="font-medium text-gray-700 mb-2">Tools that include this check:</h4>
        <div className="space-y-2">
          {check.tools.map(tool => (
            <button
              key={tool}
              onClick={() => {
                navigate(`/tool/${encodeURIComponent(tool)}`);
                onClose();
              }}
              className="w-full text-left p-3 rounded-lg hover:bg-blue-50 transition-colors flex justify-between items-center group"
            >
              <span className="text-gray-800">{tool}</span>
              <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                View details →
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}