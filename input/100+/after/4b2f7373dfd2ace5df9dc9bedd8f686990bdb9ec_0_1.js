function ( attr, target ) {
    var o = target || {};
    // reformat the most common attributes
    o.translate_x = 0;
    o.translate_y = 0;
    if ( attr.transform ) {
      var t = /translate\((\d+(?:\.\d+)?)(?:,(\d+(?:\.\d+)?))?\)/.exec( attr.transform );
      if ( t && t[1] ) { o.translate_x = parseFloat( t[1] ); }
      if ( t && t[2] ) { o.translate_y = parseFloat( t[2] ); }
      var r = /rotate\((-?\d+\.\d+|-?\d+)\)/.exec( attr.transform );
      if ( r ) { o.rotation = parseFloat( r[1] ) % 360; }
      // var scale_x = 1, scale_y = 1,
      // var s = /scale\((\d+)(?:,(\d+))?\)/i.exec( value );
      // if ( s && s[1] ) { scale[0] = parseInt( s[1], 10 ); }
      // if ( s && s[2] ) { scale[1] = parseInt( s[2], 10 ); }
    }
    o.x = parseFloat( attr.x||0 );
    o.y = parseFloat( attr.y||0 );
    if ( 'width' in attr ) {
      o.width = parseInt( attr.width, 10 );
    }
    if ( 'height' in attr ) { 
      o.height = parseInt( attr.height, 10 );
    }
    return o;
  }