function( theme, config ) {
      var type = this.__extractType( config );

      // Use theme key from extended theme if own one is not available
      if( config.extend && !type ) {
        type = config.extend.type;
      }

      // Save theme type
      theme.type = type || "other";

      // Return if there is no key defined at all
      if( !type ) {
        return;
      }

      // Create pseudo class
      var PseudoClass = function() {};

      // Process extend config
      if( config.extend ) {
        PseudoClass.prototype = new config.extend.$$clazz();
      }

      var target = PseudoClass.prototype;
      var source = config[ type ];

      // Copy entries to prototype
      for( var id in source ) {
        target[ id ] = source[ id ];

        // Appearance themes only:
        // Convert base flag to class reference (needed for mixin support)
        if( target[id].base ) {
          target[id].base = config.extend;
        }
      }

      // store pseudo class
      theme.$$clazz = PseudoClass;

      // and create instance under the old key
      theme[type] = new PseudoClass();
    }