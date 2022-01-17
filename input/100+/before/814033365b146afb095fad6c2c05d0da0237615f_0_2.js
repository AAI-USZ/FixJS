function() {
    var nextTickQueue = [];

    process._tickCallback = function() {
      var l = nextTickQueue.length;
      if (l === 0) return;

      var q = nextTickQueue;
      nextTickQueue = [];

      try {
        for (var i = 0; i < l; i++) q[i]();
      }
      catch (e) {
        if (i + 1 < l) {
          nextTickQueue = q.slice(i + 1).concat(nextTickQueue);
        }
        if (nextTickQueue.length) {
          process._needTickCallback();
        }
        throw e; // process.nextTick error, or 'error' event on first tick
      }
    };

    process.nextTick = function(callback) {
      nextTickQueue.push(callback);
      process._needTickCallback();
    };
  }