function(zoom) {
      var categoryOrType, highlighted, nearOrFar;
      if (zoom == null) zoom = this.map ? this.map.getZoom() : 10;
      nearOrFar = zoom >= this.featureType.minZoomMarker ? "near" : "far";
      highlighted = this.isHighlighted() ? "highlighted/" : "";
      if (this.properties.categories && this.properties.categories[0].name && zoom >= this.featureType.minZoomMarker) {
        categoryOrType = this.properties.categories[0].name.toLowerCase() + (this.properties.categories.length > 1 ? "-plus" : "");
      } else {
        categoryOrType = this.properties.type.toLowerCase();
      }
      return "/static/img/" + nearOrFar + "/" + highlighted + categoryOrType + ".png";
    }