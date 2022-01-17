function tickDone() {
      tickDepth = 0;
      nextTickQueue.splice(0, nextTickIndex);
      nextTickIndex = 0;
      inTick = false;
      if (nextTickQueue.length) {
        process._needTickCallback();
      }
    }