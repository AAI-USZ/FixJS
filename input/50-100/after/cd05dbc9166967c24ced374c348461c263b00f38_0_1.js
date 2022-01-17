function ( name, spawnOptions ) {
      if ( __dialogs[ name ] ) {
        if ( __openDialogs[ name ] ) {
          __openDialogs[ name ].focus();
        }
        else {
          __openDialogs[ name ] = __dialogs[ name ]( spawnOptions );
          __openDialogs[ name ].listen( "close", function () {
            __openDialogs[ name ] = null;
          });
        }
        return __openDialogs[ name ];
      }
      else {
        throw "Dialog '" + name + "' does not exist.";
      }
    }