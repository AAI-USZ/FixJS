function() {
		this._space =  cp.spaceNew();
		var staticBody = cp.spaceGetStaticBody( this._space );

		// Walls
		var walls = [cp.segmentShapeNew( staticBody, cp.v(0,0), cp.v(winSize.width,50), 0 ),				    // bottom
				cp.segmentShapeNew( staticBody, cp.v(0,winSize.height), cp.v(winSize.width,winSize.height), 0),	// top
				cp.segmentShapeNew( staticBody, cp.v(0,0), cp.v(0,winSize.height), 0),				            // left
				cp.segmentShapeNew( staticBody, cp.v(winSize.width,0), cp.v(winSize.width,winSize.height), 0)	// right
				];
		for( var i=0; i < walls.length; i++ ) {
			var wall = walls[i];
			cp.shapeSetElasticity(wall, 1);
			cp.shapeSetFriction(wall, 1);
			cp.spaceAddStaticShape( this._space, wall );
		}

		// Gravity
		cp.spaceSetGravity( this._space, cp.v(0, -GRAVITY) );

        // create Car
        this.createCar();

        // collision handler
		cp.spaceAddCollisionHandler( this._space, COLLISION_TYPE_CAR, COLLISION_TYPE_COIN, this, this.onCollisionBegin, null, null, null );
	}