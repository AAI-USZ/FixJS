function() {
      if (inTick) return;
      inTick = true;

      // always do this at least once.  otherwise if process.maxTickDepth
      // is set to some negative value, we'd never process any of them.
      do {
        tickDepth++;
        var nextTickLength = nextTickQueue.length;
        if (nextTickLength === 0) return tickDone();
        while (nextTickIndex < nextTickLength) {
          var tock = nextTickQueue[nextTickIndex++];
          var callback = tock.callback;
          if (tock.domain) {
            if (tock.domain._disposed) continue;
            tock.domain.enter();
          }
          var threw = true;
          try {
            callback();
            threw = false;
          } finally {
            if (threw) tickDone();
          }
          if (tock.domain) {
            tock.domain.exit();
          }
        }
        nextTickQueue.splice(0, nextTickIndex);
        nextTickIndex = 0;

        // continue until the max depth or we run out of tocks.
      } while (tickDepth < process.maxTickDepth &&
               nextTickQueue.length > 0);

      tickDone();
    }