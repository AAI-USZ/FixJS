function() {
      var key, marker, markerTypeObject, markersCat, markersObjects, _ref, _results;
      _ref = this.MarkersConfig;
      _results = [];
      for (markersCat in _ref) {
        markersObjects = _ref[markersCat];
        _results.push((function() {
          var _j, _len1, _ref1, _results1;
          _ref1 = markersObjects.marker_types;
          _results1 = [];
          for (key = _j = 0, _len1 = _ref1.length; _j < _len1; key = ++_j) {
            markerTypeObject = _ref1[key];
            _results1.push((function() {
              var _k, _len2, _ref2, _results2;
              _ref2 = markerTypeObject.markers;
              _results2 = [];
              for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
                marker = _ref2[_k];
                _results2.push(this.test++);
              }
              return _results2;
            }).call(this));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    }