function( e, geo ) {
      // both the measure and draw/drag modes trigger the shape event
      // but we only want to append for the draw & drag
      if ( map.geomap( "option", "mode" ).substr( 0, 3 ) == "dra" ) {
        // when the user draws or drags a shape, show it on the map
        // the shape event triggers when the user finishes drawing a shape
        // the geo argument is a GeoJSON object representing the shape

        // for this example, we'll append it to the map forcing an
        // individual style that matches the current drawStyle

        // make a copy of the current drawStyle
        var drawStyle = $.extend( { }, map.geomap( "option", "drawStyle" ) );

        // grab the label (if any) from the input
        var label = $( "#shapeLabels input" ).val( );

        // append the shape using that style
        // however, depending on which target is checked, we will append the shape to either the map widget itself or a specific map service
        if ( $( "#clickTargetWidget" ).is( ":checked" ) ) {
          // if the map is our target, just append the shape to the map
          // if there's a label entered, used it
          map.geomap( "append", geo, drawStyle, label );
        } else {
          // otherwise, grab a reference to a service
          // ( by id in this case ) and append the shape to that
          // the value of the remaining radio buttons matches the id of a service
          // if there's a label entered, used it
          var serviceToAppend = $( "#" + $( "input[name='clickTarget']:checked" ).val( ) );

          $( serviceToAppend ).geomap( "append", geo, drawStyle, label );

          // also note, that the label is controlled seperately from the shape, by CSS, rather than by jQuery Geo shapeStyle objects
          // if you look at the CSS, you will notice:
          //
          // #broadband-speedtest { color: purple; font-weight: bold; }
          //
          // which makes all labels on the speedtest service blue text
        }
      }
    }