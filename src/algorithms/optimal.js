export function optimalAlgorithm(referenceString, numFrames) {
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
      
      // First, check if there's an empty frame
      const emptyIndex = frames.indexOf(null);
      if (emptyIndex !== -1) {
        replaceIndex = emptyIndex;
      } else {
        // Find the page that will be used furthest in the future
        let farthestNextUse = -1;
        
        for (let j = 0; j < numFrames; j++) {
          // Find next occurrence of this page in future references
          let nextUse = referenceString.length; // If never used again, set to end
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
      }
      
      const replacedPage = frames[replaceIndex];
      frames[replaceIndex] = page;
      
      steps.push({
        page,
        frames: [...frames],
        isHit: false,
        replacedIndex: replaceIndex,
        replacedPage: replacedPage || undefined
      });
    }
  }
  
  return {
    steps,
    totalFaults: steps.filter(step => !step.isHit).length
  };
} 