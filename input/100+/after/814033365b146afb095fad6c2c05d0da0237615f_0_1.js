function() {
      var nextTickLength = nextTickQueue.length;
      if (nextTickLength === 0) return;

      while (nextTickIndex < nextTickLength) {
        nextTickQueue[nextTickIndex++]();
      }

      nextTickQueue.splice(0, nextTickIndex);
      nextTickIndex = 0;
    }