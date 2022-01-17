function(query, callback) {
      var params,
        _this = this;
      this.log.debug('doQuery: ' + query);
      this.__callback = callback;
      if (!this.__checkLogin()) {
        return this.__performCallback(this.__callback, false);
      } else {
        if (query.indexOf(";") === -1) {
          query += ";";
        }
        params = '?operation=query&sessionName=' + this._wsSessionName + '&query=' + escape(query);
        this.log.debug(this._wsUrl + params);
        return request(this._wsUrl + params, function(e, r, body) {
          return _this.__processResponse(e, r, body);
        });
      }
    }