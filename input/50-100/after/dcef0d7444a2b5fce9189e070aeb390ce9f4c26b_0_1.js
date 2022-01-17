function(data, msg, xhr) {
        _this.logger.log(LogLevel.DEBUG, "myna.reward successWrapper called");
        myna.token = null;
        _this.logger.log(LogLevel.INFO, "myna.reward succeeded");
        if (success) {
          return success();
        }
      }