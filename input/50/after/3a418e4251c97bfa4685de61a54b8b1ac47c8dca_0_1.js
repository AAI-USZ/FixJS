function closeClickHandler( e ){
              _internal.activity( "default-close" );
              closeButton.removeEventListener( "click", closeClickHandler, false );
            }