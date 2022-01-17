function( speed ) {
        console.log( "horizontal move:  "  + speed );

        var rightVec = vec3.createFrom( this._modelView[0], this._modelView[4], this._modelView[8] );

        console.log( "right vector:  " + rightVec );

        rightVec = vec3.scale( rightVec, speed );

        console.log( "scaled right vector:  " + rightVec );

        this._lookAtPosition = vec3.add( this._lookAtPosition, rightVec );

    }