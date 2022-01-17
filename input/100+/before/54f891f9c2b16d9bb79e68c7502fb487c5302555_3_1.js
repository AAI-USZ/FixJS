function(data) {
        var message, messageText, _i, _len, _ref, _results;
        _ref = _this.tokenizeData(data);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          messageText = _ref[_i];
          message = JSON.parse(messageText);
          if (!_this.waiters[message.id]) {
            continue;
          }
          _this.waiters[message.id](message.data);
          _results.push(delete _this.waiters[message.id]);
        }
        return _results;
      }