function fixed( t, r, s, result ) {
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