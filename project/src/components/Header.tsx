import React from 'react';
import { Activity } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <header className="bg-black shadow-lg border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Activity className="w-8 h-8 text-cyan-400 mr-3 animate-pulse" />
            <h1 className="text-xl font-bold text-white">
              Diagnostic Check Ranking System
            </h1>
          </div>
          
          <nav className="flex space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                location.pathname === '/'
                  ? 'bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.1)]'
                  : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10'
              }`}
            >
              How To Use
            </Link>
            <Link
              to="/select"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                location.pathname === '/select'
                  ? 'bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.1)]'
                  : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10'
              }`}
            >
              Ranking
            </Link>
            <Link
              to="/tools"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                location.pathname === '/tools'
                  ? 'bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.1)]'
                  : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10'
              }`}
            >
              Tools Directory
            </Link>
            <Link
              to="/compare"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                location.pathname === '/compare'
                  ? 'bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.1)]'
                  : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10'
              }`}
            >
              Compare Tools
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}