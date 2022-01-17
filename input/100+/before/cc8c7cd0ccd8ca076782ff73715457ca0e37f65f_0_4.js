function( fov, near ) {
	proj = mat4.create( mat4.identity() );

	var tanFov2 = Math.tan( fov / 2 );
	var k = 1 / tanFov2;

	proj[0] = this._aspect * k;
	proj[2] = k / ( near * this._width );

	proj[5] = k;
	proj[6] = k / (near * this._height );

	proj[10] = -1;
	proj[11] = 2 * near;
	
	proj[14] = -1;
	proj[15] = 0;

	return proj;
    }