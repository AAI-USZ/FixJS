function compound( transform, t, r, s ) {

      if( t ) {
        translate( t, transform );
      }

      if( r ) {
        rotate( r, transform );
      }

      if( s ) {
        scale( s, transform );
      }

      return transform;
    }