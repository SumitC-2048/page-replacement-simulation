import React, { useState } from 'react';
import InputPanel from '../components/InputPanel';
import SimulationGrid from '../components/SimulationGrid';
import Controls from '../components/Controls';
import TheoryPanel from '../components/TheoryPanel';
import CodeView from '../components/CodeView';
import { fifoAlgorithm } from '../algorithms/fifo';
import { lruAlgorithm } from '../algorithms/lru';
import { optimalAlgorithm } from '../algorithms/optimal';

const Index = () => {
  const [referenceString, setReferenceString] = useState([7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 1, 2, 0, 1, 7, 0, 1]);
  const [numFrames, setNumFrames] = useState(3);
  const [algorithm, setAlgorithm] = useState('FIFO');
  const [simulation, setSimulation] = useState({
    steps: [],
    currentStep: -1,
    totalFaults: 0,
    isPlaying: false,
    playSpeed: 1000
  });
  const [showCode, setShowCode] = useState(false);

  const algorithms = {
    FIFO: fifoAlgorithm,
    LRU: lruAlgorithm,
    Optimal: optimalAlgorithm
  };

  const runSimulation = () => {
    if (referenceString.length === 0 || numFrames <= 0) return;
    
    const algorithmFunc = algorithms[algorithm];
    const result = algorithmFunc(referenceString, numFrames);
    
    setSimulation({
      steps: result.steps,
      currentStep: -1,
      totalFaults: result.totalFaults,
      isPlaying: false,
      playSpeed: simulation.playSpeed
    });
  };

  const resetSimulation = () => {
    setSimulation(prev => ({
      ...prev,
      currentStep: -1,
      isPlaying: false
    }));
  };

  const stepForward = () => {
    setSimulation(prev => {
      const newStep = Math.min(prev.currentStep + 1, prev.steps.length - 1);
      const shouldStop = newStep >= prev.steps.length - 1;
      
      return {
        ...prev,
        currentStep: newStep,
        isPlaying: shouldStop ? false : prev.isPlaying
      };
    });
  };

  const stepBackward = () => {
    setSimulation(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, -1),
      isPlaying: false
    }));
  };

  const togglePlay = () => {
    setSimulation(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying
    }));
  };

  const setPlaySpeed = (speed) => {
    setSimulation(prev => ({
      ...prev,
      playSpeed: speed
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Page Replacement Algorithm Simulator
          </h1>
          <p className="text-lg text-gray-600">
            Visualize and understand FIFO, LRU, and Optimal page replacement algorithms
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <InputPanel
              referenceString={referenceString}
              setReferenceString={setReferenceString}
              numFrames={numFrames}
              setNumFrames={setNumFrames}
              algorithm={algorithm}
              setAlgorithm={setAlgorithm}
              onRunSimulation={runSimulation}
            />
          </div>

          {/* Main Simulation Area */}
          <div className="lg:col-span-2 space-y-6">
            <Controls
              simulation={simulation}
              onStepForward={stepForward}
              onStepBackward={stepBackward}
              onTogglePlay={togglePlay}
              onReset={resetSimulation}
              onSpeedChange={setPlaySpeed}
            />
            
            <SimulationGrid
              simulation={simulation}
              referenceString={referenceString}
              numFrames={numFrames}
              onStepForward={stepForward}
            />

            <div className="flex justify-center">
              <button
                onClick={() => setShowCode(!showCode)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {showCode ? 'Hide Code' : 'Show Code'}
              </button>
            </div>

            {showCode && (
              <CodeView algorithm={algorithm} />
            )}
          </div>

          {/* Theory Panel */}
          <div className="lg:col-span-1">
            <TheoryPanel algorithm={algorithm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index; 