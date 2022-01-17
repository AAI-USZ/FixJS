function( speed ) {
	var upVec = vec3.create( this._modelView[1], this._modelView[5], this._modelView[9] );
	upVec = vec3.scale( upVec, speed );
	this._cameraPosition = vec3.multiply( this._cameraPosition, upVec );

    }