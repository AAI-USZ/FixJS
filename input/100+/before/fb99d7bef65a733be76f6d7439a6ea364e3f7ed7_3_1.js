function(length, rows, speed)
	{
		this._walkAnimSpeed = speed;
		var lastFrame = length - 1;

		// TODO: make sure we don't bind this more than once!!
		this.bind("EnterFrame", this._updateBodyAnim);

		//setup animations
		this.requires("SpriteAnimation")
			.animate("walk_left", 0, rows[1], lastFrame)
			.animate("walk_right", 0, rows[3], lastFrame)
			.animate("walk_up", 0, rows[0], lastFrame)
			.animate("walk_down", 0, rows[2], lastFrame)
			.bind("NewDirection", this._playWalkAnim);
		return this;
	}