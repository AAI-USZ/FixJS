function() {
      var defaultValue, key, marker, markerTypeObject, markersCat, markersObjects, newmarkerTypeObject, otherInfo, _ref, _results;
      _ref = this.MarkersConfig;
      _results = [];
      for (markersCat in _ref) {
        markersObjects = _ref[markersCat];
        if (!(this.gMarker[markersCat] != null)) {
          this.gMarker[markersCat] = {};
          this.gMarker[markersCat]["data_translation"] = markersObjects.data_translation;
          this.gMarker[markersCat]["marker_types"] = [];
        }
        _results.push((function() {
          var _j, _len1, _ref1, _results1;
          _ref1 = markersObjects.marker_types;
          _results1 = [];
          for (key = _j = 0, _len1 = _ref1.length; _j < _len1; key = ++_j) {
            markerTypeObject = _ref1[key];
            newmarkerTypeObject = {};
            newmarkerTypeObject["slug"] = markerTypeObject.slug;
            newmarkerTypeObject["data_translation"] = markerTypeObject.data_translation;
            newmarkerTypeObject["markers"] = [];
            this.gMarker[markersCat]["marker_types"].push(newmarkerTypeObject);
            otherInfo = {
              markersCat: markersCat,
              markersType: markerTypeObject.slug,
              icon: markerTypeObject.icon
            };
            defaultValue = null;
            if ((markerTypeObject["data_translation"][window.LANG]["title"] != null) && (markerTypeObject["data_translation"][window.LANG]["desc"] != null)) {
              defaultValue = markerTypeObject["data_translation"];
            }
            _results1.push((function() {
              var _k, _len2, _ref2, _results2;
              _ref2 = markerTypeObject.markers;
              _results2 = [];
              for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
                marker = _ref2[_k];
                _results2.push(this.addMarker(marker, otherInfo, false, defaultValue));
              }
              return _results2;
            }).call(this));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    }