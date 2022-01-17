function() {
	    this.world = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0, Settings.BOX2D_GRAVITY), Settings.BOX2D_ALLOW_SLEEP);

	    if(Settings.IS_BROWSER_ENVIRONMENT) {
	    	this.setupDebugDraw();
	    }
	}