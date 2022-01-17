function cm_updateTimer(self, startTime) {
      var elapsed = new Date(Date.now() - startTime);
      CallScreen.callDuration.innerHTML =
        elapsed.toLocaleFormat('%M:%S');
    }