function GameController () {
		Parent.apply(this, new PhysicsEngine());

		this.inputControllers = {};

		this.update();
	    this.updateWorld();
	}