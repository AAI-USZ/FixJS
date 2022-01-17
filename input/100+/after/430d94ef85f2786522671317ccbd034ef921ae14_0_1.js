function(fromSpinner) {

      // if you add a nextTick in a domain's error handler, then
      // it's possible to cycle indefinitely.  Normally, the tickDone
      // in the finally{} block below will prevent this, however if
      // that error handler ALSO triggers multiple MakeCallbacks, then
      // it'll try to keep clearing the queue, since the finally block
      // fires *before* the error hits the top level and is handled.
      if (tickDepth >= process.maxTickDepth) {
        if (fromSpinner) {
          // coming in from the event queue.  reset.
          tickDepth = 0;
        } else {
          if (nextTickQueue.length) {
            process._needTickCallback();
          }
          return;
        }
      }

      if (!nextTickQueue.length) return tickDone();

      if (inTick) return;
      inTick = true;

      // always do this at least once.  otherwise if process.maxTickDepth
      // is set to some negative value, or if there were repeated errors
      // preventing tickDepth from being cleared, we'd never process any
      // of them.
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
            // finally blocks fire before the error hits the top level,
            // so we can't clear the tickDepth at this point.
            if (threw) tickDone(tickDepth);
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