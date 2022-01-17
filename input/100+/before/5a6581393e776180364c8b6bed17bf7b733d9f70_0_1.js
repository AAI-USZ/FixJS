function() {
	    var debugSprite = Settings.DEBUG_DRAW_CANVAS_SPRITE;
	    console.log(debugSprite);

	    // set debug draw
	    var dbgDraw = new Box2D.Dynamics.b2DebugDraw();

	    dbgDraw.SetSprite(debugSprite);
	    dbgDraw.SetDrawScale(Settings.RATIO);
	    dbgDraw.SetAlpha(0.5);
	    dbgDraw.SetFillAlpha(0.1);
	    dbgDraw.SetLineThickness(0);

	    dbgDraw.SetFlags(null
	        | dbgDraw.e_shapeBit 
	    //| b2DebugDraw.e_jointBit 
	    //| b2DebugDraw.e_coreShapeBit
	    //| b2DebugDraw.e_aabbBit
	    //| b2DebugDraw.e_centerOfMassBit
	    //| b2DebugDraw.e_obbBit
	    //| b2DebugDraw.e_pairBit
	);

	    this._world.SetDebugDraw(dbgDraw);

	    this._world.SetWarmStarting(true);
	    console.log('Debug Draw was set up');
	}