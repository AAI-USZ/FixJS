function ( popcornOptions ) {
      var element;
      for ( var option in popcornOptions ) {
        if ( popcornOptions.hasOwnProperty( option ) ) {
          element = _rootElement.querySelector( "[data-manifest-key='" + option + "']" );

          if ( element.type === "checkbox" ) {
            element.checked = popcornOptions[ option ];
          }
          else {
            element.value = popcornOptions[ option ];
          }
        }
      }
    }