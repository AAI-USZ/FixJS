function( plugin ) {

      if ( typeof plugin === "string" ) {
        plugin = this.get( plugin );
        if ( !plugin ) {
          return;
        }
      }

      var i, l;

      for ( i = 0, l = _plugins.length; i < l; i++ ) {
        if ( _plugins[ i ].name === plugin.name ) {
          var tracks = butter.tracks;
          for ( i = 0, l = tracks.length; i < l; i++ ) {
            var trackEvents = tracks[ i ].trackEvents;
            for ( var k = 0, ln = trackEvents.length - 1; ln >= k; ln-- ) {
              if ( trackEvents[ ln ].type === plugin.name ) {
                tracks[ i ].removeTrackEvent( trackEvents[ ln ] );
              }
            }
          }

          _plugins.splice( i, 1 );
          l--;
          _listContainer.removeChild( plugin.element );

          var head = document.getElementsByTagName( "HEAD" )[ 0 ];
          for ( i = 0, l = head.children.length; i < l; i++ ) {
            if ( head.children[ i ].getAttribute( "src" ) === plugin.path ) {
              head.removeChild( head.children[ i ] );
            }
          }

          butter.dispatch( "pluginremoved", plugin );
        }
      }

      _scrollbar.update();
    }