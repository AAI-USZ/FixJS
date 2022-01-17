function ( value, _serviceContainer ) {
      if ( this._$elem.is( ".geo-service" ) ) {
        this._$elem.closest( ".geo-map" ).geomap( "toggle", value, this._$elem );
      } else {

        for ( var i = 0; i < this._currentServices.length; i++ ) {
          var service = this._currentServices[ i ];

          if ( !_serviceContainer || service.serviceContainer[ 0 ] == _serviceContainer[ 0 ] ) {
            if ( value === undefined ) {
              // toggle visibility
              value = ( service.style.visibility !== "visible" );
            }

            service.style.visibility = ( value ? "visible" : "hidden" );

            service.serviceContainer.toggle( value );

            if ( value ) {
              $.geo[ "_serviceTypes" ][ service.type ].refresh( this, service );
            }
          }
        }
      }
    }