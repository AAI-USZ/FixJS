function() {
      return {
        type: 'Feature',
        geometry: this.getGeometryGeoJson(),
        properties: this.getProperties()
      };
    }