function(error, response, body) {
      var resobj, result;
      this.log.debug("processResponse ");
      result = false;
      if (error) {
        this.log.error("request -> error");
        this._lastError = {
          "error": {
            "code": "REQUEST_ERROR",
            "message": "Error on request"
          }
        };
        this._lastError = error;
      } else if (response.statusCode === !200) {
        this.log.error("response.statusCode is not 200");
        this._lastError = {
          "error": {
            "code": "ERROR_REQUEST_STATUS_CODE",
            "message": "Error on request, statusCode = " + response.statusCode
          }
        };
      } else {
        resobj = JSON.parse(body);
        if (this.__hasError(resobj) === false) {
          result = resobj.result;
        }
      }
      this.__performCallback(this._lastError, result);
    }