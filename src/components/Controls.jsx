import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Controls = ({
  simulation,
  onStepForward,
  onStepBackward,
  onTogglePlay,
  onReset,
  onSpeedChange
}) => {
  const canStepBack = simulation.currentStep > -1;
  const canStepForward = simulation.currentStep < simulation.steps.length - 1;
  const hasSteps = simulation.steps.length > 0;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Step Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onStepBackward}
              disabled={!canStepBack}
              className="flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            
            <Button
              variant={simulation.isPlaying ? "secondary" : "default"}
              size="sm"
              onClick={onTogglePlay}
              disabled={!hasSteps || simulation.currentStep >= simulation.steps.length - 1}
              className="min-w-[80px]"
            >
              {simulation.isPlaying ? 'Pause' : 'Play'}
            </Button> 
            
            <Button
              variant="outline"
              size="sm"
              onClick={onStepForward}
              disabled={!canStepForward}
              className="flex items-center gap-1"
            >
              Forward
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Speed Control */}
          <div className="flex items-center gap-3 flex-1">
            <span className="text-sm text-gray-600 whitespace-nowrap">Speed:</span>
            <div className="flex-1 max-w-32">
              <Slider
                value={[2100 - simulation.playSpeed]}
                onValueChange={(value) => onSpeedChange(2100 - value[0])}
                min={100}
                max={2000}
                step={100}
                className="w-full"
              />
            </div>
            <span className="text-sm text-gray-500 min-w-[60px]">
              {simulation.playSpeed <= 500 ? 'Fast' : simulation.playSpeed <= 1000 ? 'Normal' : 'Slow'}
            </span>
          </div>

          {/* Reset Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            disabled={!hasSteps}
          >
            Reset
          </Button>
        </div>

        {/* Progress Indicator */}
        {hasSteps && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{simulation.currentStep + 1} / {simulation.steps.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((simulation.currentStep + 1) / simulation.steps.length) * 100}%`
                }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Controls; 