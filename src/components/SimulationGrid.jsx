import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SimulationGrid = ({
  simulation,
  referenceString,
  numFrames,
  onStepForward
}) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    let interval;
    
    if (simulation.isPlaying && simulation.currentStep < simulation.steps.length - 1) {
      interval = setInterval(() => {
        onStepForward();
      }, simulation.playSpeed);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [simulation.isPlaying, simulation.currentStep, simulation.playSpeed, simulation.steps.length, onStepForward]);

  // Auto-scroll to the right when new steps are added
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, [simulation.currentStep]);

  if (simulation.steps.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Simulation Grid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            Configure your parameters and click "Run Simulation" to begin
          </div>
        </CardContent>
      </Card>
    );
  }

  const visibleSteps = simulation.steps.slice(0, simulation.currentStep + 1);
  const currentFaults = visibleSteps.filter(step => !step.isHit).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex justify-between items-center">
          Simulation Grid
          <div className="text-sm font-normal">
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded mr-2">
              Page Faults: {currentFaults}
            </span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
              Hit Rate: {referenceString.length > 0 ? ((visibleSteps.length - currentFaults) / visibleSteps.length * 100).toFixed(1) : 0}%
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto" ref={scrollContainerRef}>
          <div className="min-w-max">
            {/* Header with page references */}
            <div className="grid grid-flow-col gap-1 mb-2">
              <div className="w-16 h-8 flex items-center justify-center font-semibold text-gray-700">
                Page
              </div>
              {referenceString.slice(0, Math.max(simulation.currentStep + 1, 1)).map((page, index) => (
                <div
                  key={index}
                  className={`w-12 h-8 flex items-center justify-center text-sm font-medium rounded ${
                    index === simulation.currentStep
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {page}
                </div>
              ))}
            </div>

            {/* Frame rows */}
            {Array.from({ length: numFrames }, (_, frameIndex) => (
              <div key={frameIndex} className="grid grid-flow-col gap-1 mb-1">
                <div className="w-16 h-12 flex items-center justify-center font-semibold text-gray-700 bg-gray-50 rounded">
                  F{frameIndex}
                </div>
                {visibleSteps.map((step, stepIndex) => {
                  const page = step.frames[frameIndex];
                  const isNewPage = step.replacedIndex === frameIndex && !step.isHit;
                  const isHit = step.isHit && step.frames.includes(step.page);
                  
                  return (
                    <div
                      key={stepIndex}
                      className={`w-12 h-12 flex items-center justify-center text-sm font-medium rounded border-2 transition-all duration-300 ${
                        stepIndex === simulation.currentStep
                          ? 'ring-2 ring-blue-400'
                          : ''
                      } ${
                        page === null
                          ? 'bg-gray-50 border-gray-200'
                          : isNewPage
                          ? 'bg-red-100 border-red-300 text-red-800'
                          : isHit && step.frames.includes(step.page)
                          ? 'bg-green-100 border-green-300 text-green-800'
                          : 'bg-blue-50 border-blue-200 text-blue-800'
                      }`}
                    >
                      {page !== null ? page : '—'}
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Hit/Fault indicator row */}
            <div className="grid grid-flow-col gap-1 mt-2">
              <div className="w-16 h-8 flex items-center justify-center font-semibold text-gray-700">
                Result
              </div>
              {visibleSteps.map((step, stepIndex) => (
                <div
                  key={stepIndex}
                  className={`w-12 h-8 flex items-center justify-center text-xs font-bold rounded ${
                    step.isHit
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {step.isHit ? 'HIT' : 'FAULT'}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
            <span className="text-sm text-gray-600">Page Hit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
            <span className="text-sm text-gray-600">Page Fault (New/Replaced)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded"></div>
            <span className="text-sm text-gray-600">Existing Page</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600">Current Step</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimulationGrid; 