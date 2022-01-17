function(len) {
      var i, points, _ref, _ref2, _results, _results2;
      points = this.overlay.getMarkers();
      if (points.length >= len) {
        _results = [];
        for (i = 0, _ref = points.length - len - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
          _results.push(points.pop());
        }
        return _results;
      } else {
        _results2 = [];
        for (i = 0, _ref2 = len - points.length - 1; 0 <= _ref2 ? i <= _ref2 : i >= _ref2; 0 <= _ref2 ? i++ : i--) {
          _results2.push(points.push(new google.maps.Marker(this.options)));
        }
        return _results2;
      }
    }