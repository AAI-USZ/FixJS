function ( arbiter, space ) {

		var bodies = cp.arbiterGetBodies( arbiter );
		var shapes = cp.arbiterGetShapes( arbiter );
		var collTypeA = cp.shapeGetCollisionType( shapes[0] );
		var collTypeB = cp.shapeGetCollisionType( shapes[1] );

        var shapeCoin =  (collTypeA == COLLISION_TYPE_COIN) ? shapes[0] : shapes[1];

        // XXX: hack to prevent double deletion... argh...
        // Since shapeCoin in 64bits is a typedArray and in 32-bits is an integer
        // a ad-hoc solution needs to be implemented
        if( this._shapesToRemove.length == 0 ) {
            // since Coin is a sensor, it can't be removed at PostStep.
            // PostStep is not called for Sensors
            this._shapesToRemove.push( shapeCoin );
            audioEngine.playEffect("pickup_coin.wav");

//            cc.log("Adding shape: " + shapeCoin[0] + " : " + shapeCoin[1] );
            cc.log("Adding shape: " + shapeCoin );
            this.addScore(1);
        }
        return true;
	}