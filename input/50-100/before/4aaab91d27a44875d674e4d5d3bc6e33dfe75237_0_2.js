function ( popcornOptions ) {
      var element;
      for ( var option in popcornOptions ) {
        if ( popcornOptions.hasOwnProperty( option ) ) {
          element = _rootElement.querySelector( "[data-manifest-key='" + option + "']" );
          element.value = popcornOptions[ option ];
        }
      }
    }