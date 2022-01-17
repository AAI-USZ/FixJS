function() {
      provisioning = BrowserID.Provisioning;
      User.resetCaches();
      registrationComplete = false;
      pollDuration = POLL_DURATION;
    }