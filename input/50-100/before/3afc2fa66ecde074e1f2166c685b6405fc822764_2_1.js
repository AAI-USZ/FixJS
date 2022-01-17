function GameController () {
		Parent.call(this, new PhysicsEngine());

		this.inputControllers = {};

		this.update();
	    this.updateWorld();
	}