function(frames, symbols) {
      return stepContains('GCCycle', frames, symbols)
          || stepContains('GarbageCollectNow', frames, symbols) // Label
          || stepContains('CycleCollect', frames, symbols) // Label
          ;
    }