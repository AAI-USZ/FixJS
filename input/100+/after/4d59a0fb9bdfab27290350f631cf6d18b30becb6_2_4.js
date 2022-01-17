function(_super) {

    __extends(MultiPoint, _super);

    function MultiPoint() {
      MultiPoint.__super__.constructor.apply(this, arguments);
    }

    MultiPoint.prototype.geometryType = MULTIPOINT;

    MultiPoint.prototype.initOverlay = function(options) {
      this.options = options != null ? options : {
        clickable: true,
        zIndex: this.getDefaultZIndex()
      };
      return this.setOverlay(new MultiMarker(this.options));
    };

    MultiPoint.prototype.getPoints = function() {
      return this.overlay.getMarkers().getArray();
    };

    MultiPoint.prototype.setPoints = function(points) {
      return this.overlay.addMarkers(points);
    };

    MultiPoint.prototype.guaranteePoints = function(len) {
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
    };

    MultiPoint.prototype.getCoordinates = function() {
      var point, _i, _len, _ref, _results;
      _ref = this.getPoints();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        point = _ref[_i];
        _results.push(this.getArrayFromLatLng(point.getPosition()));
      }
      return _results;
    };

    MultiPoint.prototype.setCoordinates = function(coords) {
      var i, point, _len, _ref;
      if (!(coords[0] instanceof Array)) coords = [coords];
      this.guaranteePoints(coords.length);
      this.bounds = null;
      _ref = this.getPoints();
      for (i = 0, _len = _ref.length; i < _len; i++) {
        point = _ref[i];
        point.setPosition(this.getLatLngFromArray(coords[i]));
      }
      return MultiPoint.__super__.setCoordinates.call(this, coords);
    };

    MultiPoint.prototype.getPositions = function() {
      var point, _i, _len, _ref, _results;
      _ref = this.getPoints();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        point = _ref[_i];
        _results.push(point.getPosition());
      }
      return _results;
    };

    MultiPoint.prototype.setPositions = function(positions) {
      return this.overlay.setPositions(positions);
    };

    MultiPoint.prototype.getMarkers = function() {
      return this.overlay.getMarkers();
    };

    MultiPoint.prototype.addMarkers = function(markers) {
      return this.overlay.addMarkers(markers);
    };

    MultiPoint.prototype.addMarker = function(marker) {
      return this.overlay.addMarker(marker);
    };

    return MultiPoint;

  }