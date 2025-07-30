export function lruAlgorithm(referenceString, numFrames) {
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
      let replaceIndex = 0;
      
      // First, check if there's an empty frame
      const emptyIndex = frames.indexOf(null);
      if (emptyIndex !== -1) {
        replaceIndex = emptyIndex;
      } else {
        // Find the least recently used page
        let lruTime = lastUsed[0];
        for (let j = 1; j < numFrames; j++) {
          if (lastUsed[j] < lruTime) {
            lruTime = lastUsed[j];
            replaceIndex = j;
          }
        }
      }
      
      const replacedPage = frames[replaceIndex];
      frames[replaceIndex] = page;
      lastUsed[replaceIndex] = i;
      
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