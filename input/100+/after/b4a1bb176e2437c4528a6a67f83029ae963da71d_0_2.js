function( FLOAT_ARRAY_TYPE ) {

    var notImplemented = require( "common/not-implemented" );
    var M4 = require( "matrix/m4" )( FLOAT_ARRAY_TYPE );
    var matrix4 = require( "matrix/matrix4-api" )( FLOAT_ARRAY_TYPE );

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

    function set(transform, t, r, s){
      if (transform){
        matrix4.set(transform, matrix4.identity);
      }
      return compound(transform, t, r, s);
    }

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

    function scale( v, result ) {
      result = result || new M4( matrix4.identity );

      matrix4.multiply( result, [v[0], 0, 0, 0,
                                 0, v[1], 0, 0,
                                 0, 0, v[2], 0,
                                 0, 0, 0, 1], result );

      return result;
    }

    function translate( v, result ) {
      result = result || new M4( matrix4.identity );

      matrix4.multiply( result, [1, 0, 0, v[0],
                                 0, 1, 0, v[1],
                                 0, 0, 1, v[2],
                                 0, 0, 0, 1], result );

      return result;
    }

    var transform = {
      compound: compound,
      set: set
    };

    return transform;

  }