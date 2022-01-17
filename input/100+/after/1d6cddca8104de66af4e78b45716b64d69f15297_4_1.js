function rotate( v, result ) {
      result = result || new M4( matrix4.identity );

      var sinA,
          cosA;
      var rotation;

      if( 0 !== v[2] ) {
        sinA = Math.sin( v[2] );
        cosA = Math.cos( v[2] );

        rotation = [ cosA, sinA, 0, 0,
                     -sinA, cosA, 0, 0,
                     0, 0, 1, 0,
                     0, 0, 0, 1 ];
        matrix4.multiply( result, rotation, result );
      }

      if( 0 !== v[1] ) {
        sinA = Math.sin( v[1] );
        cosA = Math.cos( v[1] );

        rotation = [ cosA, 0, -sinA, 0,
                     0, 1, 0, 0,
                     sinA, 0, cosA, 0,
                     0, 0, 0, 1 ];
        matrix4.multiply( result, rotation, result );
      }

      if( 0 !== v[0] ) {
        sinA = Math.sin( v[0] );
        cosA = Math.cos( v[0] );
        
        rotation = [ 1, 0, 0, 0,
                     0, cosA, sinA, 0,
                     0, -sinA, cosA, 0,
                     0, 0, 0, 1 ];
        matrix4.multiply( result, rotation, result );
      }

      return result;
    }