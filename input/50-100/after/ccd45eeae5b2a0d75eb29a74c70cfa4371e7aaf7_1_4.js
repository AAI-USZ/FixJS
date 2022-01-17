function() {
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
    }