function(e, r, body) {
        var response;
        if (e) {
          _this.log.error("request -> error: " + (JSON.stringify(error)));
          _this._lastError = {
            "error": {
              "code": "ERROR_ON_REQUEST",
              "message": "Error on request (get challenge)"
            }
          };
          _this.__performCallback(_this.__callback, false);
          return false;
        } else if (r.statusCode !== 200) {
          _this.log.error("response.statusCode is " + r.statusCode);
          _this._lastError = {
            "error": {
              "code": "ERROR_REQUEST_STATUS_CODE",
              "message": "Error on request, statusCode = " + r.statusCode
            }
          };
          _this.__performCallback(_this.__callback, false);
          return false;
        }
        try {
          response = JSON.parse(body);
        } catch (ex) {
          _this.log.error(body);
          _this.log.error(ex);
          _this.__performCallback(_this.__callback, false);
          return false;
        }
        if (_this.__hasError(response)) {
          _this.__performCallback(_this.__callback, false);
          return false;
        }
        if (response.result.token === false) {
          _this._lastError = {
            "error": {
              "code": "NO_TOKEN_AFTER_CHALLENGE",
              "message": "No token after challenge"
            }
          };
          _this.__performCallback(_this.__callback, false);
          return false;
        }
        _this._wsToken = response.result.token;
        _this.log.debug("POST @_wsUrl login " + _this._wsUsername);
        return request.post({
          url: _this._wsUrl,
          headers: _this._default_headers,
          form: {
            operation: "login",
            username: _this._wsUsername,
            accessKey: crypto.createHash("md5").update(_this._wsToken + _this._wsAccesskey).digest("hex")
          }
        }, function(e, r, body) {
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
        });
      }