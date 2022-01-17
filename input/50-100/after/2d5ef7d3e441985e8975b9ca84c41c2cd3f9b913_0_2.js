function ( trackEvent ) {
      var element,
          popcornOptions = trackEvent.popcornOptions,
          manifestOptions = trackEvent.manifest.options;
      for ( var option in manifestOptions ) {
        if ( manifestOptions.hasOwnProperty( option ) ) {
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