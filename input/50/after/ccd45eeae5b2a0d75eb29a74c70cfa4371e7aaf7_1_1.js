function(feature) {
      FeatureCollection.__super__.push.call(this, feature);
      return feature.setMap(this.map);
    }