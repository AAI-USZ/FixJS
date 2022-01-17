function( widget, value ) {
      widget.deselectAll();
      for( var i = 0; i < value.length; i++ ) {
        org.eclipse.rwt.protocol.AdapterUtil.callWithTarget( value[ i ], function( item ) {
          widget.selectItem( item );
        } );
      }
    }