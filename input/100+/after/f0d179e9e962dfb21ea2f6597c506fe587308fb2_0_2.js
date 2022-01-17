function() {
              var _k, _len2, _ref2, _results2;
              _ref2 = markerTypeObject.markers;
              _results2 = [];
              for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
                marker = _ref2[_k];
                _results2.push(this.addMarker(marker, otherInfo, false, defaultValue));
              }
              return _results2;
            }