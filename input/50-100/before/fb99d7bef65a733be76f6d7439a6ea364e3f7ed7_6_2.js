function()
	{
		var entity = this.getEntity();

		if (this.WalkAnimationFrames > 0)
			entity.WalkAnimation(this.WalkAnimationFrames, this.WalkAnimationRows, this.WalkAnimationSpeed);
	}