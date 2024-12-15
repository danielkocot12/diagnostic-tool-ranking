import React, { useState, useRef, useEffect } from 'react';
import { Trophy, CheckSquare, ArrowDownUp, Lightbulb, ArrowBigDown } from 'lucide-react';

interface UseCaseProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  category: string;
  checks: string[];
}

export default function UseCase({ title, icon: Icon, description, category, checks }: UseCaseProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeSection, setActiveSection] = useState<'selection' | 'ranking' | null>(null);
  const [checkStates, setCheckStates] = useState<boolean[]>(checks.map(() => false));
  const [visibleChecks, setVisibleChecks] = useState<string[]>([]);
  const [rankedChecks, setRankedChecks] = useState<string[]>([...checks]);
  const [draggedCheck, setDraggedCheck] = useState<string | null>(null);
  const [isMoving, setIsMoving] = useState(false);
  const [movingCheckPosition, setMovingCheckPosition] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const checkboxRefs = useRef<(HTMLInputElement | null)[]>([]);
  const rankingRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      resetAnimation();
      startAnimation();
    } else {
      clearAnimation();
    }
  };

  const clearAnimation = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
    setActiveSection(null);
    setCheckStates(checks.map(() => false));
    setVisibleChecks([]);
    setDraggedCheck(null);
    setIsMoving(false);
  };

  const resetAnimation = () => {
    setCheckStates(checks.map(() => false));
    setVisibleChecks([]);
    setActiveSection(null);
  };

  const startAnimation = () => {
    resetAnimation();
    let delay = 500;

    // Selection animation
    setActiveSection('selection');
    checks.forEach((check, index) => {
      animationRef.current = setTimeout(() => {
        setCheckStates(prev => {
          const newStates = [...prev];
          newStates[index] = true;
          return newStates;
        });
        setVisibleChecks(prev => [...prev, check]);
      }, delay);
      delay += 1000;
    });

    // Set ranking section active first, then start the ranking animation after a delay
    animationRef.current = setTimeout(() => {
      setActiveSection('ranking');
      // Wait for the glow effect to appear before starting the ranking animation
      setTimeout(animateRanking, 500);
    }, delay + 1000);
  };

  const animateRanking = () => {
    const bottomCheck = rankedChecks[rankedChecks.length - 1];
    if (!bottomCheck) return;

    setDraggedCheck(bottomCheck);
    const topItemRect = rankingRefs.current[0]?.getBoundingClientRect();
    const bottomItemRect = rankingRefs.current[rankedChecks.length - 1]?.getBoundingClientRect();

    if (topItemRect && bottomItemRect && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      setMovingCheckPosition({
        x: 0,
        y: topItemRect.top - containerRect.top
      });
      setIsMoving(true);

      setTimeout(() => {
        setRankedChecks(prev => [prev[prev.length - 1], ...prev.slice(0, -1)]);
        setDraggedCheck(null);
        setIsMoving(false);

        // Reset animation after completion with shorter delay (reduced from 4000 to 1500)
        setTimeout(() => {
          startAnimation();
        }, 1500);
      }, 500);
    }
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="flip-card h-[600px]"
      onClick={handleCardClick}
    >
      <div className={`flip-card-inner h-full ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-front bg-white rounded-lg shadow p-6">
          <div className="flex flex-col h-full">
            <div className="p-3 bg-blue-100 rounded-full w-fit">
              <Icon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">{title}</h3>
            <p className="text-gray-600 flex-grow">{description}</p>
            <p className="text-sm text-blue-600 mt-4">Click to see example workflow →</p>
          </div>
        </div>

        <div className="flip-card-back bg-white rounded-lg shadow p-6">
          <div className="space-y-6" ref={containerRef}>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <h4 className="font-semibold text-gray-800">Focus on {category}</h4>
            </div>

            <div className="flex justify-center">
              <ArrowBigDown className="w-6 h-6 text-blue-400" />
            </div>

            <div className={`category-section ${activeSection === 'selection' ? 'active' : ''}`}>
              <div className="flex items-center gap-2 mb-2">
                <CheckSquare className="w-5 h-5 text-green-500" />
                <h4 className="font-semibold text-gray-800">Selected Checks</h4>
              </div>
              <div className="space-y-2 pl-7">
                {checks.map((check, index) => (
                  <div key={check} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      ref={el => checkboxRefs.current[index] = el}
                      checked={checkStates[index]}
                      readOnly
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <span className="text-gray-700 whitespace-nowrap">{check}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowBigDown className="w-6 h-6 text-blue-400" />
            </div>

            <div className={`category-section ${activeSection === 'ranking' ? 'active' : ''}`}>
              <div className="flex items-center gap-2 mb-2">
                <ArrowDownUp className="w-5 h-5 text-purple-500" />
                <h4 className="font-semibold text-gray-800">Rank Selected Checks</h4>
              </div>
              <div className="relative pl-7 rank-container">
                {rankedChecks.map((check, index) => (
                  visibleChecks.includes(check) && (
                    <div
                      key={check}
                      ref={el => rankingRefs.current[index] = el}
                      className={`p-2 bg-gray-50 rounded border mb-2 rank-item ${
                        draggedCheck === check ? 'opacity-0' : ''
                      } ${
                        isMoving && index === 0 ? 'slide-down' : ''
                      } ${
                        isMoving && index === rankedChecks.length - 1 ? 'slide-up' : ''
                      }`}
                    >
                      <span className="text-gray-700 whitespace-nowrap">{check}</span>
                    </div>
                  )
                ))}
                {draggedCheck && visibleChecks.includes(draggedCheck) && (
                  <div
                    className="dragged-item p-2 rounded border border-blue-500"
                    style={{
                      left: `${movingCheckPosition.x}px`,
                      top: `${movingCheckPosition.y}px`,
                      width: rankingRefs.current[0]?.offsetWidth || 'auto'
                    }}
                  >
                    <span className="text-gray-700 whitespace-nowrap">{draggedCheck}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowBigDown className="w-6 h-6 text-blue-400" />
            </div>

            <div className="flex items-center justify-center">
              <div className="bg-blue-50 px-4 py-2 rounded-lg flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-blue-500" />
                <h4 className="font-semibold text-gray-800">Tool Recommendations</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}