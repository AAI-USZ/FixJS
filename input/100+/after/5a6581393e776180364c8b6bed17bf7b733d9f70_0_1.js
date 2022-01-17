function() {
	    //var debugSprite = Settings.DEBUG_DRAW_CANVAS_SPRITE;
		var debugSprite = document.getElementById("canvas").getContext("2d");

	    // set debug draw
	    var debugDraw = new Box2D.Dynamics.b2DebugDraw();

	    debugDraw.SetSprite(debugSprite);
	    debugDraw.SetDrawScale(Settings.RATIO);
		debugDraw.SetDrawScale(30.0);
		debugDraw.SetFillAlpha(0.5);
		debugDraw.SetLineThickness(1.0);

	    debugDraw.SetFlags(null
	        | Box2D.Dynamics.b2DebugDraw.e_shapeBit 
		    | Box2D.Dynamics.b2DebugDraw.e_jointBit 
		    //| Box2D.Dynamics.b2DebugDraw.e_coreShapeBit
		    //| Box2D.Dynamics.b2DebugDraw.e_aabbBit
		    //| Box2D.Dynamics.b2DebugDraw.e_centerOfMassBit
		    //| Box2D.Dynamics.b2DebugDraw.e_obbBit
		    //| Box2D.Dynamics.b2DebugDraw.e_pairBit
		);

	    this._world.SetDebugDraw(debugDraw);
	    this._world.SetWarmStarting(true);
	}