function(query, callback) {
      var params,
        _this = this;
      this.callback = callback;
      this.log.debug('doQuery: ' + query);
      if (!this.__checkLogin()) {
        return this.__performCallback(this._lastError, false);
      }
      if (query.indexOf(";") === -1) {
        query += ";";
      }
      params = '?operation=query&sessionName=' + this._wsSessionName + '&query=' + escape(query);
      this.log.debug(this._wsUrl + params);
      request(this._wsUrl + params, function(e, r, body) {
        return _this.__processResponse(e, r, body);
      });
    }