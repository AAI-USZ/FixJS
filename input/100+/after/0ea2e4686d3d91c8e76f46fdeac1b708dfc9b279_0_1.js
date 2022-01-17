function( $element ){
      var $controls = lu.getDescendants( $element ),
        attrs = ['data-lu', 'data-lu-config'],
        data = ['lu', 'luControls', 'luConfig'];

      if ( $element.is( UI_CONTROL_PATTERN ) ){
        $controls = $controls.add( $element );
      }

      $controls.each( function( index, item ){
        var $item = $( item );
        _.each( lu.getControls( $item ), function( item, index ){
          var events = ( item.events ) ? item.events() : [];
          item.off( events.join( ' ' ) );
        } );

        $item.removeData( data );

        _.each( attrs, function( attr, index ){
          $item.removeAttr( attr );
        } );
      } );

      return $element;
    }