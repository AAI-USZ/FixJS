function(resultdata) {
      this.log.debug("hasError");
      if (resultdata != null) {
        if (resultdata.success === false) {
          this.log.error("erreur result= " + (JSON.stringify(resultdata.error)));
          this._lastError = resultdata.error;
          return true;
        }
      } else {
        this.log.error("result data is null");
        this._lastError = {
          "error": {
            "code": "NULL_RESULT",
            "message": "Resultdata is null"
          }
        };
        return true;
      }
      this._lastError = null;
      return false;
    }