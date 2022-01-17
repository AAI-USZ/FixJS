function( event ) {
        console.log( "cameraPos: " + this._cameraPosition );
        var negCamPos = vec3.negate( vec3.create( this._cameraPosition ) );
        this._modelView = mat4.identity( mat4.create() );
        this._modelView = mat4.translate( this._modelView, negCamPos );
        this._modelView = mat4.multiply(  this._modelView, quat4.toMat4( this._orientation ) );
        this._modelView = mat4.translate( this._modelView, this._cameraPosition);
//        this._modelView = mat4.translate( this._modelView, this._lookAtPosition );

        var viewer = this._model.getElementValue( this._key );
        this._width = viewer.getElementValue( "width" );
	this._height = viewer.getElementValue( "height" );
	this._aspect = this._width / this._height ;
        this._projection = mat4.perspective( 90.0, this._aspect, this._near, this._far );



        console.log( this._cameraPosition );
        console.log( "modelview " + this._modelView );
        console.log( "projection " + this._projection );

        viewer.updateElement( "modelview", this._modelView );
        viewer.updateElement( "projection", this._projection );
        this._model.updateElement( this._key, viewer );
    }