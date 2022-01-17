function() {
      return {
        type: 'Feature',
        geometry: this.getGeoJsonGeometry(),
        properties: this.getProperties()
      };
    }