function( speed ) {

        var forwardVec = vec3.createFrom( this._modelView[2], this._modelView[6], this._modelView[10] );

        console.log( "forward vector:  " + forwardVec );
        forwardVec = vec3.scale( forwardVec, speed );
        this._lookAtPosition = vec3.add( this._lookAtPosition, forwardVec );

    }