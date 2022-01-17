function(amount, success, error) {
      var data, errorWrapper, successWrapper;
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
        this.logger.log(LogLevel.DEBUG, "myna.reward successWrapper called");
        myna.token = null;
        this.logger.log(LogLevel.INFO, "myna.reward succeeded");
        if (success) {
          return success();
        }
      };
      errorWrapper = function(xhr, text, error) {
        var response;
        this.logger.log(LogLevel.DEBUG, "myna.reward errorWrapper called");
        response = parseErrorResponse(xhr.responseText);
        this.logger.log(LogLevel.ERROR, "myna.reward failed: error " + response.code + " " + response.message);
        if (error) {
          return error(response.code, response.message);
        }
      };
      return myna.doAjax("/v1/experiment/" + this.experiment + "/reward", data, successWrapper, errorWrapper);
    }