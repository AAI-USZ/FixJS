function poll() {
      var now = Date.now();
      var cond = self._waitCondition;
      if (typeof cond == "number") {
        if (now - start >= cond) {
          self._exampleWait = false;
        }
      } else if (cond) {
        if (cond()) {
          self._exampleWait = false;
        }
      }
      if (self._exampleWait) {
        if (now - start > waitTimeout) {
          self._currentExample.timeout(now - start);
          return;
        }
        setTimeout(poll, self._waitPollTime);
        return;
      }
      self.evalUninit();
      self._currentExample.check();
      self._currentExample = null;
      self._runExample();
    }