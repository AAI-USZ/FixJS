function(pos) {
        var sprite = cc.ChipmunkSprite.createWithSpriteFrameName("Chassis.png"); 
//        var anchor = cp.vadd( sprite.getAnchorPointInPoints, COG_ADJUSTMENT );
        var cs = sprite.getContentSize();
//        sprite.setAnchorPoint( anchor[0] / cs[0], anchor[1]/cs[1] );

        // XXX: Space Patrol uses a nice poly for the chassis.
        // XXX: Add something similar here, instead of a boxed chassis

        var body = cp.bodyNew( CHASSIS_MASS, cp.momentForBox(CHASSIS_MASS, cs[0], cs[1] ) );
        cp.bodySetPos( body, pos );
        sprite.setBody( body );

        var shape = cp.boxShapeNew( body, cs[0], cs[1] );
		cp.shapeSetFriction(shape, 0.3);
		cp.shapeSetGroup( shape, GROUP_BUGGY );
		cp.shapeSetLayers( shape, COLLISION_LAYERS_BUGGY );

        cp.spaceAddBody( this._space, body );
        cp.spaceAddShape( this._space, shape );
        this._batch.addChild( sprite );

        return body;
    }