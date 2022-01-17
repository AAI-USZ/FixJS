function(zoom) {
      var categoryOrType, highlighted, nearOrFar;
      if (zoom == null) zoom = this.map ? this.map.getZoom() : 10;
      nearOrFar = zoom >= this.minZoomMarker ? "near" : "far";
      highlighted = this.isHighlighted() ? "highlighted/" : "";
      categoryOrType = this.properties.categories && zoom >= this.minZoomMarker ? this.properties.categories[0].name.toLowerCase() + (this.properties.categories.length > 1 ? "-plus" : "") : this.properties.type.toLowerCase();
      return "/static/img/" + nearOrFar + "/" + highlighted + categoryOrType + ".png";
    }