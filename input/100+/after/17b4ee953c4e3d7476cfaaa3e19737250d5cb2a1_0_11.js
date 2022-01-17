function(valuemap, callback) {
      var _this = this;
      this.callback = callback;
      this.log.debug("doUpdate");
      if (!this.__checkLogin()) {
        return this.__performCallback(this._lastError, false);
      }
      request.post({
        url: this._wsUrl,
        headers: this._default_headers,
        form: {
          "operation": "update",
          "sessionName": this._wsSessionName,
          "element": JSON.stringify(valuemap)
        }
      }, function(e, r, body) {
        return _this.__processResponse(e, r, body);
      });
    }