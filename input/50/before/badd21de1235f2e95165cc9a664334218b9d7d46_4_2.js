function cm_updateTimer(self, startTime) {
      var elapsed = new Date(Date.now() - startTime);
      document.getElementById('call-duration').innerHTML =
        elapsed.toLocaleFormat('%M:%S');
    }