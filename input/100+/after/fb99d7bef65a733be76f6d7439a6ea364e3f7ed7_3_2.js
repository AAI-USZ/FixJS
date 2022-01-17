function()
	{
		// only update anim if we currently have one, otherwise, the anim should already be stopped
		if (this._currentWalkAnim != null || this._currentActionAnim != null)
		{
			if (this._currentActionAnim != null)
			{
				this._currentActionAnimFrame++;
				if (this._currentActionAnimFrame >= this._currentActionAnimFrameTotal)
				{
					this._currentActionAnim = null;
					this.reset();
				}
			}

			if (Crafty.DrawManager.onScreen({ _x : this.x, _y : this.y, _w : this.w, _h : this.h }))
			{
				if (this._currentActionAnim != null)
				{
					if (!this.isPlaying(this._currentActionAnim))
					{
						this.stop().playanim(this._currentActionAnim, this._currentActionAnimData.interval, 0, this._currentActionAnimFrame);
					}
				}
				else if (this._currentWalkAnim != null)
				{
					if (!this.isPlaying(this._currentWalkAnim))
					{
						this.stop().animate(this._currentWalkAnim, this._walkAnimSpeed, -1);
					}
				}
			}
			else
			{
				this.reset();
			}
		}
	}