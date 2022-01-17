function() {
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
        }