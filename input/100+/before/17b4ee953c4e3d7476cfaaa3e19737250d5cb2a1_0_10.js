function(id, callback) {
      var params,
        _this = this;
      this.log.debug('doRetrieve: ' + id);
      this.__callback = callback;
      if (!this.__checkLogin()) {
        return this.__performCallback(this.__callback, false);
      } else {
        params = '?operation=retrieve&sessionName=' + this._wsSessionName + '&id=' + id;
        this.log.debug(this._wsUrl + params);
        return request(this._wsUrl + params, function(e, r, body) {
          return _this.__processResponse(e, r, body);
        });
      }
    }