function(data, module) {
        if ( data ) {
          // We use execScript on Internet Explorer
          // We use an anonymous function so that context is window
          // rather than jQuery in Firefox
          return ( window.execScript || function( data ) {
            return window[ "eval" ].call( module, data );
          } )( data );
        }
      }