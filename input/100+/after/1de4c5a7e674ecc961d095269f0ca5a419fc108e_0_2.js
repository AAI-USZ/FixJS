function ( value, _serviceContainer ) {
      if ( this._$elem.is( ".geo-service" ) ) {
        this._$elem.closest( ".geo-map" ).geomap( "opacity", value, this._$elem );
      } else {
        if ( value >= 0 || value <= 1 ) {
          for ( var i = 0; i < this._currentServices.length; i++ ) {
            var service = this._currentServices[ i ];
            if ( !_serviceContainer || service.serviceContainer[ 0 ] == _serviceContainer[ 0 ] ) {
              service.style.opacity = value;

              // update the original service object's style property
              service.serviceObject.style = $.extend( { }, service.serviceObject.style, service.style );

              $.geo[ "_serviceTypes" ][ service.type ].opacity( this, service );
            }
          }
        }
      }
    }