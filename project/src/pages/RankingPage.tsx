import React from 'react';
import { ArrowRight } from 'lucide-react';
import CategorySection from '../components/CategorySection';
import { diagnosticData } from '../data';

interface RankingPageProps {
  categoryRankings: Record<string, string[]>;
  setCategoryRankings: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  onComplete: () => void;
}

export default function RankingPage({
  categoryRankings,
  setCategoryRankings,
  onComplete,
}: RankingPageProps) {
  const handleUpdateRanking = (categoryName: string, newOrder: string[]) => {
    setCategoryRankings(prev => ({
      ...prev,
      [categoryName]: newOrder
    }));
  };

  return (
    <div className="space-y-8">
      <div className="neon-border-container shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Instructions</h2>
        <p className="text-gray-600">
          Drag and reorder the checks within each category based on their importance to you.
          Checks at the top have higher priority than those below them.
        </p>
      </div>

      {diagnosticData.categories.map(category => (
        <div key={category.name} className="neon-border-container shadow-lg">
          <CategorySection
            category={category}
            items={categoryRankings[category.name]}
            onReorder={(newOrder) => handleUpdateRanking(category.name, newOrder)}
          />
        </div>
      ))}

      <div className="flex justify-end mt-8">
        <button
          onClick={onComplete}
          className="group relative flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg overflow-hidden transition-transform active:scale-95"
        >
          <span className="relative z-10">View Recommendations</span>
          <ArrowRight className="relative z-10 ml-2 w-5 h-5" />
          <div className="absolute inset-0 bg-blue-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
        </button>
      </div>
    </div>
  );
}