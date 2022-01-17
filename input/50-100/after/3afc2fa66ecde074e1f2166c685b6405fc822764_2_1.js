function GameController () {
		Parent.call(this, new PhysicsEngine());

		this.inputControllers = {};

		this.update();
	    this.updateWorld();

		NotificationCenter.on('user/joined', this.userJoined, this);
		NotificationCenter.on('user/left', this.userLeft, this);
	}