function( speed ) {
        var upVec = vec3.createFrom( this._modelView[1], this._modelView[5], this._modelView[9] );
        console.log( "up vector " + upVec );
        upVec = vec3.scale( upVec, speed );
        this._lookAtPosition = vec3.add( this._lookAtPosition, upVec );

    }