function(amount, success, error) {
      var data, errorWrapper, successWrapper,
        _this = this;
      this.logger.log(LogLevel.DEBUG, "myna.reward called");
      if (typeof amount === "object" && amount.target) {
        this.logger.log(LogLevel.WARN, "You used myna.reward directly as an event handler, which is strictly speaking bad.");
        this.logger.log(LogLevel.WARN, "To suppress this message, wrap the call to myna.reward in an anonymous function, e.g.:");
        this.logger.log(LogLevel.WARN, "  $(\"foo\").click(function() { myna.reward() })");
        amount = null;
        success = null;
        error = null;
      }
      if (!myna.token) {
        this.logger.log(LogLevel.ERROR, "You must call suggest before you call reward.");
        return;
      }
      data = {
        token: myna.token,
        amount: amount || 1.0
      };
      successWrapper = function(data, msg, xhr) {
        _this.logger.log(LogLevel.DEBUG, "myna.reward successWrapper called");
        myna.token = null;
        _this.logger.log(LogLevel.INFO, "myna.reward succeeded");
        if (success) {
          return success();
        }
      };
      errorWrapper = function(response) {
        var message;
        _this.logger.log(LogLevel.DEBUG, "myna.reward errorWrapper called");
        message = _this.parseErrorResponse(response);
        _this.logger.log(LogLevel.ERROR, "myna.reward failed: error " + response);
        if (error) {
          return error(message);
        }
      };
      return this.doAjax("/v1/experiment/" + this.experiment + "/reward", data, successWrapper, errorWrapper);
    }