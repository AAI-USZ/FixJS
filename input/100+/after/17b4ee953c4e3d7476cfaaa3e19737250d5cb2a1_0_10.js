function(id, callback) {
      var params,
        _this = this;
      this.callback = callback;
      this.log.debug('doRetrieve: ' + id);
      if (!this.__checkLogin()) {
        return this.__performCallback(this._lastError, false);
      }
      params = '?operation=retrieve&sessionName=' + this._wsSessionName + '&id=' + id;
      this.log.debug(this._wsUrl + params);
      request(this._wsUrl + params, function(e, r, body) {
        return _this.__processResponse(e, r, body);
      });
    }