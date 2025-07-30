import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const InputPanel = ({
  referenceString,
  setReferenceString,
  numFrames,
  setNumFrames,
  algorithm,
  setAlgorithm,
  onRunSimulation
}) => {
  const handleReferenceStringChange = (value) => {
    const numbers = value
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== '')
      .map(s => parseInt(s))
      .filter(n => !isNaN(n) && n >= 0);
    setReferenceString(numbers);
  };

  const loadPreset = (preset) => {
    setReferenceString(preset);
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="reference-string" className="text-sm font-medium text-gray-700">
            Page Reference String
          </Label>
          <Input
            id="reference-string"
            value={referenceString.join(', ')}
            onChange={(e) => handleReferenceStringChange(e.target.value)}
            placeholder="7, 0, 1, 2, 0, 3..."
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter comma-separated page numbers
          </p>
        </div>

        <div>
          <Label htmlFor="num-frames" className="text-sm font-medium text-gray-700">
            Number of Frames
          </Label>
          <Input
            id="num-frames"
            type="number"
            min="1"
            max="10"
            value={numFrames}
            onChange={(e) => setNumFrames(parseInt(e.target.value) || 1)}
            className="mt-1"
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700">
            Algorithm
          </Label>
          <Select value={algorithm} onValueChange={(value) => setAlgorithm(value)}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FIFO">FIFO (First In First Out)</SelectItem>
              <SelectItem value="LRU">LRU (Least Recently Used)</SelectItem>
              <SelectItem value="Optimal">Optimal (Furthest Future Use)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={onRunSimulation}
          className="w-full bg-indigo-600 hover:bg-indigo-700"
          disabled={referenceString.length === 0}
        >
          Run Simulation
        </Button>

        <div className="border-t pt-4">
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Quick Presets
          </Label>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadPreset([7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 1, 2, 0, 1, 7, 0, 1])}
              className="w-full text-xs"
            >
              Classic Example
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadPreset([1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5])}
              className="w-full text-xs"
            >
              LRU Test Case
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadPreset([2, 3, 2, 1, 5, 2, 4, 5, 3, 2, 5, 2])}
              className="w-full text-xs"
            >
              Optimal Test
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InputPanel; 