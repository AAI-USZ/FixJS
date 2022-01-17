function() {
		var cache = cc.SpriteFrameCache.getInstance();
		cache.addSpriteFrames("animations/grossini.plist");
		cache.addSpriteFrames("animations/grossini_gray.plist", "animations/grossini_gray.png");

		var batch = cc.SpriteBatchNode.create("animations/grossini.pvr.gz");

		for(var i=0;i<3;i++) {
			var sprite = cc.Sprite.createWithSpriteFrameName("grossini_dance_01.png");
			sprite.setPosition( cc.p( winSize.width/4*(i+1), winSize.height/2) );

			var point = cc.Sprite.create( "r1.png" );
			point.setScale( 0.25 );
			point.setPosition( sprite.getPosition() );
			this.addChild( point, 10 );

			if( i == 0 ) {
				sprite.setAnchorPoint( cc.p( 0, 0) );
			} else if( i == 1 ) {
				sprite.setAnchorPoint( cc.p(0.5, 0.5) );
			} else if( i == 2 ) {
				sprite.setAnchorPoint( cc.p(1,1) );
			}

			point.setPosition( sprite.getPosition() );

			var frames = []
			for( var j = 1; j < 15; j++) {

				if( j < 10 ) {
					var name = "grossini_dance_0" + j + ".png";
				} else {
					var name = "grossini_dance_" + j + ".png";
				}

				var frame = cache.spriteFrameByName( name );
				frames.push( frame );
			}

			var animation = cc.Animation.create( frames, 0.3 );
			sprite.runAction( cc.RepeatForever.create( cc.Animate.create( animation ) ) );

			var flip = cc.FlipY.create( true );
			var flip_back = cc.FlipY.create( false );
			var delay = cc.DelayTime.create( 1 );
			var delay2 = cc.DelayTime.create( 1 );
			var seq = cc.Sequence.create( delay, flip, delay2, flip_back );
			sprite.runAction( cc.RepeatForever.create( seq ) );

			batch.addChild( sprite );
		}
		this.addChild(batch);
	}