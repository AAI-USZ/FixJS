function(modifiedTime, module, callback) {
      var params,
        _this = this;
      this.callback = callback;
      this.log.debug('doSync: ' + modifiedTime + ' ' + module);
      if (!this.__checkLogin()) {
        return this.__performCallback(this._lastError, false);
      }
      params = '?operation=sync&sessionName=' + this._wsSessionName + '&modifiedTime=' + modifiedTime;
      if (module) {
        params += '&elementType=' + module;
      }
      this.log.debug(this._wsUrl + params);
      request(this._wsUrl + params, function(e, r, body) {
        return _this.__processResponse(e, r, body);
      });
    }