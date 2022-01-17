function()
	{
		var entity = this.getEntity();

		if (this.WalkAnimationFrames > 0)
			entity.WalkAnimation(this.WalkAnimationFrames, this.WalkAnimationRows, this.WalkAnimationSpeed);

		for (var name in this.ActionAnimations)
		{
			var data = this.ActionAnimations[name];
			entity.ActionAnimation(name, data[0], data[1]);
		}
	}