function( position, rotation, scale ) {
    Component.call( this, "Transform", null, [] );

    // Local position
    this._position = position ? new math.Vector3( position ) : new math.Vector3( math.vector3.zero );
    this.__defineGetter__( "position", function() {
      if( this._position.modified ) {
        // Update local position
        this._position.modified = false;
      }
      return this._position;
    });
    this.__defineSetter__( "position", function( value ) {
      this._position.set( value );
      this._cachedLocalMatrixIsValid = false;
      this._cachedWorldMatrixIsvalid = false;
    });

    // Local rotation
    this._rotation = rotation ? new math.Vector3( rotation ) : new math.Vector3( math.vector3.zero );
    this.__defineGetter__( "rotation", function() {
      return this._rotation;
    });
    this.__defineSetter__( "rotation", function( value ) {
      this._rotation.set( value );
      this._cachedLocalMatrixIsValid = false;
      this._cachedWorldMatrixIsvalid = false;
    });
    this._rotationMatrix = new math.transform.rotate( this._rotation );
    this._rotationMatrixIsValid = true;

    // Local scale
    this._scale = scale ? new math.Vector3( scale ) : new math.Vector3( math.vector3.one );
    this.__defineGetter__( "scale", function() {
      return this._scale;
    });
    this.__defineSetter__( "scale", function( value ) {
      this._scale.set( value );
      this._cachedLocalMatrixIsValid = false;
      this._cachedWorldMatrixIsvalid = false;
    });

    this._cachedLocalMatrix = new math.T();
    this._cachedLocalMatrixIsValid = false;
    this._cachedWorldMatrix = new math.T();
    this._cachedWorldMatrixIsvalid = false;
  }