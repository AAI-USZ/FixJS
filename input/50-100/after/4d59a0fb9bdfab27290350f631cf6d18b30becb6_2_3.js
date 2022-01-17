function(latLngs) {
      var latLng, _i, _len, _results;
      if (latLngs) {
        _results = [];
        for (_i = 0, _len = latLngs.length; _i < _len; _i++) {
          latLng = latLngs[_i];
          _results.push(this.getArrayFromLatLng(latLng));
        }
        return _results;
      } else {
        return [];
      }
    }