function () {
      var service,
          i = 0;

      if ( this._$elem.is( ".geo-map" ) ) {
        for ( ; i < this._currentServices.length; i++ ) {
          service = this._currentServices[ i ];

          if ( $.geo[ "_serviceTypes" ][ service.type ] !== null ) {
            $.geo[ "_serviceTypes" ][ service.type ].refresh( this, service );
            service.serviceContainer.geomap( "refresh" );
          }
        }
      }

      if ( this._$shapesContainer ) {
        this._$shapesContainer.geographics( "clear" );
        if ( this._graphicShapes.length > 0 ) {
          this._refreshShapes( this._$shapesContainer, this._graphicShapes, this._graphicShapes, this._graphicShapes );
        }
      }
    }