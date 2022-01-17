function( pos ) {
        var sprite = cc.ChipmunkSprite.createWithSpriteFrameName("Wheel.png");  
        var radius = 0.95 * sprite.getContentSize()[0] / 2;

		var body = cp.bodyNew(WHEEL_MASS, cp.momentForCircle(WHEEL_MASS, 0, radius, cp.vzero ) );
		cp.bodySetPos( body, pos );
        sprite.setBody( body );

        var shape = cp.circleShapeNew( body, radius, cp.vzero );
        cp.shapeSetFriction( shape, 1 );
        cp.shapeSetGroup( shape, GROUP_BUGGY );
        cp.shapeSetLayers( shape, COLLISION_LAYERS_BUGGY );

        cp.spaceAddBody( this._space, body );
        cp.spaceAddShape( this._space, shape );
        this._batch.addChild( sprite, 10 );

        return body;
    }