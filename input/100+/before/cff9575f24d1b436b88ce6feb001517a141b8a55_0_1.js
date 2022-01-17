function( element ){
          if( element.getAttribute( "data-butter-draggable-type" ) === "plugin" ){
            var pluginType = element.getAttribute( "data-popcorn-plugin-type" ),
                plugin = _this.get( pluginType );
            if( plugin ){
              for( var i=0; i<_listContainer.childNodes.length; ++i ){
                if( _listContainer.childNodes[ i ].getAttribute( "data-popcorn-plugin-type" ) === pluginType ){
                  return;
                }
              }
              _listContainer.appendChild( plugin.createElement( butter, _pattern ) );
            }
          }
        }