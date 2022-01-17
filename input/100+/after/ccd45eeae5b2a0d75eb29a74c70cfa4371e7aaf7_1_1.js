function(_super) {

    __extends(FeatureCollection, _super);

    function FeatureCollection(options) {
      if (options == null) options = {};
      FeatureCollection.__super__.constructor.call(this, options);
      if (options.map) this.setMap(options.map);
      if (options.features) {
        options.features.forEach(function(feature) {
          return this.push(feature);
        });
      }
    }

    FeatureCollection.prototype.push = function(feature) {
      FeatureCollection.__super__.push.call(this, feature);
      return feature.setMap(this.map);
    };

    FeatureCollection.prototype.setMap = function(map, opt_force) {
      this.map = map;
      this.forEach(function(feature) {
        return feature.setMap(this.map, opt_force);
      });
      return this.handleMapEvents();
    };

    FeatureCollection.prototype.show = function() {
      this.setMap(this.map, {
        geometries: true
      });
      return this.setVisible(true);
    };

    FeatureCollection.prototype.hide = function() {
      return this.setVisible(false);
    };

    FeatureCollection.prototype.getGeoJson = function() {
      var features, geojson;
      features = [];
      geojson = {
        type: "FeatureCollection",
        features: features
      };
      this.forEach(function(feature) {
        return features.push(feature.getGeoJson());
      });
      return geojson;
    };

    FeatureCollection.prototype.removeAllFromMap = function() {
      return this.forEach(function(feature) {
        return feature.removeFromMap();
      });
    };

    FeatureCollection.prototype.setVisible = function(flag) {
      return this.forEach(function(feature) {
        return feature.setVisible(flag);
      });
    };

    FeatureCollection.prototype.updateFeaturesVisibility = function() {
      return this.forEach(function(feature) {
        return feature.seMap(feature.getMap());
      });
    };

    FeatureCollection.prototype.handleMapEvents = function() {
      var that;
      that = this;
      return komoo.event.addListener(this.map, "zoom_changed", function() {});
    };

    return FeatureCollection;

  }