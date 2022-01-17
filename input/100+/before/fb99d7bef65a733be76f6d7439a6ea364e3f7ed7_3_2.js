function(direction)
	{
		if (direction.x < -0.5)
		{
			this._currentAnimation = "walk_left";
		}
		else if (direction.x > 0.5)
		{
			this._currentAnimation = "walk_right";
		}
		else if (direction.y < 0)
		{
			this._currentAnimation = "walk_up";
		}
		else if (direction.y > 0)
		{
			this._currentAnimation = "walk_down";
		}
		else
		{
			this._currentAnimation = null;
			this.reset();
		}
	}