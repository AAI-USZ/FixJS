function(markerID) {
      var marker, markerType, markerTypeObject, markersCat, markersObject, _j, _len1, _ref, _ref1, _ref2;
      _ref = this.MarkersConfig;
      for (markersCat in _ref) {
        markersObject = _ref[markersCat];
        _ref1 = markersObject.marker_types;
        for (markerType in _ref1) {
          markerTypeObject = _ref1[markerType];
          _ref2 = markerTypeObject.markers;
          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
            marker = _ref2[_j];
            if (marker.id === markerID) {
              return marker;
            }
          }
        }
      }
      return null;
    }