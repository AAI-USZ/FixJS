function() {
	    this._world.Step(Settings.BOX2D_TIME_STEP, Settings.BOX2D_VELOCITY_ITERATIONS, Settings.BOX2D_POSITION_ITERATIONS);
	    this._world.ClearForces();
	    this._world.DrawDebugData();
	}