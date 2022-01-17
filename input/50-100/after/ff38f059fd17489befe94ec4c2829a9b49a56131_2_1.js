function( child ) {
          var index = value.indexOf( org.eclipse.rwt.protocol.ObjectManager.getId( child ) );
          child.setZIndex( childrenCount - index );
        }