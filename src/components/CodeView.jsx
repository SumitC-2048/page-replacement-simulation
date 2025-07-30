import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CodeView = ({ algorithm }) => {
  const codeExamples = {
    FIFO: `function fifoAlgorithm(referenceString, numFrames) {
  const frames = new Array(numFrames).fill(null);
  const steps = [];
  let nextFrameIndex = 0;
  
  for (const page of referenceString) {
    // Check if page is already in memory
    const isHit = frames.includes(page);
    
    if (isHit) {
      // Page hit - no replacement needed
      steps.push({
        page,
        frames: [...frames],
        isHit: true
      });
    } else {
      // Page fault - replace oldest page
      const replacedIndex = nextFrameIndex;
      const replacedPage = frames[replacedIndex];
      
      frames[replacedIndex] = page;
      nextFrameIndex = (nextFrameIndex + 1) % numFrames;
      
      steps.push({
        page,
        frames: [...frames],
        isHit: false,
        replacedIndex,
        replacedPage
      });
    }
  }
  
  return {
    steps,
    totalFaults: steps.filter(s => !s.isHit).length
  };
}`,
    LRU: `function lruAlgorithm(referenceString, numFrames) {
  const frames = new Array(numFrames).fill(null);
  const lastUsed = new Array(numFrames).fill(-1);
  const steps = [];
  
  for (let i = 0; i < referenceString.length; i++) {
    const page = referenceString[i];
    const pageIndex = frames.indexOf(page);
    
    if (pageIndex !== -1) {
      // Page hit - update last used time
      lastUsed[pageIndex] = i;
      steps.push({
        page,
        frames: [...frames],
        isHit: true
      });
    } else {
      // Page fault - find LRU page to replace
      let lruIndex = 0;
      let lruTime = lastUsed[0];
      
      for (let j = 1; j < numFrames; j++) {
        if (lastUsed[j] < lruTime) {
          lruTime = lastUsed[j];
          lruIndex = j;
        }
      }
      
      const replacedPage = frames[lruIndex];
      frames[lruIndex] = page;
      lastUsed[lruIndex] = i;
      
      steps.push({
        page,
        frames: [...frames],
        isHit: false,
        replacedIndex: lruIndex,
        replacedPage
      });
    }
  }
  
  return {
    steps,
    totalFaults: steps.filter(s => !s.isHit).length
  };
}`,
    Optimal: `function optimalAlgorithm(referenceString, numFrames) {
  const frames = new Array(numFrames).fill(null);
  const steps = [];
  
  for (let i = 0; i < referenceString.length; i++) {
    const page = referenceString[i];
    const pageIndex = frames.indexOf(page);
    
    if (pageIndex !== -1) {
      // Page hit
      steps.push({
        page,
        frames: [...frames],
        isHit: true
      });
    } else {
      // Page fault - find optimal page to replace
      let replaceIndex = 0;
      let farthestNextUse = -1;
      
      for (let j = 0; j < numFrames; j++) {
        if (frames[j] === null) {
          // Empty frame available
          replaceIndex = j;
          break;
        }
        
        // Find next occurrence of this page
        let nextUse = referenceString.length;
        for (let k = i + 1; k < referenceString.length; k++) {
          if (referenceString[k] === frames[j]) {
            nextUse = k;
            break;
          }
        }
        
        // Keep track of page with farthest next use
        if (nextUse > farthestNextUse) {
          farthestNextUse = nextUse;
          replaceIndex = j;
        }
      }
      
      const replacedPage = frames[replaceIndex];
      frames[replaceIndex] = page;
      
      steps.push({
        page,
        frames: [...frames],
        isHit: false,
        replacedIndex: replaceIndex,
        replacedPage
      });
    }
  }
  
  return {
    steps,
    totalFaults: steps.filter(s => !s.isHit).length
  };
}`
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          {algorithm} Algorithm Implementation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm">
            <code>{codeExamples[algorithm]}</code>
          </pre>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p>
            This implementation shows the core logic for the {algorithm} page replacement algorithm.
            The actual simulator uses additional optimizations and error handling.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeView; 