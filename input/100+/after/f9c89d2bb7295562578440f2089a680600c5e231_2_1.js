function generatePluginTypeCheckFunction( pluginType ) {
      return function(){
        // Does Popcorn know about this plugin type yet?
        return !!Popcorn.manifest[ pluginType ];
      };
    }