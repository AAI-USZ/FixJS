function( input ) {
      var len = input.length;
      if( len === 0 || len > 4 ) {
        throw new Error( "Invalid number of arguments!" );
      }
      var result = qx.lang.Array.copy(input);
      if( len === 1 ) {
        result[1] = result[2] = result[3] = result[0];
      } else if( len === 2 ) {
        result[2] = result[0];
        result[3] = result[1];
      } else if( len === 3 ) {
        result[3] = result[1];
      }
      return result;
    }