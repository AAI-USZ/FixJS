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