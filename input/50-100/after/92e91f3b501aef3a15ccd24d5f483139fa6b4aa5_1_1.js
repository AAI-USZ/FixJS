function( FLOAT_ARRAY_TYPE ) {

    var M = require( "matrix/m" );
    var M4 = require( "matrix/m4" )( FLOAT_ARRAY_TYPE );
    var transform = require("matrix/transform-api")( FLOAT_ARRAY_TYPE );

    var T = function(t, r, s) {
      var matrix = new M4();
      return transform.set(matrix, t, r, s);
    };
    T.prototype = new M();
    T.prototype.constructor = T;

    return T;

  }