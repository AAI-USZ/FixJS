function(self, target, ability)
	{
		if (this._attackCoolDown > 0)
			this._attackCoolDown--;

		var selfCenter = self.GetCenter();
		var targetCenter = target.GetCenter();

		var distToTarget = Math3D.Distance(selfCenter, targetCenter);

		if (!self.IsNavigating())
		{
			if (distToTarget <= 1.5)
			{
				if (this._attackCoolDown <= 0)
				{
					this._attackCoolDown = 50;
					var data = { dir : Math3D.Direction(selfCenter, targetCenter) };
					self.UseAbility(ability, data);
				}
			}
			else
			{
				var targetLoc = target.GetCenterRounded();
				this._entity.NavigateTo(targetLoc.x, targetLoc.y);
			}
		}
		else
		{
			var targetLoc = target.GetCenterRounded();
			if (!this._entity.IsNavigatingTo(targetLoc.x, targetLoc.y))
			{
				this._entity.NavigateTo(targetLoc.x, targetLoc.y);
			}
		}
	}