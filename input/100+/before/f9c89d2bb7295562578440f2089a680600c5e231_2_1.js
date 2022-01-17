function( plugin, cb ) {

        if( plugin instanceof Array ) {
          var counter = 0,
              i = 0,
              l = 0,
              check = function() {
                if ( ++counter === plugin.length && cb ) {
                  cb();
                }
              };

          for( i = 0, l = plugin.length; i < l; i++ ) {
            _this.add( plugin[ i ], check );
          }
        } else {
          if( !__trackEventCSSRules[ plugin.type ] ){
            createStyleForType( plugin.type );
          }

          plugin = new Plugin( _plugins.length, plugin );

          var interval = setInterval(function( e ) {
            if( !Popcorn.manifest[ plugin.type ]) {
              return;
            }
            plugin.manifest = Popcorn.manifest[ plugin.type ];
            clearInterval( interval );
            if( cb ){
              cb();
            }
          }, 100);

          _plugins.push( plugin );
          if( moduleOptions.defaults && moduleOptions.defaults.indexOf( plugin.type ) > -1 ){
            _listContainer.appendChild( plugin.createElement( butter, _pattern ) );
          }
          butter.dispatch( "pluginadded", plugin );
        }

        _scrollbar.update();

        return plugin;
      }