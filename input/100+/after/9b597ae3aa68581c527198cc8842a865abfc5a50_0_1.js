function( plugin ) {
      var tracks, trackEvents,
          head,
          i, l, k;

      if ( typeof plugin === "string" ) {
        plugin = this.get( plugin );
        if ( !plugin ) {
          return;
        }
      }

      for ( i = 0, l = _plugins.length; i < l; i++ ) {
        if ( _plugins[ i ].name === plugin.name ) {
          tracks = butter.tracks;
          for ( i = 0, l = tracks.length; i < l; i++ ) {
            trackEvents = tracks[ i ].trackEvents;
            for ( k = 0, ln = trackEvents.length - 1; ln >= k; ln-- ) {
              if ( trackEvents[ ln ].type === plugin.name ) {
                tracks[ i ].removeTrackEvent( trackEvents[ ln ] );
              }
            }
          }

          _plugins.splice( i, 1 );
          l--;
          _listContainer.removeChild( plugin.element );

          head = document.getElementsByTagName( "HEAD" )[ 0 ];
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