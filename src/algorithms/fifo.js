export function fifoAlgorithm(referenceString, numFrames) {
  const frames = new Array(numFrames).fill(null);
  const steps = [];
  let nextFrameIndex = 0;
  
  for (const page of referenceString) {
    // Check if page is already in memory
    const pageIndex = frames.indexOf(page);
    const isHit = pageIndex !== -1;
    
    if (isHit) {
      // Page hit - no replacement needed
      steps.push({
        page,
        frames: [...frames],
        isHit: true
      });
    } else {
      // Page fault - replace the oldest page (FIFO)
      const replacedIndex = frames.includes(null) ? frames.indexOf(null) : nextFrameIndex;
      const replacedPage = frames[replacedIndex];
      
      frames[replacedIndex] = page;
      
      // Only advance the pointer if we're using a non-empty slot
      if (replacedPage !== null) {
        nextFrameIndex = (nextFrameIndex + 1) % numFrames;
      }
      
      steps.push({
        page,
        frames: [...frames],
        isHit: false,
        replacedIndex,
        replacedPage: replacedPage || undefined
      });
    }
  }
  
  return {
    steps,
    totalFaults: steps.filter(step => !step.isHit).length
  };
} 