function( rootElement, butter, trackEvent ) {

    var _this = this;

    Editor.BaseEditor( _this, butter, rootElement, {
      open: function ( parentElement, trackEvent ) {
        trackEvent.listen( "trackeventupdated", function ( e ) {
          _this.updatePropertiesFromManifest( e.target.popcornOptions );
        });
        _this.createPropertiesFromManifest( trackEvent );
      },
      close: function () {
      }
    });
    
    var _butter = butter,
        _rootElement = rootElement,
        _targets = [ butter.currentMedia ].concat( butter.targets );

    function createTargetsList ( trackEvent ) {
      var propertyRootElement = __defaultLayouts.querySelector( ".trackevent-property.targets" ).cloneNode( true ),
          selectElement = propertyRootElement.querySelector( "select" ),
          mediaOptionElement = selectElement.firstChild,
          optionElement;

      for ( var i=1; i<_targets.length; ++i ) {
        optionElement = document.createElement( "option" );
        optionElement.value = _targets[ i ].element.id;
        optionElement.innerHTML = _targets[ i ].element.id;
        selectElement.insertBefore( optionElement, mediaOptionElement );
      }

      attachSelectChangeHandler( selectElement, trackEvent, "target" );

      return propertyRootElement;
    }

    function attachSelectChangeHandler ( element, trackEvent, propertyName ) {
      element.addEventListener( "change", function( e ) {
        var updateOptions = {};
        updateOptions[ propertyName ] = element.value;
        trackEvent.update( updateOptions );
        var target = _this.butter.getTargetByType( "elementID", trackEvent.popcornOptions.target );
        if( target ) {
          target.view.blink();
        }
      }, false );
    }

    function attachInputChangeHandler ( element, trackEvent, propertyName ) {
      element.addEventListener( "blur", function( e ) {
        var updateOptions = {};
        updateOptions[ propertyName ] = element.value;
        trackEvent.update( updateOptions );
      }, false );
      element.addEventListener( "keyup", function( e ) {
        var updateOptions = {};
        updateOptions[ propertyName ] = element.value;
        trackEvent.update( updateOptions );
      }, false );
    }

    function createManifestItem ( name, manifestEntry, data, trackEvent ) {
      var elem = manifestEntry.elem || "default",
          propertyArchetype = __defaultLayouts.querySelector( ".trackevent-property." + elem ).cloneNode( true ),
          input,
          select;

      propertyArchetype.querySelector( ".property-name" ).innerHTML = manifestEntry.label || name;
      if ( manifestEntry.elem === "select" ) {
        select = propertyArchetype.querySelector( "select" );
        select.setAttribute( "data-manifest-key", name );
        attachSelectChangeHandler( select, trackEvent, name );
      }
      else {
        input = propertyArchetype.querySelector( "input" );
        if ( data ) {
          input.value = data;  
        }
        input.type = manifestEntry.type;
        input.setAttribute( "data-manifest-key", name );
        attachInputChangeHandler( input, trackEvent, name );
      }

      return propertyArchetype;
    }

    this.createPropertiesFromManifest = function ( trackEvent ) {
      var targetList = createTargetsList( trackEvent );

      var manifestOptions = trackEvent.manifest.options;
      for ( var item in manifestOptions ) {
        if( manifestOptions.hasOwnProperty( item ) ) {
          _rootElement.appendChild( createManifestItem( item, manifestOptions[ item ], trackEvent.popcornOptions[ item ], trackEvent ) );
        }
      }

      _rootElement.appendChild( targetList );

      _this.updatePropertiesFromManifest( trackEvent.popcornOptions );
    };

    this.updatePropertiesFromManifest = function ( popcornOptions ) {
      var element;
      for ( var option in popcornOptions ) {
        if ( popcornOptions.hasOwnProperty( option ) ) {
          element = _rootElement.querySelector( "[data-manifest-key='" + option + "']" );
          element.value = popcornOptions[ option ];
        }
      }
    };

  }