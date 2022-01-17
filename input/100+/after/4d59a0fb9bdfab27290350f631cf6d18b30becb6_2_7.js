function(_super) {

    __extends(LineString, _super);

    function LineString() {
      LineString.__super__.constructor.apply(this, arguments);
    }

    LineString.prototype.geometryType = POLYLINE;

    LineString.prototype.initOverlay = function(options) {
      this.options = options != null ? options : {
        clickable: true,
        zIndex: this.getDefaultZIndex(),
        strockeColor: this.getBorderColor(),
        strockOpacity: this.getBorderOpacity(),
        strokeWeight: this.getBorderSize()
      };
      return this.setOverlay(new google.maps.Polyline(this.options));
    };

    LineString.prototype.getCoordinates = function() {
      var latLng, _i, _len, _ref, _results;
      _ref = this.overlay.getPath().getArray();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        latLng = _ref[_i];
        _results.push(this.getArrayFromLatLng(latLng));
      }
      return _results;
    };

    LineString.prototype.setCoordinates = function(coords) {
      var pos;
      return this.overlay.setPath((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = coords.length; _i < _len; _i++) {
          pos = coords[_i];
          _results.push(this.getLatLngFromArray(pos));
        }
        return _results;
      }).call(this));
    };

    LineString.prototype.setEditable = function(flag) {
      return this.overlay.setEditable(flag);
    };

    LineString.prototype.getBorderColor = function() {
      var _ref;
      return ((_ref = this.feature) != null ? _ref.getBorderColor() : void 0) || defaults.BORDER_COLOR;
    };

    LineString.prototype.getBorderOpacity = function() {
      var _ref;
      return ((_ref = this.feature) != null ? _ref.getBorderOpacity() : void 0) || defaults.BORDER_OPACITY;
    };

    LineString.prototype.getBorderSize = function() {
      var _ref;
      return ((_ref = this.feature) != null ? _ref.getBorderSize() : void 0) || defaults.BORDER_SIZE;
    };

    LineString.prototype.getPath = function() {
      return this.overlay.getPath();
    };

    LineString.prototype.setPath = function(path) {
      return this.overlay.setPath(path);
    };

    return LineString;

  }