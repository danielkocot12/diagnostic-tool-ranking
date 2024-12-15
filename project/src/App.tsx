import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RankingPage from './pages/RankingPage';
import ResultsPage from './pages/ResultsPage';
import ToolSummaryPage from './pages/ToolSummaryPage';
import ToolsDirectoryPage from './pages/ToolsDirectoryPage';
import ComparisonPage from './pages/ComparisonPage';
import CheckSelectionPage from './pages/CheckSelectionPage';
import HowToUsePage from './pages/HowToUsePage';
import Header from './components/Header';
import { diagnosticData } from './data';

function App() {
  const [isRankingComplete, setIsRankingComplete] = useState(false);
  const [selectedChecks, setSelectedChecks] = useState<Record<string, string[]>>({});
  const [categoryRankings, setCategoryRankings] = useState<Record<string, string[]>>({});

  const handleCheckSelection = (selected: Record<string, string[]>) => {
    setSelectedChecks(selected);
    setCategoryRankings(selected);
    setIsRankingComplete(false); // Reset ranking completion when new checks are selected
  };

  const handleComplete = () => {
    setIsRankingComplete(true);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HowToUsePage />} />
            <Route
              path="/select"
              element={
                <CheckSelectionPage onComplete={handleCheckSelection} />
              }
            />
            <Route
              path="/ranking"
              element={
                isRankingComplete ? (
                  <ResultsPage 
                    categoryRankings={categoryRankings}
                    selectedChecks={selectedChecks}
                  />
                ) : (
                  <RankingPage
                    categoryRankings={categoryRankings}
                    setCategoryRankings={setCategoryRankings}
                    onComplete={handleComplete}
                  />
                )
              }
            />
            <Route path="/tools" element={<ToolsDirectoryPage />} />
            <Route path="/tool/:toolName" element={<ToolSummaryPage />} />
            <Route path="/compare" element={<ComparisonPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;