function( speed ) {
	var forwardVec = vec3.create( this._modelView[1], this._modelView[5], this._modelView[9] );
	forwardVec = vec3.scale( forwardVec, speed );
	this._cameraPosition = vec3.multiply( this._cameraPosition, forwardVec );

    }