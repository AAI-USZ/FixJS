function()
	{
		if (this._moveTo != null)
		{
			var center = this.GetCenter();
			var delta = {};
			delta.x = this._moveTo.x - center.x;
			delta.y = this._moveTo.y - center.y;
			var dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);
			if (dist <= this.MovementSpeed)
			{
				this.SetCenter(this._moveTo.x, this._moveTo.y);
				this.StopMoving();
				this.trigger("MoveFinished");
			}
			else
			{
				var x = center.x + delta.x / dist * this.MovementSpeed;
				var y = center.y + delta.y / dist * this.MovementSpeed;
				this.SetCenter(x, y);
			}
		}
		else if (this._velocity != null)
		{
			var center = this.GetCenter();
			var x = center.x + this._velocity.x;
			var y = center.y + this._velocity.y;
			this.SetCenter(x, y);
		}

		if (this._needUpdateSprite)
		{
			if (this._updateSpritePos(false))
				this._needUpdateSprite = false;
		}
	}