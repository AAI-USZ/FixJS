function(callback, beforeRequest) {
      if (typeof before === "undefined" || before === null) {
        beforeRequest = this.defaultBeforeRequest;
      }
      if (callback == null) {
        callback = this.defaultCallback;
      }
      beforeRequest.call();
      return $.ajax(this.feed(), {
        cache: true,
        type: 'GET',
        data: {
          rss: 'atom'
        },
        dataType: 'xml',
        success: function(data, status) {
          return callback.call(this, data);
        },
        error: function(request, status, error) {
          return console.log(error);
        }
      });
    }