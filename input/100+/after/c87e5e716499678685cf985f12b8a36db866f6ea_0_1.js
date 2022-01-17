function(callback, beforeRequest) {
      var _that;
      _that = this;
      if (typeof before === "undefined" || before === null) {
        beforeRequest = this.defaultBeforeRequest;
      }
      if (callback == null) {
        callback = this.defaultCallback;
      }
      beforeRequest.call();
      if (_that.hasCached()) {
        return callback.call(this, _that.getCache());
      } else {
        return $.ajax(this.feed(), {
          cache: false,
          type: 'GET',
          data: {
            rss: 'atom'
          },
          dataType: 'xml',
          success: function(data, status) {
            _that.setCache(data);
            return callback.call(this, data);
          },
          error: function(request, status, error) {
            return console.log(error);
          }
        });
      }
    }