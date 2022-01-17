function () {
      var service, i;

      for ( i = 0; i < this._currentServices.length; i++ ) {
        this._currentServices[ i ].serviceContainer.geomap( "destroy" );
        $.geo[ "_serviceTypes" ][ this._currentServices[ i ].type ].destroy( this, this._$servicesContainer, this._currentServices[ i ] );
      }

      this._currentServices = [ ];
      this._$servicesContainer.html( "" );
      this._$attrList.html( "" );

      for ( i = 0; i < this._options[ "services" ].length; i++ ) {
        service = this._currentServices[ i ] = $.extend( { }, this._options[ "services" ][ i ] );

        // keep a reference to the original
        service.serviceObject = this._options[ "services" ][ i ];

        // default the service style property on our copy
        service.style = $.extend( {
                          visibility: "visible",
                          opacity: 1
                        }, service.style );

        var idString = service.id ? ' id="' + service.id + '"' : "",
            classString = 'class="geo-service ' + ( service["class"] ? service["class"] : '' ) + '"',
            scHtml = '<div ' + idString + classString + ' style="-webkit-transform:translateZ(0);position:absolute; left:0; top:0; width:32px; height:32px; margin:0; padding:0; display:' + ( service.style.visibility === "visible" ? "block" : "none" ) + ';"></div>',
            servicesContainer;

        this._$servicesContainer.append( scHtml );
        serviceContainer = this._$servicesContainer.children( ":last" );
        this._currentServices[ i ].serviceContainer = serviceContainer;
        
        $.geo[ "_serviceTypes" ][ service.type ].create( this, serviceContainer, service, i );

        serviceContainer.data( "geoMap", this ).geomap();

        if ( service.attr ) {
          this._$attrList.append( '<li>' + service.attr + '</li>' );
        }
      }

      this._$servicesShapesContainers = this._$elem.find( ".geo-shapes-container" );

      this._$attrList.find( "a" ).css( {
        position: "relative",
        zIndex: 100
      } );
    }