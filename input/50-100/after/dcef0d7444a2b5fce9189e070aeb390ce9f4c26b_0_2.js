function(response) {
        var message;
        _this.logger.log(LogLevel.DEBUG, "myna.reward errorWrapper called");
        message = _this.parseErrorResponse(response);
        _this.logger.log(LogLevel.ERROR, "myna.reward failed: error " + response);
        if (error) {
          return error(message);
        }
      }