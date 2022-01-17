function( event ) {
        console.log( event.key );
        var direction = vec3.create();
        var speed = 1;

	console.log( "camPos before move: " + this._cameraPosition );
	
        switch( event.key ){
        case 87 : direction[2] = moveForward( speed ); break;  //w, move forward in z direction
        case 83 : direction[2] = moveForward( -speed ); break;//s, back off mister
        case 65 : direction[0] = moveHorizontal( speed ); break;//a, move left on x-axis
        case 68 : direction[0] = moveHorizontal( -speed ); break;//moving right
        }

	console.log( "camPos after  move: " + this._cameraPosition );
        // direction = quat4.multiplyVec3( this._orientation, direction );

        // console.log( "rotate direction " + direction );
        // console.log( "initial cameraPosition " + this._cameraPosition );

        // this._cameraPosition = vec3.add( this._cameraPosition, direction );
        // this._lookAtPosition = vec3.add( this._lookAtPosition, direction );

        // console.log( "updated cameraPosition " + this._cameraPosition );
        // console.log( "updated lookAtPosition " + this._lookAtPosition );

        this.calculateMatrices();

    }