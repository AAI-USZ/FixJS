function() {
		this._space =  cp.spaceNew();
		var staticBody = cp.spaceGetStaticBody( this._space );

		// Walls
		var walls = [cp.segmentShapeNew( staticBody, cp._v(0,0), cp._v(winSize.width,0), 0 ),				    // bottom
				cp.segmentShapeNew( staticBody, cp._v(0,winSize.height), cp._v(winSize.width,winSize.height), 0),	// top
				cp.segmentShapeNew( staticBody, cp._v(0,0), cp._v(0,winSize.height), 0),				            // left
				cp.segmentShapeNew( staticBody, cp._v(winSize.width,0), cp._v(winSize.width,winSize.height), 0)	// right
				];
		for( var i=0; i < walls.length; i++ ) {
			var wall = walls[i];
			cp.shapeSetElasticity(wall, 1);
			cp.shapeSetFriction(wall, 1);
			cp.spaceAddStaticShape( this._space, wall );
		}

		// Gravity
		cp.spaceSetGravity( this._space, cp._v(0, -GRAVITY) );

        // collision handler
		cp.spaceAddCollisionHandler( this._space, COLLISION_TYPE_CAR, COLLISION_TYPE_COIN, this, this.onCollisionBegin, null, null, null );

        // debug only
        var debug = cc.ChipmunkDebugNode.create( this._space );
        debug.setVisible( true );
        this.addChild( debug, 100 );
	}