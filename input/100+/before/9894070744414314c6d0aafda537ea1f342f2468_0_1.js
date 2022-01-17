function( FLOAT_ARRAY_TYPE ) {

    var notImplemented = require( "common/not-implemented" );
    var M4 = require( "matrix/m4" )( FLOAT_ARRAY_TYPE );
    var matrix4 = require( "matrix/matrix4-api" )( FLOAT_ARRAY_TYPE );

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
        matrix4.multiply( rotation, result, result );
      }

      if( 0 !== v[1] ) {
        sinA = Math.sin( v[1] );
        cosA = Math.cos( v[1] );

        rotation = [ cosA, 0, -sinA, 0,
                     0, 1, 0, 0,
                     sinA, 0, cosA, 0,
                     0, 0, 0, 1 ];
        matrix4.multiply( rotation, result, result );
      }

      if( 0 !== v[0] ) {
        sinA = Math.sin( v[0] );
        cosA = Math.cos( v[0] );
        
        rotation = [ 1, 0, 0, 0,
                     0, cosA, sinA, 0,
                     0, -sinA, cosA, 0,
                     0, 0, 0, 1 ];
        matrix4.multiply( rotation, result, result );
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
      fixed: fixed,
      rotate: rotate,
      scale: scale,
      translate: translate
    };

    return transform;

  }