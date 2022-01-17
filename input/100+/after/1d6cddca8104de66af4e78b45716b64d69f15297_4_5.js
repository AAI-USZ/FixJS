function ( require ) {

  var constants = require( "constants" );
  var equal = require( "equal" );

  var V2 = require( "vector/v2" );
  var Vector2 = require( "vector/vector2" );
  var vector2 = require( "vector/vector2-api" );

  var V3 = require( "vector/v3" );
  var Vector3 = require( "vector/vector3" );
  var vector3 = require( "vector/vector3-api" );

  var V4 = require( "vector/v4" );
  var Vector4 = require( "vector/vector4" );
  var vector4 = require( "vector/vector4-api" );

  var M2 = require( "matrix/m2" );
  var Matrix2 = require( "matrix/matrix2" );
  var matrix2 = require( "matrix/matrix2-api" );

  var M3 = require( "matrix/m3" );
  var Matrix3 = require( "matrix/matrix3" );
  var matrix3 = require( "matrix/matrix3-api" );

  var M4 = require( "matrix/m4" );
  var Matrix4 = require( "matrix/matrix4" );
  var matrix4 = require( "matrix/matrix4-api" );

  var T = require( "matrix/t" );
  var Transform = require( "matrix/transform" );
  var transform = require( "matrix/transform-api" );

  function extend( object, extra ) {
    for ( var prop in extra ) {
      if ( !object.hasOwnProperty( prop ) && extra.hasOwnProperty( prop ) ) {
        object[prop] = extra[prop];
      }
    }
  }

  var _Math = function( options ) {
    var FLOAT_ARRAY_ENUM = {
        Float32: Float32Array,
        Float64: Float64Array
    };
    this.FLOAT_ARRAY_ENUM = FLOAT_ARRAY_ENUM;

    var ARRAY_TYPE = this.ARRAY_TYPE = FLOAT_ARRAY_ENUM.Float32;

    extend( this, constants );
    this.equal = equal;
    extend( this, {
      V2: V2( ARRAY_TYPE ),
      Vector2: Vector2( ARRAY_TYPE ),
      vector2: vector2( ARRAY_TYPE )
    });
    extend( this, {
      V3: V3( ARRAY_TYPE ),
      Vector3: Vector3( ARRAY_TYPE ),
      vector3: vector3( ARRAY_TYPE )
    });
    extend( this, {
      V4: V4( ARRAY_TYPE ),
      Vector4: Vector4( ARRAY_TYPE ),
      vector4: vector4( ARRAY_TYPE )
    });
    extend( this, {
      M2: M2( ARRAY_TYPE ),
      Matrix2: Matrix2( ARRAY_TYPE ),
      matrix2: matrix2( ARRAY_TYPE )
    });
    extend( this, {
      M3: M3( ARRAY_TYPE ),
      Matrix3: Matrix3( ARRAY_TYPE ),
      matrix3: matrix3( ARRAY_TYPE )
    });
    extend( this, {
      M4: M4( ARRAY_TYPE ),
      Matrix4: Matrix4( ARRAY_TYPE ),
      matrix4: matrix4( ARRAY_TYPE )
    });
    extend( this, {
      T: T( ARRAY_TYPE ),
      Transform: Transform( ARRAY_TYPE ),
      transform: transform( ARRAY_TYPE )
    });
  };

  return new _Math();

}