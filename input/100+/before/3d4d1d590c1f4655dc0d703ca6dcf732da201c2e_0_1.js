function(markerID) {
      var key, marker, markerTypeObject, markersCat, markersObjects, _j, _k, _len1, _len2, _ref, _ref1, _ref2;
      _ref = this.MarkersConfig;
      for (markersCat in _ref) {
        markersObjects = _ref[markersCat];
        _ref1 = markersObjects.markerGroup;
        for (key = _j = 0, _len1 = _ref1.length; _j < _len1; key = ++_j) {
          markerTypeObject = _ref1[key];
          _ref2 = markerTypeObject.markers;
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            marker = _ref2[_k];
            if (marker.id === markerID) {
              return marker;
            }
          }
        }
      }
      return null;
    }