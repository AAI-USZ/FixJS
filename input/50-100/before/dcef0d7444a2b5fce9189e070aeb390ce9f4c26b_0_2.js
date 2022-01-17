function(xhr, text, error) {
        var response;
        this.logger.log(LogLevel.DEBUG, "myna.reward errorWrapper called");
        response = parseErrorResponse(xhr.responseText);
        this.logger.log(LogLevel.ERROR, "myna.reward failed: error " + response.code + " " + response.message);
        if (error) {
          return error(response.code, response.message);
        }
      }