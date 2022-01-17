function(config) {
      if (config.provisioning) {
        provisioning = config.provisioning;
      }

      // BEGIN TESTING API
      if (config.pollDuration) {
        pollDuration = config.pollDuration;
      }
      // END TESTING API
    }