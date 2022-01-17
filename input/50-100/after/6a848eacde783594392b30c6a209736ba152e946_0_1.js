function ( attrs ) {
      if ( attrs.zoom > 18 ) return "zoom too high";
      if ( attrs.zoom < 1 )  return "zoom too low";
    }