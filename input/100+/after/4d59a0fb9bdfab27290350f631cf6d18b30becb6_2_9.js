function(len) {
      var i, lines, _ref, _ref2, _results, _results2;
      lines = this.overlay.getPolylines();
      if (lines.length >= len) {
        _results = [];
        for (i = 0, _ref = lines.length - len - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
          _results.push(lines.pop());
        }
        return _results;
      } else {
        _results2 = [];
        for (i = 0, _ref2 = len - lines.length - 1; 0 <= _ref2 ? i <= _ref2 : i >= _ref2; 0 <= _ref2 ? i++ : i--) {
          _results2.push(lines.push(new google.maps.Polyline(this.options)));
        }
        return _results2;
      }
    }