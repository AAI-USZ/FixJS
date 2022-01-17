function(e, r, body) {
          var resobj, result;
          result = false;
          if (e) {
            _this.log.error("request -> error: " + (JSON.stringify(error)));
            _this._lastError = {
              "error": {
                "code": "ERROR_ON_REQUEST",
                "message": "Error on request (post)"
              }
            };
          } else if (r.statusCode !== 200) {
            _this.log.error("response.statusCode is " + r.statusCode);
            _this._lastError = {
              "error": {
                "code": "ERROR_REQUEST_STATUS_CODE",
                "message": "Error on request, statusCode = " + r.statusCode
              }
            };
          } else {
            resobj = JSON.parse(body);
            if (_this.__hasError(resobj) === false) {
              result = true;
              _this._isLogged = true;
              _this._wsSessionName = resobj.result.sessionName;
              _this.log.debug("sessionid=" + _this._wsSessionName);
              _this._wsUserId = resobj.result.userId;
            }
          }
          return _this.__performCallback(_this.__callback, result);
        }