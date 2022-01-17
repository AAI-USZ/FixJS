function() {
        var _results;
        _this.autoPlay = false;
        _results = [];
        while (!_this.moves.isEmpty()) {
          _results.push(_this.moves.dequeue());
        }
        return _results;
      }