function() {

		requestAnimFrame(this.update.bind(this));

	    this.physicsEngine.update();
	    for(var id in this.players) {
	    	this.players[id].player.update();
	    }
	}