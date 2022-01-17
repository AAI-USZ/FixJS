function( widget, value ) {
      if( value !== null ) {
        var childrenCount = value.length;
        for( var i = 0; i < childrenCount; i++ ) {
          org.eclipse.rwt.protocol.AdapterUtil.callWithTarget( value[ i ], function( child ) {
            var index = value.indexOf( org.eclipse.rwt.protocol.ObjectManager.getId( child ) );
            child.setZIndex( childrenCount - index );
          } );
        }
      }
    }