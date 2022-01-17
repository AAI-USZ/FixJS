function( options ) {
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
      Transform: Transform( ARRAY_TYPE ),
      transform: transform( ARRAY_TYPE )
    });
  }