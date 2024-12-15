import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckSquare, 
  ListOrdered, 
  Trophy, 
  ArrowRight, 
  Database,
  Cpu,
  Cloud,
  Pause,
  Play,
  Search,
  ArrowUpDown
} from 'lucide-react';
import UseCase from '../components/UseCase';

const steps = [
  {
    title: "Select Important Checks",
    description: "Choose which diagnostic checks matter most for your use case",
    icon: CheckSquare
  },
  {
    title: "Rank Your Selections",
    description: "Order the selected checks by priority within each category",
    icon: ListOrdered
  },
  {
    title: "Get Recommendations",
    description: "Receive personalized tool recommendations based on your priorities",
    icon: Trophy
  },
  {
    title: "Browse Tools Directory",
    description: "Search and explore our comprehensive catalog of diagnostic tools",
    icon: Search
  },
  {
    title: "Compare Tools",
    description: "Analyze and compare different tools side by side to make informed decisions",
    icon: ArrowUpDown
  }
];

const useCases = [
  {
    title: "Database Management",
    icon: Database,
    description: "For database administrators focused on memory handling and data integrity. Find tools that excel at detecting memory issues and ensuring reliable data storage and transfer operations.",
    category: "Memory Diagnostics",
    checks: ["VRAM Error Detection", "Memory Stress Testing"]
  },
  {
    title: "High-Performance Computing",
    icon: Cpu,
    description: "For HPC professionals seeking optimal GPU performance. Identify tools that provide comprehensive compute performance analysis and workload optimization capabilities.",
    category: "Compute Performance",
    checks: ["GPU Core Utilization", "Workload Benchmarking"]
  },
  {
    title: "Cloud Infrastructure",
    icon: Cloud,
    description: "For cloud architects managing distributed systems. Discover tools that monitor network performance and ensure reliable communication between components.",
    category: "Interconnect Diagnostics",
    checks: ["Bandwidth Monitoring", "Error Rate Analysis"]
  }
];

export default function HowToUsePage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showPauseAnimation, setShowPauseAnimation] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePauseToggle = () => {
    setIsPaused(!isPaused);
    setShowPauseAnimation(true);
    setTimeout(() => setShowPauseAnimation(false), 300);
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
    setIsPaused(true);
    setShowPauseAnimation(true);
    setTimeout(() => setShowPauseAnimation(false), 300);
  };

  const handleGetStarted = () => {
    window.scrollTo(0, 0);
    navigate('/select');
  };

  return (
    <div className="space-y-12">
      <div className="neon-border-container shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Find the Perfect Diagnostic Tools
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Our intelligent system helps you discover the most suitable diagnostic tools
          based on your specific needs and priorities.
        </p>

        <div className="relative h-64 bg-white rounded-lg shadow-md overflow-hidden">
          <div 
            className="absolute inset-0 flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentStep * 100}%)` }}
          >
            {steps.map((step, index) => (
              <div key={step.title} className="flex-shrink-0 w-full h-full p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-blue-100 rounded-full mb-4">
                    <step.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => handleStepClick(index)}
                className={`w-2 h-2 rounded-full transition-colors cursor-pointer hover:bg-blue-400 ${
                  currentStep === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handlePauseToggle}
            className={`absolute bottom-4 right-4 p-2 rounded-full bg-white shadow-md transition-transform ${
              showPauseAnimation ? 'scale-110' : ''
            }`}
          >
            {isPaused ? (
              <Play className="w-5 h-5 text-blue-600" />
            ) : (
              <Pause className="w-5 h-5 text-blue-600" />
            )}
          </button>
        </div>
      </div>

      <div className="neon-border-container shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Common Use Cases</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map(useCase => (
            <UseCase key={useCase.title} {...useCase} />
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleGetStarted}
          className="group relative flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg overflow-hidden transition-transform active:scale-95"
        >
          <span className="relative z-10 text-lg font-medium">Get Started</span>
          <ArrowRight className="relative z-10 ml-2 w-6 h-6" />
          <div className="absolute inset-0 bg-blue-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
        </button>
      </div>
    </div>
  );
}