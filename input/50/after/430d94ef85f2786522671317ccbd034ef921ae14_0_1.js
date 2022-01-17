function tickDone(tickDepth_) {
      tickDepth = tickDepth_ || 0;
      nextTickQueue.splice(0, nextTickIndex);
      nextTickIndex = 0;
      inTick = false;
      if (nextTickQueue.length) {
        process._needTickCallback();
      }
    }