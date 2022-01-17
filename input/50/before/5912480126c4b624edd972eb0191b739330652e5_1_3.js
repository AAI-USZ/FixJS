function() {

      for ( var i = 0, el = events.length; i < el; i++ ) {

        butter.listen( events[ i ], eventFunction );
      }
    }