function(handle) {
      /*
          Unsubscribe from tron with the handle returned by subscribe.
          FIXME: Using an index for handles breaks with unsubcriptions.
      */
      var i, result, s;
      if (handle != null) {
        s = this.subscriptions;
        result = s[handle];
        this.subscriptions = s.slice(0, handle).concat(s.slice(handle + 1));
        return result;
      } else {
        return (function() {
          var _len, _ref, _results;
          _ref = this.subscriptions;
          _results = [];
          for (i = 0, _len = _ref.length; i < _len; i++) {
            s = _ref[i];
            _results.push(this.unsubscribe(i));
          }
          return _results;
        }).call(this);
      }
    }