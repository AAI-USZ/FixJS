function( event ) {
        console.log( event.key );
        var speed = 1;
        switch( event.key ){
        case 87 : direction[2] = speed; break;  //w, move forward in z directi
            var direction = vec3.create();on
        case 83 : direction[2] = -speed; break;//s, back off mister
        case 65 : direction[0] = speed; break;//a, move left on x-axis
        case 68 : direction[0] = -speed; break;//moving right
        }


        direction = quat4.multiplyVec3( this._orientation, direction );

        console.log( "rotate direction " + direction );
        console.log( "initial cameraPosition " + this._cameraPosition );

        this._cameraPosition = vec3.add( this._cameraPosition, direction );
        this._lookAtPosition = vec3.add( this._lookAtPosition, direction );

        console.log( "updated cameraPosition " + this._cameraPosition );
        console.log( "updated lookAtPosition " + this._lookAtPosition );
        this.calculateMatrices();
    }