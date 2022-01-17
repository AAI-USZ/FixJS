function ( trackEvent ) {
      var targetList = createTargetsList( trackEvent );

      if ( !trackEvent.manifest ) {
        throw "Unable to create properties from null manifest. Perhaps trackevent is not initialized properly yet.";
      }

      var manifestOptions = trackEvent.manifest.options;
      for ( var item in manifestOptions ) {
        if( manifestOptions.hasOwnProperty( item ) ) {
          _rootElement.appendChild( createManifestItem( item, manifestOptions[ item ], trackEvent.popcornOptions[ item ], trackEvent ) );
        }
      }

      _rootElement.appendChild( targetList );

      _this.updatePropertiesFromManifest( trackEvent.popcornOptions );
    }