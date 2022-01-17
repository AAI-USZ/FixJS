function(module, callback) {
      var params,
        _this = this;
      this.log.debug('doDescribe ' + module);
      this.__callback = callback;
      if (!this.__checkLogin()) {
        return this.__performCallback(this.__callback, false);
      } else {
        params = '?operation=describe&sessionName=' + this._wsSessionName + '&elementType=' + module;
        this.log.debug(this._wsUrl + params);
        return request(this._wsUrl + params, function(e, r, body) {
          return _this.__processResponse(e, r, body);
        });
      }
    }