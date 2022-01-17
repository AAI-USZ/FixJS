function() {
		for(var i=0;i<3;i++) {
			var sprite = cc.Sprite.create("grossini_dance_atlas.png", cc.rect(85*i, 121*1, 85, 121) );
			sprite.setPosition( cc.p( winSize.width/4*(i+1), winSize.height/2) );

			var point = cc.Sprite.create( "r1.png" );
			point.setScale( 0.25 );
			point.setPosition( sprite.position() );
			this.addChild( point, 10 );

			if( i == 0 ) {
				sprite.setAnchorPoint( cc.p( 0, 0) );
			} else if( i == 1 ) {
				sprite.setAnchorPoint( cc.p(0.5, 0.5) );
			} else if( i == 2 ) {
				sprite.setAnchorPoint( cc.p(1,1) );
			}

			point.setPosition( sprite.position() );

			var rotate = cc.RotateBy.create(10, 360);
			var action = cc.RepeatForever.create( rotate );

			sprite.runAction( action );
			this.addChild( sprite, i );
		}
	}