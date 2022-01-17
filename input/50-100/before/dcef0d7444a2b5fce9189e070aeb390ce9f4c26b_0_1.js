function(data, msg, xhr) {
        this.logger.log(LogLevel.DEBUG, "myna.reward successWrapper called");
        myna.token = null;
        this.logger.log(LogLevel.INFO, "myna.reward succeeded");
        if (success) {
          return success();
        }
      }