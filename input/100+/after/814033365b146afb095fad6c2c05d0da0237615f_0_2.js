function() {
    var nextTickQueue = [];
    var nextTickIndex = 0;

    process._tickCallback = function() {
      var nextTickLength = nextTickQueue.length;
      if (nextTickLength === 0) return;

      while (nextTickIndex < nextTickLength) {
        nextTickQueue[nextTickIndex++]();
      }

      nextTickQueue.splice(0, nextTickIndex);
      nextTickIndex = 0;
    };

    process.nextTick = function(callback) {
      nextTickQueue.push(callback);
      process._needTickCallback();
    };
  }