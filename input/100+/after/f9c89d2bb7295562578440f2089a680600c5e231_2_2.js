function( plugins, onReadyCallback ) {
      var newPlugins = [],
          pluginLoadDescriptors = [],
          plugin,
          i,
          l;

      // Try to always use an array for code simplicity
      if ( ! ( plugins instanceof Array ) ) {
        plugins = [ plugins ];
      }

      for ( i = 0, l = plugins.length; i < l; i++ ) {
        plugin = new Plugin( plugins[ i ] );

        // Create the styling for this plugin and its trackevents
        if ( !__trackEventCSSRules[ plugin.type ] ){
          createStyleForType( plugin.type );
        }

        // Create a loader descriptor for this plugin type for the Butter loader
        pluginLoadDescriptors.push({
          type: "js",
          url: plugin.path,
          check: generatePluginTypeCheckFunction( plugin.type )
        });

        newPlugins.push( plugin );
      }

      butter.loader.load( pluginLoadDescriptors, function(){
        for ( i = 0, l = newPlugins.length; i < l; i++ ) {
          plugin = newPlugins[ i ];
          if ( moduleOptions.defaults && moduleOptions.defaults.indexOf( plugin.type ) > -1 ) {
            _listContainer.appendChild( plugin.createElement( butter, _pattern ) );
          }
          _plugins.push( plugin );
          butter.dispatch( "pluginadded", newPlugins[ i ] );
        }
        _scrollbar.update();
        onReadyCallback();
      });

      return newPlugins;
    }