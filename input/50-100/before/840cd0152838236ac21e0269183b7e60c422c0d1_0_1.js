function() {
          var _len, _ref, _results;
          _ref = this.subscriptions;
          _results = [];
          for (i = 0, _len = _ref.length; i < _len; i++) {
            s = _ref[i];
            _results.push(this.unsubscribe(i));
          }
          return _results;
        }