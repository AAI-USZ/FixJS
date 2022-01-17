function() {
          var _i, _len, _ref, _results;
          _ref = this.subscriptions;
          _results = [];
          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            s = _ref[i];
            _results.push(this.unsubscribe(i));
          }
          return _results;
        }