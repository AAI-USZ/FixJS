function(dt){

		if(this.debug === true){
			this.stats.begin();
		}

		var i, entity, screen = this.screen;

		screen.context.clearRect( 0, 0, screen.realSize.x, screen.realSize.y );

		this.draw(dt);

		for(i = 0; i < this.entities.length; i++){
			entity = this.entities[ i ];
			entity.accelerate(dt);
			entity.updateAABB();
		}

		// do collision stuff
		this.broadPhase.update();
		var collisions = this.broadPhase.queryForCollisionPairs();
		this.handleCollisions( dt, collisions );

		for(i = 0; i < this.entities.length; i++){
			entity = this.entities[ i ];
			entity.inertia(dt);
			entity.updateAABB();
		}		

		this.update(dt);

		if(this.debug === true){
			this.stats.end();
		}
	}