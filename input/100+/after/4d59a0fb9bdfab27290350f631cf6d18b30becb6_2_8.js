function(_super) {

    __extends(MultiLineString, _super);

    function MultiLineString() {
      MultiLineString.__super__.constructor.apply(this, arguments);
    }

    MultiLineString.prototype.geometryType = MULTIPOLYLINE;

    MultiLineString.prototype.initOverlay = function(options) {
      this.options = options != null ? options : {
        clickable: true,
        zIndex: this.getDefaultZIndex(),
        strockeColor: this.getBorderColor(),
        strockOpacity: this.getBorderOpacity(),
        strokeWeight: this.getBorderSize()
      };
      return this.setOverlay(new MultiPolyline(this.options));
    };

    MultiLineString.prototype.guaranteeLines = function(len) {
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
    };

    MultiLineString.prototype.getCoordinates = function() {
      var line, _i, _len, _ref, _results;
      _ref = this.overlay.getPolylines().getArray();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        _results.push(this.getArrayFromLatLngArray(line.getPath().getArray()));
      }
      return _results;
    };

    MultiLineString.prototype.setCoordinates = function(coords) {
      var i, line, _len, _ref, _results;
      if (!(coords[0][0] instanceof Array)) coords = [coords];
      this.guaranteeLines(coords.length);
      this.bounds = null;
      _ref = this.getLines();
      _results = [];
      for (i = 0, _len = _ref.length; i < _len; i++) {
        line = _ref[i];
        _results.push(line.setPath(this.getLatLngArrayFromArray(coords[i])));
      }
      return _results;
    };

    MultiLineString.prototype.getPath = function() {
      return this.getPaths().getAt(0);
    };

    MultiLineString.prototype.getPaths = function() {
      return this.overlay.getPaths();
    };

    MultiLineString.prototype.setPaths = function(paths) {
      return this.overlay.setPaths(paths);
    };

    MultiLineString.prototype.getLines = function() {
      return this.overlay.getPolylines().getArray();
    };

    MultiLineString.prototype.setLines = function(lines) {
      return this.overlay.addPolylines(lines);
    };

    return MultiLineString;

  }