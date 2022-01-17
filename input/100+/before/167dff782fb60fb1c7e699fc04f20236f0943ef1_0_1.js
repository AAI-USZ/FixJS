function iframeOnLoad() {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
      // a timeout for the amount of time that provisioning is allowed to take
      timeoutID = setTimeout(function provisionTimedOut() {
        fail('timeoutError', 'Provisioning timed out.');
      }, MAX_TIMEOUT);
    }