function( pos ) {
        // coins are static bodies and sensors
        var sprite = cc.ChipmunkSprite.createWithSpriteFrameName("coin01.png");  
        var radius = 0.95 * sprite.getContentSize()[0] / 2;

		var body = cp.spaceGetStaticBody( this._space );
		cp.bodySetPos( body, pos );
        sprite.setBody( body );

        var shape = cp.circleShapeNew( body, radius, cp.vzero );
        cp.shapeSetFriction( shape, 1 );
        cp.shapeSetGroup( shape, GROUP_COIN );
        cp.shapeSetSensor( shape, true );

        cp.spaceAddStaticShape( this._space, shape );
        this._batch.addChild( sprite, 10 );

        var animation = cc.AnimationCache.getInstance().getAnimationByName("coin");
        var animate = cc.Animate.create(animation); 
        var repeat = cc.RepeatForever.create( animate );
        sprite.runAction( repeat );

        return body;
    }