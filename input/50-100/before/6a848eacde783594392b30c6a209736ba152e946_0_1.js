function ( attrs ) {
      if ( attrs.zoom > 19 ) return "zoom too high";
      if ( attrs.zoom < 0 )  return "zoom too low";
      if ( attrs.lat == 0 && attrs.lon == 0) {
        attrs.zoom = this.WIDE_ZOOM;
      } else if (this.get('lat') == 0 && this.get('lon') == 0
                && attrs.zoom != this.WIDE_ZOOM ) {
        attrs.zoom = this.TIGHT_ZOOM; 
      }
    }