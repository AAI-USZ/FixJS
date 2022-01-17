function( plugin ) {
      var trackEvents,
          trackEvent,
          i;

      // If a string was passed in, try to get a Plugin object instead.
      if ( typeof plugin === "string" ) {
        plugin = this.get( plugin );
        if ( !plugin ) {
          // If no plugin was found, we know we don't have to go any further because it's not here!
          return;
        }
      }

      // Remove all trackevents that were using this plugin type
      trackEvents = butter.getTrackEventsByType( plugin.type );
      while ( trackEvents.length ) {
        trackEvent = trackEvents.pop();
        trackEvent.track.removeTrackEvent( trackEvent );
      }

      // Drop reference to plugin object
      i = _plugins.indexOf( plugin );
      if ( i > -1 ) {
        _plugins.splice( i, 1 );
      }

      // If it was in the plugin list, remove it
      if ( plugin.element && plugin.element.parentNode ) {
        _listContainer.removeChild( plugin.element );
      }

      // Update scrollbars because height of list may have changed.
      _scrollbar.update();

      butter.dispatch( "pluginremoved", plugin );
    }