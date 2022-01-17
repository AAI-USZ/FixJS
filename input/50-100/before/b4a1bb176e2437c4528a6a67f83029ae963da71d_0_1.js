function compound( t, r, s, result ) {
      if (result){
        matrix4.set(result, matrix4.identity);
      }
      result = result || new M4( matrix4.identity );

      if( t ) {
        translate( t, result );
      }

      if( r ) {
        rotate( r, result );
      }

      if( s ) {
        scale( s, result );
      }

      return result;
    }