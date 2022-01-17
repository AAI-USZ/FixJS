function() {
        var key, value;
        _this.chunk.emit('render');
        return _this.send("<!doctype html>\n<html " + (_this.manifest || '') + ">\n<head>\n    " + (((function() {
          var _ref, _results;
          _ref = this.head;
          _results = [];
          for (key in _ref) {
            value = _ref[key];
            _results.push(value);
          }
          return _results;
        }).call(_this)).join('\n    ')) + "\n</head>\n<body>\n    " + _this.chunk.html + "\n</body>\n</html>");
      }